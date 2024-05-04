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

# Démarrez l'application
CMD ["npm", "start"]
