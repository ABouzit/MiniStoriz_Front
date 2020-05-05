import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import PublierViewPage from "views/PublierViewPage/PublierViewPage.js";
import AllHistoiresPage from "views/AllHistoiresPage/AllHistoiresPage.js";
import HistoireViewPage from "views/HistoireViewPage/HistoireViewPage.js";
import MesOeuvresPage from "views/MesOeuvresPage/MesOeuvresPage.js";
import MonComptePage from "views/MonComptePage/MonComptePage.js";
import MonReseauPage from "views/MonReseauPage/MonReseauPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import HomePage from "views/HomePage/HomePage.js";
import Messages from "views/ChatPage/ChatPage.js";
import ActivationPage from "views/ActivationPage/ActivationPage.js";
import UsersPage from "views/UsersPage/UsersPage.js"
import * as firebase from "firebase/app";
import "firebase/database";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/material" component={Components} />
      {/* <Route path="/landing-page" component={AllHistoires} /> */}
      <Route path="/Publier/:type" component={PublierViewPage} />
      <Route path="/Histoire/:histoireId" component={HistoireViewPage} />
      <Route path="/Activation/:userId" component={ActivationPage} />
      <Route path="/Utilisateurs" component={UsersPage} />
      <Route path="/MesOeuvres" component={MesOeuvresPage} />
      <Route path="/LesOeuvres/:userId" component={MesOeuvresPage} />
      <Route path="/MonReseau" component={MonReseauPage} />
      <Route path="/Reseau/:userId" component={MonReseauPage} />
      <Route path="/MonProfil" component={MonComptePage} />
      <Route path="/Messages" component={Messages} />
      <Route path="/Message/:userId" component={Messages} />
      <Route path="/modifier/histoire/:type/:histoireId" component={PublierViewPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/Connexion" component={HomePage} />
      <Route path="/" component={AllHistoiresPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
