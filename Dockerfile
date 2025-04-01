FROM node:18-bullseye

# Устанавливаем sqlite3
RUN apt-get update && apt-get install -y sqlite3

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы
COPY . .

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["npm", "start"]
