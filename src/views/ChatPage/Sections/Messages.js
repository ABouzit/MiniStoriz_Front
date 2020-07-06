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
import { isMobile } from "react-device-detect";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
// core components
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import MenuIcon from "@material-ui/icons/Menu";
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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
// import Pagination from "components/Pagination/Pagination.js";
import Pagination from "@material-ui/lab/Pagination";
import { Link, withRouter } from "react-router-dom";
// @material-ui/icons
import LockIcon from "@material-ui/icons/LockOutlined";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TitleIcon from "@material-ui/icons/Title";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fab from "@material-ui/core/Fab";
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
import Parallax from "components/Parallax/Parallax.js";
import "moment/locale/fr";
import Moment from "moment";
import {
  subscriber,
  messageService,
  subscriberTest
} from "./../../../services/messageService";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ChatIcon from "@material-ui/icons/Chat";
import Badge from "@material-ui/core/Badge";
import * as firebase from "firebase/app";
import "firebase/database";
const HEIGHT = window.innerHeight;
class Messages extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    // this.app = firebase.initializeApp(config.firebaseConfig);

    // this.database = this.app.database();
    this.state = {
      idUserChat: "",
      redirect: 0,
      idUser: "",
      userChat: "",
      message: "",
      messages: [],
      usersMessages: [],
      isOpen: false,
      imgUrl: "",
      user: "",
      page: 1,
      numberPage: 0,
      search: "",
      currentFiltre: 1,
      selectedFiltre: "",
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0,
      histoires: [],
      showMore: false,
      image: "",
      iteration: 0,
      collapse: true,
      bloqued: []
    };
    this.SimpleBar = React.createRef();

    this.scrollBottom = this.scrollBottom.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    } else {
      if (typeof this.props.match.params.userId === "undefined") {
        this.setState({ idUser: user.id, user: user }, () => {
          this.fetchUsersMessages();

          this.forceUpdate();
        });
      } else {
        this.setState(
          {
            idUser: user.id,
            user: user,
            idUserChat: this.props.match.params.userId,
            collapse: false
          },
          () => {
            this.fetchUser(this.props.match.params.userId);
            subscriber.next({ messageUser: this.state.idUserChat });
          }
        );
      }
    }
    const _this = this;
    this.message().on("value", function(snapshot) {
      console.log(snapshot);
      snapshot.forEach(function(data) {
        if (_this._isMounted === true) {
          if (data.val().to == _this.state.idUser) {
            if (data.val().from == _this.state.idUserChat) {
              _this.fetchMessages();
            } else {
              _this.fetchUsersMessages();
            }
          }
        }
        console.log();
      });
    });
    // subscriber.subscribe(v => {});
  }

  fetchBlock(id1, id2) {
    Axios.get(config.API_URL + "bloquer/getBloquerId/" + id1 + "/" + id2, {})
      .then(res => {
        this.setState({ bloqued: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  message() {
    var messageRef = firebase.database().ref("messages/" + this.state.idUser);
    return messageRef;
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log("ra9");
    this.message().off();
  }
  handleChangePage() {
    // this.setState({ page: this.state.page + 1 });
    if (this.state.numberPage == this.state.page) {
      this.setState({ showMore: false });
    }

    Axios.get(
      config.API_URL +
        "messages/between/" +
        this.state.idUser +
        "/" +
        this.state.idUserChat +
        "/10/" +
        (this.state.page - 1) * 10,
      {}
    ).then(res => {
      this.setState({
        messages: this.state.messages.concat(res.data)
      });

      this.forceUpdate();
    });
  }
  fetchUser(id) {
    Axios.get(config.API_URL + "users/" + id, {}).then(res => {
      this.setState(
        {
          userChat: res.data[0]
        },
        () => {
          this.fetchMessages();
          this.forceUpdate();
        }
      );
    });
  }
  fetchMessages() {
    Axios.get(
      config.API_URL +
        "messages/between/" +
        this.state.idUser +
        "/" +
        this.state.idUserChat +
        "/10/" +
        (this.state.page - 1) * 10,
      {}
    ).then(res => {
      this.setState({ messages: res.data }, () => {
        this.scrollBottom();
        subscriber.next({ messageUser: this.state.idUserChat });
        this.fetchBlock(this.state.idUser, this.state.idUserChat);
        this.fetchUsersMessages();
        this.forceUpdate();
      });
    });
    Axios.get(
      config.API_URL +
        "messages/nbrMessage/" +
        this.state.idUser +
        "/" +
        this.state.idUserChat,
      {}
    ).then(res => {
      this.setState({ numberPage: Math.ceil(res.data / 10) }, () => {
        if (res.data > 10) {
          this.setState({ showMore: true });
        }
      });
    });
  }
  fetchUsersMessages() {
    const _this = this;
    var _ = require("lodash");
    if (_this.state.search !== "") {
      console.log(
        _.filter(_this.state.usersMessages, function(o) {
          return o.userOne_pseudo.toLowerCase().includes(_this.state.search);
        })
      );
      let usersMessage = _.filter(_this.state.usersMessages, function(o) {
        return o.userOne_pseudo.toLowerCase().includes(_this.state.search);
      });
      _this.setState({ usersMessages: usersMessage }, () => {
        _this.forceUpdate();
      });
      console.log();
    } else {
      Axios.get(
        config.API_URL + "messages/users/" + _this.state.idUser,
        {}
      ).then(function(res) {
        _this.setState({ usersMessages: res.data }, () => {
          console.log(res.data.length);
          if (_this.state.idUserChat == "" && res.data.length !== 0) {
            if (_this.state.idUser == res.data[0].message_userOneId) {
              _this.setState(
                { idUserChat: res.data[0].message_userTwoId },
                () => {
                  _this.fetchUsersMessages();
                  _this.fetchUser(_this.state.idUserChat);
                }
              );
            } else {
              _this.setState(
                { idUserChat: res.data[0].message_userOneId },
                () => {
                  _this.fetchUsersMessages();
                  _this.fetchUser(_this.state.idUserChat);
                }
              );
            }
          }
        });
      });
    }
  }
  bloquer() {
    Axios.post(config.API_URL + "bloquer", {
      bloquer: { id: this.state.idUser },
      bloqued: { id: this.state.idUserChat }
    }).then(() => {
      this.fetchBlock(this.state.idUser, this.state.idUserChat);
      firebase
        .database()
        .ref("messages/" + this.state.idUserChat)
        .set({
          from: this.state.idUser,
          to: this.state.idUserChat,
          message: this.state.message,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
    });
  }
  debloquer() {
    Axios.delete(
      config.API_URL +
        "bloquer/between/" +
        this.state.idUser +
        "/" +
        this.state.idUserChat
    ).then(res => {
      console.log(res);
      this.fetchBlock(this.state.idUser, this.state.idUserChat);
      firebase
        .database()
        .ref("messages/" + this.state.idUserChat)
        .set({
          from: this.state.idUser,
          to: this.state.idUserChat,
          message: this.state.message,
          numbe: 100000 + Math.random() * (100000 - 1)
        });
    });
  }
  sendMessage() {
    this.setState({ page: 1 }, () => {
      Axios.post(config.API_URL + "messages", {
        userOne: { id: this.state.idUser },
        userTwo: { id: this.state.idUserChat },
        message: this.state.message
      }).then(res => {
        this.fetchMessages();
        firebase
          .database()
          .ref("messages/" + this.state.idUserChat)
          .set({
            from: this.state.idUser,
            to: this.state.idUserChat,
            message: this.state.message,
            numbe: 100000 + Math.random() * (100000 - 1)
          });
        this.setState({ message: "" });
      });
    });
  }
  savePhotoMessage(file) {
    const _this = this;
    var reader = new FileReader();
    var url = reader.readAsDataURL(file[0]);
    let data = new FormData();
    data.append("file", file[0]);
    reader.onloadend = function(e) {
      return Axios.post(config.API_URL + "sendImage/photoMessage/", data).then(
        res => {
          let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
          return Axios.post(config.API_URL + "messages", {
            userOne: { id: _this.state.idUser },
            userTwo: { id: _this.state.idUserChat },
            lienPhoto: config.API_URL + s
          })
            .then(res => {
              _this.fetchMessages();
              firebase
                .database()
                .ref("messages/" + this.state.idUserChat)
                .set({
                  from: this.state.idUser,
                  to: this.state.idUserChat,
                  message: this.state.message
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      );
    }.bind(this);
    console.log(file.name); // Would see a path?
  }
  click() {
    subscriberTest.next("ra9");
  }
  serfUser(id) {
    this.setState({ idUserChat: id, page: 1 }, () => {
      this.fetchUser(this.state.idUserChat, () => {
        subscriber.next({ messageUser: this.state.idUserChat });
        console.log(this.state.user.id);
        console.log(this.state.idUserChat);
      });
    });
  }
  scrollBottom() {
    if (this.SimpleBar.current)
      this.SimpleBar.current.getScrollElement().scrollTo(0, 1000000000);
  }

  //modal - carousel
  render() {
    const { classes } = this.props;
    if (this.state.redirect == 1) {
      return <Redirect to="/Connexion" />;
    }
    if (this.state.histoires !== [])
      return (
        <div
          className={classes.section}
          style={{ paddingTop: 87, paddingBottom: 0 }}
        >
          {this.state.isOpen ? (
            <Lightbox
              mainSrc={this.state.imgUrl}
              onCloseRequest={() => {
                this.setState({ isOpen: false, imgUrl: "" });
              }}
              reactModalStyle={{
                overlay: { zIndex: 2000 },
              }}
            />
          ) : (
            <div></div>
          )}
          <div>
            {/* conversation //////////////////////////////////////// */}
            {isMobile ? (
              <div style={{ position: "relative" }}>
                {this.state.collapse ? (
                  <GridContainer
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      left: 0,
                      zIndex: 2,
                      padding: 0,
                      margin: 0,
                      width: "inherit",
                    }}
                  >
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ alignItems: "center", padding: 0 }}
                    >
                      <Paper
                        style={{
                          alignItems: "center",
                          height: 70,
                          marginBottom: 5,
                          padding: 0,
                        }}
                      >
                        <GridContainer
                          style={{
                            height: 70,
                            alignItems: "center",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ padding: 0 }}
                          >
                            <h4
                              style={{ fontWeight: "bold", color: "#1e1548" }}
                            >
                              Message
                            </h4>
                          </GridItem>
                        </GridContainer>
                      </Paper>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ alignItems: "center", padding: 0 }}
                    >
                      <Paper>
                        <CustomInput
                          labelText="Recherche"
                          id="material"
                          style={{
                            width: 295,
                          }}
                          value={this.state.search}
                          onChange={(search, event) => {
                            this.setState(
                              { search: search.target.value },
                              () => {
                                this.fetchUsersMessages();
                              }
                            );
                          }}
                          inputProps={{
                            autoComplete: "off",
                            endAdornment: (
                              <ButtonBase>
                                <InputAdornment position="end">
                                  <Search />
                                </InputAdornment>
                              </ButtonBase>
                            ),
                          }}
                        />
                        <SimpleBar
                          // ref={this.SimpleBar}
                          style={{
                            maxHeight: HEIGHT - 249,
                            height: HEIGHT - 249,
                            overflowX: "hidden",
                          }}
                          autoHide={true}
                        >
                          
                          {this.state.usersMessages.map((user, index) => {
                            if (user.message_userTwoId == this.state.idUser) {
                              return (
                                <MenuItem
                                  selected={
                                    user.message_userOneId ==
                                    this.state.idUserChat
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    if (
                                      user.message_userOneId !==
                                      this.state.idUserChat
                                    )
                                      this.serfUser(user.message_userOneId);
                                    this.setState({ collapse: false }, () =>
                                      this.forceUpdate()
                                    );
                                  }}
                                >
                                  <div style={{ marginLeft: 32 }}></div>
                                  <div style={{ display: "contents" }}>
                                    {user.userOne_lienPhoto == "" ? (
                                      <Avatar
                                        style={{
                                          borderStyle: "solid",
                                          borderWidth: 1.2,
                                          borderColor: "#1e1548",
                                        }}
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar
                                        style={{
                                          borderStyle: "solid",
                                          borderWidth: 1.2,
                                          borderColor: "#1e1548",
                                        }}
                                        alt=""
                                        src={user.userOne_lienPhoto}
                                      />
                                    )}

                                    <span
                                      style={{
                                        marginLeft: 6,
                                        color: "#1e1548",
                                      }}
                                    >
                                      {user.userOne_pseudo}
                                    </span>
                                  </div>
                                  <Tooltip title="message">
                                    <ButtonBase
                                      onClick={() => {}}
                                      style={{ marginLeft: "auto" }}
                                    >
                                      <Badge
                                        badgeContent={user.vue}
                                        color="secondary"
                                      >
                                        <ChatIcon
                                          style={{ color: "#1e1548" }}
                                        />
                                      </Badge>
                                    </ButtonBase>
                                  </Tooltip>
                                </MenuItem>
                              );
                            } else {
                              return (
                                <MenuItem
                                  selected={
                                    user.message_userTwoId ==
                                    this.state.idUserChat
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    if (
                                      user.message_userTwoId !==
                                      this.state.idUserChat
                                    )
                                      this.serfUser(user.message_userTwoId);
                                    this.setState({ collapse: false }, () =>
                                      this.forceUpdate()
                                    );
                                  }}
                                >
                                  <div style={{ marginLeft: 32 }}></div>
                                  <div style={{ display: "contents" }}>
                                    {user.userTwo_lienPhoto == "" ? (
                                      <Avatar
                                        style={{
                                          borderStyle: "solid",
                                          borderWidth: 1.2,
                                          borderColor: "#1e1548",
                                        }}
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar
                                        style={{
                                          borderStyle: "solid",
                                          borderWidth: 1.2,
                                          borderColor: "#1e1548",
                                        }}
                                        alt=""
                                        src={user.userTwo_lienPhoto}
                                      />
                                    )}

                                    <span
                                      style={{
                                        marginLeft: 6,
                                        color: "#1e1548",
                                      }}
                                    >
                                      {user.userTwo_pseudo}
                                    </span>
                                  </div>
                                  <Tooltip title="message">
                                    <ButtonBase style={{ marginLeft: "auto" }}>
                                      <Badge
                                        badgeContent={user.vue}
                                        color="secondary"
                                      >
                                        <ChatIcon
                                          style={{ color: "#1e1548" }}
                                        />
                                      </Badge>
                                    </ButtonBase>
                                  </Tooltip>
                                </MenuItem>
                              );
                            }
                          })}
                        </SimpleBar>
                      </Paper>
                    </GridItem>
                  </GridContainer>
                ) : (
                  <GridContainer
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      left: 0,
                      zIndex: 2,
                      padding: 0,
                      margin: 0,
                      width: "inherit",
                    }}
                  >
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{
                        alignItems: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <Paper style={{ marginBottom: 5 }}>
                        <GridContainer
                          style={{
                            height: 70,
                            alignItems: "center",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          <GridItem xs={3} sm={3} md={3}>
                            <ButtonBase
                              onClick={() => {
                                this.setState({ collapse: true }, () =>
                                  this.forceUpdate()
                                );
                              }}
                            >
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <MenuIcon />
                              </IconButton>
                            </ButtonBase>
                          </GridItem>
                          <GridItem xs={9} sm={9} md={9} style={{ padding: 0 }}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {this.state.userChat.lienPhoto == "" ? (
                                <Avatar
                                  style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.2,
                                    borderColor: "#1e1548",
                                    width: 51,
                                    height: 51,
                                  }}
                                  alt=""
                                  src={
                                    config.API_URL +
                                    "images/asset/defaultPhotoProfil.jpg"
                                  }
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.2,
                                    borderColor: "#1e1548",
                                    width: 51,
                                    height: 51,
                                  }}
                                  alt=""
                                  src={this.state.userChat.lienPhoto}
                                />
                              )}

                              <span
                                style={{
                                  marginLeft: 13,
                                  color: "#1e1548",
                                  fontWeight: "normal",
                                }}
                              >
                                {this.state.userChat.pseudo}
                              </span>
                              {this.state.userChat ? (
                                this.state.bloqued.length === 0 ? (
                                  <ButtonBase
                                    onClick={() => this.bloquer()}
                                    style={{
                                      marginLeft: "auto",
                                      marginRight: 25,
                                      borderRadius: 50,
                                    }}
                                  >
                                    <Tooltip
                                      title="bloquer"
                                      style={{
                                        borderRadius: 50,
                                        marginLeft: "auto",
                                        marginRight: 25,
                                      }}
                                    >
                                      <IconButton
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                      >
                                        <LockIcon
                                          style={{ color: "#1e1548" }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </ButtonBase>
                                ) : (
                                  <ButtonBase
                                    onClick={() => {
                                      if (
                                        this.state.bloqued[0].bloquer.id ===
                                        this.state.idUser
                                      ) {
                                        this.debloquer();
                                      }
                                    }}
                                    style={{
                                      marginLeft: "auto",
                                      marginRight: 25,
                                      borderRadius: 50,
                                    }}
                                  >
                                    <Tooltip
                                      title="bloquer"
                                      style={{
                                        borderRadius: 50,
                                        marginLeft: "auto",
                                        marginRight: 25,
                                      }}
                                    >
                                      <IconButton
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                      >
                                        <LockOpenOutlinedIcon
                                          style={{ color: "#1e1548" }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </ButtonBase>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </GridItem>
                        </GridContainer>
                      </Paper>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ alignItems: "center", padding: 0 }}
                    > 
                      
                      <Paper>
                        
                        <SimpleBar
                          ref={this.SimpleBar}
                          style={{
                            maxHeight: HEIGHT - 245,
                            height: HEIGHT - 245,
                            overflowX: "hidden",
                          }}
                          autoHide={true}
                        >
                          <GridContainer
                            style={{
                              padding: 0,
                              width: "100%",
                              marginTop: "15px",
                              margin: 0,
                            }}
                            direction="column-reverse"
                            justify="flex-end"
                            alignItems="center"
                          >
                            {this.state.messages.length < 1 ? (
                              <SnackbarContent
                              style={{backgroundColor: '#1e1548'}}
                                message={"aucune message n'a été trouvée."
                                }
                              />
                            ):(<div></div>)}
                            
                            {this.state.messages.map((message, index) => {
                              if (
                                message.userTwo.id !== this.state.idUserChat
                              ) {
                                return (
                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    style={{
                                      alignItems: "center",
                                      paddingLeft: 0,
                                      paddingRight: 0,
                                    }}
                                  >
                                    <GridContainer
                                      style={{
                                        padding: 0,
                                        width: "100%",
                                        alignItems: "center",
                                        padding: 0,
                                        margin: 0,
                                      }}
                                    >
                                      <GridItem
                                        xs={1}
                                        sm={1}
                                        md={1}
                                        style={{
                                          alignItems: "center",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      ></GridItem>
                                      <GridItem
                                        xs={2}
                                        sm={2}
                                        md={2}
                                        style={{
                                          alignItems: "center",
                                          paddingTop: 24,
                                          paddingBottom: 24,
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        {this.state.userChat.lienPhoto == "" ? (
                                          <Avatar
                                            alt=""
                                            src={
                                              config.API_URL +
                                              "images/asset/defaultPhotoProfil.jpg"
                                            }
                                          />
                                        ) : (
                                          <Avatar
                                            alt=""
                                            src={this.state.userChat.lienPhoto}
                                          />
                                        )}
                                      </GridItem>
                                      <GridItem
                                        xs={8}
                                        sm={8}
                                        md={8}
                                        style={{
                                          alignItems: "center",
                                          width: "auto",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                        className={classes.root}
                                        spacing={2}
                                      >
                                        <SnackbarContent
                                          message={
                                            <div style={{ textAlign: "left" }}>
                                              {message.lienPhoto == null ? (
                                                <div></div>
                                              ) : (
                                                <ButtonBase
                                                  onClick={() => {
                                                    this.setState({
                                                      isOpen: true,
                                                      imgUrl: message.lienPhoto,
                                                    });
                                                  }}
                                                >
                                                  <Avatar
                                                    variant="square"
                                                    className={classes.square}
                                                    style={{
                                                      width: "auto",
                                                      maxWidth: 220,
                                                      height: "auto",
                                                    }}
                                                  >
                                                    <img
                                                      src={message.lienPhoto}
                                                      style={{
                                                        width: "auto",
                                                        maxWidth: 220,
                                                        height: "auto",
                                                      }}
                                                    ></img>
                                                  </Avatar>
                                                </ButtonBase>
                                              )}
                                              <span>{message.message}</span>
                                              <br></br>
                                              <small
                                                style={{ color: "#3c4858" }}
                                              >
                                                {moment(
                                                  message.dateDeCreation
                                                ).fromNow()}
                                              </small>
                                            </div>
                                          }
                                          style={{
                                            backgroundColor: "#2e99b0",
                                            color: "white",
                                            textAlign: "left",
                                            boxShadow:
                                              "0px 3px 5px -1px rgba(4, 144, 243, 0.2), 0px 6px 10px 0px rgba(7, 169, 246, 0.14), 0px 1px 18px 0px rgba(4, 134, 196, 0.12)",
                                          }}
                                        />
                                      </GridItem>
                                    </GridContainer>
                                  </GridItem>
                                );
                              } else {
                                return (
                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    style={{
                                      alignItems: "center",
                                      paddingLeft: 0,
                                      paddingRight: 0,
                                    }}
                                  >
                                    <GridContainer
                                      style={{
                                        padding: 0,
                                        width: "100%",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        padding: 0,
                                        margin: 0,
                                      }}
                                      alignItems="flex-end"
                                    >
                                      <GridItem
                                        xs={8}
                                        sm={8}
                                        md={8}
                                        style={{
                                          alignItems: "center",
                                          width: "auto",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                        className={classes.root}
                                        spacing={2}
                                      >
                                        <SnackbarContent
                                          message={
                                            <div style={{ textAlign: "left" }}>
                                              {message.lienPhoto == null ? (
                                                <div></div>
                                              ) : (
                                                <ButtonBase
                                                  onClick={() => {
                                                    this.setState({
                                                      isOpen: true,
                                                      imgUrl: message.lienPhoto,
                                                    });
                                                  }}
                                                >
                                                  <Avatar
                                                    variant="square"
                                                    className={classes.square}
                                                    style={{
                                                      width: "auto",
                                                      maxWidth: 220,
                                                      height: "auto",
                                                    }}
                                                  >
                                                    <img
                                                      src={message.lienPhoto}
                                                      style={{
                                                        width: "auto",
                                                        maxWidth: 220,
                                                        height: "auto",
                                                      }}
                                                    ></img>
                                                  </Avatar>
                                                </ButtonBase>
                                              )}
                                              <span>{message.message}</span>
                                              <br></br>
                                              <small
                                                style={{ color: "darkgray" }}
                                              >
                                                {moment(
                                                  message.dateDeCreation
                                                ).fromNow()}
                                              </small>
                                            </div>
                                          }
                                          style={{
                                            background: "#1e1548",
                                            color: "white",
                                            alignItems: "center",
                                            boxShadow:
                                              "0px 3px 5px -1px rgba(2, 61, 122, 0.2), 0px 6px 10px 0px rgba(0, 16, 211, 0.14), 0px 1px 18px 0px rgba(13, 12, 112, 0.12)",
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem
                                        xs={1}
                                        sm={1}
                                        md={1}
                                        style={{
                                          alignItems: "center",
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      ></GridItem>
                                      <GridItem
                                        xs={2}
                                        sm={2}
                                        md={2}
                                        style={{
                                          alignItems: "center",
                                          paddingTop: 24,
                                          paddingBottom: 24,
                                          paddingLeft: 0,
                                          paddingRight: 0,
                                        }}
                                      >
                                        {this.state.user.lienPhoto == "" ? (
                                          <Avatar
                                            alt=""
                                            src={
                                              config.API_URL +
                                              "images/asset/defaultPhotoProfil.jpg"
                                            }
                                          />
                                        ) : (
                                          <Avatar
                                            alt=""
                                            src={this.state.user.lienPhoto}
                                          />
                                        )}
                                      </GridItem>
                                    </GridContainer>
                                  </GridItem>
                                );
                              }
                            })}
                            {this.state.showMore ? (
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                style={{
                                  alignItems: "center",
                                  paddingLeft: 0,
                                  paddingRight: 0,
                                }}
                              >
                                <Tooltip
                                  title="plus de messages"
                                  aria-label="plus de messages"
                                  onClick={() => {
                                    this.setState(
                                      { page: this.state.page + 1 },
                                      () => {
                                        this.handleChangePage();
                                      }
                                    );
                                  }}
                                >
                                  <Fab
                                    color="primary"
                                    className={classes.fab}
                                    style={{
                                      width: 40,
                                      height: 40,
                                      color: "white",
                                      backgroundColor: "#1f1748",
                                    }}
                                  >
                                    <MoreHorizIcon />
                                  </Fab>
                                </Tooltip>
                              </GridItem>
                            ) : null}
                            {/* fin message 2 gris*/}
                          </GridContainer>
                        </SimpleBar>
                        {this.state.bloqued.length === 0 ? (
                          <GridContainer
                            style={{
                              margin: "0px",
                              padding: "0px",
                              width: "100%",
                            }}
                            spacing={2}
                            justify="center"
                          >
                            <GridItem xs={9} sm={9} md={9}>
                              <TextField
                                id="filled-helperText"
                                label="Message"
                                placeholder="Aa"
                                value={this.state.message}
                                onChange={(message, event) => {
                                  this.setState({
                                    message: message.target.value,
                                  });
                                }}
                                onKeyPress={(ev) => {
                                  if (
                                    ev.key === "Enter" &&
                                    this.state.message.length > 0
                                  ) {
                                    // Do code here
                                    this.sendMessage();
                                    console.log("detected");
                                  }
                                }}
                                variant="filled"
                                style={{
                                  paddingLeft: "0px",
                                  paddingRigth: "0px",
                                  width: "100%",
                                }}
                              />
                            </GridItem>
                            <GridItem
                              xs={1}
                              sm={1}
                              md={1}
                              style={{
                                alignItems: "center",
                                paddingTop: "12px",
                              }}
                            >
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="icon-button-file"
                                type="file"
                                onClick={() => this.scrollBottom()}
                                onChange={(file) => {
                                  this.savePhotoMessage(file.target.files);
                                }}
                              />
                              <label htmlFor="icon-button-file">
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="span"
                                >
                                  <PhotoCamera />
                                </IconButton>
                              </label>
                            </GridItem>{" "}
                          </GridContainer>
                        ) : this.state.bloqued[0].bloquer.id ===
                          this.state.idUser ? (
                          <GridContainer
                            style={{
                              margin: "0px",
                              padding: "0px",
                              width: "100%",
                            }}
                            spacing={2}
                            justify="center"
                          >
                            <GridItem
                              xs={12}
                              sm={12}
                              md={12}
                              style={{
                                height: 72,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p style={{ fontSize: 16 }}>
                                vous avez bloqués cet utilisateur
                              </p>
                            </GridItem>
                          </GridContainer>
                        ) : (
                          <GridContainer
                            style={{
                              margin: "0px",
                              padding: "0px",
                              width: "100%",
                            }}
                            spacing={2}
                            justify="center"
                          >
                            <GridItem
                              xs={12}
                              sm={12}
                              md={12}
                              style={{
                                height: 72,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                              <p style={{ fontSize: 16 }}>
                                Cet utilisateur vous a bloqué.
                              </p>
                            </GridItem>
                          </GridContainer>
                        )}
                      </Paper>
                    </GridItem>
                  </GridContainer>
                )}
              </div>
            ) : (
              <GridContainer>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ alignItems: "center", paddingLeft: 0 }}
                >
                  <Paper
                    style={{
                      alignItems: "center",
                      height: 70,
                      marginBottom: 5,
                    }}
                  >
                    <GridContainer style={{ height: 70, alignItems: "center" }}>
                      <GridItem xs={12} sm={12} md={12}>
                        <h4 style={{ fontWeight: "bold", color: "#1e1548" }}>
                          Message
                        </h4>
                      </GridItem>
                    </GridContainer>
                  </Paper>
                </GridItem>
                <GridItem
                  xs={9}
                  sm={9}
                  md={9}
                  style={{ alignItems: "center", paddingLeft: 0 }}
                >
                  <Paper style={{ marginBottom: 5 }}>
                    <GridContainer style={{ height: 70, alignItems: "center" }}>
                      <GridItem xs={1} sm={1} md={1}></GridItem>
                      <GridItem xs={10} sm={10} md={10}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {this.state.userChat.lienPhoto == "" ? (
                            <Avatar
                              style={{
                                borderStyle: "solid",
                                borderWidth: 1.2,
                                borderColor: "#1e1548",
                                width: 51,
                                height: 51,
                              }}
                              alt=""
                              src={
                                config.API_URL +
                                "images/asset/defaultPhotoProfil.jpg"
                              }
                            />
                          ) : (
                            <Avatar
                              style={{
                                borderStyle: "solid",
                                borderWidth: 1.2,
                                borderColor: "#1e1548",
                                width: 51,
                                height: 51,
                              }}
                              alt=""
                              src={this.state.userChat.lienPhoto}
                            />
                          )}

                          <span
                            style={{
                              marginLeft: 13,
                              color: "#1e1548",
                              fontWeight: "normal",
                            }}
                          >
                            {this.state.userChat.pseudo}
                          </span>
                          {this.state.userChat ? (
                            this.state.bloqued.length === 0 ? (
                              <ButtonBase
                                onClick={() => this.bloquer()}
                                style={{
                                  marginLeft: "auto",
                                  marginRight: 25,
                                  borderRadius: 50,
                                }}
                              >
                                <Tooltip
                                  title="bloquer"
                                  style={{
                                    borderRadius: 50,
                                    marginLeft: "auto",
                                    marginRight: 25,
                                  }}
                                >
                                  <IconButton
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                  >
                                    <LockIcon style={{ color: "#1e1548" }} />
                                  </IconButton>
                                </Tooltip>
                              </ButtonBase>
                            ) : (
                              <ButtonBase
                                onClick={() => {
                                  if (
                                    this.state.bloqued[0].bloquer.id ===
                                    this.state.idUser
                                  ) {
                                    this.debloquer();
                                  }
                                }}
                                style={{
                                  marginLeft: "auto",
                                  marginRight: 25,
                                  borderRadius: 50,
                                }}
                              >
                                <Tooltip
                                  title="bloquer"
                                  style={{
                                    borderRadius: 50,
                                    marginLeft: "auto",
                                    marginRight: 25,
                                  }}
                                >
                                  <IconButton
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                  >
                                    <LockOpenOutlinedIcon
                                      style={{ color: "#1e1548" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </ButtonBase>
                            )
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </GridItem>
                      <GridItem
                        xs={3}
                        sm={3}
                        md={3}
                        style={{ alignItems: "center", paddingLeft: 0 }}
                      ></GridItem>
                    </GridContainer>
                  </Paper>
                </GridItem>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ alignItems: "center", paddingLeft: 0 }}
                >
                  <Paper>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      style={{
                        width: 295,
                      }}
                      value={this.state.search}
                      onChange={(search, event) => {
                        this.setState({ search: search.target.value }, () => {
                          this.fetchUsersMessages();
                        });
                      }}
                      inputProps={{
                        autoComplete: "off",
                        endAdornment: (
                          <ButtonBase>
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        ),
                      }}
                    />
                    <SimpleBar
                      // ref={this.SimpleBar}
                      style={{
                        maxHeight: HEIGHT - 249,
                        height: HEIGHT - 249,
                        overflowX: "hidden",
                      }}
                      autoHide={true}
                    >
                      {this.state.usersMessages.map((user, index) => {
                        if (user.message_userTwoId == this.state.idUser) {
                          return (
                            <MenuItem
                              selected={
                                user.message_userOneId == this.state.idUserChat
                                  ? true
                                  : false
                              }
                              onClick={() => {
                                if (
                                  user.message_userOneId !==
                                  this.state.idUserChat
                                )
                                  this.serfUser(user.message_userOneId);
                              }}
                            >
                              <div style={{ marginLeft: 32 }}></div>
                              <div style={{ display: "contents" }}>
                                {user.userOne_lienPhoto == "" ? (
                                  <Avatar
                                    style={{
                                      borderStyle: "solid",
                                      borderWidth: 1.2,
                                      borderColor: "#1e1548",
                                    }}
                                    alt=""
                                    src={
                                      config.API_URL +
                                      "images/asset/defaultPhotoProfil.jpg"
                                    }
                                  />
                                ) : (
                                  <Avatar
                                    style={{
                                      borderStyle: "solid",
                                      borderWidth: 1.2,
                                      borderColor: "#1e1548",
                                    }}
                                    alt=""
                                    src={user.userOne_lienPhoto}
                                  />
                                )}

                                <span
                                  style={{ marginLeft: 6, color: "#1e1548" }}
                                >
                                  {user.userOne_pseudo}
                                </span>
                              </div>
                              <Tooltip title="message">
                                <ButtonBase
                                  onClick={() => {}}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <Badge
                                    badgeContent={user.vue}
                                    color="secondary"
                                  >
                                    <ChatIcon style={{ color: "#1e1548" }} />
                                  </Badge>
                                </ButtonBase>
                              </Tooltip>
                            </MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem
                              selected={
                                user.message_userTwoId == this.state.idUserChat
                                  ? true
                                  : false
                              }
                              onClick={() => {
                                if (
                                  user.message_userTwoId !==
                                  this.state.idUserChat
                                )
                                  this.serfUser(user.message_userTwoId);
                              }}
                            >
                              <div style={{ marginLeft: 32 }}></div>
                              <div style={{ display: "contents" }}>
                                {user.userTwo_lienPhoto == "" ? (
                                  <Avatar
                                    style={{
                                      borderStyle: "solid",
                                      borderWidth: 1.2,
                                      borderColor: "#1e1548",
                                    }}
                                    alt=""
                                    src={
                                      config.API_URL +
                                      "images/asset/defaultPhotoProfil.jpg"
                                    }
                                  />
                                ) : (
                                  <Avatar
                                    style={{
                                      borderStyle: "solid",
                                      borderWidth: 1.2,
                                      borderColor: "#1e1548",
                                    }}
                                    alt=""
                                    src={user.userTwo_lienPhoto}
                                  />
                                )}

                                <span
                                  style={{ marginLeft: 6, color: "#1e1548" }}
                                >
                                  {user.userTwo_pseudo}
                                </span>
                              </div>
                              <Tooltip title="message">
                                <ButtonBase style={{ marginLeft: "auto" }}>
                                  <Badge
                                    badgeContent={user.vue}
                                    color="secondary"
                                  >
                                    <ChatIcon style={{ color: "#1e1548" }} />
                                  </Badge>
                                </ButtonBase>
                              </Tooltip>
                            </MenuItem>
                          );
                        }
                      })}
                    </SimpleBar>
                  </Paper>
                </GridItem>

                <GridItem
                  xs={9}
                  sm={9}
                  md={9}
                  style={{ alignItems: "center", paddingLeft: 0 }}
                >
                  <Paper>
                    <SimpleBar
                      ref={this.SimpleBar}
                      style={{
                        maxHeight: HEIGHT - 245,
                        height: HEIGHT - 245,
                        overflowX: "hidden",
                      }}
                      autoHide={true}
                    >
                      <GridContainer
                        style={{
                          padding: 0,
                          width: "100%",
                          marginTop: "15px",
                          marginLeft: "0px",
                        }}
                        spacing={2}
                        direction="column-reverse"
                        justify="flex-end"
                        alignItems="center"
                      >
                        {" "}
                        {this.state.messages.length < 1 ? (
                              <SnackbarContent
                              style={{backgroundColor: '#1e1548'}}
                                message={"aucune message n'a été trouvée."
                                }
                              />
                        ):(<div></div>)}
                        {this.state.messages.map((message, index) => {
                          if (message.userTwo.id !== this.state.idUserChat) {
                            return (
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ alignItems: "center" }}
                              >
                                <GridContainer
                                  style={{
                                    padding: 0,
                                    width: "100%",
                                    marginLeft: "0px",
                                    alignItems: "center",
                                  }}
                                >
                                  <GridItem
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    style={{ alignItems: "center" }}
                                  ></GridItem>
                                  <GridItem
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    style={{ alignItems: "center" }}
                                  >
                                    {this.state.userChat.lienPhoto == "" ? (
                                      <Avatar
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar
                                        alt=""
                                        src={this.state.userChat.lienPhoto}
                                      />
                                    )}
                                  </GridItem>
                                  <GridItem
                                    xs={9}
                                    sm={9}
                                    md={9}
                                    style={{
                                      alignItems: "center",
                                      width: "auto",
                                    }}
                                    className={classes.root}
                                    spacing={2}
                                  >
                                    <SnackbarContent
                                      message={
                                        <div style={{ textAlign: "left" }}>
                                          {message.lienPhoto == null ? (
                                            <div></div>
                                          ) : (
                                            <ButtonBase
                                              onClick={() => {
                                                this.setState({
                                                  isOpen: true,
                                                  imgUrl: message.lienPhoto,
                                                });
                                              }}
                                            >
                                              <Avatar
                                                variant="square"
                                                className={classes.square}
                                                style={{
                                                  width: "auto",
                                                  maxWidth: 600,
                                                  height: "auto",
                                                }}
                                              >
                                                <img
                                                  src={message.lienPhoto}
                                                  style={{ maxWidth: 600 }}
                                                ></img>
                                              </Avatar>
                                            </ButtonBase>
                                          )}
                                          <span>{message.message}</span>
                                          <br></br>
                                          <small style={{ color: "#3c4858" }}>
                                            {moment(
                                              message.dateDeCreation
                                            ).fromNow()}
                                          </small>
                                        </div>
                                      }
                                      style={{
                                        backgroundColor: "#2e99b0",
                                        color: "white",
                                        textAlign: "left",
                                        boxShadow:
                                          "0px 3px 5px -1px rgba(4, 144, 243, 0.2), 0px 6px 10px 0px rgba(7, 169, 246, 0.14), 0px 1px 18px 0px rgba(4, 134, 196, 0.12)",
                                      }}
                                    />
                                  </GridItem>
                                  <GridItem
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    style={{ alignItems: "center" }}
                                  ></GridItem>
                                </GridContainer>
                              </GridItem>
                            );
                          } else {
                            return (
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ alignItems: "center" }}
                              >
                                <GridContainer
                                  style={{
                                    padding: 0,
                                    width: "100%",
                                    marginLeft: "0px",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                  }}
                                  alignItems="flex-end"
                                >
                                  <GridItem
                                    xs={9}
                                    sm={9}
                                    md={9}
                                    style={{
                                      alignItems: "center",
                                      width: "auto",
                                    }}
                                    className={classes.root}
                                    spacing={2}
                                  >
                                    <SnackbarContent
                                      message={
                                        <div style={{ textAlign: "left" }}>
                                          {message.lienPhoto == null ? (
                                            <div></div>
                                          ) : (
                                            <ButtonBase
                                              onClick={() => {
                                                this.setState({
                                                  isOpen: true,
                                                  imgUrl: message.lienPhoto,
                                                });
                                              }}
                                            >
                                              <Avatar
                                                variant="square"
                                                className={classes.square}
                                                style={{
                                                  width: "auto",
                                                  maxWidth: 600,
                                                  height: "auto",
                                                }}
                                              >
                                                <img
                                                  src={message.lienPhoto}
                                                  style={{ maxWidth: 600 }}
                                                ></img>
                                              </Avatar>
                                            </ButtonBase>
                                          )}
                                          <span>{message.message}</span>
                                          <br></br>
                                          <small style={{ color: "darkgray" }}>
                                            {moment(
                                              message.dateDeCreation
                                            ).fromNow()}
                                          </small>
                                        </div>
                                      }
                                      style={{
                                        background: "#1e1548",
                                        color: "white",
                                        alignItems: "center",
                                        boxShadow:
                                          "0px 3px 5px -1px rgba(2, 61, 122, 0.2), 0px 6px 10px 0px rgba(0, 16, 211, 0.14), 0px 1px 18px 0px rgba(13, 12, 112, 0.12)",
                                      }}
                                    />
                                  </GridItem>
                                  <GridItem
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    style={{
                                      alignItems: "center",
                                      paddingTop: 24,
                                      paddingBottom: 24,
                                      paddingLeft: 0,
                                      paddingRight: 0,
                                    }}
                                  >
                                    {this.state.user.lienPhoto == "" ? (
                                      <Avatar
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar
                                        alt=""
                                        src={this.state.user.lienPhoto}
                                      />
                                    )}
                                  </GridItem>
                                  <GridItem
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    style={{ alignItems: "center" }}
                                  ></GridItem>
                                </GridContainer>
                              </GridItem>
                            );
                          }
                        })}
                        {this.state.showMore ? (
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ alignItems: "center" }}
                          >
                            <Tooltip
                              title="plus de messages"
                              aria-label="plus de messages"
                              onClick={() => {
                                this.setState(
                                  { page: this.state.page + 1 },
                                  () => {
                                    this.handleChangePage();
                                  }
                                );
                              }}
                            >
                              <Fab
                                color="primary"
                                className={classes.fab}
                                style={{
                                  width: 40,
                                  height: 40,
                                  color: "white",
                                  backgroundColor: "#1f1748",
                                }}
                              >
                                <MoreHorizIcon />
                              </Fab>
                            </Tooltip>
                          </GridItem>
                        ) : null}
                        {/* fin message 2 gris*/}
                      </GridContainer>
                    </SimpleBar>
                    {this.state.bloqued.length === 0 ? (
                      <GridContainer
                        style={{
                          margin: "0px",
                          padding: "0px",
                          width: "100%",
                        }}
                        spacing={2}
                        justify="center"
                      >
                        <GridItem xs={9} sm={9} md={9}>
                          <TextField
                            id="filled-helperText"
                            label="Message"
                            placeholder="Aa"
                            value={this.state.message}
                            onChange={(message, event) => {
                              this.setState({
                                message: message.target.value,
                              });
                            }}
                            onKeyPress={(ev) => {
                              if (
                                ev.key === "Enter" &&
                                this.state.message.length > 0
                              ) {
                                // Do code here
                                this.sendMessage();
                                console.log("detected");
                              }
                            }}
                            variant="filled"
                            style={{
                              paddingLeft: "0px",
                              paddingRigth: "0px",
                              width: "100%",
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={1}
                          sm={1}
                          md={1}
                          style={{
                            alignItems: "center",
                            paddingTop: "12px",
                          }}
                        >
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="icon-button-file"
                            type="file"
                            onClick={() => this.scrollBottom()}
                            onChange={(file) => {
                              this.savePhotoMessage(file.target.files);
                            }}
                          />
                          <label htmlFor="icon-button-file">
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </GridItem>{" "}
                      </GridContainer>
                    ) : this.state.bloqued[0].bloquer.id ===
                      this.state.idUser ? (
                      <GridContainer
                        style={{
                          margin: "0px",
                          padding: "0px",
                          width: "100%",
                        }}
                        spacing={2}
                        justify="center"
                      >
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            height: 72,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <p style={{ fontSize: 16 }}>
                            vous avez bloqués cet utilisateur
                          </p>
                        </GridItem>
                      </GridContainer>
                    ) : (
                      <GridContainer
                        style={{
                          margin: "0px",
                          padding: "0px",
                          width: "100%",
                        }}
                        spacing={2}
                        justify="center"
                      >
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{
                            height: 72,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {" "}
                          <p style={{ fontSize: 16 }}>
                            Cet utilisateur vous a bloqué
                          </p>
                        </GridItem>
                      </GridContainer>
                    )}
                  </Paper>
                </GridItem>
              </GridContainer>
            )}
          </div>
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}
const StyledRating = withStyles({
  decimal: { display: "flex" },
  iconFilled: {
    color: "#ffb400",
    fontSize: "24px"
  },
  iconHover: {
    color: "#ffb400",
    fontSize: "24px"
  }
})(Rating);

const Styles = {};
const styles1 = theme => ({
  root: {
    margin: 0
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

Messages.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(Messages));
