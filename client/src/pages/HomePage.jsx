import NonUserHomePage from "./NonUserHomePage";
import { useUser } from "../app/userContext.js";
import { useEffect } from "react";

function HomePage() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useUser();

  useEffect(() => {
    console.log(`avtarUrl in HomePage `, avatarUrl);
  }, [avatarUrl]);

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
