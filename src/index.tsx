import React from "react";
import ReactDOM from "react-dom";
import ExcalidrawApp from "./excalidraw-app";
import {mount, route} from 'navi';
import {Router} from 'react-navi';


import "./excalidraw-app/pwa";
import "./excalidraw-app/sentry";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import { withAuthentication } from "./auth/authenticationRoute";

const routes = mount({
    "/": withAuthentication(route({
        title:"Shareboard",
        view: <ExcalidrawApp />
    })),
    "/login": route({
        title:"Login | Shareboard",
        view: <LoginPage/>
    }),
    "/register": route({
        title:"Login | Shareboard",
        view: <RegisterPage/>
    })
})

window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;

ReactDOM.render(<Router routes = {routes}/>,
    document.getElementById("root")
);
