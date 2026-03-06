from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import os
import google.generativeai as genai
from datetime import datetime
import json
import base64
import time
from threading import Lock
from dotenv import load_dotenv
from google.api_core.exceptions import ResourceExhausted, ServiceUnavailable, InternalServerError
from gtts import gTTS
import io

load_dotenv()

# --- RATE LIMITER ---
# Free Tier: 15 RPM = 1 request every 4 seconds. 
# We add a buffer (4.5s) to be safe.
api_lock = Lock()
last_call_time = 0

def enforce_rate_limit():
    global last_call_time
    with api_lock:
        elapsed = time.time() - last_call_time
        if elapsed < 4.5:
            sleep_time = 4.5 - elapsed
            print(f"Rate Limiting: Sleeping for {sleep_time:.2f}s...")
            time.sleep(sleep_time)
        last_call_time = time.time()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# --- CONFIGURATION ---
# from pymongo import MongoClient
# MONGO_URI = "..." 

# API Key Rotation Setup
# API Key Rotation Setup
<<<<<<< HEAD
PAID_KEY = "AIzaSyAWL-Pq0ynT2vKRVPg1VAJNATXgG_rRGJI"
=======

>>>>>>> 9450e49ce15415338696c24ef8048c027d0db1af

API_KEYS = [PAID_KEY]

if not API_KEYS:
    # Fallback to hardcoded if env is empty (for safety)
    API_KEYS = [PAID_KEY]

current_key_index = 0

def get_current_api_key():
    return API_KEYS[current_key_index]

def enforce_rate_limit():
    global last_call_time
    
    # SKIP LIMIT FOR PAID KEY
    if get_current_api_key() == PAID_KEY:
        print("🚀 Using Paid Key - Skipping Rate Limit")
        return

    with api_lock:
        elapsed = time.time() - last_call_time
        if elapsed < 4.5:
            sleep_time = 4.5 - elapsed
            print(f"Rate Limiting: Sleeping for {sleep_time:.2f}s...")
            time.sleep(sleep_time)
        last_call_time = time.time()

def rotate_api_key():
    global current_key_index
    current_key_index = (current_key_index + 1) % len(API_KEYS)
    new_key = get_current_api_key()
    print(f"🔄 Switching API Key to index {current_key_index}...")
    genai.configure(api_key=new_key)
    return new_key

# Configure Initial Gemini with validation
print(f"🔑 Initializing Gemini with {len(API_KEYS)} keys...")
model_name = 'gemini-1.5-flash'
available_models = []

for i in range(len(API_KEYS)):
    try:
        current_key = get_current_api_key()
        genai.configure(api_key=current_key)
        # Verify key by listing models
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"✅ API Key {current_key_index} is active and verified.")
        break
    except Exception as e:
        print(f"⚠️ API Key {current_key_index} failed validation: {e}")
        if i < len(API_KEYS) - 1:
            rotate_api_key()
        else:
            print("🚨 CRITICAL: All provided API keys failed validation.")

if available_models:
    flash_models = [m for m in available_models if 'gemini-1.5-flash' in m]
    pro_models = [m for m in available_models if 'gemini-1.5-pro' in m]

    if pro_models:
        model_name = pro_models[0]
    elif flash_models:
        model_name = flash_models[0]
    else:
        model_name = available_models[0]
        print(f"Using alternate model: {model_name}")

model = genai.GenerativeModel(model_name)
print(f"🚀 Using Model: {model_name}")

# --- IN-MEMORY DATA STORAGE ---
# Data persists only while server is running
USERS = []
CATTLE = []
MILK_PRODUCTION = []
HEALTH_LOGS = []

def init_db():
    global CATTLE, MILK_PRODUCTION, HEALTH_LOGS
    
    # Seed Data if empty
    if not CATTLE:
        CATTLE = [
            {"tag_id": "C001", "name": "Gauri", "breed": "Jersey", "health_score": 92, "last_checkup": "2023-10-26"},
            {"tag_id": "C002", "name": "Nandini", "breed": "Holstein", "health_score": 88, "last_checkup": "2023-10-25"},
            {"tag_id": "C003", "name": "Bhim", "breed": "Murrah", "health_score": 95, "last_checkup": "2023-10-27"}
        ]
        
        MILK_PRODUCTION = [
            {"date": "2023-10-20", "liters": 45.2},
            {"date": "2023-10-21", "liters": 46.5},
            {"date": "2023-10-22", "liters": 44.8},
            {"date": "2023-10-23", "liters": 47.0},
            {"date": datetime.now().strftime("%Y-%m-%d"), "liters": 48.5}
        ]
        print("In-Memory Database Initialized with Seed Data.")
    else:
        print("Database already contains data.")

# Initialize on start
init_db()

import random

# --- HELPER FUNCTIONS ---

# Simple Rate Limiter (Token Bucket -ish)
# Gemini Free tier ~ 15 RPM. We'll be conservative.
LAST_CALL_TIME = 0
MIN_INTERVAL = 4.0 # 4 seconds between calls = 15 RPM max

def enforce_rate_limit():
    global LAST_CALL_TIME
    
    # SKIP LIMIT FOR PAID KEY (Access global from main scope via helper or check key directly)
    # Since we are in the same module, we can check the current key using the function defined above
    if get_current_api_key() == PAID_KEY:
        # print("🚀 Paid Key Active - No Wait")
        return

    elapsed = time.time() - LAST_CALL_TIME
    if elapsed < MIN_INTERVAL:
        wait_time = MIN_INTERVAL - elapsed
        print(f"Rate Limit: Waiting {wait_time:.2f}s...")
        time.sleep(wait_time)
    LAST_CALL_TIME = time.time()

def generate_with_retry(model_obj, prompt, retries=5):
    """
    Robust generation with exponential backoff and jitter for Quota handling.
    """
    base_delay = 5 # Start with 5 seconds
    
    for attempt in range(retries):
        # Enforce local spacing between our own calls
        enforce_rate_limit()
        
        try:
            return model_obj.generate_content(prompt)
        except (ServiceUnavailable, InternalServerError):
            print(f"Gemini Service Error (Attempt {attempt+1}/{retries}). Retrying...")
            time.sleep(2)
        except ResourceExhausted:
            # Exponential Backoff with Jitter
            delay = (base_delay * (2 ** attempt)) + random.uniform(0, 2)
            print(f"⚠️ Quota Exceeded. Rotating Key & Retrying in {delay:.2f}s...")
            
            # Rotate Key on every 429 error
            rotate_api_key()
            
            time.sleep(delay) 
        except Exception as e:
            print(f"Gemini Unexpected Error: {e}")
            if attempt == retries - 1: raise e
            time.sleep(1)
            
    raise Exception("Max retries exceeded for Gemini API - Service Busy")

def chat_send_with_retry(chat_obj, prompt, retries=3):
    """
    Robust chat message sending with exponential backoff and key rotation.
    """
    base_delay = 5
    for attempt in range(retries):
        enforce_rate_limit()
        try:
            return chat_obj.send_message(prompt)
        except (ServiceUnavailable, InternalServerError):
            print(f"Gemini Service Error (Chat Attempt {attempt+1}). Retrying...")
            time.sleep(2)
        except ResourceExhausted:
            delay = (base_delay * (2 ** attempt)) + random.uniform(0, 2)
            print(f"⚠️ Chat Quota Exceeded. Rotating Key & Waiting {delay:.2f}s...")
            rotate_api_key()
            time.sleep(delay)
        except Exception as e:
            print(f"Chat Error: {e}")
            if attempt == retries - 1: raise e
            time.sleep(1)
    raise Exception("Max retries exceeded for Chat API")

def get_zone(state):
    state = state.lower().strip()
    zones = {
        "north": ["jammu and kashmir", "himachal pradesh", "punjab", "haryana", "uttarakhand", "delhi", "uttar pradesh", "chandigarh"],
        "south": ["andhra pradesh", "karnataka", "kerala", "tamil nadu", "telangana", "lakshadweep", "puducherry"],
        "east": ["bihar", "jharkhand", "west bengal", "odisha", "andaman and nicobar islands"],
        "west": ["rajasthan", "gujarat", "maharashtra", "goa", "dadra and nagar haveli and daman and diu"],
        "central": ["madhya pradesh", "chhattisgarh"],
        "northeast": ["arunachal pradesh", "assam", "manipur", "meghalaya", "mizoram", "nagaland", "sikkim", "tripura"]
    }
    for zone, states in zones.items():
        if state in states:
            return zone
    return "unknown"

# --- ROUTES ---

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    try:
        # 1. Total Cattle
        total_cattle = len(CATTLE)

        # 2. Avg Health
        avg_health = 0
        if total_cattle > 0:
            total_score = sum([c.get('health_score', 0) for c in CATTLE])
            avg_health = round(total_score / total_cattle, 1)

        # 3. Milk Yield (Latest)
        # Sort by date descending
        sorted_milk = sorted(MILK_PRODUCTION, key=lambda x: x['date'], reverse=True)
        latest_milk_list = sorted_milk[:7]
        latest_milk_list.reverse() # Chronological for chart
        
        milk_yield = latest_milk_list[-1]['liters'] if latest_milk_list else 0
        
        # Format for Chart
        milk_chart = [{"date": m['date'], "value": m['liters']} for m in latest_milk_list] if latest_milk_list else []

        # 4. Recent Alerts
        sorted_logs = sorted(HEALTH_LOGS, key=lambda x: x['date'], reverse=True)
        recent_logs = sorted_logs[:5]
        alerts = [{"details": f"{l.get('disease', 'Unknown')} detected", "date": l.get('date')} for l in recent_logs]
        health_alerts_count = len(HEALTH_LOGS)

        return jsonify({
            "stats": {
                "total_cattle": total_cattle,
                "avg_health": avg_health,
                "milk_yield": milk_yield,
                "health_alerts": health_alerts_count, 
                "market_rate": 42.50, 
                "weather": "28°C Sunny",
                "active_trades": 3,
                "available_grants": 5,
                "health_risk_level": "Low"
            },
            "infrastructure": { 
                "acres": 12,
                "sheds": 4,
                "feed_stock": 75,
                "water_tank": 90
            },
            "milk_chart": milk_chart,
            "health_history": alerts,
            "nearby_vets": [ # Mocked
                {"name": "Dr. Kumar Vet Clinic", "dist": "2.5 km", "rating": 4.8},
                {"name": "Govt Veterinary Hospital", "dist": "5.0 km", "rating": 4.2},
                {"name": "Animal Care Center", "dist": "8.1 km", "rating": 4.5}
            ]
        })

    except Exception as e:
        print(f"Dashboard Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/scan', methods=['POST'])
def scan_cattle():
    try:
        data = request.json
        image_data = data.get('image', '')
        language = data.get('language', 'en-US')
        
        # New Parameters (V2 Enhancement)
        age = data.get('age', 'Unknown')
        weight = data.get('weight', 'Unknown')
        fever = data.get('fever', False)
        food_intake = data.get('food_intake', 'Normal') 
        history = data.get('history', 'None')
        breed = data.get('breed', 'Unknown')
        location = data.get('location', 'Unknown')
        
        # Extended Vitals
        temperature = data.get('temperature', 'Unknown')
        pregnancy = data.get('pregnancy', 'Unknown')
        water_intake = data.get('water_intake', 'Normal')
        running_nose = data.get('running_nose', False)
        breathing_sound = data.get('breathing_sound', False)
        milk_yield = data.get('milk_yield', 'Unknown')

        print(f"DEBUG: Scan Request - Breed:{breed}, Temp:{temperature}, Milk:{milk_yield}")

        prompt = f"""
        You are an expert veterinary dermatologist and general expert cattle doctor. 
        Analyze this image of a cow along with the provided vital signs and history.
        
        Context:
        - Breed: {breed}
        - Location: {location}
        - Age: {age} years
        - Weight: {weight} kg
        - Milk Yield: {milk_yield} Liters/Day
        
        Clinical Signs:
        - Fever: {"Yes" if fever else "No"}
        - Temperature: {temperature} F
        - Food Intake: {"Reduced/Low" if food_intake else "Normal"}
        - Water Intake: {water_intake} Liters/Day
        - Pregnancy Status: {pregnancy}
        - Running Nose: {"Yes" if running_nose else "No"}
        - Breathing Sounds: {"Yes/Abnormal" if breathing_sound else "Normal"}
        - History: {history}

        CRITICAL DIAGNOSTIC RULES:
        1. **Natural Disorders vs. Diseases**: Carefully distinguish between infectious diseases (risk of contagion) and natural physiological states or environmental stress (e.g., Heat Stress causing panting, Postpartum exhaustion, Nutritional deficiency). Do NOT alarm the user if it's a natural/manageable disorder.
        2. **Young Cattle (Calves < 1 Year)**: 
           - Do NOT compare their weight/milk metrics to Adult standards. 
           - A low weight for a calf is expected; do NOT flag as 'Underweight' unless critical for that specific age.
           - 'Milk Yield' is irrelevant for calves; ignore 0 values.
        
        Identify any potential diseases (Lumpy Skin, FMD, etc.) or health issues.
        Provide a diagnosis and treatment advice in {language}.
        
        IMPORTANT:
        - Explain WHY you classified it as Healthy or Unhealthy in the "basis_of_diagnosis" field.
        - Cite specific visual symptoms or vital signs.
        - START EACH POINT in "advice" and "prevention" with a bullet point symbol (•) for readability.

        Response Format (JSON ONLY):
        {{
            "status": "Healthy" or "Critical" or "Warning",
            "disease_name": "Name of disease or 'None'",
            "confidence": "High/Medium/Low",
            "basis_of_diagnosis": "Clear explanation of why this status was chosen...",
            "advice": "• Step 1...\n• Step 2...",
            "prevention": "• Tip 1...\n• Tip 2..."
        }}
        """

        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        image_bytes = base64.b64decode(image_data)
        image_part = {"mime_type": "image/jpeg", "data": image_bytes}

        response = generate_with_retry(model, [prompt, image_part])
        
        try:
            # Check if blocked
            if not response.parts:
                print(f"Gemini Blocked/Error: {response.prompt_feedback}")
                return jsonify({"error": "AI Safety Block - content flagged"}), 400

            raw_text = response.text
            print(f"DEBUG: Gemini Response: {raw_text}") # Log for debugging

            cleaned_text = raw_text.replace('```json', '').replace('```', '').strip()
            
            try:
                analysis = json.loads(cleaned_text)
            except json.JSONDecodeError:
                # If model returns plain text instead of JSON, use it as advice
                analysis = {
                    "status": "Analyzed",
                    "disease_name": "See Advice",
                    "confidence": "Low",
                    "advice": cleaned_text
                }

        except ValueError as e:
            print(f"Gemini Value Error (Safety?): {e}")
            return jsonify({"error": "AI Safety Filter triggered"}), 400

        if analysis.get('status') != 'Healthy':
            # Log to Memory
            log_entry = {
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "disease": analysis.get('disease_name'),
                "confidence": analysis.get('confidence'),
                "details": json.dumps(analysis)
            }
            HEALTH_LOGS.append(log_entry)

        return jsonify(analysis)

    except ResourceExhausted:
        return jsonify({"error": "AI Service Busy"}), 429
    except Exception as e:
        print(f"Scan Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/advisory', methods=['POST'])
def advisory_chat():
    try:
        data = request.json
        history = data.get('history', [])
        language = data.get('language', 'en-US')
        advisory_type = data.get('type', 'general') # 'general' or 'nutrition'
        
        # Select System Prompt based on Type
        if advisory_type == 'nutrition':
            role_desc = "You are an expert Animal Nutritionist specializing in cattle feed optimization."
            extra_instruction = """
            STEP-BY-STEP PROTOCOL:
            1. If you don't know the following, ASK for them one by one or together:
               - Age of the cow (in months)
               - Breed
               - Food allergies (if any)
            2. Once you have all info: Provide a personalized nutrition plan.
            3. CRITICAL: If the user mentions any food allergies, EXPLICITLY state that those foods are avoided and remove them from the plan.
            4. FORMAT: Always provide a Markdown TABLE for the daily cycle with columns: Morning | Afternoon | Night.
            """
        else:
            role_desc = "You are an expert Veterinary Doctor specializing in general cattle health and management."
            extra_instruction = ""

        system_instruction = f"""
        {role_desc}
        Answer in {language}.
        {extra_instruction}

        CRITICAL INSTRUCTION:
        You are hearing audio from a farm environment. ALWAYS interpret phonetically similar words as cattle terms (e.g., 'sow' -> 'COW', 'bet' -> 'VET').
        
        Keep responses concise suitable for a Voice Assistant, but DO include the markdown table in the text response.
        Focus solely on the user's query regarding {advisory_type} advisory.
        """

        # Construct Chat with System Instruction
        # Note: Gemini 1.5 Flash supports system instructions better via config, but we'll prepend it here for simplicity
        chat_history = []
        
        # Convert frontend history format to Gemini format if needed, or just append instruction
        # Ideally, we should set this as a system instruction if using the new SDK methods, 
        # but for compatibility with previous implementation:
        
        # If history is empty/new, start with system prompt
        current_history_objs = []
        for msg in history[:-1]: # All except last user msg
            current_history_objs.append({
                "role": msg['role'],
                "parts": [msg['content']]
            })
            
        # Add System Instruction context to the latest message or history
        # A simple way for single-turn or multi-turn is to prepend system context to the session
        
        chat = model.start_chat(history=current_history_objs)
        
        # Prepare User Input
        user_input_parts = []
        
        audio_data = data.get('audio')
        if audio_data:
            if 'base64,' in audio_data:
                audio_data = audio_data.split('base64,')[1]
            audio_bytes = base64.b64decode(audio_data)
            audio_part = {"mime_type": "audio/mp3", "data": audio_bytes}
            
            # Explicit instruction to get transcript + response
            user_input_parts.append(audio_part)
            user_input_parts.append("IMPORTANT: First, start your response with 'TRANSCRIPT: <exact text of what user said>'. Then on a new line, provide your advisory response.")
        else:
            if history:
                last_message = history[-1]['content']
                user_input_parts.append(last_message)
            else:
                user_input_parts.append("Hello") # Fallback

        response = chat_send_with_retry(chat, user_input_parts)
        text_response = response.text
        
        # Parse Transcript if present
        user_transcript = None
        final_bot_response = text_response
        
        if "TRANSCRIPT:" in text_response:
            try:
                parts = text_response.split("TRANSCRIPT:", 1)[1].split("\n", 1)
                user_transcript = parts[0].strip()
                if len(parts) > 1:
                    final_bot_response = parts[1].strip()
                else:
                    final_bot_response = "" # Should not happen usually
            except:
                pass # Fallback to full text
        
        return jsonify({
            "success": True, 
            "data": final_bot_response, 
            "user_transcript": user_transcript
        })

    except ResourceExhausted:
        return jsonify({"success": False, "error": "System is busy. Please try again in 10 seconds."}), 429

    except Exception as e:
        print(f"Advisory Error: {e}")
        return jsonify({"error": "I encountered an error. Please try again."}), 500

@app.route('/api/chat', methods=['POST'])
def voice_assistant():
    try:
        data = request.json
        transcript = data.get('transcript', '')
        audio_data = data.get('audio', '')
        language = data.get('language', 'en-US')

        system_instruction = f"""
        Act as an intelligent agricultural voice assistant for Indian farmers.
        Language Code: {language}
        
        CRITICAL INSTRUCTIONS:
        1. **Context Auto-Correction**: You are hearing audio from a farm environment. ALWAYS interpret phonetically similar words as cattle terms.
           - 'sow', 'how', 'now', 'call' -> 'COW'
           - 'bet', 'wet' -> 'VET'
           - 'milk', 'yield' -> 'MILK'
        
        2. **Identify Intent**:
           - **DASHBOARD**: General status, overview.
           - **PRICE**: "Selling", "Trade", "Market Rate", "Value", "Price".
           - **DISEASE**: "Not well", "Sick", "Ill", "Doctor", "Health", "Problem".
           - **ADVISORY**: "What to feed", "Nutrition", "Advice", "How to".

        Response in SAME language.
        Return JSON: {{ "intent": "...", "response_text": "..." }}
        """

        if audio_data:
            if 'base64,' in audio_data:
                audio_data = audio_data.split('base64,')[1]
            audio_bytes = base64.b64decode(audio_data)
            audio_part = {"mime_type": "audio/mp3", "data": audio_bytes}
            response = generate_with_retry(model, [system_instruction, audio_part])
        else:
            response = generate_with_retry(model, f"{system_instruction}\nInput: {transcript}")

        return jsonify(json.loads(response.text.replace('```json', '').replace('```', '').strip()))

    except ResourceExhausted:
        print("Voice Error: Quota Exceeded (handled)")
        return jsonify({"error": "AI Service Busy. Please wait..."}), 429
    except Exception as e:
        print(f"Voice Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"success": False, "error": "Username and password required"}), 400
    
    # Check if user exists in memory
    user_exists = next((u for u in USERS if u['username'] == username), None)
    if user_exists:
        return jsonify({"success": False, "error": "User already exists"}), 400
        
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    USERS.append({"username": username, "password": hashed_password})
    print(f"User registered: {username}") # Debug
    
    return jsonify({"success": True, "message": "User created successfully"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Find user in memory
    user = next((u for u in USERS if u['username'] == username), None)
    
    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({"success": True, "message": "Login successful", "username": username}), 200
    else:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

@app.route('/api/price', methods=['POST'])
def estimate_price():
    try:
        data = request.json
        breed = data.get('breed', 'gir').lower()
        weight = float(data.get('weight', 0) or 0)
        age = float(data.get('age', 0) or 0)
        milk = float(data.get('milk', 0) or 0)
        pregnancy = float(data.get('pregnancy', 0) or 0)
        
        # New Parameters
        location = data.get('location', 'Unknown')
        disease_history = data.get('disease_history', []) # List of strings e.g., ['FMD', 'Mastitis']
        vaccination = data.get('vaccination', 'none') # 'fully', 'partially', 'none'
        lactation_cycle = int(data.get('lactation_cycle', 1) or 1)
        
        zone = get_zone(location)

        # Base Price Calculation Logic
        base_rate = 150 # per kg
        
        # Breed Premiums
        if breed in ['gir', 'sahiwal', 'redsindhi']: base_rate = 200 
        if breed in ['murrah']: base_rate = 220
        
        # Zone-based Breed Affinity (Native breeds get better verification/value locally)
        # e.g., Gir is from Gujarat (West), Murrah from Haryana/Punjab (North)
        if zone == 'west' and breed == 'gir': base_rate += 20
        if zone == 'north' and breed == 'murrah': base_rate += 30
        if zone == 'south' and breed == 'ongole': base_rate += 20

        weight_value = weight * base_rate
        milk_bonus = milk * 2500 # Premium per liter yield capability
        pregnancy_bonus = pregnancy * 3000
        
        # Lactation Cycle Value Curve
        # 1: Good, 2-4: Peak, 5+: Declining
        lactation_factor = 1.0
        if 2 <= lactation_cycle <= 4:
            lactation_factor = 1.15 # Peak performance bonus
            weight_value *= 1.05 # Healthy mature cow
        elif lactation_cycle > 5:
            lactation_factor = 0.85
            
        milk_bonus *= lactation_factor

        # Health & History Penalties/Bonuses
        health_penalty = 0
        if disease_history:
            # Simple penalty logic: ~5-10% value drop per major disease history depending on severity
            # We mock severity: FMD/Brucellosis are high impact
            for disease in disease_history:
                d = disease.lower()
                if 'fmd' in d or 'brucellosis' in d:
                    health_penalty += (weight_value * 0.15)
                elif 'mastitis' in d:
                    health_penalty += (weight_value * 0.10)
                else:
                    health_penalty += (weight_value * 0.05)
        
        vaccination_bonus = 0
        if vaccination == 'fully':
            vaccination_bonus = 5000
        elif vaccination == 'partially':
            vaccination_bonus = 2000

        # Age Depreciation
        age_penalty = 0
        if age > 60:
            age_penalty = (age - 60) * 500

        estimated_price = (weight_value + milk_bonus + pregnancy_bonus + vaccination_bonus) - (age_penalty + health_penalty)
        if estimated_price < 0: estimated_price = 0
        
        # AI Analysis Construction
        ai_analysis = f"• Valuation based on market rates in the {zone.title()} Zone.\n"
        if zone != 'unknown':
            ai_analysis += f"• Demand for {breed.title()} in {location} is {'high' if base_rate > 150 else 'moderate'}.\n"
        
        if vaccination == 'fully':
            ai_analysis += "• Full vaccination record significantly boosts buyer confidence.\n"
        elif vaccination == 'none':
            ai_analysis += "• Lack of vaccination record is a major risk factor impacting value.\n"
            
        if disease_history:
            ai_analysis += f"• Historical issues ({', '.join(disease_history)}) have been factored in as risk depreciation.\n"
        
        if 2 <= lactation_cycle <= 4:
            ai_analysis += "• Animal is in prime lactation cycle, ensuring peak productivity.\n"

        response_data = {
            "success": True,
            "estimated_price": round(estimated_price),
            "breakdown": {
                "weight_value": round(weight_value),
                "milk_bonus": round(milk_bonus),
                "pregnancy_bonus": round(pregnancy_bonus),
                "vaccination_bonus": round(vaccination_bonus),
                "age_penalty": round(age_penalty),
                "health_penalty": round(health_penalty)
            },
            "ai_analysis": ai_analysis,
            "forecast": {
                "labels": ["Today", "1 Month", "3 Months", "6 Months"],
                "data": [
                    estimated_price, 
                    estimated_price * 1.02, 
                    estimated_price * 1.05, 
                    estimated_price * 1.08
                ]
            }
        }
        return jsonify(response_data)

    except Exception as e:
        print(f"Price Est Error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.json
        text = data.get('text', '')
        language = data.get('language', 'en-US')

        # Map 'en-US' etc to gTTS codes
        lang_map = {
            'en-US': 'en',
            'hi-IN': 'hi',
            'te-IN': 'te',
            'ta-IN': 'ta',
            'ml-IN': 'ml',
            'kn-IN': 'kn'
        }
        gtts_lang = lang_map.get(language, 'en')

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Generate audio in memory
        tts = gTTS(text=text, lang=gtts_lang, slow=False)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        
        audio_base64 = base64.b64encode(fp.read()).decode('utf-8')
        
        return jsonify({
            "success": True,
            "audio": f"data:audio/mp3;base64,{audio_base64}"
        })

    except Exception as e:
        print(f"TTS Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
