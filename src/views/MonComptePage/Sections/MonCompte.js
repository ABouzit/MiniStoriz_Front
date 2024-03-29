import React from "react";
import PropTypes from "prop-types";
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
import Avatar from "@material-ui/core/Avatar";
//scroll bare text
import CustomInput from "components/CustomInput/CustomInput.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import { subscriber, messageService } from "./../../../services/messageService";
import { Redirect } from "react-router-dom";
import { Base64 } from "js-base64";
import { isMobile } from "react-device-detect";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as firebase from "firebase/app";
import "firebase/database";
class MonCompte extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      ville: "",
      redirect: 0,
      userLocal: "",
      idUser: "",
      noteDessinMoy: 0,
      noteTextMoy: 0,
      imgProfil: "",
      dataImgProfil: "",
      lienImgProfil: "",
      imgCov: "",
      dataImgCov: "",
      lienImgCov: "",
      change: false,
      testNextText: 0,
      nom: "",
      prenom: "",
      mail: "",
      ville: "",
      pseudo: "",
      changement: false,
      updatePseudo: false,
      updateNom: false,
      updatePrenom: false,
      updateMail: false,
      updatePassword: false,
      updateVille: false,
      updatePhoto: 0,
      updatePhotoCov: 0,
      password: "",
      passwordA: "",
      Npassword: "",
      Rpassword: "",
      checkPassword: 0,
      checkAPassword: 0,
      user: {},
      lienInputUpload: "",
      ratingText: 0,
      ratingDessin: 0
    };
    this.checkPass = this.checkPass.bind(this);
    this.checkAPass = this.checkAPass.bind(this);
    this.saveUsers = this.saveUsers.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    } else {
      this.setState({ idUser: user.id, userLocal: user }, () => {
        this.fetchUser();
        this.forceUpdate();
      });
    }
    subscriber.subscribe(v => {
      if (v.profil instanceof Blob) {
        this.savePhotoProfil(v.profil);
      }
      if (v.couverture instanceof Blob) {
        this.savePhotoCov(v.couverture);
      }
      if (v.desactive == true) {
        console.log("push2");
        this.demandeDesactive();
      }
      if (v.desactive == false) {
        console.log("push2");
        this.annulerDemandeDesactive();
      }
    });
  }
  demandeDesactive() {
    console.log("push3");
    let us = this.state.user;
    us.demandeResignation = true;
    console.log(us)
    Axios.put(config.API_URL + "users/demandeResignation", us).then((res) => {
      subscriber.next({ user: us });
      this.forceUpdate();
    });
    firebase
      .database()
      .ref("activeUsers/" + us.id)
      .set({
        stat: "DEMANDEDESACTIVE",
        numbe: 100000 + Math.random() * (100000 - 1),
      });
  }
  annulerDemandeDesactive() {
    console.log("push4");
    let us = this.state.user;
    us.demandeResignation = false;
     console.log(us);
    Axios.put(config.API_URL + "users/demandeResignation", us).then((res) => {
      subscriber.next({ user: us });
      this.forceUpdate();
    });
    firebase
      .database()
      .ref("activeUsers/" + us.id)
      .set({
        stat: "ACTIVE",
        numbe: 100000 + Math.random() * (100000 - 1),
      });
  }
  checkPass() {
    if (this.state.Npassword == this.state.Rpassword) {
      this.setState({ checkPassword: 1 });
      this.forceUpdate();
    } else {
      this.setState({ checkPassword: 0, change: false });
      this.forceUpdate();
    }
  }
  checkAPass() {
    if (this.state.password == this.state.passwordA) {
      this.setState({ checkAPassword: 1 });
      this.forceUpdate();
    } else {
      this.setState({ checkAPassword: 0, change: false });
      this.forceUpdate();
    }
  }

  // save image histoire
  savePhotoProfil(file) {
    this.setState({
      lienInputUpload: file.name,
      change: true,
      updatePhoto: 1
    });
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    let data = new FormData();
    data.append("file", file);
    reader.onloadend = function(e) {
      this.setState(
        {
          imgProfil: [reader.result],
          dataImgProfil: data,
          lienImgProfil: config.API_URL + "images/photoProfile/" + file.name
        },
        () => {
          subscriber.next({ imgProfil: this.state.imgProfil });
          console.log(reader.result);
        }
      );
    }.bind(this);
    console.log(file.name); // Would see a path?
  }
  savePhotoCov(file) {
    this.setState({
      lienInputUpload: file.name,
      change: true,
      updatePhotoCov: 1
    });
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    let data = new FormData();
    data.append("file", file);
    reader.onloadend = function(e) {
      this.setState(
        {
          imgCov: [reader.result],
          dataImgCov: data,
          lienImgCov: "images/photoProfile/" + file.name
        },
        () => {
          subscriber.next({ imgCov: this.state.imgCov });
        }
      );
    }.bind(this);
    // console.log(file.name); // Would see a path?
  }
  fetchUser() {
    Axios.get(config.API_URL + "users/" + this.state.idUser, {}).then(res => {
      this.setState(
        {
          user: res.data[0],
          nom: res.data[0].nom,
          prenom: res.data[0].prenom,
          mail: res.data[0].email,
          password: Base64.decode(res.data[0].motDePasse),
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
  saveUsers() {
    const _this = this;
    if (_this.state.pseudo !== _this.state.user.pseudo) {
      _this.state.user.pseudo = _this.state.pseudo;
    }
    if (_this.state.nom !== _this.state.user.nom) {
      _this.state.user.nom = _this.state.nom;
    }
    if (_this.state.prenom !== _this.state.user.prenom) {
      _this.state.user.prenom = _this.state.prenom;
    }
    if (_this.state.mail !== _this.state.user.mail) {
      _this.state.user.mail = _this.state.mail;
    }
    if (Base64.encode(_this.state.password) !== _this.state.user.motDePasse) {
      _this.state.user.motDePasse = Base64.encode(_this.state.password);
      console.log(_this.state.user.password);
    }
    if (_this.state.ville !== _this.state.user.ville) {
      _this.state.user.ville = _this.state.ville;
    }
    if (_this.state.updatePhotoCov == 1 && _this.state.updatePhoto == 0) {
      _this.setState({ changement: true }, () => {
        _this.forceUpdate();
      });
      return Axios.post(
        config.API_URL + "sendImage/photoProfile/",
        this.state.dataImgCov
      ).then(res => {
        let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
        _this.state.user.lienCouverture = config.API_URL + s;
        return Axios.put(config.API_URL + "users", _this.state.user)
          .then(res => {
            _this.fetchUser();
            const user = _this.state.userLocal;
            user.lienPhoto = _this.state.lienImgProfil;
            user.pseudo = _this.state.pseudo;
            _this.setState(
              { change: false, userLocal: user, changement: false },
              () => {
                localStorage.setItem(
                  "user",
                  JSON.stringify(_this.state.userLocal)
                );
                subscriber.next("change");
                _this.forceUpdate();
              }
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
    if (_this.state.updatePhoto == 1) {
      _this.setState({ changement: true }, () => {
        _this.forceUpdate();
      });
      return Axios.post(
        config.API_URL + "sendImage/photoProfile/",
        this.state.dataImgProfil
      ).then(res => {
        let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
        _this.state.user.lienPhoto = config.API_URL + s;
        return Axios.put(config.API_URL + "users", _this.state.user)
          .then(res => {
            if (_this.state.updatePhotoCov == 1) {
              return Axios.post(
                config.API_URL + "sendImage/photoProfile/",
                this.state.dataImgCov
              ).then(res => {
                let c = res.data.filePath.replace("\\", "/").replace("\\", "/");
                _this.state.user.lienCouverture = config.API_URL + c;
                return Axios.put(config.API_URL + "users", _this.state.user)
                  .then(res => {
                    _this.fetchUser();
                    const user = _this.state.userLocal;
                    user.lienPhoto = config.API_URL + s;
                    user.pseudo = _this.state.pseudo;
                    _this.setState(
                      { change: false, userLocal: user, changement: false },
                      () => {
                        localStorage.setItem(
                          "user",
                          JSON.stringify(_this.state.userLocal)
                        );
                        subscriber.next("change");
                        _this.forceUpdate();
                      }
                    );
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              });
            } else {
              _this.fetchUser();
              const user = _this.state.userLocal;
              user.lienPhoto = config.API_URL + s;
              user.pseudo = _this.state.pseudo;
              _this.setState(
                { change: false, userLocal: user, changement: false },
                () => {
                  localStorage.setItem(
                    "user",
                    JSON.stringify(_this.state.userLocal)
                  );
                  subscriber.next("change");
                  _this.forceUpdate();
                }
              );
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    } else {
      return Axios.put(config.API_URL + "users", _this.state.user)
        .then(res => {
          console.log(res);
          _this.fetchUser();
          const user = _this.state.userLocal;
          user.pseudo = _this.state.pseudo;
          _this.setState({ change: false, userLocal: user }, () => {
            localStorage.setItem("user", JSON.stringify(_this.state.userLocal));
            subscriber.next("change");
            _this.forceUpdate();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    if (this.state.redirect == 1) {
      return <Redirect to="/Connexion" />;
    }
    return (
      <div className={classes.section} style={{ paddingTop: 0 }}>
        {/* <GridContainer
          justify="center"
          spacing={2}
          style={{ color: "#3C4858" }}
        >
          <GridItem xs={6} sm={6} md={5}>
            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={12}
                justify="center"
                style={{ textAlign: "-webkit-center" }}
              >
                {this.state.imgProfil == "" ? (
                  <Avatar
                    alt=""
                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                    style={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Avatar
                    alt=""
                    src={this.state.imgProfil}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <h5
                  style={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    marginTop: 30
                  }}
                >
                  Photo de profil 
                </h5>
                <Input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={file => this.savePhotoProfil(file.target.files)}
                ></Input>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="white" component="span">
                    Choisir une image
                  </Button>
                </label>
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem xs={6} sm={6} md={5}>
            <GridContainer justify="center" style={{ marginTop: 50 }}>
              <GridItem xs={12} sm={12} md={12}>
                <p style={{ fontWeight: "bold" }}>
                  {this.state.numberHistoireText + " Histoires"}
                </p>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={
                    this.state.noteTextMoy
                      ? parseFloat(
                          Math.round(this.state.noteTextMoy * 100) / 100
                        ).toFixed(2) + "/5"
                      : 0
                  }
                >
                  <ButtonBase>
                    <StyledRating
                      name="read-only"
                      value={
                        this.state.noteTextMoy ? this.state.noteTextMoy : 0
                      }
                      emptyIcon={
                        <StarBorderIcon style={{ fontSize: "50px" }} />
                      }
                      precision={0.5}
                      readOnly
                    />
                  </ButtonBase>
                </Tooltip>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
                <p style={{ fontWeight: "bold" }}>
                  {this.state.numberHistoireDessin + " Dessins"}
                </p>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={
                    this.state.noteDessinMoy
                      ? parseFloat(
                          Math.round(this.state.noteDessinMoy * 100) / 100
                        ).toFixed(2) + "/5"
                      : 0
                  }
                >
                  <ButtonBase>
                    <StyledRating
                      name="read-only"
                      value={
                        this.state.noteDessinMoy ? this.state.noteDessinMoy : 0
                      }
                      emptyIcon={
                        <StarBorderIcon style={{ fontSize: "50px" }} />
                      }
                      precision={0.5}
                      readOnly
                    />
                  </ButtonBase>
                </Tooltip>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer> */}

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card style={{ backgroundColor: "#fff" }}>
              <CardBody>
                <GridContainer justify="flex-end">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Pseudo
                    </span>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updatePseudo ? (
                      <CustomInput
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.pseudo}
                        value={this.state.pseudo}
                        onChange={(pseudo, event) => {
                          this.setState({
                            pseudo: pseudo.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePseudo: false
                                });
                                if (
                                  this.state.pseudo !== this.state.user.pseudo
                                ) {
                                  this.setState({
                                    change: true
                                  });
                                }
                              }}
                            >
                              <InputAdornment position="end">
                                {this.state.pseudo.length > 2 && this.state.pseudo.length < 13 ? (
                                <DoneOutlineIcon style={{ color: "black" }} />
                                ):(<div></div>)}
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.pseudo}
                        value={this.state.pseudo}
                        onChange={(pseudo, event) => {
                          this.setState({
                            pseudo: pseudo.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePseudo: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Nom
                    </span>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updateNom ? (
                      <CustomInput
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.nom}
                        value={this.state.nom}
                        onChange={(nom, event) => {
                          this.setState({
                            nom: nom.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateNom: false
                                });
                                if (this.state.nom !== this.state.user.nom) {
                                  this.setState({
                                    change: true
                                  });
                                }
                              }}
                            >
                              <InputAdornment position="end">
                                {this.state.nom.length > 2 && this.state.nom.length < 16 ? (
                                <DoneOutlineIcon style={{ color: "black" }} />):(<div></div>)}
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.nom}
                        value={this.state.nom}
                        onChange={(nom, event) => {
                          this.setState({
                            nom: nom.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateNom: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Prénom
                    </span>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updatePrenom ? (
                      <CustomInput
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.prenom}
                        value={this.state.prenom}
                        onChange={(prenom, event) => {
                          this.setState({
                            prenom: prenom.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePrenom: false
                                });
                                if (
                                  this.state.prenom !== this.state.user.prenom
                                ) {
                                  this.setState({
                                    change: true
                                  });
                                }
                              }}
                            >
                              <InputAdornment position="end">
                              {this.state.prenom.length > 2 && this.state.prenom.length < 16 ? (
                                <DoneOutlineIcon style={{ color: "black" }} />):(<div></div>)}
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.prenom}
                        value={this.state.prenom}
                        onChange={(prenom, event) => {
                          this.setState({
                            prenom: prenom.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePrenom: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Adresse mail
                    </span>
                  </GridItem>
                  {this.state.user.motDePasse !== null && this.state.password !== "ée" ? (
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updateMail ? (
                      <CustomInput
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.mail}
                        value={this.state.mail}
                        onChange={(mail, event) => {
                          this.setState({
                            mail: mail.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateMail: false
                                });
                                if (this.state.mail !== this.state.user.mail) {
                                  this.setState({
                                    change: true
                                  });
                                }
                              }}
                            >
                              <InputAdornment position="end">
                                <DoneOutlineIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.mail}
                        value={this.state.mail}
                        onChange={(mail, event) => {
                          this.setState({
                            mail: mail.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateMail: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  ):(
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.mail}
                        value={this.state.mail}
                        onChange={(mail, event) => {
                          this.setState({
                            mail: mail.target.value
                          });
                        }}
                      />
                  </GridItem>  
                  )}
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Ville
                    </span>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updateVille ? (
                      <CustomInput
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.ville}
                        value={this.state.ville}
                        onChange={(ville, event) => {
                          this.setState({
                            ville: ville.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateVille: false
                                });
                                if (
                                  this.state.ville !== this.state.user.ville
                                ) {
                                  this.setState({
                                    change: true
                                  });
                                }
                              }}
                            >
                              <InputAdornment position="end">
                              {this.state.ville.length > 2 && this.state.ville.length < 16 ? (
                                <DoneOutlineIcon style={{ color: "black" }} />):(<div></div>)}
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.ville}
                        value={this.state.ville}
                        onChange={(ville, event) => {
                          this.setState({
                            ville: ville.target.value
                          });
                        }}
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updateVille: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  {this.state.user.motDePasse !== null && this.state.password !== "ée" ? (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ textAlign: "left" }}
                  >
                    <span
                      style={{
                        fontFamily: "goudy",
                        color: "#1e1548",
                        fontSize: "large"
                      }}
                    >
                      Mot de passe
                    </span>
                  </GridItem>
                  ) : (<div></div>)}
                  {this.state.user.motDePasse !== null && this.state.password !== "ée" ? (
                  <GridItem xs={12} sm={12} md={6}>
                    {this.state.updatePassword ? (
                      <GridContainer justify="flex-end">
                        <GridItem xs={12} sm={12} md={12}>
                          {this.state.checkAPassword == 1 ? (
                            <CustomInput
                              success
                              labelText="Mot de passe actuel"
                              type="password"
                              id="material"
                              formControlProps={{
                                fullWidth: true
                              }}
                              defaultValue={this.state.passwordA}
                              value={this.state.passwordA}
                              onChange={(passwordA, event) => {
                                this.setState(
                                  {
                                    passwordA: passwordA.target.value
                                  },
                                  () => {
                                    this.checkAPass();
                                  }
                                );
                              }}
                              inputProps={{
                                endAdornment: (
                                  <ButtonBase
                                    onClick={() => {
                                      this.setState({
                                        updatePassword: false
                                      });
                                      if (
                                        this.state.checkPassword == 1 &&
                                        this.state.checkAPassword == 1
                                      ) {
                                        this.setState({
                                          change: true,
                                          password: this.state.Npassword
                                        });
                                      }
                                    }}
                                  >
                                    <InputAdornment position="end">
                                    {this.state.Npassword.length > 5 ? (
                                      <DoneOutlineIcon
                                        style={{ color: "black" }}
                                      />):(<div></div>)}
                                    </InputAdornment>
                                  </ButtonBase>
                                )
                              }}
                            />
                          ) : (
                            <CustomInput
                              labelText="Mot de passe actuel"
                              type="password"
                              id="material"
                              formControlProps={{
                                fullWidth: true
                              }}
                              defaultValue={this.state.passwordA}
                              value={this.state.passwordA}
                              onChange={(passwordA, event) => {
                                this.setState(
                                  {
                                    passwordA: passwordA.target.value
                                  },
                                  () => {
                                    this.checkAPass();
                                  }
                                );
                              }}
                              inputProps={{
                                endAdornment: (
                                  <ButtonBase
                                    onClick={() => {
                                      this.setState({
                                        updatePassword: false
                                      });
                                      if (
                                        this.state.checkPassword == 1 &&
                                        this.state.checkAPassword == 1
                                      ) {
                                        this.setState({
                                          change: true,
                                          password: this.state.Npassword
                                        });
                                      }
                                    }}
                                  >
                                    <InputAdornment position="end">
                                    {this.state.Npassword.length > 5 ? (
                                      <DoneOutlineIcon
                                        style={{ color: "black" }}
                                      />):(<div></div>)}
                                    </InputAdornment>
                                  </ButtonBase>
                                )
                              }}
                            />
                          )}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Nouveau mot de passe"
                            type="password"
                            id="material"
                            formControlProps={{
                              fullWidth: true
                            }}
                            defaultValue={this.state.Npassword}
                            value={this.state.Npassword}
                            onChange={(Npassword, event) => {
                              this.setState(
                                {
                                  Npassword: Npassword.target.value
                                },
                                () => {
                                  this.checkPass();
                                }
                              );
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          {this.state.checkPassword == 1 ? (
                            <CustomInput
                              success
                              labelText="Répétez mot de passe"
                              type="password"
                              id="material"
                              formControlProps={{
                                fullWidth: true
                              }}
                              defaultValue={this.state.Rpassword}
                              value={this.state.Rpassword}
                              onChange={(Rpassword, event) => {
                                this.setState(
                                  {
                                    Rpassword: Rpassword.target.value
                                  },
                                  () => {
                                    this.checkPass();
                                  }
                                );
                              }}
                            />
                          ) : (
                            <CustomInput
                              labelText="Répétez mot de passe"
                              type="password"
                              id="material"
                              formControlProps={{
                                fullWidth: true
                              }}
                              defaultValue={this.state.Rpassword}
                              value={this.state.Rpassword}
                              onChange={(Rpassword, event) => {
                                this.setState(
                                  {
                                    Rpassword: Rpassword.target.value
                                  },
                                  () => {
                                    this.checkPass();
                                  }
                                );
                              }}
                            />
                          )}
                        </GridItem>
                      </GridContainer>
                    ) : this.state.checkPassword == 1 &&
                      this.state.checkAPassword == 1 ? (
                      <CustomInput
                        success
                        labelText="Nouveau mot de passe"
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.password}
                        value={this.state.password}
                        onChange={(password, event) => {
                          this.setState({
                            password: password.target.value
                          });
                        }}
                        type="password"
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePassword: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    ) : (
                      <CustomInput
                        readOnly={true}
                        id="material"
                        formControlProps={{
                          fullWidth: true
                        }}
                        defaultValue={this.state.password}
                        value={this.state.password}
                        onChange={(password, event) => {
                          this.setState({
                            password: password.target.value
                          });
                        }}
                        type="password"
                        inputProps={{
                          endAdornment: (
                            <ButtonBase
                              onClick={() => {
                                this.setState({
                                  updatePassword: true
                                });
                              }}
                            >
                              <InputAdornment position="end">
                                <EditIcon style={{ color: "black" }} />
                              </InputAdornment>
                            </ButtonBase>
                          )
                        }}
                      />
                    )}
                  </GridItem>
                  ) : (<div></div>)}
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" style={{ marginTop: 10 }}>
          <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
            {this.state.changement == false ? (
              <Button
                color="white"
                onClick={() => {
                  this.saveUsers();
                }}
                style={{ backgroundColor: "#1e1548", fontWeight: "bold", color: 'white' }}
                disabled={this.state.change ? false : true}
              >
                Valider
              </Button>
            ) : (
              <CircularProgress style={{ color: "#1e1548" }} />
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
const StyledRating = withStyles({
  decimal: { display: "flex" },
  iconFilled: {
    color: "#ffb400",
    fontSize: "50px"
  },
  iconHover: {
    color: "#ffb400",
    fontSize: "50px"
  }
})(Rating);

MonCompte.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MonCompte);
