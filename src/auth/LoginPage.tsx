import { useNavigation } from "react-navi";
import React, { useState, useRef } from "react";
import { onLogin } from "./auth.api";
import { AuthForm } from "./Auth.component";

const LoginPage = () => {
  const  navigation  = useNavigation();
  const [{ username, password }, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const login = (event: React.FormEvent) => {
    event.preventDefault();
    if(username == '' || password == ''){
      setError('Username and Password are required');
      return false;
    }

    const response = await onLogin({
      username, 
      password
    })

    if(response && response.error){
      setError(response.error);
      return false;
    }else{
      navigation.navigate("/");
    }
  }

  return (
    <AuthForm onSubmit={login}>
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
      { error.length > 0 && <p>{error}</p>}
    </AuthForm>
  )
}
export default LoginPage;