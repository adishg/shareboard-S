import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./excalidraw-app/pwa";
import "./excalidraw-app/sentry";
import { MainApp } from "./magnum-components/MainApp";

window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;

// ReactDOM.render(<Router routes = {routes} context={{token :localStorage.getItem(BOUNCE_IT_TOKEN_KEY)}}/>,
//     document.getElementById("root")
// );

ReactDOM.render(<MainApp />, document.getElementById("root"));

serviceWorker.unregister();
