import * as Route from "react-router";
import Contacto from "~/pages/contacto/contacto";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "stay cold apparel" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Contacto/>;
}
