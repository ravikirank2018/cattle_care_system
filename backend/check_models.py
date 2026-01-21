import google.generativeai as genai
import os

API_KEY = "AIzaSyB2ERcfpDLd6c5pbze69EQnkiyX8GUe97s"
genai.configure(api_key=API_KEY)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Model: {m.name}")
except Exception as e:
    print(f"Error: {e}")
