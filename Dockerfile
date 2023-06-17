# Utilizar una imagen base con Python 3.9
FROM python:3.10

RUN mkdir app

WORKDIR /app

# Copiar los archivos de requerimientos al contenedor

RUN pip install --upgrade pip  

# Instalar las dependencias del proyecto
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el contenido del backend al directorio de trabajo
COPY . /app

# Exponer el puerto en el que se ejecuta el servidor de Django (por defecto, el puerto 8000)
EXPOSE 8000

# Ejecutar los comandos necesarios para migraciones y arrancar el servidor
CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000