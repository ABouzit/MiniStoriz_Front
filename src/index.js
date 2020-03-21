import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import AllHistoiresPage from "views/AllHistoiresPage/AllHistoiresPage.js";
import MesOeuvresPage from "views/MesOeuvresPage/MesOeuvresPage.js";
import MonComptePage from "views/MonComptePage/MonComptePage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ConnexionPageDesktop from "views/ConnexionPageDesktop/ConnexionPageDesktop.js";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/material" component={Components} />
      {/* <Route path="/landing-page" component={AllHistoires} /> */}
      <Route path="/LesHistoires" component={AllHistoiresPage} />
      <Route path="/MesOeuvres" component={MesOeuvresPage} />
      <Route path="/MonProfil" component={MonComptePage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={ConnexionPageDesktop} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
