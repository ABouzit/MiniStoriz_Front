import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Header from "components/Header/Header.js";
import HeaderUser from "components/Header/HeaderUser.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import config from "config/config";
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
import UsersPage from "views/UsersPage/UsersPage.js";
import ContactPage from "views/ContactPage/ContactPage";
import AccueilPage from "views/AccueilPage/AccueilPage";
import "firebase/database";
import * as firebase from "firebase/app";
import HeaderGlobale from "components/Header/HeaderGloble";
import ErrorPage from "views/404Page/ErrorPage";
import './fonts/Lato-Regular.ttf'
firebase.initializeApp(config.firebaseConfig);
var hist = createBrowserHistory();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    };
  }
  render() {
    return (
      <div>
        <Router history={hist}>
          {/* <HeaderGlobale /> */}
          {/* <Link to="/Messages">
            <Button color="transparent" style={{ padding: 0 }}>
              Message
            </Button>
          </Link>
          <Link to="/">
            <Button color="transparent" style={{ padding: 0 }}>
              histoire
            </Button>
          </Link>
          <Link to="/Utilisateurs">
            <Button color="transparent" style={{ padding: 0 }}>
              utilisateur
            </Button>
          </Link> */}

          <Switch>
            <Route path="/Contact" component={ContactPage} />
            <Route path="/material" component={Components} />
            <Route path="/404" component={ErrorPage} />
            {/* <Route path="/landing-page" component={AllHistoires} /> */}
            <Route path="/Publier/:type" component={PublierViewPage} />
            <Route
              exact={true}
              path="/Histoire/:histoireId"
              component={HistoireViewPage}
            />
            <Route
              exact={true}
              path="/Activation/:userId"
              component={ActivationPage}
            />
            <Route path="/Utilisateurs" component={UsersPage} />
            <Route path="/MesOeuvres" component={MesOeuvresPage} />
            <Route path="/LesOeuvres/:userId" component={MesOeuvresPage} />
            <Route path="/MonReseau" component={MonReseauPage} />
            <Route
              exact={true}
              path="/Reseau/:userId"
              component={MonReseauPage}
            />
            <Route path="/MonProfil" component={MonComptePage} />
            <Route path="/Messages" component={Messages} />
            <Route path="/Message/:userId" component={Messages} />
            <Route
              path="/modifier/histoire/:type/:histoireId"
              component={PublierViewPage}
            />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/Connexion" component={HomePage} />
            <Route path="/LesHistoires" component={AllHistoiresPage} />
            <Route path="/" component={AccueilPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
