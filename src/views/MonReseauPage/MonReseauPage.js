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
import { Link, withRouter } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
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
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
// Sections for this page
import { subscriber, messageService } from "./../../services/messageService";
import MonReseau from "./Sections/MonReseau";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import HeaderGloble from "components/Header/HeaderGloble";
import Buttons from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function MesOeuvresPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [user, setUser] = React.useState("");
  const [view, setView] = React.useState("");
  const [ami, setAmi] = React.useState(false);
  const [requestF, setRequestF] = React.useState(false);
  const [requestRF, setRequestRF] = React.useState(false);
  const [requestRRF, setRequestRRF] = React.useState(false);
  const [accepteRequestF, setAccepteRequestF] = React.useState(false);
  const [userCurrent, setUserCurrent] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  React.useEffect(() => {
    subscriber.subscribe(v => {
      if (v.user) {
        setUser(v.user);
        console.log(user)
      }
      if (v.view) {
        setView(v.view);
      }
      if (v.ami) {
        setAmi(v.ami);
      }
    });
    window.addEventListener("scroll", scrollBalise);
    return function cleanup() {
      window.removeEventListener("scroll", scrollBalise);
    };
  });
  const requestFriend = id => {
    Axios.post(config.API_URL + "relations/", {
      userOne: { id: userCurrent.id },
      userTwo: { id: id }
    }).then(res => {
      firebase
        .database()
        .ref("relations/" + id)
        .set({
          from: userCurrent.id,
          to: id,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
      setAmi(1);
      setRequestF(false);
    });
  };
  const accepteRequestFriend = () => {
    let tuser = user;
    Axios.put(config.API_URL + "users/accRelation/"+userCurrent.id+"/"+view, {
      
    }).then(res => {
      firebase.database().ref('notifications/' + view).set({
        from: userCurrent.id,
        to: view,
        numbe: 100000 + Math.random() * (100000 - 1)
      });
      tuser.nombreReseau += 1;
      setUser(tuser)
      setAccepteRequestF(false);
      setAmi(2);
    })
    .catch(
      function(error) {
        console.log(error);
      }
    );
  }
  const removeRequestFriend = id => {
    let tuser = user;
    Axios.delete(
      config.API_URL + "users/deleteRelation/" + userCurrent.id + "/" + id
    ).then(res => {
      firebase
        .database()
        .ref("relations/" + id)
        .set({
          from: userCurrent.id,
          to: id,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
      if (ami == 2) {
        tuser.nombreReseau -= 1;
        setUser(tuser)
      }
      
      setAmi(0);
      setRequestRF(false);
      setRequestRRF(false);
      setAccepteRequestF(false);
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRequestRF(false);
    setRequestF(false);
  };
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
      {isOpen ? (
        <Lightbox
          mainSrc={imgUrl}
          onCloseRequest={() => {
            setIsOpen(false);
            setImgUrl("");
          }}
          reactModalStyle={{
            overlay: { zIndex: 2000 },
          }}
        />
      ) : (
        <div></div>
      )}
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
            {user.lienCouverture == null ? (
              <Parallax
                image={config.API_URL + "images/asset/bg1.jpg"}
                style={{
                  height: "240px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
              ></Parallax>
            ) : (
              <ButtonBase
                onClick={() => {
                  setIsOpen(true);
                  setImgUrl(user.lienCouverture);
                }}
                style={
                  isMobile
                    ? { width: "100%", display: "contents" }
                    : { width: "30%", display: "contents" }
                }
              >
                <Parallax
                  image={user.lienCouverture}
                  style={{
                    height: "240px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                ></Parallax>
              </ButtonBase>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end" style={{ margin: 0 }}>
          <GridItem xs={12} sm={12} md={3}>
            {isMobile ? (
              <div style={{ display: "contents" }}>
                <GridContainer justify="center" style={{ marginTop: "0%" }}>
                  <GridItem xs={11} sm={11} md={11}>
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
                        {user.lienPhoto == "" ? (
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
                        ) : (
                          <ButtonBase
                            onClick={() => {
                              setIsOpen(true);
                              setImgUrl(user.lienPhoto);
                            }}
                            style={{
                              width: "130px",
                              height: "130px",
                              borderRadius: "50%",
                            }}
                          >
                            <Avatar
                              alt=""
                              src={user.lienPhoto}
                              style={{
                                width: 130,
                                height: 130,
                                borderStyle: "solid",
                                borderWidth: 7,
                                borderColor: "white",
                              }}
                            />
                          </ButtonBase>
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
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Oeuvres
                            </h5>
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
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Réseau
                            </h5>
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
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Note moyenne
                            </h5>
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
                        <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />
                        {view == "" ? (
                          <div>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={12}>
                                <Link to="/MesOeuvres">
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20 ,
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
                                <Link to="/MonProfil">
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      color: "#1e1548",
                                      margin: 0,
                                      marginTop: "2%",
                                      textAlign: "center",
                                      fontVariant: "unicase",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    Mon Profil
                                  </h5>
                                </Link>
                              </GridItem>
                            </GridContainer>
                          </div>
                        ) : (
                          <div>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={12}>
                                <Link to={"/LesOeuvres/" + view}>
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20,
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
                            </GridContainer>
                            <Divider
                              style={{
                                marginTop: "4%",
                                marginLeft: -30,
                                marginRight: -30,
                              }}
                            />
                            <GridContainer
                              justify="center"
                              style={{ marginTop: "3%", height: 23 }}
                            >
                              <GridItem
                                xs={4}
                                sm={4}
                                md={4}
                                style={{ textAlign: "center" }}
                              >
                                <Link to={"/Message/" + user.id}>
                                  <small style={{ color: "#1e1548" }}>
                                    <ForumRoundedIcon style={{ width: 20 }} />
                                  </small>
                                </Link>
                              </GridItem>
                              {ami == 0 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                      title="envoyer une invitation"
                                      aria-label="envoyer une invitation"
                                    
                                    >
                                  <ButtonBase
                                    onClick={() => {
                                      setRequestF(true)
                                    }}
                                  >
                                    <small style={{ color: "#1e1548" }}>
                                      <PersonAddIcon style={{ width: 20 }} />
                                    </small>
                                  </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                              ) : ami == 1 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                      title="retirer l'invitation"
                                      aria-label="retirer l'invitation"
                                    
                                    >
                                  <ButtonBase
                                    onClick={() => {
                                      setRequestRRF(true)
                                    }}
                                  >
                                    <small style={{ color: "#1e1548" }}>
                                      <PersonAddDisabledIcon
                                        style={{ width: 20 }}
                                      />
                                    </small>
                                  </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                              ) : ami == 2 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                    title="retirer de la liste d'amis"
                                    aria-label="retirer de la liste d'amis"
                                   
                                  >
                                    <ButtonBase
                                      onClick={() => {
                                        setRequestRF(true)
                                      }}
                                    >
                                      <small style={{ color: "#1e1548" }}>
                                        <PersonIcon
                                          style={{ width: 20 }}
                                        />
                                      </small>
                                    </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                                ) : (
                                  <GridItem
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <Tooltip
                                      title="accepter l'invitation"
                                      aria-label="accepter l'invitation"
                                    
                                    >
                                      <ButtonBase
                                        onClick={() => {
                                          setAccepteRequestF(true)
                                        }}
                                      >
                                        <small style={{ color: "#1e1548" }}>
                                          <CheckCircleOutlineIcon
                                            style={{ width: 20 }}
                                          />
                                        </small>
                                      </ButtonBase>
                                  </Tooltip>
                              </GridItem>
                            )}
                            </GridContainer>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={10} sm={10} md={10} style={{ marginTop: -30 }}>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={search}
                      onChange={(search, event) => {
                        setSearch(search.target.value);
                        window.scrollTo(0, 0);
                      }}
                      inputProps={{
                        endAdornment: (
                          <ButtonBase
                            onClick={subscriber.next({ search: search })}
                          >
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        ),
                      }}
                    />
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
                  <GridItem xs={11} sm={11} md={11}>
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
                        {user.lienPhoto == "" ? (
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
                        ) : (
                          <ButtonBase
                            onClick={() => {
                              setIsOpen(true);
                              setImgUrl(user.lienPhoto);
                            }}
                            style={{
                              width: "130px",
                              height: "130px",
                              borderRadius: "50%",
                            }}
                          >
                            <Avatar
                              alt=""
                              src={user.lienPhoto}
                              style={{
                                width: 130,
                                height: 130,
                                borderStyle: "solid",
                                borderWidth: 7,
                                borderColor: "white",
                              }}
                            />
                          </ButtonBase>
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
                          <GridItem xs={4} sm={4} md={6}>
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Oeuvres
                            </h5>
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
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Réseau
                            </h5>
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
                            <h5
                              style={{
                                fontFamily: "goudy",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              Note moyenne
                            </h5>
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
                        <Divider
                          style={{
                            marginTop: "2%",
                            marginLeft: -30,
                            marginRight: -30,
                          }}
                        />
                        {view == "" ? (
                          <div>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={12}>
                                <Link to="/MesOeuvres">
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20,
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
                                <Link to="/MonProfil">
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      color: "#1e1548",
                                      margin: 0,
                                      marginTop: "2%",
                                      textAlign: "center",
                                      fontVariant: "unicase",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    Mon Profil
                                  </h5>
                                </Link>
                              </GridItem>
                            </GridContainer>
                          </div>
                        ) : (
                          <div>
                            <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={12}>
                                <Link to={"/LesOeuvres/" + view}>
                                  <h5
                                    style={{
                                      fontFamily: "goudy",
                                      fontSize: 20,
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
                            </GridContainer>
                            <Divider
                              style={{
                                marginTop: "4%",
                                marginLeft: -30,
                                marginRight: -30,
                              }}
                            />
                            <GridContainer
                              justify="center"
                              style={{ marginTop: "3%", height: 23 }}
                            >
                              <GridItem
                                xs={4}
                                sm={4}
                                md={4}
                                style={{ textAlign: "center" }}
                              >
                                <Link to={"/Message/" + user.id}>
                                  <small style={{ color: "#1e1548" }}>
                                    <ForumRoundedIcon style={{ width: 20 }} />
                                  </small>
                                </Link>
                              </GridItem>
                              {ami == 0 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                      title="envoyer une invitation"
                                      aria-label="envoyer une invitation"
                                    
                                    >
                                  <ButtonBase
                                    onClick={() => {
                                      setRequestF(true)
                                    }}
                                  >
                                    <small style={{ color: "#1e1548" }}>
                                      <PersonAddIcon style={{ width: 20 }} />
                                    </small>
                                  </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                              ) : ami == 1 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                      title="retirer l'invitation"
                                      aria-label="retirer l'invitation"
                                    
                                    >
                                  <ButtonBase
                                    onClick={() => {
                                      setRequestRRF(true)
                                    }}
                                  >
                                    <small style={{ color: "#1e1548" }}>
                                      <PersonAddDisabledIcon
                                        style={{ width: 20 }}
                                      />
                                    </small>
                                  </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                              ) : ami == 2 ? (
                                <GridItem
                                  xs={4}
                                  sm={4}
                                  md={4}
                                  style={{ textAlign: "center" }}
                                >
                                  <Tooltip
                                    title="retirer de la liste d'amis"
                                    aria-label="retirer de la liste d'amis"
                                   
                                  >
                                    <ButtonBase
                                      onClick={() => {
                                        setRequestRF(true)
                                      }}
                                    >
                                      <small style={{ color: "#1e1548" }}>
                                        <PersonIcon
                                          style={{ width: 20 }}
                                        />
                                      </small>
                                    </ButtonBase>
                                  </Tooltip>
                                </GridItem>
                                ) : (
                                  <GridItem
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <Tooltip
                                      title="accepter l'invitation"
                                      aria-label="accepter l'invitation"
                                    
                                    >
                                      <ButtonBase
                                        onClick={() => {
                                          setAccepteRequestF(true)
                                        }}
                                      >
                                        <small style={{ color: "#1e1548" }}>
                                          <CheckCircleOutlineIcon
                                            style={{ width: 20 }}
                                          />
                                        </small>
                                      </ButtonBase>
                                  </Tooltip>
                              </GridItem>
                            )}
                            </GridContainer>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={10} sm={10} md={10} style={{ marginTop: -30 }}>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={search}
                      onChange={(search, event) => {
                        setSearch(search.target.value);
                        window.scrollTo(0, 0);
                      }}
                      inputProps={{
                        endAdornment: (
                          <ButtonBase
                            onClick={subscriber.next({ search: search })}
                          >
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
            )}
            <Snackbar
              open={requestF}
              autoHideDuration={8000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                action={
                  <div>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={() => {
                        requestFriend(view);
                      }}
                    >
                      OUI
                    </Buttons>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={handleClose}
                    >
                      NON
                    </Buttons>
                  </div>
                }
              >
                Voulez vous envoyer une invitation ?
              </Alert>
            </Snackbar>
            <Snackbar
              open={requestRF}
              autoHideDuration={8000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                action={
                  <div>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={() => {
                        removeRequestFriend(view);
                      }}
                    >
                      OUI
                    </Buttons>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={handleClose}
                    >
                      NON
                    </Buttons>
                  </div>
                }
              >
                Voulez vous retirer de votre liste d'amis ?
              </Alert>
            </Snackbar>
            <Snackbar
              open={requestRRF}
              autoHideDuration={8000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                action={
                  <div>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={() => {
                        removeRequestFriend(view);
                      }}
                    >
                      OUI
                    </Buttons>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={handleClose}
                    >
                      NON
                    </Buttons>
                  </div>
                }
              >
                 Voulez vous annuler l'invitation ?
              </Alert>
            </Snackbar>
            <Snackbar
              open={accepteRequestF}
              autoHideDuration={8000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                action={
                  <div>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={() => {
                        accepteRequestFriend(view);
                      }}
                    >
                      ACCEPTER
                    </Buttons>
                    <Buttons
                      color="inherit"
                      size="small"
                      onClick={() => {
                        removeRequestFriend(view);
                      }}
                    >
                      REFUSER
                    </Buttons>
                  </div>
                }
              >
                Voulez vous vraiment
              </Alert>
            </Snackbar>
          </GridItem>
          {isMobile ? (
            <GridItem xs={12} sm={12} md={9} position="center">
              <div>
                <MonReseau />
              </div>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={9} position="end">
              <MonReseau />
            </GridItem>
          )}
        </GridContainer>
      </div>
    </div>
  );
}
