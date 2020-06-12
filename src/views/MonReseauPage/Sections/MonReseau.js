import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { Link, withRouter } from "react-router-dom";
// core components
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
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
// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Parallax from "components/Parallax/Parallax.js";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import RoomIcon from "@material-ui/icons/Room";
import EditIcon from "@material-ui/icons/Edit";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from "moment";
// import Pagination from "components/Pagination/Pagination.js";
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TitleIcon from "@material-ui/icons/Title";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import CommentIcon from "@material-ui/icons/Comment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "moment/locale/fr";
import Moment from "moment";
import { subscriber, messageService } from "../../../services/messageService";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import { isMobile } from "react-device-detect";

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      idCurrentUser: "",
      idUser: "",
      page: 1,
      user: "",
      requestFriend: false,
      redirect: 0,
      connected: false,
      deleteRequest: false,
      numberPage: 0,
      search: "",
      selectedFiltre: "",
      showMore: false,
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0,
      users: [],
      histoireUsers: [],
      selectedHistoire: "",
      image: "",
      hidden: false,
      openBackdrop: false
    };

    this.handleOpenBackDrop = this.handleOpenBackDrop.bind(this);
    this.handleCloseBackDrop = this.handleCloseBackDrop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    } else {
      if (typeof this.props.match.params.userId === "undefined") {
        this.setState({ connected: true, idUser: user.id }, () => {
          this.fetchUser();
          this.fetchUsers();
          this.forceUpdate();
        });
      } else {
        this.setState(
          {
            connected: true,
            idUser: this.props.match.params.userId,
            idCurrentUser: user.id
          },
          () => {
            this.fetchUser();
            this.fetchRelation(this.props.match.params.userId);
            this.fetchUsers();
            subscriber.next({ view: this.props.match.params.userId });
            this.forceUpdate();
          }
        );
      }
    }
    subscriber.subscribe(v => {
      this.setState({ search: v.search }, () => {
        this.searchCheck();
      });
    });
  }
  fetchUser() {
    Axios.get(config.API_URL + "users/" + this.state.idUser, {}).then(res => {
      this.setState(
        {
          user: res.data[0]
        },
        () => {
          subscriber.next({ user: this.state.user });
          this.forceUpdate();
        }
      );
    });
  }
  fetchRelation(id) {
    Axios.get(
      config.API_URL +
        "relations/getRelationId/" +
        this.state.idCurrentUser +
        "/" +
        id,
      {}
    ).then(res => {
      console.log(res.data);
      if (res.data > 0) {
        subscriber.next({ ami: true });
        this.forceUpdate();
      }
    });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ requestFriend: false, deleteRequest: false });
  };
  handleChangePage() {
    // this.setState({ page: this.state.page + 1 });
    if (this.state.numberPage > this.state.page * 6) {
      this.setState({ showMore: true });
    } else {
      this.setState({ showMore: false });
    }
  }
  fetchUsers() {
    Axios.get(
      config.API_URL + "users/relations/xxxx/" + this.state.user.id,
      {}
    ).then(res => {
      console.log(res.data.length);
      if (res.data.length > 6) {
        this.setState({
          users: res.data,
          numberPage: res.data.length,
          showMore: true
        });
      } else {
        this.setState({ users: res.data, numberPage: res.data.length });
      }
    });
  }
  deleteRequest(id) {
    if (this.state.idCurrentUser == "") {
      var currentId = this.state.idUser;
    } else {
      var currentId = this.state.idCurrentUser;
    }
    Axios.delete(
      config.API_URL + "relations/between/" + currentId + "/" + id
    ).then(res => {
      firebase
        .database()
        .ref("relations/" + id)
        .set({
          from: currentId,
          to: id,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
      this.searchCheck();
    });
  }
  searchCheck() {
    this.setState({ page: 1 }, () => {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "users/relations/" +
            this.state.search +
            "/" +
            this.state.user.id,
          {}
        ).then(res => {
          this.setState({ users: res.data, numberPage: res.data.length });
        });
      }
      if (this.state.search === "") {
        this.fetchUsers();
      }
    });
  }
  handleVisibility = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleOpenBackDrop = () => {
    this.setState({ openBackdrop: true });
  };

  handleCloseBackDrop = () => {
    this.setState({ openBackdrop: false });
  };

  redirectFunction(index) {
    if (this.state.connected) {
      this.props.history.push("/publier/" + (index + 1));
    } else {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    }
  }

  //modal - carousel
  render() {
    const { settings, modal } = this.state;
    const { classes } = this.props;
    const actions = [
      {
        icon: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BrushIcon
              style={{
                position: "absolute",
                right: 0,
                height: 40,
                width: 18
              }}
            />
            &
            <EditIcon
              style={{ position: "absolute", left: 0, height: 40, width: 18 }}
            />
          </div>
        ),
        name: "Text et Dessins"
      },
      { icon: <BrushIcon />, name: "Dessins uniquement" },
      { icon: <EditIcon />, name: "Texte uniquement" }
    ];

    if (this.state.redirect == 1) {
      return <Redirect to="/Connexion" />;
    }
    if (this.state.histoires !== [])
      return (
        <div className={classes.section} style={{ paddingTop: 0 }}>
          <div className={classes.root}>
            {/* <Backdrop open={this.state.openBackdrop} style={{ zIndex: 2000 }} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              style={{
                position: "fixed",
                bottom: 30,
                right: 30,
                zIndex: 2001
              }}
              hidden={this.state.hidden}
              icon={<SpeedDialIcon />}
              onClose={this.handleCloseBackDrop}
              onOpen={this.handleOpenBackDrop}
              open={this.state.openBackdrop}
            >
              {actions.map((action, index) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={() => this.redirectFunction(index)}
                />
              ))}
            </SpeedDial> */}
          </div>
          <div>
            {this.state.users.length > 0 ? (
            <div>
            <GridContainer justify="center" spacing={"auto"}>
              {this.state.users.map((user, index) => {
                if (
                  index < this.state.page * 6 &&
                  user.id !== this.state.idCurrentUser
                )
                  return (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      justify="center"
                      key={index}
                    >
                      <Card style={{ backgroundColor: "white" }}>
                        <Link to={"/LesOeuvres/" + user.id}>
                          <div>
                            <div
                              style={{
                                height: "170px",
                                width: "100%",
                                textAlign: "center",
                                display: "block",
                              }}
                            >
                              <Parallax
                                image={
                                  user.lienCouverture !== null
                                    ? user.lienCouverture
                                    : config.API_URL + "images/asset/bg1.jpg"
                                }
                                style={{
                                  height: "170px",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  display: "block",
                                  borderTopLeftRadius: 6,
                                  borderTopRightRadius: 6,
                                }}
                              ></Parallax>
                              <div
                                style={{
                                  textAlign: "-webkit-center",
                                  position: "absolute",
                                  top: 100,
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
                                )}
                              </div>
                              {/* <img
                              style={{
                                height: "240px",
                                maxWidth: "320px",
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "block"
                              }}
                              className={classes.imgCardTop}
                              src={
                                histoire.lienIllustration !== null
                                  ?  histoire.lienIllustration
                                  : ""
                              }
                              alt={histoire.titreHistoire}
                            /> */}
                            </div>

                            <h5
                              style={{
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                color: "black",
                                marginLeft: "5%",
                                textAlign: "left",
                              }}
                            >
                              {user.pseudo}
                              {/* {histoire.nombreVue ? histoire.nombreVue : 0} vues -{" "}
                            {this.getDay(histoire.dateDeCreation)} */}
                            </h5>
                            <div style={{ display: "flex" }}>
                              <h6
                                style={{
                                  fontFamily: "monospace",
                                  color: "black",
                                  marginLeft: "5%",
                                  width: "50%",
                                  textAlign: "left",
                                }}
                              >
                                {user.nom + " " + user.prenom}
                                {/* {this.getDay()} */}
                              </h6>
                              <h6
                                style={{
                                  fontFamily: "monospace",
                                  color: "black",
                                  marginLeft: "5%",
                                  width: "50%",
                                  marginTop: 0,
                                  textAlign: "center",
                                }}
                              >
                                <RoomIcon style={{ height: 20 }} /> {user.ville}
                                {/* {this.getDay()} */}
                              </h6>
                            </div>
                            <CardBody>
                              <Divider />
                              <GridContainer style={{ marginTop: "4%" }}>
                                <GridItem xs={6} sm={6} md={6}>
                                  <GridContainer>
                                    <GridItem xs={4} sm={4} md={4}>
                                      <div
                                        style={{ height: 40, paddingTop: 8 }}
                                      >
                                        <CreateIcon
                                          style={{ width: 20, color: "black" }}
                                        />
                                      </div>
                                    </GridItem>
                                    <GridItem xs={8} sm={8} md={8}>
                                      <h6
                                        style={{
                                          fontFamily: "monospace",
                                          color: "black",
                                          fontWeight: "bold",
                                          marginLeft: "5%",
                                          textAlign: "left",
                                        }}
                                      >
                                        Histoire
                                      </h6>
                                    </GridItem>
                                  </GridContainer>
                                </GridItem>
                                <GridItem
                                  xs={3}
                                  sm={3}
                                  md={3}
                                  style={{ textAlign: "right" }}
                                >
                                  <h6
                                    style={{
                                      fontFamily: "monospace",
                                      color: "black",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    {user.nombreHistoire}
                                  </h6>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <div style={{ width: 40 }}>
                                    <Tooltip
                                      disableFocusListener
                                      disableTouchListener
                                      title={
                                        user.noteHistoire
                                          ? parseFloat(
                                              Math.round(
                                                user.noteHistoire * 100
                                              ) / 100
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
                                            Math.round(
                                              user.noteHistoire * 100
                                            ) / 100
                                          ).toFixed(2)}
                                          text={parseFloat(
                                            Math.round(
                                              user.noteHistoire * 100
                                            ) / 100
                                          ).toFixed(1)}
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
                                                Math.round(
                                                  user.noteHistoire * 100
                                                ) / 100
                                              ).toFixed(1)}
                                            </p>
                                          </div>
                                        </CircularProgressbarWithChildren>
                                      </ButtonBase>
                                    </Tooltip>
                                  </div>
                                </GridItem>
                              </GridContainer>
                              <Divider style={{ marginTop: "4%" }} />
                              <GridContainer style={{ marginTop: "4%" }}>
                                <GridItem xs={6} sm={6} md={6}>
                                  <GridContainer>
                                    <GridItem xs={4} sm={4} md={4}>
                                      <div
                                        style={{ height: 40, paddingTop: 8 }}
                                      >
                                        <BrushIcon
                                          style={{ width: 20, color: "black" }}
                                        />
                                      </div>
                                    </GridItem>
                                    <GridItem xs={8} sm={8} md={8}>
                                      <h6
                                        style={{
                                          fontFamily: "monospace",
                                          color: "black",
                                          fontWeight: "bold",
                                          marginLeft: "5%",
                                          textAlign: "left",
                                        }}
                                      >
                                        Dessin
                                      </h6>
                                    </GridItem>
                                  </GridContainer>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <h6
                                    style={{
                                      fontFamily: "monospace",
                                      color: "black",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    {user.nombreDessin}
                                  </h6>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <div style={{ width: 40 }}>
                                    <Tooltip
                                      disableFocusListener
                                      disableTouchListener
                                      title={
                                        user.noteDessin
                                          ? parseFloat(
                                              Math.round(
                                                user.noteDessin * 100
                                              ) / 100
                                            ).toFixed(2) + "/5"
                                          : 0
                                      }
                                    >
                                      <ButtonBase>
                                        <CircularProgressbarWithChildren
                                          text={parseFloat(
                                            Math.round(user.noteDessin * 100) /
                                              100
                                          ).toFixed(1)}
                                          maxValue={5}
                                          minValue={0}
                                          strokeWidth={3}
                                          value={parseFloat(
                                            Math.round(user.noteDessin * 100) /
                                              100
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
                                                Math.round(
                                                  user.noteDessin * 100
                                                ) / 100
                                              ).toFixed(1)}
                                            </p>
                                          </div>
                                        </CircularProgressbarWithChildren>
                                      </ButtonBase>
                                    </Tooltip>
                                  </div>
                                </GridItem>
                              </GridContainer>
                            </CardBody>
                          </div>
                        </Link>
                        <Divider />

                        <GridContainer
                          justify="center"
                          style={{ marginTop: 8 }}
                        >
                          <GridItem xs={4} sm={4} md={4}>
                            <Link to={"/Message/" + user.id}>
                              <small style={{ color: "#1e1548" }}>
                                <ForumRoundedIcon style={{ width: 20 }} />
                              </small>
                            </Link>
                          </GridItem>
                          <GridItem
                            xs={4}
                            sm={4}
                            md={4}
                            style={{ textAlign: "center" }}
                          >
                            <ButtonBase
                              onClick={() => {
                                this.deleteRequest(user.id);
                              }}
                            >
                              <small style={{ color: "#1e1548" }}>
                                <PersonAddDisabledIcon style={{ width: 20 }} />
                              </small>
                            </ButtonBase>
                          </GridItem>
                        </GridContainer>
                      </Card>
                    </GridItem>
                  );
              })}
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={4} sm={4} md={4}>
                {this.state.showMore ? (
                  <Tooltip
                    title="plus de résultats"
                    aria-label="plus de résultats"
                    onClick={() => {
                      this.setState({ page: this.state.page + 1 }, () => {
                        this.handleChangePage();
                      });
                    }}
                  >
                    <Fab
                      className={classes.fab}
                      style={{
                        color: "white",
                        backgroundColor: "#1f1748"
                      }}
                    >
                      <MoreHorizIcon />
                    </Fab>
                  </Tooltip>
                ) : null}
              </GridItem>
            </GridContainer>
            </div>
            ):(
              <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={4}
                justify="center"
                style={isMobile? { width: "auto",marginTop: 10 }:{ width: "auto",marginTop: 100 }}
              >
                <SnackbarContent
                style={{backgroundColor: '#1e1548'}}
                  message={"aucun utilisateur n'a été trouvée." }
                />
              </GridItem>
            </GridContainer>
            )}
            <Snackbar
              open={this.state.requestFriend}
              autoHideDuration={8000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                Votre invitation a été envoyée
              </Alert>
            </Snackbar>
            <Snackbar
              open={this.state.deleteRequest}
              autoHideDuration={8000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                Votre ami(e) a été supprimé
              </Alert>
            </Snackbar>
          </div>

          {/* <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <Link to="/">
                <Button
                  color="white"
                  style={{ color: "rgb(89, 79, 118)", fontWeight: "bold" }}
                  href="http://localhost:3000/"
                >
                  Retour
                </Button>
              </Link>
            </GridItem>
          </GridContainer> */}
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}

function functionDate(date) {
  ///.format("dddd D MMMM YYYY HH:mm:ss")
  const momentDate = Moment(Moment(date).format());
  const dateNow = Moment(new Date());
  let t = Moment.duration(dateNow - momentDate);
  if (t.years() >= 1) {
    let y = "";
    let m = "";
    if (t.years() === 1) y = "un an";
    else y = t.years() + " ans";
    if (t.months() == 1) m = " et un mois";
    else if (t.months() > 1) m = " et " + t.months() + " mois";
    return y + m;
  } else if (t.months() >= 1) {
    let y = "";
    let m = "";
    if (t.months() === 1) y = "un mois";
    else y = t.months() + " mois";
    if (t.days() == 1) m = " et un jour";
    else if (t.days() > 1) m = " et " + t.days() + " jours";
    return y + m;
  } else if (t.days() >= 1) {
    let y = "";
    let m = "";
    if (t.days() === 1) y = "un jour";
    else y = t.days() + " jours";
    if (t.hours() == 1) m = " et une heure";
    else if (t.hours() > 1) m = " et " + t.hours() + " heures";
    return y + m;
  } else if (t.hours() >= 1) {
    let y = "";
    let m = "";
    if (t.hours() === 1) y = "une heure";
    else y = t.hours() + " heures";
    if (t.minutes() == 1) m = " et une minute";
    else if (t.minutes() > 1) m = " et " + t.minutes() + " minutes";
    return y + m;
  } else if (t.minutes() >= 1) {
    let y = "";
    let m = "";
    if (t.minutes() === 1) y = "une minute";
    else y = t.minutes() + " minutes";
    if (t.seconds() == 1) m = " et une seconde";
    else if (t.seconds() > 1) m = " et " + t.seconds() + " secondes";
    return y + m;
  } else return "a l'instant";
}
function CardUser(props) {
  const { user } = props;
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return (
    <Card style={{ backgroundColor: "white" }}>
      <div
        style={{
          height: "170px",
          width: "100%",
          textAlign: "center",
          display: "block",
        }}
      >
        <Parallax
          image={
            user.lienCouverture !== null
              ? user.lienCouverture
              : config.API_URL + "images/asset/bg1.jpg"
          }
          style={{
            height: "170px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        ></Parallax>
        <div
          style={{
            textAlign: "-webkit-center",
            position: "absolute",
            top: 100,
            width: "100%",
          }}
        >
          {user.lienPhoto == "" ? (
            <Avatar
              alt=""
              src={config.API_URL + "images/asset/defaultPhotoProfil.jpg"}
              style={{
                width: 130,
                height: 130,
                borderStyle: "solid",
                borderWidth: 7,
                borderColor: "white",
              }}
            />
          ) : (
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
          )}
        </div>
        {/* <img
            style={{
              height: "240px",
              maxWidth: "320px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            className={classes.imgCardTop}
            src={
              histoire.lienIllustration !== null
                ?  histoire.lienIllustration
                : ""
            }
            alt={histoire.titreHistoire}
          /> */}
      </div>

      <h5
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          color: "black",
          marginLeft: "5%",
          textAlign: "left",
        }}
      >
        {user.pseudo}
        {/* {histoire.nombreVue ? histoire.nombreVue : 0} vues -{" "}
          {this.getDay(histoire.dateDeCreation)} */}
      </h5>
      <div style={{ display: "flex" }}>
        <h6
          style={{
            fontFamily: "monospace",
            color: "black",
            marginLeft: "5%",
            width: "50%",
            textAlign: "left",
          }}
        >
          {user.nom + " " + user.prenom}
          {/* {this.getDay()} */}
        </h6>
        <h6
          style={{
            fontFamily: "monospace",
            color: "black",
            marginLeft: "5%",
            width: "50%",
            marginTop: 0,
            textAlign: "center",
          }}
        >
          <RoomIcon style={{ height: 20 }} /> {user.ville}
          {/* {this.getDay()} */}
        </h6>
      </div>
      <CardBody>
        <Divider />
        <GridContainer style={{ marginTop: "4%" }}>
          <GridItem xs={6} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <div style={{ height: 40, paddingTop: 8 }}>
                  <CreateIcon style={{ width: 20 }} />
                </div>
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <h6
                  style={{
                    fontFamily: "monospace",
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "5%",
                    textAlign: "left",
                  }}
                >
                  Histoire
                </h6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={3} sm={3} md={3} style={{ textAlign: "right" }}>
            <h6
              style={{
                fontFamily: "monospace",
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {user.nombreHistoire}
            </h6>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <div style={{ width: 40 }}>
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
                    ).toFixed(1)}
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
                          Math.round(user.noteHistoire * 100) / 100
                        ).toFixed(1)}
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                </ButtonBase>
              </Tooltip>
            </div>
          </GridItem>
        </GridContainer>
        <Divider style={{ marginTop: "4%" }} />
        <GridContainer style={{ marginTop: "4%" }}>
          <GridItem xs={6} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <div style={{ height: 40, paddingTop: 8 }}>
                  <BrushIcon style={{ width: 20 }} />
                </div>
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <h6
                  style={{
                    fontFamily: "monospace",
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "5%",
                    textAlign: "left",
                  }}
                >
                  Dessin
                </h6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <h6
              style={{
                fontFamily: "monospace",
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {user.nombreDessin}
            </h6>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <div style={{ width: 40 }}>
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
                    ).toFixed(1)}
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
            </div>
          </GridItem>
        </GridContainer>
        <Divider
          style={{ marginTop: "4%", marginLeft: -30, marginRight: -30 }}
        />
        <GridContainer justify="center" style={{ marginTop: "7%" }}>
          <GridItem xs={4} sm={4} md={4}>
            <small style={{ color: "#1e1548" }}>
              <ForumRoundedIcon style={{ width: 20 }} />
            </small>{" "}
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <ButtonBase
              onClick={() => {
                this.requestFriend(user.id);
              }}
            >
              <small style={{ color: "#1e1548" }}>
                <PersonAddIcon style={{ width: 20 }} />
              </small>
            </ButtonBase>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
AllUsers.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(AllUsers));
