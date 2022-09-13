import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
    // </React.StrictMode>
);
