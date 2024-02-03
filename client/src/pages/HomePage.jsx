// import { useState } from "react";
import NonUserHomePage from "./NonUserHomePage";
import { useUser } from "../app/userContext";

function HomePage() {
  // const [user, setUser] = useState(null);
  const { user } = useUser();
  console.log(user);

  return <NonUserHomePage user={user} />;
  // setUser = { setUser };
}

export default HomePage;
