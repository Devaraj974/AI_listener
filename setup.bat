@echo off
echo ============================================
echo   AI Listener - Setup Script
echo ============================================
echo.

echo [1/3] Installing backend dependencies...
cd /d "%~dp0backend"
pip install -r requirements.txt
echo.

echo [2/3] Installing frontend dependencies...
cd /d "%~dp0frontend"
call npm install
echo.

echo [3/3] Setup complete!
echo.
echo Run start.bat to launch the application.
echo.
pause
