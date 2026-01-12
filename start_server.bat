@echo off
echo ==========================================
echo   Starting Cattle Care System Server...
echo ==========================================
echo.
echo Opening browser at http://localhost:8000...
start http://localhost:8000
echo.
echo Server is running. Close this window to stop.
python -m http.server 8000
pause
