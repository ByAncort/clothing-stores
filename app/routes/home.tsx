import * as Route from "react-router";
import { Welcome } from "../pages/welcome/welcome";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "stay cold apparel" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
