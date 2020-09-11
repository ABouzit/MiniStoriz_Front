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
import PhotoCamera from "@material-ui/icons/CameraAltOutlined";
import ButtonBase from "@material-ui/core/ButtonBase";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { Link, withRouter } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
// Sections for this page
import { subscriber, messageService } from "./../../services/messageService";
import MonCompte from "./Sections/MonCompte";
import { Input } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { Redirect } from "react-router-dom";
import HeaderGloble from "components/Header/HeaderGloble";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
export default function MonComptePage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [imgProf, setImgProf] = React.useState("");
  const [imgCov, setImgCov] = React.useState("");
  const [user, setUser] = React.useState("");
  const [filtre, setFiltre] = React.useState(1);
  const [userCurrent, setUserCurrent] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let forceUpdate = useForceUpdate();
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  React.useEffect(() => {
    subscriber.subscribe(v => {
      if (v.imgProfil) {
        setImgProf(v.imgProfil);
      }
      if (v.imgCov) {
        setImgCov(v.imgCov);
      }
      if (v.user) {
        setImgProf(v.user.lienPhoto);
        setImgCov(v.user.lienCouverture);
        setUser(v.user);
        console.log("hn");
      }
    });
    window.addEventListener("scroll", scrollBalise);
    return function cleanup() {
      window.removeEventListener("scroll", scrollBalise);
    };
  });

  const scrollBalise = () => {
    const windowsScrollTop = window.pageYOffset;
    if (!isMobile) {
      if (windowsScrollTop > 110) {
        document.getElementById("navBarLeft").style.position = "fixed";
        document.getElementById("navBarLeft1").style.width = "380px";
        document.getElementById("navBarLeft1").style.marginTop = "-103px";
      } else {
        document.getElementById("navBarLeft").style.position = "";
        document.getElementById("navBarLeft1").style.width = "";
        document.getElementById("navBarLeft1").style.marginTop = "0";
      }
    } else {
      if (windowsScrollTop > 110) {
        document.getElementById("scrollTop").style.display = "block";
      } else {
        document.getElementById("scrollTop").style.display = "none";
      }
    }
  };
  const classes = useStyles();
  const { ...rest } = props;
  if (userCurrent == null) {
    return <Redirect to="/Connexion" />;
  }
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
        <GridContainer justify="center" style={{ margin: 0, padding: 0 }}>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{
              margin: 0,
              padding: 0,
              boxShadow:
                "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
            }}
          >
            <Parallax
              image={
                imgCov == null
                  ? config.API_URL + "images/asset/bg1.jpg"
                  : imgCov
              }
              style={{
                height: "240px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div style={{ width: "95%", textAlign: "end" }}>
                <Input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file1"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={(file) =>
                    subscriber.next({ couverture: file.target.files[0] })
                  }
                ></Input>
                <label htmlFor="contained-button-file1">
                  <Button variant="contained" color="white" component="span">
                    Choisir une image
                  </Button>
                </label>
              </div>
            </Parallax>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end" style={{ margin: 0 }}>
          <GridItem xs={12} sm={12} md={3}>
            {isMobile ? (
              <div style={{ display: "contents" }}>
                <GridContainer justify="center" style={{ marginTop: "0%" }}>
                  <GridItem
                    xs={11}
                    sm={11}
                    md={11}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      style={{
                        backgroundColor: "white",
                        marginTop: 0,
                        borderRadius: 0,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "-webkit-center",
                          position: "absolute",
                          top: -65,
                          width: "100%",
                        }}
                      >
                        {imgProf == "" ? (
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Avatar style={{ backgroundColor: "#fafafa" }}>
                                <div>
                                  <Input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(file) =>
                                      subscriber.next({
                                        profil: file.target.files[0],
                                      })
                                    }
                                  ></Input>
                                  <label
                                    htmlFor="contained-button-file"
                                    style={{ color: "#000000" }}
                                  >
                                    <PhotoCamera />
                                  </label>
                                </div>
                              </Avatar>
                            }
                          >
                            <Avatar
                              alt=""
                              src={
                                config.API_URL +
                                "images/asset/defaultPhotoProfil.jpg"
                              }
                              style={{
                                width: 130,
                                height: 130,
                                borderStyle: "solid",
                                borderWidth: 7,
                                borderColor: "white",
                              }}
                            />
                          </Badge>
                        ) : (
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <Avatar style={{ backgroundColor: "#fafafa" }}>
                                <div>
                                  <Input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(file) =>
                                      subscriber.next({
                                        profil: file.target.files[0],
                                      })
                                    }
                                  ></Input>
                                  <label
                                    htmlFor="contained-button-file"
                                    style={{ color: "#000000" }}
                                  >
                                    <PhotoCamera />
                                  </label>
                                </div>
                              </Avatar>
                            }
                          >
                            <Avatar
                              alt=""
                              src={imgProf}
                              style={{
                                width: 130,
                                height: 130,
                                borderStyle: "solid",
                                borderWidth: 7,
                                borderColor: "white",
                              }}
                            />
                          </Badge>
                        )}
                      </div>
                      <h3
                        style={{
                          fontFamily: "lato",
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 65,
                          textAlign: "center",
                        }}
                      >
                        {user.pseudo}
                      </h3>
                      <CardBody style={{ paddingTop: 0, paddingBottom: 8 }}>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={8} sm={8} md={6}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Oeuvres
                            </h6>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h6
                              style={{
                                fontFamily: "lato",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              {user.nombreHistoire}
                            </h6>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={8} sm={8} md={6}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Réseau
                            </h6>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h6
                              style={{
                                fontFamily: "lato",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              {user.nombreReseau}
                            </h6>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Note moyenne
                            </h6>
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={
                                user.noteHistoire
                                  ? parseFloat(
                                      Math.round(user.noteHistoire * 100) / 100
                                    ).toFixed(2) + "/5"
                                  : 0
                              }
                            >
                              <ButtonBase>
                                <CircularProgressbarWithChildren
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={parseFloat(
                                    Math.round(user.noteHistoire * 100) / 100
                                  ).toFixed(2)}
                                  text={parseFloat(
                                    Math.round(user.noteHistoire * 100) / 100
                                  ).toFixed(2)}
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#2e99b0",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt",
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#2e99b0",
                                        fontSize: 12,
                                        margin: 0,
                                      }}
                                    >
                                      {parseFloat(
                                        Math.round(user.noteHistoire * 100) /
                                          100
                                      ).toFixed(1)}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </GridItem>
                          <GridItem
                            xs={2}
                            sm={2}
                            md={2}
                            style={{ textAlign: "left", paddingLeft: 0 }}
                          >
                            <div style={{ height: 40 }}>
                              <CreateIcon style={{ width: 20 }} />
                            </div>
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={
                                user.noteDessin
                                  ? parseFloat(
                                      Math.round(user.noteDessin * 100) / 100
                                    ).toFixed(2) + "/5"
                                  : 0
                              }
                            >
                              <ButtonBase>
                                <CircularProgressbarWithChildren
                                  text={parseFloat(
                                    Math.round(user.noteDessin * 100) / 100
                                  ).toFixed(2)}
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={parseFloat(
                                    Math.round(user.noteDessin * 100) / 100
                                  ).toFixed(2)}
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#ff2e4c",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt",
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#ff2e4c",
                                        fontSize: 12,
                                        margin: 0,
                                      }}
                                    >
                                      {parseFloat(
                                        Math.round(user.noteDessin * 100) / 100
                                      ).toFixed(1)}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </GridItem>
                          <GridItem
                            xs={2}
                            sm={2}
                            md={2}
                            style={{ textAlign: "left", paddingLeft: 0 }}
                          >
                            <div style={{ height: 40 }}>
                              {" "}
                              <BrushIcon style={{ width: 20 }} />
                            </div>{" "}
                          </GridItem>
                        </GridContainer>
                        {/* <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Link to="/MonReseau">
                              <h5
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  color: "#1e1548",
                                  margin: 0,
                                  marginTop: "2%",
                                  textAlign: "center",
                                  fontVariant: "unicase",
                                  textDecoration: "underline",
                                }}
                              >
                                Mon Réseau
                              </h5>
                            </Link>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />

                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Link to="/MesOeuvres">
                              <h5
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  color: "#1e1548",
                                  margin: 0,
                                  marginTop: "2%",
                                  textAlign: "center",
                                  fontVariant: "unicase",
                                  textDecoration: "underline",
                                }}
                              >
                                Mes Oeuvres
                              </h5>
                            </Link>
                          </GridItem>
                        </GridContainer> */}
                      </CardBody>
                    </Card>
                    <Button
                      variant="contained"
                      color="white"
                      component="span"
                      onClick={() => {
                        if (!user.demandeResignation) {
                          subscriber.next({ desactive: true });
                          console.log("push");
                          forceUpdate();
                        } else {
                          subscriber.next({ desactive: false });
                          console.log("push");
                          forceUpdate();
                        }
                      }}
                    >
                      {!user.demandeResignation ? (
                        <CheckCircle style={{ marginRight: 5 }} />
                      ) : (
                        <Cancel style={{ marginRight: 5 }} />
                      )}
                      {!user.demandeResignation
                        ? "Desactiver compte"
                        : "Annuler Demande"}
                    </Button>
                  </GridItem>
                </GridContainer>
                <div
                  id="scrollTop"
                  style={{
                    display: "none",
                    position: "fixed",
                    width: "100%",
                    textAlign: "left",
                    zIndex: 10,
                    bottom: 5,
                    right: -5,
                  }}
                >
                  <Fab
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    variant="extended"
                    size="small"
                    style={{
                      color: "white",
                      backgroundColor: "#1f1748",
                    }}
                    aria-label="add"
                    className={classes.margin}
                  >
                    <NavigationIcon className={classes.extendedIcon} />
                  </Fab>
                </div>
              </div>
            ) : (
              <div id="navBarLeft">
                <GridContainer justify="center" id="navBarLeft1">
                  <GridItem
                    xs={11}
                    sm={11}
                    md={11}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      style={{
                        backgroundColor: "white",
                        marginTop: 0,
                        borderRadius: 0,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "-webkit-center",
                          position: "absolute",
                          top: -65,
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "inline-grid",
                          }}
                        >
                          {imgProf == "" ? (
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              badgeContent={
                                <Avatar style={{ backgroundColor: "#fafafa" }}>
                                  <div>
                                    <Input
                                      accept="image/*"
                                      className={classes.input}
                                      id="contained-button-file"
                                      multiple
                                      type="file"
                                      style={{ display: "none" }}
                                      onChange={(file) =>
                                        subscriber.next({
                                          profil: file.target.files[0],
                                        })
                                      }
                                    ></Input>
                                    <label
                                      htmlFor="contained-button-file"
                                      style={{ color: "#000000" }}
                                    >
                                      <PhotoCamera />
                                    </label>
                                  </div>
                                </Avatar>
                              }
                            >
                              <Avatar
                                alt=""
                                src={
                                  config.API_URL +
                                  "images/asset/defaultPhotoProfil.jpg"
                                }
                                style={{
                                  width: 130,
                                  height: 130,
                                  borderStyle: "solid",
                                  borderWidth: 7,
                                  borderColor: "white",
                                }}
                              />
                            </Badge>
                          ) : (
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              badgeContent={
                                <Avatar style={{ backgroundColor: "#fafafa" }}>
                                  <div>
                                    <Input
                                      accept="image/*"
                                      className={classes.input}
                                      id="contained-button-file"
                                      multiple
                                      type="file"
                                      style={{ display: "none" }}
                                      onChange={(file) =>
                                        subscriber.next({
                                          profil: file.target.files[0],
                                        })
                                      }
                                    ></Input>
                                    <label
                                      htmlFor="contained-button-file"
                                      style={{ color: "#000000" }}
                                    >
                                      <PhotoCamera />
                                    </label>
                                  </div>
                                </Avatar>
                              }
                            >
                              <Avatar
                                alt=""
                                src={imgProf}
                                style={{
                                  width: 130,
                                  height: 130,
                                  borderStyle: "solid",
                                  borderWidth: 7,
                                  borderColor: "white",
                                }}
                              />
                            </Badge>
                          )}
                        </div>
                      </div>
                      <h3
                        style={{
                          fontFamily: "lato",
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 65,
                          textAlign: "center",
                        }}
                      >
                        {user.pseudo}
                      </h3>
                      <CardBody style={{ paddingTop: 0, paddingBottom: 8 }}>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={4} sm={4} md={6}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Oeuvres
                            </h6>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h6
                              style={{
                                fontFamily: "lato",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              {user.nombreHistoire}
                            </h6>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={4} sm={4} md={6}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Réseau
                            </h6>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h6
                              style={{
                                fontFamily: "lato",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              {user.nombreReseau}
                            </h6>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{ marginLeft: -30, marginRight: -30 }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <h6
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Note moyenne
                            </h6>
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={
                                user.noteHistoire
                                  ? parseFloat(
                                      Math.round(user.noteHistoire * 100) / 100
                                    ).toFixed(2) + "/5"
                                  : 0
                              }
                            >
                              <ButtonBase>
                                <CircularProgressbarWithChildren
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={parseFloat(
                                    Math.round(user.noteHistoire * 100) / 100
                                  ).toFixed(2)}
                                  text={parseFloat(
                                    Math.round(user.noteHistoire * 100) / 100
                                  ).toFixed(2)}
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#2e99b0",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt",
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#2e99b0",
                                        fontSize: 15,
                                        margin: 0,
                                      }}
                                    >
                                      {parseFloat(
                                        Math.round(user.noteHistoire * 100) /
                                          100
                                      ).toFixed(1)}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </GridItem>
                          <GridItem
                            xs={2}
                            sm={2}
                            md={2}
                            style={{ textAlign: "left", paddingLeft: 0 }}
                          >
                            <div style={{ height: 40, paddingTop: 8 }}>
                              <CreateIcon style={{ width: 20 }} />
                            </div>
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={
                                user.noteDessin
                                  ? parseFloat(
                                      Math.round(user.noteDessin * 100) / 100
                                    ).toFixed(2) + "/5"
                                  : 0
                              }
                            >
                              <ButtonBase>
                                <CircularProgressbarWithChildren
                                  text={parseFloat(
                                    Math.round(user.noteDessin * 100) / 100
                                  ).toFixed(2)}
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={parseFloat(
                                    Math.round(user.noteDessin * 100) / 100
                                  ).toFixed(2)}
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#ff2e4c",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt",
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#ff2e4c",
                                        fontSize: 15,
                                        margin: 0,
                                      }}
                                    >
                                      {parseFloat(
                                        Math.round(user.noteDessin * 100) / 100
                                      ).toFixed(1)}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </GridItem>
                          <GridItem
                            xs={2}
                            sm={2}
                            md={2}
                            style={{ textAlign: "left", paddingLeft: 0 }}
                          >
                            <div style={{ height: 40, paddingTop: 8 }}>
                              {" "}
                              <BrushIcon style={{ width: 20 }} />
                            </div>{" "}
                          </GridItem>
                        </GridContainer>
                        {/* <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Link to="/MonReseau">
                              <h5
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  color: "#1e1548",
                                  margin: 0,
                                  marginTop: "2%",
                                  textAlign: "center",
                                  fontVariant: "unicase",
                                  textDecoration: "underline",
                                }}
                              >
                                Mon Réseau
                              </h5>
                            </Link>
                          </GridItem>
                        </GridContainer>
                        <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />

                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Link to="/MesOeuvres">
                              <h5
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  color: "#1e1548",
                                  margin: 0,
                                  marginTop: "2%",
                                  textAlign: "center",
                                  fontVariant: "unicase",
                                  textDecoration: "underline",
                                }}
                              >
                                Mes Oeuvres
                              </h5>
                            </Link>
                          </GridItem>
                        </GridContainer> */}
                      </CardBody>
                    </Card>
                    <Button
                      variant="contained"
                      color="white"
                      component="span"
                      onClick={() => {
                        if (!user.demandeResignation) {
                          subscriber.next({ desactive: true });
                          console.log("push");
                          forceUpdate();
                        } else {
                          subscriber.next({ desactive: false });
                          console.log("push");
                          forceUpdate();
                        }
                      }}
                    >
                      {!user.demandeResignation ? (
                        <CheckCircle style={{ marginRight: 5 }} />
                      ) : (
                        <Cancel style={{ marginRight: 5 }} />
                      )}
                      {!user.demandeResignation
                        ? "Desactiver compte"
                        : "Annuler Demande"}
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            )}
          </GridItem>
          {isMobile ? (
            <GridItem xs={12} sm={12} md={9} position="center">
              <div>
                <MonCompte />
              </div>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={9} position="end">
              <MonCompte />
            </GridItem>
          )}
        </GridContainer>
      </div>
    </div>
  );
}
