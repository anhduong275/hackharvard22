import React, { useState } from "react";
import "./login.css"

async function loginUser(credentials : string) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function Login(){
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={setUsername}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={setPassword}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  )

}

export default Login;


