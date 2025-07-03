# Backend UTP-ZEUS-SAFETY

Este es un backend básico en Node.js + Express para servir datos de clientes desde una base de datos MySQL.

## Requisitos
- Node.js >= 14
- MySQL

## Instalación

1. Entra a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración de la base de datos

1. Crea una base de datos en MySQL y una tabla `clientes` con los siguientes campos:
   ```sql
   CREATE TABLE clientes (
     id INT PRIMARY KEY AUTO_INCREMENT,
     nombre VARCHAR(100) NOT NULL,
     tipo_cliente VARCHAR(50) NOT NULL,
     ruc VARCHAR(11) NOT NULL,
     telefono VARCHAR(20) NOT NULL,
     lugar VARCHAR(100) NOT NULL
   );
   ```
2. Inserta algunos datos de prueba si lo deseas.
3. Edita el archivo `index.js` y coloca tus credenciales de MySQL:
   - `user`, `password`, `database`

## Ejecución

- Para desarrollo (con recarga automática):
  ```bash
  npm run dev
  ```
- Para producción:
  ```bash
  npm start
  ```

El backend escuchará por defecto en `http://localhost:3001`.

## Endpoint disponible
- `GET /api/clientes` — Devuelve todos los clientes.

---

¿Dudas? ¡Avísame! 