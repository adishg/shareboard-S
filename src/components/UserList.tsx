import "./UserList.scss";

import React from "react";
import clsx from "clsx";
import { ToolButton } from "./ToolButton";
import { logout } from "./icons";
import { t } from "../i18n";

type UserListProps = {
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
};

export const UserList = ({ children, className, mobile }: UserListProps) => {
  return (
    <div className={clsx("UserList", className, { UserList_mobile: mobile })}>
      {children},
      <ToolButton
        type="button"
        icon={logout}
        title={t("buttons.logout")}
        aria-label={t("buttons.logout")}
      />

    </div>

  );

};

