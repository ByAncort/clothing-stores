// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // CAMBIO AQUÍ: De ":category" a ":categoryName"
  route("catalog/:categoryName?", "routes/catalog.tsx"), 
  route("contacto", "routes/contacto.tsx"),
  route("login", "routes/login.tsx"),
  route("admin", "routes/AdminRoutes.tsx"),
  route("profile", "routes/profile.tsx"),
  route("admin/providers", "routes/admin/providers.tsx"),
] satisfies RouteConfig;