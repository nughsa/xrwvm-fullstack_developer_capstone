import React from "react";

function Register() {
  return (
    <div className="register">
      <h2>Register</h2>

      <form>
        <input type="text" placeholder="First Name" name="firstName" />

        <input type="text" placeholder="Last Name" name="lastName" />

        <input type="text" placeholder="Username" name="userName" />

        <input type="email" placeholder="Email" name="email" />

        <input type="password" placeholder="Password" name="password" />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
