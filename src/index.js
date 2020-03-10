import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import About from "./About";
import Layout from "./Layout";
import UserDetails from "./UserDetails";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/details/:name" component={UserDetails} />
      </Layout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
