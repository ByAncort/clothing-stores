import type { Route } from "./+types/home";
import Login from "~/pages/login/login";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "stay cold apparel" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Login/>;
}