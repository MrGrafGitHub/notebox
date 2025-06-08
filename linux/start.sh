#!/bin/bash

# Активируем виртуальное окружение бекенда
source backend/venv/bin/activate

# Запускаем Flask в фоне
python backend/app.py &

# Запускаем фронтенд
cd frontend
npm run dev
