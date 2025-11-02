// app/root.tsx - VERSIÓN CORRECTA PARA REACT ROUTER v7
import { Links, Meta, Outlet, Scripts } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Header from "~/component/Header";
import Footer from "~/component/Footer";

export const links: Route.LinksFunction = () => [
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

export const meta: Route.MetaFunction = () => {
  return [
    { title: "stay cold apparel" },
    { name: "description", content: "Tienda de ropa premium" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function App() {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
          <div className="snap-center">
            <Header />
          </div>

          {/* Contenido de las rutas hijas */}
          <Outlet />

          <div className="snap-center">
            <Footer />
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}