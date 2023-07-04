
    FROM node:16

    RUN mkdir app
    # Establecer el directorio de trabajo dentro del contenedor
    WORKDIR /app

    # Copiar el package.json y el package-lock.json a la imagen del contenedor
    COPY package*.json ./

    # Instalar las dependencias del proyecto
    RUN npm install

    # Copiar todos los archivos de la aplicación al directorio de trabajo
    COPY . /app

    # Construir la aplicación de React
    RUN npm run build

    # Especificar el comando de inicio para el contenedor
    CMD ["npm", "start"]
