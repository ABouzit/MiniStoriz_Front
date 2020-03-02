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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import config from "config/config";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import Echanger from "./Sections/Echanger";
import Contact from "./Sections/Contact";
import NosHistoires from "./Sections/NosHistoires";
import Publier from "./Sections/Publier";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function ConnexionPageDesktp(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        // brand="Mateeeerial Kit React"
        leftLinks={
          <img
            src={config.API_URL + "images/asset/logo.png"}
            alt="Logo"
            style={{
              display: "block",
              width: "146px"
            }}
          />
        }
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "info"
        }}
        {...rest}
      />
      <Parallax filter image={config.API_URL + "images/asset/bg1.jpg"}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Ecris ton histoire !</h1>
              <h4>
                Ministoriz est un site collaboratif permettant q nos membres (les mini-artostes), passionnes d'ecriture ou de dessin, de publier des histoires et de ravir nos lecteurs!
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
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} id="noshistoire">
        <div className={classes.container}>
          <NosHistoires />
        </div>
      </div>
      <br></br>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 20 }}
        id="publier"
      >
        <div className={classes.container}>
          <Publier />
        </div>
      </div>
      <br></br>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 20 }}
        
        id="echanger"
      >
        <div className={classes.container}>
          <Echanger />
        </div>
      </div>
      <br></br>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 20 }}
        id="contact"
      >
        <div className={classes.container}>
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
}
