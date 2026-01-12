import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("Error: No API Key found in env")
    exit(1)

genai.configure(api_key=api_key)

try:
    print("Attempting to list models...")
    available_models = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            available_models.append(m.name)

    if not available_models:
        print("Error: No models found with 'generateContent' support.")
        exit(1)

    model_name = available_models[0]
    print(f"\nAttempting to generate content with '{model_name}'...")
    model = genai.GenerativeModel(model_name)
    response = model.generate_content("Hello, can you hear me?")
    print(f"Success! Response: {response.text}")

except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"\nAPI Connection Failed: {e}")
