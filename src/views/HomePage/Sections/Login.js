import React from "react";
import PropTypes, { string } from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CardBody from "components/Card/CardBody.js";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import { makeStyles } from "@material-ui/core/styles";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import Avatar from "@material-ui/core/Avatar";
//scroll bare text
import CustomInput from "components/CustomInput/CustomInput.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import { subscriber, messageService } from "../../../services/messageService";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Base64 } from "js-base64";
import { Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";
import * as firebase from "firebase/app";
import "firebase/database";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Buttons from "@material-ui/core/Button";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      redirect: 0,
      connexion: 1,
      mail: "",
      nom: "",
      prenom: "",
      ville: "",
      pseudo: "",
      loginMethode: 'EMAIL',
      errorMail: false,
      errorNom: false,
      errorPrenom: false,
      errorVille: false,
      errorPseudo: false,
      errorDesactive: false,
      updatePassword: false,
      password: "",
      errorPassword: false,
      Npassword: "",
      errorNPassword: false,
      signUpSuccess: false,
      signinError: false,
      signinPassword: false,
      signinUtilisateur: false,
      alertError: false,
      bloquedUser: false,
      errorLoginFB: false,
      errorLoginGoogle: false,
      newAccount: false,
      bloquedText: "",
      user: ""
    };
    this.handleClose = this.handleClose.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  responseGoogle (response) {
    console.log(response)
    var credential = firebase.auth.GoogleAuthProvider.credential(
      response.tokenId);
      
      Axios.get(config.API_URL + "users/DispoLogin/" + response.profileObj.email, {}).then(res => {
        console.log(res.data)
        if (res.data.length > 0) {
          if (res.data[0].methode == "GOOGLE") {
            this.setState({loginMethode: 'GOOGLE'},() => {
              console.log(credential)
              firebase.auth().signInWithCredential(credential).catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            })
          } else {
            this.setState({errorLoginGoogle: true},()=>{this.forceUpdate()})
          }
        } else {
          this.setState({loginMethode: 'GOOGLE', newAccount: true},() => {
            console.log(credential)
            firebase.auth().signInWithCredential(credential).catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          })
        }
        
      });
  }
  responseFacebook (response) {
    console.log(response)
    var credential = firebase.auth.FacebookAuthProvider.credential(
      response.accessToken);
      Axios.get(config.API_URL + "users/DispoLogin/" + response.email, {}).then(res => {
        
        if (res.data.length > 0) {
          if (res.data[0].methode == "FACEBOOK") {
            this.setState({loginMethode: 'FACEBOOK'},() => {
              firebase.auth().signInWithCredential(credential).catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            })
          } else {
            this.setState({errorLoginFB: true},()=>{this.forceUpdate()})
          }
        } else {
          this.setState({loginMethode: 'FACEBOOK', newAccount: true},() => {
            firebase.auth().signInWithCredential(credential).catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          })
        }
        
      });
      
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    }
    firebase.auth().onAuthStateChanged(users => {
      if (!!users) {
        this.signUpMethod(users)
      }
      
      console.log("user", users)

    })
    
  }
  signUpMethod(user) {
    const _this = this;
    var generator = require("generate-password");
    var methode = this.state.loginMethode;
    var password = generator.generate({
      length: 10,
      numbers: true
    });
    return Axios.post(config.API_URL + "users/signUpMethode", {
      nom: user.displayName.split(" ")[0],
      prenom: user.displayName.split(" ")[1],
      ville: "",
      token: user.refreshToken,
      pseudo: user.displayName.split(" ")[1],
      // pseudo: user.displayName.split(" ")[0].substring(0, 2)+user.displayName.split(" ")[1].substring(0, 5),
      email: user.email,
      lienPhoto: user.photoURL,
      methode: methode
    }).then(res => {
      if (res.data == "exist") {
        _this.setState({ errorMail: true, alertError: true }, () => {
          _this.forceUpdate();
        });
      } else {
        
        firebase
          .database()
          .ref("newUsers")
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data) 
        if (this.state.newAccount) {
          _this.setState({ redirect: 2 }, () => {
            _this.forceUpdate();
          });
        } else {
          _this.setState({ redirect: 1 }, () => {
            _this.forceUpdate();
          });
        }
        
      }
      console.log(res);
    });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      alertError: false,
      signinUtilisateur: false,
      signinError: false,
      signinPassword: false,
      signUpSuccess: false,
      updatePassword: false,
      errorDesactive: false,
      bloquedUser: false,
      errorLoginGoogle: false,
      errorLoginFB: false,
      bloquedText: ""
    });
  };
  fetchUser() {
    Axios.get(config.API_URL + "users/" + this.state.idUser, {}).then(res => {
      this.setState(
        {
          user: res.data[0],
          nom: res.data[0].nom,
          prenom: res.data[0].prenom,
          mail: res.data[0].email,
          password: res.data[0].motDePasse,
          ville: res.data[0].ville,
          pseudo: res.data[0].pseudo,
          noteTextMoy: res.data[0].noteHistoire,
          noteDessinMoy: res.data[0].noteDessin,
          imgProfil: res.data[0].lienPhoto
        },
        () => {
          subscriber.next({ user: this.state.user });
          this.forceUpdate();
        }
      );
    });
    Axios.get(
      config.API_URL +
        "histoires/numberHistoiresTextUsers/" +
        this.state.idUser,
      {}
    ).then(res => {
      this.setState({ numberHistoireText: res.data });
    });
    Axios.get(
      config.API_URL +
        "histoires/numberHistoiresDessinUsers/" +
        this.state.idUser,
      {}
    ).then(res => {
      this.setState({ numberHistoireDessin: res.data });
    });
  }

  changePassword() {
    const _this = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var generator = require("generate-password");

    var password = generator.generate({
      length: 10,
      numbers: true
    });

    var epassword = Base64.encode(password);

    if (!re.test(_this.state.mail)) {
      if (!re.test(_this.state.mail)) {
        _this.setState({ errorPassword: true }, () => {
          this.forceUpdate();
        });
      }
    } else {
      return Axios.post(config.API_URL + "users/changePassword", {
        email: _this.state.mail,
        motDePasse: epassword,
        pseudo: password
      }).then(res => {
        if (res.data == "errorUtilisateur") {
          _this.setState({ errorMail: true, signinUtilisateur: true }, () => {
            _this.forceUpdate();
          });
        } else {
          _this.setState({ errorMail: true, updatePassword: true }, () => {
            _this.forceUpdate();
          });
        }
        console.log(res);
      });
    }
  }
  checkLogin() {
    const _this = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (_this.state.password.length < 6 || !re.test(_this.state.mail)) {
      if (!re.test(_this.state.mail)) {
        _this.setState({ errorMail: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.password.length < 6) {
        _this.setState({ errorPassword: true }, () => {
          this.forceUpdate();
        });
      }
    } else {
      return Axios.post(config.API_URL + "users/signin", {
        email: _this.state.mail,
        motDePasse: Base64.encode(_this.state.password)
      }).then(res => {
        if (res.data == "errorPassword") {
          _this.setState({ errorPassword: true, signinPassword: true }, () => {
            _this.forceUpdate();
          });
        } else if (res.data == "errorUtilisateur") {
          _this.setState(
            { errorMail: true, errorPassword: true, signinUtilisateur: true },
            () => {
              _this.forceUpdate();
            }
          );
        } else if (res.data == "errorActivation") {
          _this.setState(
            { errorMail: true, errorPassword: true, signinError: true },
            () => {
              _this.forceUpdate();
            }
          );
        } else if (
          typeof res.data == "string" &&
          res.data.indexOf("vous avez ete bloquee jusqu'au ") > -1
        ) {
          _this.setState({ bloquedUser: true, bloquedText: res.data }, () => {
            _this.forceUpdate();
          });
        } else if (
          typeof res.data == "object" &&
          res.data.error == "errorDesactive"
        ) {
          _this.setState(
            {
              user: res.data.user,
              errorDesactive: true
            },
            () => {
              _this.forceUpdate();
            }
          );
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          _this.setState({ redirect: 1 }, () => {
            _this.forceUpdate();
          });
        }
        console.log(res);
      });
    }
  }
  activeCompte() {
    let us = this.state.user;
    us.demandeActivation = true;
    console.log(us);
    Axios.put(config.API_URL + "users/demandeResignation", us).then(res => {
      this.handleClose();
      this.forceUpdate();
      this.setState({ user: "" });
    });
    firebase
      .database()
      .ref("activeUsers/" + us.id)
      .set({
        stat: "DEMANDEACTIVE",
        numbe: 100000 + Math.random() * (100000 - 1)
      });
  }
  signUp() {
    const _this = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      _this.state.nom.length < 1 ||
      _this.state.prenom.length < 1 ||
      _this.state.pseudo.length < 1 ||
      _this.state.ville.length < 1 ||
      !re.test(_this.state.mail) ||
      _this.state.password.length < 6 ||
      _this.state.password !== _this.state.Npassword
    ) {
      if (_this.state.nom.length < 1) {
        this.setState({ errorNom: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.prenom.length < 1) {
        this.setState({ errorPrenom: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.pseudo.length < 1) {
        this.setState({ errorPseudo: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.ville.length < 1) {
        this.setState({ errorVille: true }, () => {
          this.forceUpdate();
        });
      }
      if (!re.test(_this.state.mail)) {
        this.setState({ errorMail: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.password.length < 6) {
        this.setState({ errorPassword: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.password !== _this.state.Npassword) {
        this.setState({ errorPassword: true, errorNPassword: true }, () => {
          this.forceUpdate();
        });
      }
    } else {
      this.setState(
        {
          nom: "",
          prenom: "",
          ville: "",
          pseudo: "",
          errorMail: false,
          errorNom: false,
          errorPrenom: false,
          errorVille: false,
          errorPseudo: false,
          errorPassword: false,
          Npassword: ""
        },
        () => {
          this.forceUpdate();
        }
      );
      return Axios.post(config.API_URL + "users/signup", {
        nom: this.state.nom,
        prenom: this.state.prenom,
        ville: this.state.ville,
        pseudo: this.state.pseudo,
        email: this.state.mail,
        lienPhoto: window.location.host + "/Activation/",
        motDePasse: Base64.encode(this.state.password)
      }).then(res => {
        if (res.data == "exist") {
          _this.setState({ errorMail: true, alertError: true }, () => {
            _this.forceUpdate();
          });
        } else {
          firebase
            .database()
            .ref("newUsers")
            .set({
              numbe: 100000 + Math.random() * (100000 - 1)
            });
          _this.setState({ signUpSuccess: true }, () => {
            _this.forceUpdate();
          });
        }
        console.log(res);
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    
    if (this.state.redirect == 1) {
      return <Redirect to="/" />;
    }
    if (this.state.redirect == 2) {
      return <Redirect to="/MonProfil" />;
    }
    return (
      <div
        className={classes.section}
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes["cardHidden"]} style={{ marginBottom: 0 }}>
              <form className={classes.form}>
                <CardHeader
                  style={{ background: "rgb(47, 153, 177)" }}
                  color="primary"
                  className={classes.cardHeader}
                >
                  {this.state.connexion == 1 ? (
                    <h3 style={{fontFamily: 'playfair'}}>Identification</h3>
                  ) : this.state.connexion == 2 ? (
                    <h3 style={{fontFamily: 'playfair'}}>Réinitialiser votre mot de passe</h3>
                  ) : (
                    <h3 style={{fontFamily: 'playfair'}}>Inscription</h3>
                  )}

                  {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                </CardHeader>
                <p className={classes.divider}></p>
                <CardBody>
                  {this.state.connexion == 1 ? (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        {this.state.errorMail ? (
                          <CustomInput
                            error
                            labelText="Adresse mail "
                            id="email"
                            value={this.state.mail}
                            onChange={mail =>
                              this.setState({
                                mail: mail.target.value,
                                errorMail: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Adresse mail "
                            id="email"
                            value={this.state.mail}
                            onChange={mail =>
                              this.setState({
                                mail: mail.target.value,
                                errorMail: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                        {this.state.errorPassword ? (
                          <CustomInput
                            error
                            labelText="Mot de passe"
                            id="pass"
                            value={this.state.password}
                            onChange={password =>
                              this.setState({
                                password: password.target.value,
                                errorPassword: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "password",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  >
                                  lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off"
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Mot de passe"
                            id="pass"
                            value={this.state.password}
                            onChange={password =>
                              this.setState({
                                password: password.target.value,
                                errorPassword: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "password",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off"
                            }}
                          />
                        )}
                        <Button
                          color="primary"
                          size="md"
                          onClick={() => {
                            this.setState(
                              { errorMail: false, errorPassword: false },
                              () => {
                                this.checkLogin();
                              }
                            );
                          }}
                        >
                          Connexion
                        </Button>
                        <br></br>
                        <ButtonBase
                          onClick={() => {
                            this.setState(
                              {
                                errorMail: false,
                                errorPassword: false,
                                connexion: 2
                              },
                              () => {
                                this.forceUpdate();
                              }
                            );
                          }}
                        >
                          <h6
                            style={{
                              fontFamily: "cursive",
                              fontWeight: "bold",
                              textAlign: "center",
                              fontVariant: "unicase",
                              textDecoration: "underline"
                            }}
                          >
                            Mot de passe oublié ?
                          </h6>
                        </ButtonBase>
                        
                        
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer
                          justify="center"
                          style={{ textAlign: "-webkit-center" }}
                        >
                          {isMobile ? (
                            <Divider />
                          ) : (
                            <Divider orientation="vertical" flexItem />
                          )}

                          <div style={{ width: "100%" }}>
                            <GridItem xs={10} sm={10} md={10}>
                              <h4
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  textAlign: "center"
                                }}
                              >
                                Pas encore inscrit ?
                              </h4>
                            </GridItem>
                            
                            <GridItem
                              xs={12}
                              sm={12}
                              md={12}
                              style={{ textAlign: "center", padding: 0 }}
                            >
                              <FacebookLogin
                                appId="568131850559669"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                cssClass={classes.buttonFB}
                                icon="fa-facebook"
                                textButton = " &nbsp;&nbsp;Se connecter avec Facebook"
                              />
                              <br></br>
                              <GoogleLogin
                                  clientId="1009627651324-o8t6lreolfacffqla6qiekrve6v0tcqb.apps.googleusercontent.com"
                                  buttonText="&nbsp;&nbsp;Se connecter avec Google"
                                  onSuccess={this.responseGoogle}
                                  onFailure={this.responseGoogle}
                                  className={classes.buttonGoogle}
                                  cookiePolicy={'single_host_origin'}
                                />
                            </GridItem>
                            <GridItem
                              xs={10}
                              sm={10}
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              <h4
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  textAlign: "center"
                                }}
                              >
                                <br></br>
                                Ou
                              </h4>
                              <Button
                                color="primary"
                                size="md"
                                onClick={() => {
                                  this.setState(
                                    {
                                      connexion: 3,
                                      errorMail: false,
                                      errorPassword: false
                                    },
                                    () => {
                                      this.forceUpdate();
                                    }
                                  );
                                }}
                              >
                                Je crée mon compte
                              </Button>
                            </GridItem>
                          </div>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  ) : this.state.connexion == 2 ? (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        {this.state.errorMail ? (
                          <CustomInput
                            error
                            labelText="Adresse mail "
                            id="email"
                            value={this.state.mail}
                            onChange={mail =>
                              this.setState({
                                mail: mail.target.value,
                                errorMail: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Adresse mail "
                            id="email"
                            value={this.state.mail}
                            onChange={mail =>
                              this.setState({
                                mail: mail.target.value,
                                errorMail: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}

                        <Button
                          color="primary"
                          size="md"
                          onClick={() => {
                            this.setState(
                              { errorMail: false, errorPassword: false },
                              () => {
                                this.changePassword();
                              }
                            );
                          }}
                        >
                          Réinitialiser
                        </Button>
                        <h4
                          style={{
                            fontFamily: "goudy",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Ou
                        </h4>
                        <Button
                          color="primary"
                          size="md"
                          onClick={() => {
                            this.setState(
                              {
                                errorMail: false,
                                errorPassword: false,
                                connexion: 1
                              },
                              () => {
                                this.forceUpdate();
                              }
                            );
                          }}
                        >
                          Connexion
                        </Button>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer
                          justify="center"
                          style={{ textAlign: "-webkit-center" }}
                        >
                          {isMobile ? (
                            <Divider />
                          ) : (
                            <Divider orientation="vertical" flexItem />
                          )}
                          <div style={{ width: "100%" }}>
                            <GridItem xs={10} sm={10} md={10}>
                              <h4
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  textAlign: "center"
                                }}
                              >
                                Pas encore inscrit ?
                              </h4>
                            </GridItem>
                            
                            <GridItem
                              xs={12}
                              sm={12}
                              md={12}
                              style={{ textAlign: "center", padding: 0 }}
                            >
                              <FacebookLogin
                                appId="568131850559669"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                cssClass={classes.buttonFB}
                                icon="fa-facebook"
                                textButton = " &nbsp;&nbsp;Se connecter avec Facebook"
                              />
                              <br></br>
                              <GoogleLogin
                                  clientId="1009627651324-o8t6lreolfacffqla6qiekrve6v0tcqb.apps.googleusercontent.com"
                                  buttonText="&nbsp;&nbsp;Se connecter avec Google"
                                  onSuccess={this.responseGoogle}
                                  onFailure={this.responseGoogle}
                                  className={classes.buttonGoogle}
                                  cookiePolicy={'single_host_origin'}
                                />
                            </GridItem>
                            <GridItem
                              xs={10}
                              sm={10}
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              <h4
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  textAlign: "center"
                                }}
                              >
                                <br></br>
                                Ou
                              </h4>
                              <Button
                                color="primary"
                                size="md"
                                onClick={() => {
                                  this.setState(
                                    {
                                      connexion: 3,
                                      errorMail: false,
                                      errorPassword: false
                                    },
                                    () => {
                                      this.forceUpdate();
                                    }
                                  );
                                }}
                              >
                                Je crée mon compte
                              </Button>
                            </GridItem>
                          </div>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        {this.state.errorNom ? (
                          <CustomInput
                            error
                            labelText="Nom"
                            id="Nom"
                            value={this.state.nom}
                            onChange={nom =>
                              this.setState({
                                nom: nom.target.value,
                                errorNom: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Nom"
                            id="Nom"
                            value={this.state.nom}
                            onChange={nom =>
                              this.setState({
                                nom: nom.target.value,
                                errorNom: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                        {this.state.errorPrenom ? (
                          <CustomInput
                            error
                            labelText="Prénom"
                            id="Prenom"
                            value={this.state.prenom}
                            onChange={prenom =>
                              this.setState({
                                prenom: prenom.target.value,
                                errorPrenom: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Prénom"
                            id="Prenom"
                            value={this.state.prenom}
                            onChange={prenom =>
                              this.setState({
                                prenom: prenom.target.value,
                                errorPrenom: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                        {this.state.errorPseudo ? (
                          <CustomInput
                            error
                            labelText="Pseudo"
                            id="Pseudo"
                            value={this.state.pseudo}
                            onChange={pseudo =>
                              this.setState({
                                pseudo: pseudo.target.value,
                                errorPseudo: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Pseudo"
                            id="Pseudo"
                            value={this.state.pseudo}
                            onChange={pseudo =>
                              this.setState({
                                pseudo: pseudo.target.value,
                                errorPseudo: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}
                        {this.state.errorVille ? (
                          <CustomInput
                            error
                            labelText="Ville"
                            id="Ville"
                            value={this.state.ville}
                            onChange={ville =>
                              this.setState({
                                ville: ville.target.value,
                                errorVille: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <LocationCityIcon
                                    className={classes.inputIconsColor}
                                    style={{ color: "red" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        ) : (
                          <CustomInput
                            labelText="Ville"
                            id="Ville"
                            value={this.state.ville}
                            onChange={ville =>
                              this.setState({
                                ville: ville.target.value,
                                errorVille: false
                              })
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <LocationCityIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        )}

                        {/* <Button  color="primary" size="md" onClick={()=>{this.setState({errorMail: false, errorPassword: false},
                      ()=>{this.checkLogin()})}}>
                        Connexion
                      </Button> */}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer
                          justify="center"
                          style={{ textAlign: "-webkit-center" }}
                        >
                          {isMobile ? (
                            <Divider />
                          ) : (
                            <Divider orientation="vertical" flexItem />
                          )}
                          <div style={{ width: "90%" }}>
                            <GridItem xs={10} sm={10} md={12}>
                              {this.state.errorMail ? (
                                <CustomInput
                                  error
                                  labelText="Adresse mail "
                                  id="email"
                                  value={this.state.mail}
                                  onChange={mail =>
                                    this.setState({
                                      mail: mail.target.value,
                                      errorMail: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "email",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Email
                                          className={classes.inputIconsColor}
                                          style={{ color: "red" }}
                                        />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              ) : (
                                <CustomInput
                                  labelText="Adresse mail "
                                  id="email"
                                  value={this.state.mail}
                                  onChange={mail =>
                                    this.setState({
                                      mail: mail.target.value,
                                      errorMail: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "email",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Email
                                          className={classes.inputIconsColor}
                                        />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )}
                              {this.state.errorPassword ? (
                                <CustomInput
                                  error
                                  labelText="Mot de passe"
                                  id="pass"
                                  value={this.state.password}
                                  onChange={password =>
                                    this.setState({
                                      password: password.target.value,
                                      errorPassword: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Icon
                                          className={classes.inputIconsColor}
                                          style={{ color: "red" }}
                                        >
                                          lock_outline
                                        </Icon>
                                      </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                  }}
                                />
                              ) : (
                                <CustomInput
                                  labelText="Mot de passe"
                                  id="pass"
                                  value={this.state.password}
                                  onChange={password =>
                                    this.setState({
                                      password: password.target.value,
                                      errorPassword: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Icon
                                          className={classes.inputIconsColor}
                                        >
                                          lock_outline
                                        </Icon>
                                      </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                  }}
                                />
                              )}
                              {this.state.errorNPassword ? (
                                <CustomInput
                                  error
                                  labelText="Répéter mot de passe"
                                  id="pass"
                                  value={this.state.Npassword}
                                  onChange={Npassword =>
                                    this.setState({
                                      Npassword: Npassword.target.value,
                                      errorNPassword: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Icon
                                          className={classes.inputIconsColor}
                                          style={{ color: "red" }}
                                        >
                                          lock_outline
                                        </Icon>
                                      </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                  }}
                                />
                              ) : (
                                <CustomInput
                                  labelText="Répéter mot de passe"
                                  id="pass"
                                  value={this.state.Npassword}
                                  onChange={Npassword =>
                                    this.setState({
                                      Npassword: Npassword.target.value,
                                      errorNPassword: false
                                    })
                                  }
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "password",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Icon
                                          className={classes.inputIconsColor}
                                        >
                                          lock_outline
                                        </Icon>
                                      </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                  }}
                                />
                              )}
                            </GridItem>
                            <GridItem
                              xs={10}
                              sm={10}
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              {/* <h4 style={{fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center'}}><br></br>
                            Ou
                          </h4> */}
                              <Button
                                color="primary"
                                size="md"
                                onClick={() => {
                                  this.signUp();
                                }}
                              >
                                Je crée mon compte
                              </Button>
                            </GridItem>
                            <GridItem
                              xs={10}
                              sm={10}
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              <h5
                                style={{
                                  fontFamily: "goudy",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  marginTop: -14
                                }}
                              >
                                <br></br>
                                Déjà inscrit ?
                              </h5>
                              <Button
                                color="primary"
                                size="md"
                                onClick={() => {
                                  this.setState(
                                    {
                                      connexion: true,
                                      errorMail: false,
                                      errorPassword: false
                                    },
                                    () => {
                                      this.forceUpdate();
                                    }
                                  );
                                }}
                              >
                                Je me connecte
                              </Button>
                            </GridItem>
                          </div>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  )}
                  <Snackbar
                    open={this.state.alertError}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                      Comptes utilisateur existe déjà !
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.errorDesactive}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert
                      onClose={this.handleClose}
                      severity="error"
                      action={
                        <div>
                          <Buttons
                            color="inherit"
                            size="small"
                            onClick={() => {
                              this.activeCompte();
                            }}
                          >
                            OUI
                          </Buttons>
                          <Buttons
                            color="inherit"
                            size="small"
                            onClick={() => {
                              this.handleClose();
                              this.setState({ user: "" });
                            }}
                          >
                            NON
                          </Buttons>
                        </div>
                      }
                    >
                      Voulez vous activer votre compte ?
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.signUpSuccess}
                    autoHideDuration={80000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="success">
                      Votre compte a été crée. Vous recevrez un mail
                      d'activation !
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.signinPassword}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                    Mot de passe incorrect.
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.signinUtilisateur}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                      Comptes utilisateur introuvable !
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.errorLoginFB}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                    Connexion impossible car cette adresse mail est déjà utilisée. 
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.errorLoginGoogle}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                    Connexion impossible car cette adresse mail est déjà utilisée. 
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.bloquedUser}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                      {this.state.bloquedText}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.updatePassword}
                    autoHideDuration={80000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="success">
                      Un nouveau mot de passe sera envoyé à l'adresse
                      électronique que vous nous avez fournie
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={this.state.signinError}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                      Vous N’avez Pas Encore Activé Votre Compte Pour Avoir
                      Accès. Veuillez Vérifier Votre Courriel !
                    </Alert>
                  </Snackbar>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const styles1 = theme => ({
  root: {
    color: "white",
    backgroundColor: "#1f1748"
  },
  customWidth: {
    width: 120
  }
});
Login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);
