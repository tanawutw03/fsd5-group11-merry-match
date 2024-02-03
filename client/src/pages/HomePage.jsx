import NonUserHomePage from "./NonUserHomePage";
import { useUser } from "../app/userContext.js";
import { useEffect } from "react";

function HomePage() {
  const { user, avatarUrl } = useUser();

  useEffect(() => {
    console.log(`avatar from homepage `, avatarUrl);
  }, [avatarUrl]);

  return <NonUserHomePage user={user} avatarUrl={avatarUrl} />;
}

export default HomePage;
