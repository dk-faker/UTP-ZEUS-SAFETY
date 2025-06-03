# Etapa 1: Compilación de la aplicación Angular
FROM node:22.11.0-alpine AS build
# Establecer el directorio de trabajo
WORKDIR /app
# Copiar el package.json y package-lock.json para instalar las dependencias
COPY package.json ./
# Instalar las dependencias de la aplicación
RUN npm install
# Copiar el código fuente de la aplicación
COPY . .
# ARG for configuration
ARG ENV_TAG=production
# Construir la aplicación Angular
RUN npm run build -- --configuration=$ENV_TAG --extract-licenses=false

# Etapa 2: Configuración del servidor Nginx
FROM nginx:alpine-slim

# Instalar 'envsubst' para sustituir variables de entorno
RUN apk add --no-cache gettext

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# Copiar el archivo nginx.conf como plantilla
COPY nginx.conf /etc/nginx/

# Copiar los archivos compilados de Angular desde la etapa de compilación
COPY --from=build /app/dist/tce-interno-ui /usr/share/nginx/html

EXPOSE 80