import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./auth/login/Login";
import { Register } from "./auth/register/Register";
import { AuthGuardedRoute } from "../guards/authGuard/AuthGuardedRoute";

import "./MainApp.scss";
import ExcalidrawApp from "../excalidraw-app";

export const MainApp: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthGuardedRoute path="/">
            <ExcalidrawApp />
          </AuthGuardedRoute>
        </Switch>
      </BrowserRouter>
    </main>
  );
};
