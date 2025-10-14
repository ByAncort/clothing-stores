import Catalog from "../pages/catalog/catalog";
import * as Route from "react-router";
import Contacto from "~/pages/contacto/contacto";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Contacto/>;
}
