import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderUser from "components/Header/HeaderUser.js";
import Parallax from "components/Parallax/Parallax.js";
import config from "config/config";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import HeaderGloble from "components/Header/HeaderGloble";
// Sections for this page
import AllHistoires from "./Sections/AllHistoires";
import MesOeuvres from "./Sections/MesOeuvres";
import MonCompte from "./Sections/MonCompte";
// import NosHistoires from "./Sections/NosHistoires";
// import Publier from "./Sections/Publier";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <HeaderGloble />
      {/* <Parallax filter image={config.API_URL + "images/asset/bg1.jpg"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Ecris ton histoire !</h1>
              <h4>
                Ministoriz est un site collaboratif permettant q nos membres
                (les mini-artostes), passionnes d'ecriture ou de dessin, de
                publier des histoires et de ravir nos lecteurs!
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Regarder la video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax> */}
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 110, backgroundImage:'url("http://localhost:5600/images/asset/bg1.jpg")' }}
      >
        <div className={classes.container}>
          <MonCompte />
        </div>
      </div>
      <Footer />
    </div>
  );
}
