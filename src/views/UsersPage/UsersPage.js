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
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
// Sections for this page
import AllUsers from "./Sections/AllUsers";
import { subscriber, messageService } from "./../../services/messageService";
import { Redirect } from 'react-router-dom';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import HeaderGloble from "components/Header/HeaderGloble";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function UsersPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  
  const classes = useStyles();
  const { ...rest } = props;
  if (user == null) {
    return <Redirect to='/Connexion' />;
  }
  return (
    <div>
      <HeaderGloble />
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
                              search: search
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
                </GridContainer>
              </div>
            ) : (
              <div style={{ position: "fixed", width: 390 }}>
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
                              search: search
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
                  
                </GridContainer>
              </div>
            )}
          </GridItem>
          {isMobile ? (
            <GridItem xs={12} sm={12} md={9} position="center">
              <div>
                <AllUsers />
              </div>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={9} position="end">
              <AllUsers />
            </GridItem>
          )}
        </GridContainer>
      </div>
      {/* <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 81, backgroundImage: 'url("'+config.API_URL+'images/asset/bg1.jpg")' }}
      >
        <div className={classes.container}>
          <AllUsers />
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
}
