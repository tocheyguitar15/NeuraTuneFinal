import os
import re
import pandas as pd
import billboard
import lyricsgenius
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
import tensorflow as tf
from collections import Counter
import json

# Precompile regular expressions for efficiency
re_annotations = re.compile(r'\[.*?\]')
re_newlines = re.compile(r'\n')
re_punctuation = re.compile(r'\W+')

def preprocess_lyrics(lyrics):
    lyrics = re_annotations.sub('', lyrics)  # Remove [Verse], [Chorus], etc.
    lyrics = re_newlines.sub(' ', lyrics)  # Replace newlines with spaces
    lyrics = re_punctuation.sub(' ', lyrics)  # Remove punctuation
    lyrics = lyrics.lower()  # Convert to lowercase
    return lyrics

def fetch_billboard_top_100():
    chart = billboard.ChartData('hot-100')
    return [(entry.title, entry.artist) for entry in chart]

def fetch_lyrics(genius, songs):
    lyrics_data = pd.DataFrame(columns=['Title', 'Artist', 'Cleaned_Lyrics'])
    for title, artist in songs:
        try:
            song = genius.search_song(title, artist)
            if song:
                cleaned_lyrics = preprocess_lyrics(song.lyrics)
                current_song_data = pd.DataFrame([{'Title': title, 'Artist': artist, 'Cleaned_Lyrics': cleaned_lyrics}])
                lyrics_data = pd.concat([lyrics_data, current_song_data], ignore_index=True)
        except Exception as e:
            print(f"Error fetching lyrics for {title} by {artist}: {e}")
    return lyrics_data

def analyze_emotions(model, tokenizer, lyrics_data, batch_size=10):
    labels = [
        "love", "breakup", "party", "ambition", "nostalgia", "heartbreak",
        "friendship", "betrayal", "happiness", "sadness", "hope", "anger",
        "revenge", "loneliness", "celebration", "motivation", "reflection", "peace"
    ]
    emotions_data = pd.DataFrame(columns=['Title', 'Artist'] + labels)
    
    for i in range(0, len(lyrics_data), batch_size):
        batch_lyrics_data = lyrics_data.iloc[i:i+batch_size]
        batch_lyrics = batch_lyrics_data['Cleaned_Lyrics'].tolist()
        batch_inputs = tokenizer(batch_lyrics, return_tensors="tf", truncation=True, padding=True, max_length=512)
        batch_outputs = model(**batch_inputs)
        batch_predictions = tf.nn.softmax(batch_outputs.logits, axis=-1).numpy()
        
        batch_emotions = []
        for j, row in batch_lyrics_data.iterrows():
            emotion_scores = dict(zip(labels, batch_predictions[j - i]))
            batch_emotions.append({'Title': row['Title'], 'Artist': row['Artist'], **emotion_scores})
        
        emotions_data = pd.concat([emotions_data, pd.DataFrame(batch_emotions)], ignore_index=True)
    
    return emotions_data

def save_analysis(emotions_data, output_file="emotions_data.json"):
    emotion_counts = Counter()
    labels = emotions_data.columns[2:]
    for _, row in emotions_data.iterrows():
        for key in labels:
            emotion_counts[key] += row[key]
    top_themes = emotion_counts.most_common(5)
    results = [{"theme": theme, "score": score} for theme, score in top_themes]
    with open(output_file, "w") as f:
        json.dump(results, f)
    return results

def main():
    GENIUS_API_TOKEN = 'W6x6-V968_tLlhouQdWk1wSujcCZWm-_oMpnFTybSnq2GHizOALPxeSk-g40ivQ6'
    genius = lyricsgenius.Genius(GENIUS_API_TOKEN)
    
    model_name = "j-hartmann/emotion-english-distilroberta-base"
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    top_songs = fetch_billboard_top_100()
    lyrics_data = fetch_lyrics(genius, top_songs)
    lyrics_data.to_csv("songs.csv", index=False)
    
    emotions_data = analyze_emotions(model, tokenizer, lyrics_data)
    emotions_data.to_csv("emotions_data.csv", index=False)
    
    results = save_analysis(emotions_data)
    
    print(type(results))
    print("Top 5 Themes in Top 100 Billboard Songs:", results)
    return results

if __name__ == "__main__":
    main()
