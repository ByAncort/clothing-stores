# Stay Cold Apparel - E-commerce de Streetwear

Aplicación de comercio electrónico moderna para ropa streetwear, construida con React Router 7 y Tailwind CSS.

## 🚀 Características

- **Catálogo de productos** con visualización de imágenes primarias y secundarias al hover
- **Sistema de carrito de compras** persistente
- **Página de contacto** con formulario funcional
- **Hero section** con video de fondo
- **Diseño responsive** optimizado para móviles y desktop
- **Animaciones fluidas** con scroll-snap y transiciones CSS
- **Navegación intuitiva** con React Router
- **Tipado seguro** con TypeScript

## 📋 Requisitos Previos

- Node.js 20.x o superior
- npm (incluido con Node.js)
- Git
- Docker (opcional, para despliegue con contenedores)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ByAncort/clothing-stores.git
cd clothing-stores
```

2. Instala las dependencias:
```bash
npm ci
```

## 💻 Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🐳 Docker

### Construir la imagen
```bash
docker build -t eccomerce-landing-page .
```

### Ejecutar el contenedor
```bash
docker run -p 3000:3000 eccomerce-landing-page
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Construcción para Producción

```bash
npm run build
npm run start
```

## 🛠️ Stack Tecnológico

- **Frontend**: React 19.1.0
- **Routing**: React Router 7.5.3
- **Estilos**: Tailwind CSS 4.1.11
- **Build Tool**: Vite 6.3.3
- **Lenguaje**: TypeScript 5.8.3
- **Animaciones**: Motion 12.23.0
- **Iconos**: Lucide React
- **Contenedores**: Docker

## 📁 Estructura del Proyecto

```
clothing-stores/
├── app/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── hooks/         # Custom hooks
│   ├── services/      # Lógica de negocio
│   └── types/         # Definiciones TypeScript
├── public/            # Archivos estáticos
└── .github/           # CI/CD workflows
```

## 🚢 CI/CD

El proyecto incluye un pipeline automatizado con GitHub Actions que ejecuta:

- Tests con cobertura
- Análisis de seguridad (Snyk, SonarQube)
- Build de Docker
- Deploy automático en rama main

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run typecheck` | Verificación de tipos TypeScript |
| `docker build -t eccomerce-landing-page .` | Construir imagen Docker |
| `docker run -p 3000:3000 eccomerce-landing-page` | Ejecutar contenedor |

## 🐛 Troubleshooting

### Problemas comunes

**Error de puertos:**
Si el puerto 3000 está ocupado, usa otro puerto:
```bash
docker run -p 8080:3000 eccomerce-landing-page
```

**Problemas de permisos con Docker:**
En Linux, asegúrate de que tu usuario esté en el grupo docker:
```bash
sudo usermod -aG docker $USER
```

