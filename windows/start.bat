@echo off
REM Запуск backend
start cmd /k "cd backend && venv\Scripts\activate && python app.py"

REM Запуск frontend
cd frontend
npm run dev