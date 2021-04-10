/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import React from "react";
import { DashboardMain } from "./dashboardMain/dashboardMain";
import { DashboardSidebar } from "./dashboardsidebar/dashboardSidebar";
import "./dashboardlayout.scss";
import { DashboardHeader } from "./Dashboardheader/DashboardHeaderHeader";

export const DashboardLayout: React.FC = () => {
    return (
        <div className="w-100">
            <DashboardHeader></DashboardHeader>
            <DashboardSidebar></DashboardSidebar>
            <DashboardMain></DashboardMain>
        </div>
    );
};
