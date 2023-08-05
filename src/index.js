import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./utils/context"
// import {Routes,Route} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter>
              <AppContext>
                <App />
              </AppContext>
            </BrowserRouter>);
