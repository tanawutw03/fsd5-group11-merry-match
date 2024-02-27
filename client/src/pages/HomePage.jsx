import NonUserHomePage from "./NonUserHomePage";
import { useUser } from "../app/userContext.js";
import { useEffect } from "react";

function HomePage() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  return (
    <NonUserHomePage
      user={user}
      setUser={setUser}
      avatarUrl={avatarUrl}
      setAvatarUrl={setAvatarUrl}
    />
  );
}

export default HomePage;
