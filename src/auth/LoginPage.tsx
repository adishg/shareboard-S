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
  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    if(username == '' || password == ''){
      setError('Username and Password are required');
      return false;
    }

    const {error, token}= await onLogin({
      username, 
      password
    });

    if(error){
      setError(error);
      return false;
    }else{
      navigation.setContext(token);//refresh token
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