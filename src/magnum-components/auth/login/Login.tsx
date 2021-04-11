import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ROUTES } from "../../../constants/constants";
import { ILogin } from "../../../models/login-payload.model";
import { APIService } from "../../../services/api/api-service";
import { login } from "../../../services/auth-service";

import "./Login.scss";

export const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<ILogin>({
    username: "",
    password: "",
  });

  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    APIService.Instance.getToken() !== null && setRedirect(true);
  }, []);

  const submitLogin = () => {
    login(loginForm).then((res) => {
      setRedirect(true);
    });
  };

  if (redirect === true) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <div className="cmp-login">
      <h3 className="text-center">Welcome</h3>
      <div className="login-brand-img">
        <img src={`${window.location.origin}/logo-180x180.png`} alt="logo" />
      </div>
      <div className="main-login-form">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            value={loginForm.username}
            className="form-control"
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            value={loginForm.password}
            className="form-control"
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            type="password"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={submitLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
      <div className="social-login text-center mt-2">
        <span>Or Login With</span>
        <div className="row mt-1">
          <div className="col-6 ">
            <button className="col-12 btn border btn-primary">Facebook</button>
          </div>
          <div className="col-6">
            <button className="col-12 btn border btn-danger">Google</button>
          </div>
        </div>
      </div>
      <span className="d-flex justify-content-center mt-2">
        <Link to="/register">Register | Sign Up </Link>
      </span>
    </div>
  );
};
