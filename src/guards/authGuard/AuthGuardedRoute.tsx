import React from "react";
import { Redirect, Route } from "react-router-dom";
import { APIService } from "../../services/api/api-service";

// type Props = { component: React.FC } & RouteComponentProps;

interface Props {
  path: string;
}

export const AuthGuardedRoute: React.FC<Props> = ({ children, ...rest }) => {
  const isLoggedIn = APIService.Instance.getToken() !== null;
  return (
    <Route
      exact
      {...rest}
      render={({ location }) => {
        return isLoggedIn ? children : <Redirect to={{ pathname: "/login" }} />;
      }}
    />
  );
};
