import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./auth/login/Login";
import { Register } from "./auth/register/Register";
import { AuthGuardedRoute } from "../guards/authGuard/AuthGuardedRoute";

import "./MainApp.scss";
import ExcalidrawApp from "../excalidraw-app";
import { DashboardLayout } from "./dashboard/dashboardlayout";
import { ROUTES } from "../constants/constants";

export const MainApp: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
          <AuthGuardedRoute path={ROUTES.DASHBOARD}>
            <DashboardLayout />
          </AuthGuardedRoute>
          <AuthGuardedRoute path={ROUTES.ROOT}>
            <ExcalidrawApp />
          </AuthGuardedRoute>
        </Switch>
      </BrowserRouter>
    </main>
  );
};
