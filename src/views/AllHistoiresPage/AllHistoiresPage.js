import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
// Sections for this page
import AllHistoires from "./Sections/AllHistoires";
import { subscriber, messageService } from "./../../services/messageService";
import HeaderGloble from "components/Header/HeaderGloble";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function AllHistoiresPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filtre, setFiltre] = React.useState(1);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      {/* <div style={{width: '100%',
                    backgroundColor: '#e3f3fd',
                    color: 'rgb(89, 79, 118)',
                    marginTop: '-9px',
                    height: 30,
                    position: 'fixed',
                    zIndex: '100',
                    boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'}}>
                      <h4 style={{fontFamily: 'cursive', marginTop: 2, marginLeft: '5%', fontWeight: 'bold'}}>
                        Bienvenue à toi, Azzedine le mini-artiste
                      </h4>
      </div> */}
      <HeaderGloble />
      <div style={{ backgroundColor: "#ecfbfc" }}>
        <GridContainer justify="flex-end" style={{ margin: 0 }}>
          <GridItem xs={12} sm={12} md={3}>
            {isMobile ? (
              <div style={{ display: "contents" }}>
                <GridContainer justify="center" style={{ marginTop: "40%" }}>
                  <GridItem xs={10} sm={10} md={10}>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={search}
                      onChange={(search, event) => {
                        setSearch(search.target.value);
                        window.scrollTo(0, 0);
                      }}
                      inputProps={{
                        endAdornment: (
                          <ButtonBase
                            onClick={subscriber.next({
                              search: search,
                              filtre: filtre
                            })}
                          >
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={10} sm={10} style={{ marginTop: "5%" }}>
                    <ButtonGroup
                      orientation="vertical"
                      color="primary"
                      aria-label="Les filtres"
                      variant="contained"
                      style={{ width: "-webkit-fill-available" }}
                    >
                      <ColorButton
                       
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 1 });
                          setFiltre(1);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Les plus lues
                      </ColorButton>
                      <ColorButton
                        
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 2 });
                          setFiltre(2);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Les plus populaires
                      </ColorButton>
                      <ColorButton
                        
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 3 });
                          setFiltre(3);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Les plus recentes
                      </ColorButton>
                      <ColorButton
                        
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 4 });
                          setFiltre(4);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Les plus anciennes
                      </ColorButton>
                    </ButtonGroup>
                  </GridItem>
                </GridContainer>
              </div>
            ) : (
              <div style={{ position: "fixed" }}>
                <GridContainer
                  justify="center"
                  style={{ marginTop: "40%", width: "90%" }}
                >
                  <GridItem xs={10} sm={10} md={10}>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={search}
                      onChange={(search, event) => {
                        setSearch(search.target.value);
                        window.scrollTo(0, 0);
                      }}
                      inputProps={{
                        endAdornment: (
                          <ButtonBase
                            onClick={subscriber.next({
                              search: search,
                              filtre: filtre
                            })}
                          >
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={10}
                    style={{ textAlign: "center", marginTop: "5%" }}
                  >
                    <ButtonGroup
                      orientation="vertical"
                      // color="secondary"
                      color="primary"
                      aria-label="Les filtres"
                      variant="contained"
                      style={{ width: "-webkit-fill-available" }}
                    >
                        <ColorButton
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 1 });
                          setFiltre(1);
                          window.scrollTo(0, 0);
                        }}
                      >
                          Les plus lues
                      </ColorButton>
                        <ColorButton
                       
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 2 });
                          setFiltre(2);
                          window.scrollTo(0, 0);
                        }}
                      >
                          Les plus populaires
                      </ColorButton>
                        <ColorButton
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 3 });
                          setFiltre(3);
                          window.scrollTo(0, 0);
                        }}
                      >
                          Les plus recentes
                      </ColorButton>
                        <ColorButton
                        onClick={() => {
                          subscriber.next({ search: search, filtre: 4 });
                          setFiltre(4);
                          window.scrollTo(0, 0);
                        }}
                      >
                          Les plus anciennes
                      </ColorButton>
                    </ButtonGroup>
                  </GridItem>
                </GridContainer>
              </div>
            )}
          </GridItem>
          {isMobile ? (
            <GridItem xs={12} sm={12} md={9} position="center">
              <div>
                <AllHistoires />
              </div>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={9} position="end">
              <AllHistoires />
            </GridItem>
          )}
        </GridContainer>
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

const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    borderColor: "white !important",
    backgroundColor: "#2f99b1",
    "&:hover": {
      backgroundColor: "#006b81"
    },
    "&:active": {
      backgroundColor: "#006b81"
    }
  }
}))(Button);
