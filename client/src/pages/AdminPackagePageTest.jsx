import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.js";

function AdminPackagePageTest() {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(10);

      if (error) throw error;
      if (data != null) {
        setUsers(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(users);
  return (
    <>
      <div className="main-container w-screen text-red-500 p-[80px,161px,160px,160px]">
        AdminPackagePage_Test
      </div>
      <div>
        {users.map((user, index) => (
          <ul key={index}>
            <li>
              username: {user.username} email: {user.email} updated_at:{" "}
              {user.updated_at}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default AdminPackagePageTest;
