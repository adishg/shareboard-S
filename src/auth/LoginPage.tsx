import React, { useState, useRef } from "react";
import { AuthForm } from "./Auth.component";

const LoginPage = () => {
  const [{ username, password }, setCredentials] = useState({
    username: '',
    password: ''
  });

  return (
    <AuthForm>
      <label htmlFor="username">Username</label>
      <input placeholder="username" value= {username} onChange={(e)=>{setCredentials({
        username: e.target.value,
        password
      })}}/>
      <label htmlFor="password">Password</label>
      <input placeholder="password" type="password" value={password} onChange={(e)=>{setCredentials({
        username,
        password: e.target.value
      })}}/>
      <button type="submit">Login</button>
    </AuthForm>
  )
}
export default LoginPage;