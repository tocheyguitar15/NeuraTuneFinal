import numpy as np
import librosa
import os
import json
import math

SAMPLE_RATE = 22050
DURATION = 30
SAMPLE_PER_TRACK = SAMPLE_RATE * DURATION

DATASET_PATH = "./data/genres_original"
JSON_PATH = "musicDataf.json"


def save_mfcc(dataset_path, json_path, n_mfcc=13, n_fft=2048, hop_length=512, num_segments=5):
    data = {
        "mapping" : [],
        "mfcc" : [],
        "labels" : []
    }
    num_samples_per_segment = int(SAMPLE_PER_TRACK / num_segments)
    expected_num_mfcc_vectors_per_segment = math.ceil(num_samples_per_segment/hop_length)
    #loop through all genres
    for i, (dirpath, dirnames, filenames) in enumerate(os.walk(dataset_path)):
        #ensure we are not at the root level
        if dirpath is not dataset_path:
            #save the sematic
            dirpath_components = dirpath.split("/")
            semantic_label = dirpath_components[-1]
            data['mapping'].append(semantic_label)
            print(f"\nProcessing : {semantic_label}\n")
            
            #process files for a specific genre
            for f in filenames:
                #load audio files
                file_path = os.path.join(dirpath,f)
                try:
                    signal, sr = librosa.load(file_path, sr=SAMPLE_RATE)
                except:
                    pass

                #process segments extracting mfcc and storing data
                for s in range(num_segments):
                    start_sample = num_samples_per_segment * s
                    finish_sample = start_sample + num_samples_per_segment


                    mfcc = librosa.feature.mfcc(y=signal[start_sample:finish_sample], n_fft=n_fft, hop_length=hop_length, n_mfcc=n_mfcc, sr=sr)
                    mfcc = mfcc.T

                    #  store mfccs for segment igf it has expected vector length
                    if len(mfcc) == expected_num_mfcc_vectors_per_segment:
                        data["mfcc"].append(mfcc.tolist())
                        data["labels"].append(i-1)
                        print("{}, segment:{}".format(file_path, s+1))

    with open(json_path, "w") as fp:
        json.dump(data, fp, indent=4)



save_mfcc(DATASET_PATH,JSON_PATH, num_segments=10)
