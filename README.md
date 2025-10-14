# Stay Cold Apparel - E-commerce de Streetwear

Aplicación de comercio electrónico moderna especializada en ropa streetwear, desarrollada con React Router 7 y Tailwind CSS.

## Características Principales

- **Catálogo de productos** con visualización dinámica de imágenes primarias y secundarias
- **Sistema de carrito de compras** con persistencia de datos
- **Página de contacto** con formulario completamente funcional
- **Hero section** con video de fondo optimizado
- **Diseño responsive** adaptado para dispositivos móviles y desktop
- **Animaciones fluidas** implementadas con scroll-snap y transiciones CSS
- **Navegación intuitiva** mediante React Router
- **Tipado seguro** con TypeScript 

## Requisitos del Sistema

- Node.js 20.x o superior
- npm (incluido con Node.js)
- Git
- Docker (opcional, para despliegue con contenedores)

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/ByAncort/clothing-stores.git
cd clothing-stores
```

2. Instalar dependencias:
```bash
npm ci
```

## Desarrollo

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Despliegue con Docker

### Construcción de la imagen
```bash
docker build -t eccomerce-landing-page .
```

### Ejecución del contenedor
```bash
docker run -p 3000:3000 eccomerce-landing-page
```

La aplicación estará disponible en `http://localhost:3000`

## Construcción para Producción

```bash
npm run build
npm run start
```

## Stack Tecnológico

- **Frontend**: React 19.1.0
- **Routing**: React Router 7.5.3
- **Estilos**: Tailwind CSS 4.1.11
- **Build Tool**: Vite 6.3.3
- **Lenguaje**: TypeScript 5.8.3
- **Animaciones**: Motion 12.23.0
- **Iconos**: Lucide React
- **Contenedores**: Docker

## Estructura del Proyecto

```
clothing-stores/
├── app/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── hooks/         # Custom hooks
│   ├── services/      # Lógica de negocio
│   └── types/         # Definiciones TypeScript
├── public/            # Archivos estáticos
└── .github/           # Configuración CI/CD
```

## Integración Continua y Despliegue

El proyecto implementa un pipeline automatizado mediante GitHub Actions que ejecuta:

- Ejecución de tests con análisis de cobertura
- Escaneo de seguridad (Snyk, SonarQube)
- Construcción de imagen Docker
- Despliegue automático en rama principal

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye versión de producción |
| `npm run start` | Inicia servidor de producción |
| `npm run typecheck` | Verificación de tipos TypeScript |
| `docker build -t eccomerce-landing-page .` | Construye imagen Docker |
| `docker run -p 3000:3000 eccomerce-landing-page` | Ejecuta contenedor |

## Resolución de Problemas

### Situaciones Comunes

**Conflicto de puertos:**
Si el puerto 3000 se encuentra ocupado, utilizar puerto alternativo:
```bash
docker run -p 8080:3000 eccomerce-landing-page
```

**Problemas de permisos en Docker:**
En sistemas Linux, verificar que el usuario pertenezca al grupo docker:
```bash
sudo usermod -aG docker $USER
```

**Prueba de Docker Compose (Entorno Staging Simulado)**

```bash
# Crear y ejecutar entorno de staging
docker-compose -f docker-compose.staging.yml up --build

# Verificar estado de servicios en terminal separada
docker-compose -f docker-compose.staging.yml ps

# Validar health check
curl http://localhost:3000
```

## Pipeline de Calidad y Seguridad

### Fases del Pipeline:

1. **Análisis de Código** - Tests unitarios, cobertura y verificación de estilo
2. **Escaneo de Seguridad** - Auditoría de dependencias y vulnerabilidades
3. **Construcción Docker** - Build optimizado con arquitectura multi-stage
4. **Despliegue Staging** - Entorno simulado con Docker Compose
5. **Despliegue Producción** - Kubernetes con verificaciones de salud

### Estándares de Calidad:

- **Trazabilidad**: Cada commit genera una construcción versionada
- **Seguridad**: Escaneo automático con Trivy y npm audit
- **Testing**: Cobertura mínima requerida del 80%
- **Health Checks**: Monitoreo continuo en producción

### Criterios de Bloqueo:

El pipeline bloqueará automáticamente si se detecta:
- Vulnerabilidades de seguridad CRITICAL/HIGH
- Cobertura de tests inferior al 80%
- Fallos en tests de integración

