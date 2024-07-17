# Utilisez une image de Node.js en tant qu'image de base
FROM node:latest

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json (le cas échéant) pour installer les dépendances
COPY package*.json ./

# Installez les dépendances du projet
RUN npm run build

# Copiez le reste des fichiers de l'application
COPY . .

# Copiez le fichier .env
COPY .env .env

# Téléchargez et installez ngrok
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz && \
    tar -xvzf ngrok-v3-stable-linux-amd64.tgz && \
    mv ngrok /usr/local/bin/ngrok

# Configurez ngrok avec le token
RUN ngrok config add-authtoken $(grep NGROK_AUTHTOKEN .env | cut -d '=' -f2)    

CMD ["sh", "-c", "ngrok http --domain=promptly-fast-hedgehog.ngrok-free.app 3000 & npm start"]
