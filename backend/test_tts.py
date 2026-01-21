import requests

try:
    # First check if server is up
    try:
        r = requests.get("http://127.0.0.1:5000/api/dashboard")
        print(f"Dashboard Check: {r.status_code}")
    except:
        print("Server seems down/unreachable")

    url = "http://127.0.0.1:5000/api/tts"
    payload = {
        "text": "ನಮಸ್ಕಾರ, ಇದು ಪರೀಕ್ಷೆ", 
        "language": "kn-IN"
    }
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        with open("test_kannada.mp3", "wb") as f:
            f.write(response.content)
        print("SUCCESS: Audio saved to test_kannada.mp3")
    else:
        print(f"FAILED: Status {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"ERROR: {e}")
