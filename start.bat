@echo off
echo ============================================
echo   AI Listener - Emotional Support Platform
echo ============================================
echo.

echo [1/2] Starting Backend (FastAPI on port 8000)...
cd /d "%~dp0backend"
start "AI Listener Backend" cmd /k "python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting Frontend (Vite on port 5173)...
cd /d "%~dp0frontend"
start "AI Listener Frontend" cmd /k "npx vite --host 127.0.0.1"

echo.
echo Both servers are starting...
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
pause
