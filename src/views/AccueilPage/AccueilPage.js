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
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import HeaderUser from "components/Header/HeaderUser.js";
import Parallax from "components/Parallax/Parallax.js";
import config from "config/config";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import ButtonBase from "@material-ui/core/ButtonBase";
// Sections for this page
import { subscriber, messageService } from "./../../services/messageService";
import { Redirect } from 'react-router-dom';
import HeaderGloble from "components/Header/HeaderGloble";
import Hero from './sections/Hero';
import FeaturesTiles from './sections/FeaturesTiles';
import FeaturesSplit from './sections/FeaturesSplit';
import Testimonial from './sections/Testimonial';
import Cta from './sections/Cta';

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function PublierViewPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filtre, setFiltre] = React.useState(1);
  const [userCurrent, setUserCurrent] = React.useState(JSON.parse(localStorage.getItem('user')));
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  const classes = useStyles();
  const { ...rest } = props;
  if (userCurrent == null) {
    return <Redirect to='/Connexion' />;
  }
  return (
    <div>
      <HeaderGloble />
      <div style={{ backgroundColor: "#ecfbfc" }}>
        <GridContainer
          justify="flex-end"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <GridItem xs={12} sm={12} md={12} style={{ padding: 0 }}>
            <Hero className="illustration-section-01" />
            <FeaturesTiles />
            <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
            <Testimonial topDivider />
            <Cta split />
          </GridItem>
        </GridContainer>
        <div style={{ marginTop: 200 }}></div>
      </div>
      {/* <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 81, backgroundImage: 'url("'+config.API_URL+'images/asset/bg1.jpg")' }}
      >
        <div className={classes.container}>
          <AllHistoires />
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
}
