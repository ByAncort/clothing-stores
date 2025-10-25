// app/routes.ts - VERSIÓN CORRECTA
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("catalog/:category?", "routes/catalog.tsx"),
  route("contacto", "routes/contacto.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;