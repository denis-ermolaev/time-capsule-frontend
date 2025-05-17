#!/bin/bash

# Перейти в целевую директорию
cd /d/Sync/Python/time-capsule-django || { echo "Directory not found"; exit 1; }

# Активировать виртуальную среду
source .venv/Scripts/activate || { echo "Failed to activate virtual environment"; exit 1; }

# Запустить jupyter lab в фоне с сохранением вывода
python manage.py runserver