FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instale o redis-tools para testar a conexão Redis com o redis-cli
RUN apt-get update && apt-get install -y redis-tools netcat-openbsd

COPY . . 
RUN npm run build
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "start"]
