import Catalog from "~/pages/catalog/catalog";
import type { Route } from "./+types/home";
import Contacto from "~/pages/contacto/contacto";
import Login from "~/pages/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Login/>;
}