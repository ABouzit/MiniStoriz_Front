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

class AllUsers extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      page: 1,
      user: "",
      requestFriend: false,
      redirect: 0,
      connected: false,
      numberPage: 0,
      search: "",
      selectedFiltre: "",
      deleteRequest: false,
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
    this.fetchUsers();
    this.handleOpenBackDrop = this.handleOpenBackDrop.bind(this);
    this.handleCloseBackDrop = this.handleCloseBackDrop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
  }
  componentDidMount() {
    const _this = this;
    this._isMounted = true;
    const user = JSON.parse(localStorage.getItem("user"));
    if (this._isMounted) {
      if (user) {
        this.setState({ connected: true, user: user }, () => {
          this.forceUpdate();
        });
      }
      subscriber.subscribe(v => {
        this.setState({ search: v.search }, () => {
          this.searchCheck();
        });
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ requestFriend: false, deleteRequest: false });
  };
  handleChangePage() {
    // this.setState({ page: this.state.page + 1 });
    if (this.state.numberPage == this.state.page) {
      this.setState({ showMore: false });
    }

    if (this.state.search == "") {
      Axios.get(
        config.API_URL +
          "users/take/6/" +
          (this.state.page - 1) * 6 +
          "/xxxx/" +
          this.state.user.id,
        {}
      ).then(res => {
        this.setState({
          users: this.state.users.concat(res.data)
        });

        this.forceUpdate();
      });
    } else {
      Axios.get(
        config.API_URL +
          "users/take/6/" +
          (this.state.page - 1) * 6 +
          "/" +
          this.state.search+
          "/" +this.state.user.id,
        {}
      ).then(res => {
        this.setState({
          users: this.state.histoireUsers.concat(res.data)
        });
        this.forceUpdate();
      });
    }
  }
  fetchUsers() {
    Axios.get(
      config.API_URL +
        "users/take/6/" +
        (this.state.page - 1) * 6 +
        "/xxxx/" +
        this.state.user.id,
      {}
    ).then(res => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
    Axios.get(config.API_URL + "users/numberSearchUsers/xxxx", {}).then(res => {
      console.log(res.data);
      this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
        if (res.data <= 6) {
          this.setState({ showMore: false });
        } else {
          this.setState({ showMore: true });
        }
      });
    });
  }
  searchCheck() {
    this.setState({ page: 1, showMore: true }, () => {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "users/take/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.search+
            "/" +this.state.user.id,
          {}
        ).then(res => {
          console.log(res.data);
          this.setState({ users: res.data });
        });
        Axios.get(
          config.API_URL + "users/numberSearchUsers/" + this.state.search,
          {}
        ).then(res => {
          console.log(res.data);
          this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
            if (res.data <= 6) {
              this.setState({ showMore: false });
            }else {
              this.setState({ showMore: true });
            }
          });
        });
      }
      if (this.state.search === "") {
        this.fetchUsers();
      }
    });
  }
  requestFriend(id) {
    Axios.post(config.API_URL + "relations/", {
      userOne: { id: this.state.user.id },
      userTwo: { id: id }
    }).then(res => {
      firebase
        .database()
        .ref("relations/" + id)
        .set({
          from: this.state.user.id,
          to: id,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
      this.setState({ requestFriend: true });
      this.fetchUsers();
    });
  }
  deleteRequest(id) {
    Axios.delete(
      config.API_URL + "relations/between/" + this.state.user.id + "/" + id
    ).then(res => {
      firebase
        .database()
        .ref("relations/" + id)
        .set({
          from: this.state.user.id,
          to: id,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
      this.setState({ deleteRequest: true }, () => {
        this.searchCheck();
      });
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
  handleCheck(e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setState({ currentFiltre: 1 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });

      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 2) {
      this.setState({ currentFiltre: 2 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 3) {
      this.setState({ currentFiltre: 3 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 4) {
      this.setState({ currentFiltre: 4 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    }
  }
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
        <div className={classes.section} style={{ width: "99%" }}>
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
            <GridContainer justify="center" spacing={"auto"}>
              {this.state.users.map((user, index) => {
                if (this.state.user.id !== user.user.id) {
                  return (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      justify="center"
                      key={index}
                    >
                      {this.state.connected ? (
                        // <Link to={"/Histoire/" + histoire.id}>

                        <Card style={{ backgroundColor: "white" }}>
                          <Link to={"/LesOeuvres/" + user.user.id}>
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
                                    user.user.lienCouverture !== null
                                      ? user.user.lienCouverture
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
                                  {user.user.lienPhoto == "" ? (
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
                                      src={user.user.lienPhoto}
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
                                {user.user.pseudo}
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
                                  {user.user.nom + " " + user.user.prenom}
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
                                  <RoomIcon style={{ height: 20 }} />{" "}
                                  {user.user.ville}
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
                                            style={{
                                              width: 20,
                                              color: "black",
                                            }}
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
                                      {user.user.nombreHistoire}
                                    </h6>
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <div style={{ width: 40 }}>
                                      <Tooltip
                                        disableFocusListener
                                        disableTouchListener
                                        title={
                                          user.user.noteHistoire
                                            ? parseFloat(
                                                Math.round(
                                                  user.user.noteHistoire * 100
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
                                                user.user.noteHistoire * 100
                                              ) / 100
                                            ).toFixed(2)}
                                            text={parseFloat(
                                              Math.round(
                                                user.user.noteHistoire * 100
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
                                                    user.user.noteHistoire * 100
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
                                            style={{
                                              width: 20,
                                              color: "black",
                                            }}
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
                                      {user.user.nombreDessin}
                                    </h6>
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <div style={{ width: 40 }}>
                                      <Tooltip
                                        disableFocusListener
                                        disableTouchListener
                                        title={
                                          user.user.noteDessin
                                            ? parseFloat(
                                                Math.round(
                                                  user.user.noteDessin * 100
                                                ) / 100
                                              ).toFixed(2) + "/5"
                                            : 0
                                        }
                                      >
                                        <ButtonBase>
                                          <CircularProgressbarWithChildren
                                            text={parseFloat(
                                              Math.round(
                                                user.user.noteDessin * 100
                                              ) / 100
                                            ).toFixed(1)}
                                            maxValue={5}
                                            minValue={0}
                                            strokeWidth={3}
                                            value={parseFloat(
                                              Math.round(
                                                user.user.noteDessin * 100
                                              ) / 100
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
                                                    user.user.noteDessin * 100
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
                              <Link to={"/Message/" + user.user.id}>
                                <small style={{ color: "#1e1548" }}>
                                  <ForumRoundedIcon style={{ width: 20 }} />
                                </small>
                              </Link>
                            </GridItem>
                            {!user.ami ? (
                              <GridItem xs={4} sm={4} md={4}>
                                <ButtonBase
                                  onClick={() => {
                                    this.requestFriend(user.user.id);
                                  }}
                                >
                                  <small style={{ color: "#1e1548" }}>
                                    <PersonAddIcon style={{ width: 20 }} />
                                  </small>
                                </ButtonBase>
                              </GridItem>
                            ) : (
                              <GridItem
                                xs={4}
                                sm={4}
                                md={4}
                                style={{ textAlign: "center" }}
                              >
                                <ButtonBase
                                  onClick={() => {
                                    this.deleteRequest(user.user.id);
                                  }}
                                >
                                  <small style={{ color: "#1e1548" }}>
                                    <PersonAddDisabledIcon
                                      style={{ width: 20 }}
                                    />
                                  </small>
                                </ButtonBase>
                              </GridItem>
                            )}
                          </GridContainer>
                        </Card>
                      ) : (
                        <Link
                          onClick={() => {
                            this.setState({ redirect: 1 }, () => {
                              this.forceUpdate();
                            });
                          }}
                        >
                          {/* <CardHistoire histoire={histoire}/> */}
                        </Link>
                      )}
                    </GridItem>
                  );
                }
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
                      color="primary"
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
AllUsers.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(AllUsers));
