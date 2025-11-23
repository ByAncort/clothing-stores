import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import type { LinksFunction } from "react-router";

import "./app.css";
import { CartProvider } from "~/hooks/useCart";
import Header from "~/component/Header";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* MEJORA: Agregamos bg-black y text-white como base para toda la app */}
      <body className="h-full bg-black text-white antialiased selection:bg-indigo-500 selection:text-white">
        
        <CartProvider>
            {/* El Header siempre visible arriba */}
            <Header /> 
            
            {/* MEJORA: Envolvemos el contenido en <main> para control de layout */}
            <main className="relative flex flex-col min-h-screen pt-16"> 
              {children}
            </main>
        </CartProvider>
        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// MEJORA EXTRA: Manejo de errores global (Pantalla de la muerte bonita)
export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Ocurrió un error inesperado";
  let details = "Por favor intenta recargar la página.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Página no encontrada" : "Error " + error.status;
    details = error.statusText || details;
  }

  return (
    <html lang="es" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-500">{message}</h1>
          <p className="text-gray-400 text-lg">{details}</p>
          <a href="/" className="inline-block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Volver al inicio
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}