import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import {UserContextProvider} from "./context/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <App/>
        </UserContextProvider>
    </BrowserRouter>
);
