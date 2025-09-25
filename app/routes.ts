import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("catalog/:category?", "routes/catalog.tsx")
] satisfies RouteConfig;