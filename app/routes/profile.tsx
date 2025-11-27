import type { Route } from "./+types/home";
import ProfilePage from "~/pages/porfile/ProfilePage";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Perfil - stay cold apparel" },
    { name: "description", content: "Tu perfil y historial de pedidos" },
  ];
}

export default function Profile() {
  return <ProfilePage />;
}