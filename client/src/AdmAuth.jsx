import { useState } from "react";
import { supabase } from "./utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, password });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email and password for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Admin Login Page</h1>
        <p className="description">Sign in, your email and password below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className={"button block bg-red-200  w-[60px] rounded-[5px]"}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Log in</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
