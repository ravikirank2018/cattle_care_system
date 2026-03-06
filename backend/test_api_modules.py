import requests
import json
import base64

BASE_URL = "http://127.0.0.1:5000/api"

def log(msg, passed=True):
    status = "[PASS]" if passed else "[FAIL]"
    print(f"{status} {msg}")

def test_dashboard():
    try:
        r = requests.get(f"{BASE_URL}/dashboard")
        if r.status_code == 200:
            data = r.json()
            if "total_cattle" in data:
                log(f"Dashboard Stats: {data}")
            else:
                log("Dashboard response missing keys", False)
        else:
            log(f"Dashboard Endpoint failed: {r.status_code}", False)
    except Exception as e:
        log(f"Dashboard Exception: {e}", False)

def test_smart_trade():
    try:
        payload = {
            "breed": "Jersey",
            "age": 48,
            "weight": 400,
            "milk_yield": 15,
            "pregnancy_month": 3,
            "state": "Karnataka"
        }
        r = requests.post(f"{BASE_URL}/estimate-price", json=payload)
        if r.status_code == 200:
            data = r.json()
            if "estimated_price" in data:
                log(f"Smart Trade Price: {data['estimated_price']}")
            else:
                log("Smart Trade missing price", False)
        else:
            log(f"Smart Trade failed: {r.status_code} - {r.text}", False)
    except Exception as e:
        log(f"Smart Trade Exception: {e}", False)

def test_advisory_chat():
    try:
        payload = {"message": "Cow is not eating properly"}
        r = requests.post(f"{BASE_URL}/chat", json=payload)
        if r.status_code == 200:
            data = r.json()
            if "reply" in data:
                log(f"Advisory Reply (truncated): {data['reply'][:50]}...")
            else:
                log("Advisory missing reply", False)
        else:
            log(f"Advisory Chat failed: {r.status_code} - {r.text}", False)
    except Exception as e:
        log(f"Advisory Exception: {e}", False)

if __name__ == "__main__":
    print("--- STARTING MODULE TESTS ---")
    test_dashboard()
    test_smart_trade()
    test_advisory_chat()
    print("--- MODULE TESTS COMPLETED ---")
