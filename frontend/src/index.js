import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reducer from "./store/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
ReactDOM.render(
  <Provider store={createStore(reducer, composeWithDevTools())}>
    <App />
  </Provider>,
  document.getElementById("root")
);
