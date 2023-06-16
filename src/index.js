import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import App from "./App";

const Root = () => {
  return (
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
