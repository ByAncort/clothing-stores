// src/pages/profile.tsx  (o donde tengas tu ruta)
import ProfileComponent from "~/component/Porfile/PorfileComponent";
import { useProfile } from "~/hooks/useProfile";

export default function ProfilePage() {
  const profile = useProfile();

  return (
    <ProfileComponent {...profile} />
  );
}
