const RegisterPage = () => {
  return (
    <div className="register-form-container">
      <form className="register-form">
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter password here"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
