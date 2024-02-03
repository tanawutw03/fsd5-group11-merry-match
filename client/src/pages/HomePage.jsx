// import { useState } from "react";
import NonUserHomePage from "./NonUserHomePage";
import { useUser } from "../app/userContext";

function HomePage() {
  // const [user, setUser] = useState(null);
  const { user } = useUser();
  console.log(`user passed to homepage`, user);

  return <NonUserHomePage user={user} />;
  // user={user}
  // setUser = { setUser };
}

export default HomePage;
