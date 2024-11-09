# BD2-Proyecto


Este proyecto es un monorepositorio que contiene tanto el frontend como el backend para una aplicación desarrollada en React con TypeScript y Express con TypeScript.

## Estructura del proyecto

La estructura de carpetas del proyecto es la siguiente:

```bash 
bd2-proyecto/
├── packages/
│   ├── backend/
│   └── frontend/
```

- **`packages/backend`**: Contiene el código del servidor, desarrollado con Express y TypeScript.
- **`packages/frontend`**: Contiene el código del cliente, desarrollado con React y TypeScript.

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu_usuario/bd2-proyecto.git
```

2. Instala las dependencias en el directorio raíz:

Pudes instarlo desde la carpeta raiz

```bash
npm install
```

O ir instalarlos invidualmente 

```bash 
cd ./packages/backend
npm install
```

```bash 
cd ./packages/frontend
npm install
```


## Scripts

El archivo `package.json` en el directorio raíz contiene varios scripts para facilitar el desarrollo:

- **`npm run dev:backend`**: Inicia el servidor del backend en modo de desarrollo.
- **`npm run dev:frontend`**: Inicia el frontend en modo de desarrollo.
- **`npm run dev`**: Ejecuta ambos servidores (frontend y backend) en modo de desarrollo de forma simultánea, utilizando el paquete `concurrently`.

### Scripts de paquetes específicos

