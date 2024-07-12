from django.shortcuts import render
from django.http import HttpRequest,JsonResponse
# Create your views here.
import numpy as np
import librosa
import os
import json
import math
import pickle
from django.views import View
from .themeAnalysis import main

SAMPLE_RATE = 22050
DURATION = 30
SAMPLE_PER_TRACK = SAMPLE_RATE * DURATION
num_segments = 10
n_mfcc=13
n_fft=2048
hop_length=512
num_samples_per_segment = int(SAMPLE_PER_TRACK / num_segments)
expected_num_mfcc_vectors_per_segment = math.ceil(num_samples_per_segment/hop_length)
model_loaded = pickle.load(open("C:/anurag_work/NeuraTuneBE/model_saved",'rb'))


from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
import json

# def get_existing_analysis(request):
#     data = "json"
#     data = json.dumps(data)
#     res = JsonResponse(data, safe=False)
#     return res

def get_latest_analysis(request):
    data = main()
    data = json.dumps(data)
    res = JsonResponse(data, safe=False)
    print(res)
    return res

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        username = data.get('email')
        password = data.get('password')
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User registered successfully'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('email')
        password = data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def check_auth_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_logged_in': True, 'username': request.user.username})
    else:
        return JsonResponse({'is_logged_in': False})

@csrf_exempt
def predict_genre(request):
    # if not request.user.is_authenticated:
    #     return JsonResponse({'error': 'Login needed'}, status=400)
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        print(type(uploaded_file))
        if uploaded_file:
            try:
                signal, sr = librosa.load(uploaded_file.file, sr=SAMPLE_RATE)
            except:
                print("shit")
                pass

            mfcc_data = []

            for s in range(num_segments):
                start_sample = num_samples_per_segment * s
                finish_sample = start_sample + num_samples_per_segment


                mfcc = librosa.feature.mfcc(y=signal[start_sample:finish_sample], n_fft=n_fft, hop_length=hop_length, n_mfcc=n_mfcc, sr=sr)
                mfcc = mfcc.T

                #  store mfccs for segment igf it has expected vector length
                if len(mfcc) == expected_num_mfcc_vectors_per_segment:
                    mfcc_data.append(mfcc.tolist())

            mfcc_data = np.array(mfcc_data)
            y_pred = model_loaded.predict(mfcc_data)

            predictions = {}
            key = None
            for i in y_pred:
                try:
                    predictions[np.argmax(i)]+=1
                    if key==None or predictions[np.argmax(i)]>predictions[key]:
                        key = np.argmax(i)
                except:
                    predictions[np.argmax(i)] = 1

            class_list = ["blues","classical","country","disco","hiphop","jazz","metal","pop","reggae","rock"]
            print(class_list[key])
            return JsonResponse({'message': f'File {uploaded_file.name} uploaded successfully', "genre" : class_list[key]}, status=201)
        else:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

import billboard

def get_top_songs(n=5):
    chart = billboard.ChartData('hot-100')
    top_songs = [{'title': entry.title, 'artist': entry.artist} for entry in chart[:n]]
    return top_songs

class BillboardTopSongsView(View):
    def get(self, request):
        top_songs = get_top_songs()
        return JsonResponse(top_songs, safe=False)