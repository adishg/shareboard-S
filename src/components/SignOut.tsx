import "./SignOut.scss";

import React, { useState } from "react";
import clsx from "clsx";
import { ToolButton } from "./ToolButton";
import { logout } from "./icons";
import { t } from "../i18n";
import { Redirect } from "react-router";
import { signOut } from "../services/auth-service";

type UserListProps = {
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
};

export const SignOut = ({ children, className, mobile }: UserListProps) => {
  const [redirect, setRedirect] = useState<boolean>(false);

  if (redirect === true) {
    return <Redirect to="/" />;
  }

  const onSignOut = () => {
    const isSignOut = signOut();
    setRedirect(isSignOut);
  };

  return (
    <div className={clsx("UserList", className, { UserList_mobile: mobile })}>
      {children},
      <ToolButton
        type="button"
        icon={logout}
        title={t("buttons.logout")}
        aria-label={t("buttons.logout")}
        onClick={onSignOut}
      />
    </div>
  );
};
