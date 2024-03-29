import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components

import AddIcon from "@material-ui/icons/ArrowBackOutlined";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
// core components
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.js";
import Buttons from "@material-ui/core/Button";
import Button2 from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
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
import { isMobile } from "react-device-detect";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
//scroll bare text
import MoreVert from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
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
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Report from "@material-ui/icons/Report";
import ReportOff from "@material-ui/icons/ReportOff";
// import Pagination from "components/Pagination/Pagination.js";
import Pagination from "@material-ui/lab/Pagination";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TitleIcon from "@material-ui/icons/Title";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Divider from "@material-ui/core/Divider";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CommentIcon from "@material-ui/icons/Comment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FiberManualRecordIconOutlined from "@material-ui/icons/FiberManualRecordOutlined";
import { subscriber, messageService } from "./../../../services/messageService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import "moment/locale/fr";
import { cardTitle } from "assets/jss/material-kit-react.js";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import Moment from "moment";
import * as Core from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

class HistoireView extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      avtivityIndicatorColors: [
        "#124deg",
        "#ff2400",
        "#e81d1d",
        "#e8b71d",
        "#e3e81d",
        "#1de840",
        "#1ddde8",
        "#2b1de8",
        "#dd00f3",
        "#dd00f3"
      ],
      permition: false,
      accepterIllustration: false,
      refuserIllustration: false,
      userTextSignal: false,
      userDessinSignal: false,
      menuAnchorEl: null,
      errorCommentaire: false,
      redirect: 0,
      user: "",
      menuUpdate: null,
      openMenuUpdate: false,
      imgUrl: "",
      isOpen: false,
      typeModal: "",
      histoire: "",
      planches: [],
      commentaires: [],
      commentsSignal: [],
      page: 1,
      pageUsers: 1,
      counter: 1,
      numberPage: 0,
      numberPageUsers: 0,
      search: "",
      currentFiltre: 1,
      selectedFiltre: "",
      modal: false,
      modal2: false,
      showMore: true,
      showMoreUsers: true,
      ratingDessin: 0,
      ratingText: 0,
      ratingDessinTemp: 0,
      ratingTextTemp: 0,
      commentaireNbr: 1,
      deleteHistoire: false,
      submitSignal: true,
      settings: {
        beforeChange: (current, next) => {
          this.setState({ counter: next + 1 });
          console.log(this.state.counter);
        },

        appendDots: dots => (
          <div
            style={{
              borderRadius: "10px",
              padding: "10px",
              margin: 0,
              height: "100%",
              width: "50px",
              display: "flex"
            }}
          >
            <ul
              style={{
                marginLeft: 20,
                flexDirection: "collumn",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                WebkitFlexDirection: "column"
              }}
            >
              {dots}
            </ul>
          </div>
        ),
        customPaging: i => (
          <div>
            {i + 1 === this.state.counter ? (
              <div
                style={{
                  backgroundColor: "back",
                  borderRadius: 50,
                  width: "20px",
                  height: "20px"
                }}
              >
                <FiberManualRecordIconOutlined
                  style={{
                    position: "absolute",
                    width: "20px",
                    color: "white",
                    height: "20px",
                    display: "flex"
                  }}
                />
                <FiberManualRecordIcon
                  style={{
                    width: "20px",
                    color: "black",
                    height: "20px",
                    display: "flex"
                  }}
                />
              </div>
            ) : (
              <div>
                <FiberManualRecordIcon
                  style={{
                    width: "20px",
                    color: "white",
                    height: "20px",
                    display: "flex"
                  }}
                />
              </div>
            )}
          </div>
        ),
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
      },
      uploadingCommentSignal: true,
      commentaire: "",
      histoires: [],
      histoireUsers: [],
      selectedHistoire: "",
      image: "",
      borderRadius: "",
      borderRadius2: "",
      height: ""
    };
    console.log(this.state.histoire);
    console.log(this.state.planches);
    console.log(this.state.commentaires);
    this.next = this.next.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.previous = this.previous.bind(this);
    
  }

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem("user"));
    if (!users) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    } else {
      this.setState({ user: users }, () => {
        console.log(this.state.user);
        this.getPermitionImp();
        this.forceUpdate();
      });
    }
    this.fetchHistoireAndPlanchesAndCommentes(
      this.props.match.params.histoireId
    );
    firebase
      .database()
      .ref("deleteStoriz/" + this.props.match.params.histoireId)
      .on("value", snapshot => {
        console.log(snapshot);
        if (snapshot && snapshot.val()) {
          this.fetchHistoireNew(this.props.match.params.histoireId);
        }
      });
    firebase
      .database()
      .ref("comments/" + this.props.match.params.histoireId)
      .on("value", snapshot => {
        console.log(snapshot);
        if (snapshot && snapshot.val() && snapshot.val().from !== users.id) {
          this.fetchCommentaires2();
        }
      });
  }
  accepterIllustrations(){
    const _this = this;
    let tmpHistoire = this.state.histoire;
    tmpHistoire.etatHistoire = 'ACCEPTER_ILLUSTRATION';
    return Axios.put(config.API_URL + "histoires", tmpHistoire)
      .then(function(response) {
        firebase
          .database()
          .ref("newStoriz/" + _this.state.histoire.userText.id)
          .set({
            from: _this.state.histoire.userDessin.id,
            numbe: 100000 + Math.random() * (100000 - 1)
        });
        firebase
          .database()
          .ref("notifications/" + _this.state.histoire.userDessin.id)
          .set({
            from: _this.state.histoire.userText.id,
            to: _this.state.histoire.userDessin.id,
            numbe: 100000 + Math.random() * (100000 - 1)
          });
          _this.setState({accepterIllustration: false, snackValidation: true},
            () => setTimeout(()=>_this.props.history.push("/MesOeuvres"),3000))
          
        // _this.fetchHistoireAndPlanchesAndCommentes(
        //   _this.props.match.params.histoireId
        // );
    })
  }
  refuserIllustrations(){
    const _this = this;
    let tmpHistoire = this.state.histoire;
    tmpHistoire.etatHistoire = 'REFUSER_ILLUSTRATION';
    return Axios.put(config.API_URL + "histoires", tmpHistoire)
      .then(function(response) {
        firebase
          .database()
          .ref("newStoriz/" + _this.state.histoire.userText.id)
          .set({
            from: _this.state.histoire.userDessin.id,
            numbe: 100000 + Math.random() * (100000 - 1)
        })
        firebase
          .database()
          .ref("notifications/" + _this.state.histoire.userDessin.id)
          .set({
            from: _this.state.histoire.userText.id,
            to: _this.state.histoire.userDessin.id,
            numbe: 100000 + Math.random() * (100000 - 1)
          });
          _this.props.history.push("/MesOeuvres")
        // _this.fetchHistoireAndPlanchesAndCommentes(
        //   _this.props.match.params.histoireId
        // );
    })
  }
  fetchHistoireNew(id) {
    Axios.get(config.API_URL + "histoires/byId/" + id)
      .then(histoire => {
        if (
          histoire.data[0].etatHistoire === "ARCHIVE" &&
          ((histoire.data[0].userDessin &&
            histoire.data[0].userDessin.id !== this.state.user.id) ||
            !histoire.data[0].userDessin) &&
          ((histoire.data[0].userText &&
            histoire.data[0].userText.id !== this.state.user.id) ||
            !histoire.data[0].userText)
        ) {
          this.props.history.push("/404");
        } else {
          console.log(JSON.stringify(histoire));
          this.setState({ histoire: histoire.data[0] }, () => {});
        }
      })
      .catch(res => this.props.history.push("/404"));
  }
  getPermitionImp() {
    Axios.get(config.API_URL + "impressions/permition/" + this.props.match.params.histoireId + "/" + this.state.user.id)
      .then(permition => {
          console.log(permition.data.permition);
          this.setState({ permition: permition.data.permition }, () => {this.forceUpdate()});
      })
      .catch(res => this.props.history.push("/404"));
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.histoireId !== this.props.match.params.histoireId
    ) {
      const id = nextProps.match.params.histoireId;
      const users = JSON.parse(localStorage.getItem("user"));
      if (!users) {
        this.setState({ redirect: 1 }, () => {
          this.forceUpdate();
        });
      } else {
        this.setState({ user: users }, () => {
          console.log(this.state.user);
          this.forceUpdate();
        });
      }
      this.fetchHistoireAndPlanchesAndCommentes(id);
    }
  }
  handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ deleteHistoire: false, accepterIllustration: false, refuserIllustration: false, snackValidation: false, snackValidationSuppresion: false });
  };
  fetchCommentaires() {
    const id = this.props.match.params.histoireId;
    this.setState({ commentaireNbr: this.state.commentaireNbr + 1 }, () => {
      Axios.get(
        config.API_URL +
          "impressions/histoire/" +
          id +
          "/take/" +
          3 * this.state.commentaireNbr +
          "/" +
          0
      ).then(commentaires => {
        this.setState({ commentaires: commentaires.data }, () => {
          console.log("//////////////");
          this.fetchSignalUserDessin().then(() =>
            this.fetchSignalUserText().then(this.fetchSignalCommentes())
          );
        });
      });
    });
  }
  fetchCommentaires2() {
    const id = this.props.match.params.histoireId;

    Axios.get(
      config.API_URL +
        "impressions/histoire/" +
        id +
        "/take/" +
        3 * this.state.commentaireNbr +
        "/" +
        0
    ).then(commentaires => {
      this.setState({ commentaires: commentaires.data }, () => {
        console.log("//////////////");
        this.fetchSignalUserDessin().then(() =>
          this.fetchSignalUserText().then(() => {
            this.fetchSignalCommentes();
            this.forceUpdate();
          })
        );
      });
    });
  }
  fetchSignalUserText() {
    if (this.state.histoire.userText) {
      if (this.state.histoire.userText === this.state.user.id) {
        this.setState({
          userTextSignal: false
        });
        return Promise.resolve();
      } else {
        return Axios.get(
          config.API_URL +
            "signaler/between/" +
            this.state.user.id +
            "/" +
            this.state.histoire.userText.id
        ).then(res => {
          if (res.data.length === 0) {
            this.setState({
              userTextSignal: false
            });
            return Promise.resolve();
          } else {
            this.setState({
              userTextSignal: true
            });
            return Promise.resolve();
          }
        });
      }
    } else {
      this.setState({
        userTextSignal: true
      });
      return Promise.resolve();
    }
  }
  fetchSignalUserDessin() {
    if (this.state.histoire.userDessin) {
      if (this.state.histoire.userDessin === this.state.user.id) {
        this.setState({
          userDessinSignal: true
        });
        return Promise.resolve();
      } else {
        return Axios.get(
          config.API_URL +
            "signaler/between/" +
            this.state.user.id +
            "/" +
            this.state.histoire.userDessin.id
        ).then(res => {
          if (res.data.length === 0) {
            this.setState({
              userDessinSignal: false
            });
            return Promise.resolve();
          } else {
            this.setState({
              userDessinSignal: true
            });
            return Promise.resolve();
          }
        });
      }
    } else {
      this.setState({
        userDessinSignal: true
      });
      return Promise.resolve();
    }
  }
  fetchSignalCommentes() {
    console.log("///////////////");
    var tab = [];
    this.setState({ commentsSignal: [] }, () => {
      return Promise.all(
        this.state.commentaires.map((commentaire, index) => {
          console.log(commentaire);
          console.log(this.state.user.id);
          if (commentaire.user.id !== this.state.user.id) {
            return Axios.get(
              config.API_URL +
                "signaler/between/" +
                this.state.user.id +
                "/" +
                commentaire.user.id
            ).then(res => {
              if (res.data.length === 0) {
                console.log(this.state.commentsSignal);
                return Promise.resolve();
              } else {
                tab.push(commentaire.user.id);

                return Promise.resolve();
              }
            });
          } else {
            console.log(this.state.commentsSignal);
            return Promise.resolve();
          }
        })
      ).then(() => {
        return this.setState(
          { uploadingCommentSignal: false, commentsSignal: tab },
          () => {
            console.log(this.state.commentsSignal);
            this.forceUpdate();
            return Promise.resolve();
          }
        );
      });
    });
  }
  deleteHistoire() {
    let hist = this.state.histoire;
    hist.demandeSuppression = !this.state.histoire.demandeSuppression;
    Axios.put(config.API_URL + "histoires/", hist).then(res => {
      console.log(res);
      this.setState({ deleteHistoire: false, snackValidationSuppresion: true });
      Axios.get(config.API_URL + "histoires/byId/" + hist.id).then(histoire => {
        console.log(JSON.stringify(histoire));
        this.setState({ histoire: histoire.data[0] }, () =>
          console.log(this.state.histoire)
        );
      });
    });
    if (
      !hist.userText ||
      !hist.userDessin ||
      hist.userText.id === hist.userDessin.id
    ) {
      if (!hist.userText) {
        firebase
          .database()
          .ref("deleteStoriz/" + hist.id + "/" + hist.userDessin.id)
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
      } else if (!hist.userDessin) {
        firebase
          .database()
          .ref("deleteStoriz/" + hist.id + "/" + hist.userText.id)
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
      } else if (hist.userDessin.id === hist.userDessin.id) {
        firebase
          .database()
          .ref("deleteStoriz/" + hist.id + "/" + hist.userText.id)
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
      }
    } else {
      {
        firebase
          .database()
          .ref("deleteStoriz/" + hist.id + "/" + hist.userDessin.id)
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
        firebase
          .database()
          .ref("deleteStoriz/" + hist.id + "/" + hist.userText.id)
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
      }
    }
  }
  handleClose() {
    this.setState({ menuAnchorEl: null });
  }
  signaler(id) {
    if (this.state.submitSignal) {
      this.setState({ submitSignal: false });
      Axios.post(config.API_URL + "signaler", {
        signaler: { id: this.state.user.id },
        signaled: { id: id }
      }).then(() => {
        this.fetchSignalUserText().then(() =>
          this.fetchSignalUserDessin()
            .then(() => this.fetchSignalCommentes())
            .then(() => this.setState({ submitSignal: true }))
        );
      });
    }
  }
  designaler(id) {
    if (this.state.submitSignal) {
      this.setState({ submitSignal: false });
      Axios.delete(
        config.API_URL + "signaler/between/" + this.state.user.id + "/" + id
      ).then(res => {
        this.fetchSignalUserText().then(() =>
          this.fetchSignalUserDessin()
            .then(() => this.fetchSignalCommentes())
            .then(() => this.setState({ submitSignal: true }))
        );
      });
    }
  }
  fetchHistoireAndPlanchesAndCommentes(id) {
    console.log(id);
    if (id) {
      Axios.get(config.API_URL + "histoires/byId/" + id)
        .then(histoire => {
          if (
            histoire.data[0].etatHistoire === "ARCHIVE" &&
            ((histoire.data[0].userDessin &&
              histoire.data[0].userDessin.id !== this.state.user.id) ||
              !histoire.data[0].userDessin) &&
            ((histoire.data[0].userText &&
              histoire.data[0].userText.id !== this.state.user.id) ||
              !histoire.data[0].userText)
          ) {
            this.props.history.push("/404");
          } else {
            console.log(JSON.stringify(histoire));
            this.setState({ histoire: histoire.data[0] }, () => {
              this.state.histoire.nombreVue = this.state.histoire.nombreVue + 1;
              Axios.put(
                config.API_URL + "histoires/",
                this.state.histoire
              ).then(res => {
                Axios.get(config.API_URL + "planches/histoire/" + id).then(
                  planches => {
                    this.setState({ planches: planches.data });
                  }
                );
                Axios.get(
                  config.API_URL +
                    "impressions/histoire/" +
                    id +
                    "/take/" +
                    3 +
                    "/" +
                    0
                ).then(commentaires => {
                  this.setState(
                    {
                      commentaires: commentaires.data,
                      commentaireNbr: 1
                    },
                    () =>
                      this.fetchSignalUserDessin().then(() =>
                        this.fetchSignalUserText().then(() =>
                          this.fetchSignalCommentes()
                        )
                      )
                  );
                });
              });
            });
          }
        })
        .catch(res => this.props.history.push("/404"));
    }
  }
  submitCommantaire() {
    this.setState({ commentaire: this.state.commentaire.trim() }, () => {
      if (this.state.commentaire !== "")
        Axios.post(config.API_URL + "impressions", {
          histoire: this.state.histoire,
          commentaire: this.state.commentaire,
          noteHistoire: 0,
          noteDessin: 0,
          isActive: true,
          user: {
            id: this.state.user.id,
            lienPhoto: this.state.user.lienPhoto,
            pseudo: this.state.user.pseudo
          }
        }).then(res => {
          
          if (!this.state.histoire.userText) {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userDessin.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userDessin.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          } else if (!this.state.histoire.userDessin) {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userText.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userText.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          } else {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userText.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userText.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userDessin.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userDessin.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          }
          this.setState({
            ratingDessin: 0,
            ratingText: 0,
            ratingDessinTemp: 0,
            ratingTextTemp: 0,
            commentaire: "",
            
          });
          firebase
            .database()
            .ref("comments/" + this.state.histoire.id)
            .set({
              from: this.state.user.id,
              numbe: 100000 + Math.random() * (100000 - 1)
            });
          Axios.get(
            config.API_URL +
              "impressions/histoire/" +
              this.state.histoire.id +
              "/take/" +
              3 * this.state.commentaireNbr +
              "/" +
              0
          ).then(commentaires =>
            this.setState({ commentaires: commentaires.data }, () => {this.forceUpdate()})
          );
          this.fetchHistoireAndPlanchesAndCommentes();
          this.fetchSignalCommentes();
          this.forceUpdate();
        });
      else this.setState({ errorCommentaire: true });
    });
  }
  submitNote() {
    this.setState({ commentaire: this.state.commentaire.trim() }, () => {
        Axios.post(config.API_URL + "impressions", {
          histoire: this.state.histoire,
          commentaire: "",
          noteHistoire: parseFloat(this.state.ratingText),
          noteDessin: parseFloat(this.state.ratingDessin),
          isActive: true,
          user: {
            id: this.state.user.id,
            lienPhoto: this.state.user.lienPhoto,
            pseudo: this.state.user.pseudo
          }
        }).then(res => {
          if (!this.state.histoire.userText) {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userDessin.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userDessin.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          } else if (!this.state.histoire.userDessin) {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userText.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userText.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          } else {
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userText.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userText.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
            firebase
              .database()
              .ref("notifications/" + this.state.histoire.userDessin.id)
              .set({
                from: this.state.user.id,
                to: this.state.histoire.userDessin.id,
                numbe: 100000 + Math.random() * (100000 - 1)
              });
          }

          this.setState({
            ratingDessin: 0,
            ratingText: 0,
            ratingDessinTemp: 0,
            ratingTextTemp: 0,
            commentaire: ""
          });
          firebase
            .database()
            .ref("comments/" + this.state.histoire.id)
            .set({
              from: this.state.user.id,
              numbe: 100000 + Math.random() * (100000 - 1)
            });
          Axios.get(
            config.API_URL +
              "impressions/histoire/" +
              this.state.histoire.id +
              "/take/" +
              3 * this.state.commentaireNbr +
              "/" +
              0
          ).then(commentaires =>
            this.setState({ commentaires: commentaires.data, permition: false })
          );
          this.fetchSignalCommentes();
          this.forceUpdate();
        });
    });
  }
  next() {
    console.log(this.slider);
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  functionDate(date) {
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
  handleClickUpdate(event) {
    this.setState({ nemuUpdate: event.currentTarget, openMenuUpdate: true });
  }
  handleClick(event) {
    this.setState({ menuAnchorEl: event.currentTarget });
  }
  handleCloseUpdate() {
    this.setState({ nemuUpdate: null, openMenuUpdate: false });
  }
  //modal - carousel
  render() {
    const { settings, modal } = this.state;
    const { classes } = this.props;
    const dateFormat = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    console.log(this.props.match);
    //Moment.locale("fr");
    if (this.state.redirect == 1) {
      return <Redirect to="/Connexion" />;
    }
    if (this.state.histoire !== "")
      return (
        <div className={classes.section}>
          <ButtonBase onClick={() => this.props.history.goBack()}>
            <Fab aria-label={fab.label} style={fab.style} color={fab.color}>
              {fab.icon}
            </Fab>
          </ButtonBase>
          {this.state.isOpen ? (
            <Lightbox
              mainSrc={this.state.imgUrl}
              onCloseRequest={() =>
                this.setState({ isOpen: false, imgUrl: "" })
              }
              reactModalStyle={{
                overlay: { zIndex: 2000 }
              }}
            />
          ) : (
            <div></div>
          )}
          <Dialog
            fullWidth={false}
            maxWidth={"lg"}
            open={modal}
            onClose={() => {
              this.setState({ modal: false });
            }}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle
              id="max-width-dialog-title"
              style={{ textAlign: "center" }}
            >
              Notez les Dessins
            </DialogTitle>
            <DialogContent style={{ paddingTop: 50 }}>
              <Core.Slider
                style={{ color: "#2e99b0" }}
                defaultValue={0}
                value={this.state.ratingDessinTemp}
                onChange={(event, value) =>
                  this.setState({ ratingDessinTemp: value })
                }
                aria-labelledby="discrete-slider-small-steps"
                step={0.5}
                marks
                min={0}
                max={5}
                valueLabelDisplay="auto"
                color="#121212"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({
                    modal: false,
                    ratingDessinTemp: this.state.ratingDessin
                  })
                }
                color="default"
              >
                Annuler
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    modal: false,
                    ratingDessin: this.state.ratingDessinTemp
                  })
                }
                style={{ backgroundColor: "#2e99b0" }}
              >
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullWidth={false}
            maxWidth={"lg"}
            open={this.state.modal2}
            onClose={() => {
              this.setState({ modal2: false });
            }}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle
              id="max-width-dialog-title"
              style={{ textAlign: "center" }}
            >
              Notez les Textes
            </DialogTitle>
            <DialogContent style={{ paddingTop: 50 }}>
              <Core.Slider
                defaultValue={0}
                style={{ color: "#c7a650" }}
                value={this.state.ratingTextTemp}
                onChange={(event, value) =>
                  this.setState({ ratingTextTemp: value })
                }
                aria-labelledby="discrete-slider-small-steps"
                step={0.5}
                marks
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({
                    modal2: false,
                    ratingTextTemp: this.state.ratingText
                  })
                }
                color="default"
              >
                Annuler
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    modal2: false,
                    ratingText: this.state.ratingTextTemp
                  })
                }
                style={{ backgroundColor: "#c7a650" }}
              >
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>
          <GridContainer justify="center" style={{ margin: 0, width: "100%" }}>
            <GridItem xs={12} sm={12} md={12}>
              <Paper
                variant="outlined"
                style={
                  isMobile
                    ? {
                        position: "relative",
                        width: "100%",
                        marginTop: "5%",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }
                    : {
                        position: "relative",
                        width: "90%",
                        marginTop: "5%",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }
                }
              >
                  
                {this.state.histoire.userDessin &&
                this.state.histoire.userText &&
                this.state.histoire.userDessin.id == this.state.user.id &&
                this.state.histoire.userText.id == this.state.user.id ? (
                  <GridContainer
                    style={{
                      width: "90%",
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                    justify="flex-end"
                  >
                    <GridItem
                      xs={6}
                      sm={4}
                      md={2}
                      style={{ padding: 0, textAlign: "end" }}
                    >
                      <div>
                      {this.state.histoire.etatHistoire == 'EN_ATTANTE_USER' ? (
                          <Tooltip
                            title={
                              "Accepter les illustrations"
                            }
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                              onClick={() => {
                                this.setState({ accepterIllustration: true });
                              }}
                            >
                              <CheckCircleOutlineIcon
                                style={{ color: "#1e1548" }}
                              />
                            </IconButton>
                          </Tooltip>
                        ):(<div></div>)}
                        {this.state.histoire.etatHistoire == 'EN_ATTANTE_USER' ? (
                          <Tooltip
                            title={
                              "Refuser les illustrations"
                            }
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                              onClick={() => {
                                this.setState({ refuserIllustration: true });
                              }}
                            >
                              <HighlightOffIcon
                                style={{ color: "#1e1548" }}
                              />
                            </IconButton>
                          </Tooltip>
                        ):(<div></div>)}
                        <Link
                          to={
                            "/modifier/histoire/1/" +
                            this.props.match.params.histoireId
                          }
                        >
                          <Tooltip title="Modifier l'histoire">
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                            >
                              <UpdateIcon style={{ color: "#1e1548" }} />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip
                          title={
                            this.state.histoire.demandeSuppression
                              ? "Annuler la demande"
                              : "Demande de Supprimer"
                          }
                        >
                          <IconButton
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={() => {
                              this.setState({ deleteHistoire: true });
                            }}
                          >
                            {this.state.histoire.demandeSuppression ? (
                              <DeleteForeverOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            ) : (
                              <DeleteOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : this.state.histoire.userDessin &&
                  this.state.histoire.userDessin.id == this.state.user.id ? (
                  <GridContainer
                    style={{
                      width: "90%",
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                    justify="flex-end"
                  >
                    <GridItem
                      xs={6}
                      sm={6}
                      md={6}
                      style={{ padding: 0, textAlign: "end" }}
                    >
                      <div>
                        <Link
                          to={
                            "/modifier/histoire/2/" +
                            this.props.match.params.histoireId
                          }
                        >
                          <Tooltip title="Modifier l'histoire">
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                            >
                              <UpdateIcon style={{ color: "#1e1548" }} />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip
                          title={
                            this.state.histoire.demandeSuppression
                              ? "Annuler la demande"
                              : "Demande de Supprimer"
                          }
                        >
                          <IconButton
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={() => {
                              this.setState({ deleteHistoire: true });
                            }}
                          >
                            {this.state.histoire.demandeSuppression ? (
                              <DeleteForeverOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            ) : (
                              <DeleteOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : this.state.histoire.userText &&
                  this.state.histoire.userText.id == this.state.user.id ? (
                  <GridContainer
                    style={{
                      width: "90%",
                      marginTop: 20,
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                    justify="flex-end"
                  >
                    <GridItem
                      xs={6}
                      sm={4}
                      md={2}
                      style={{ padding: 0, textAlign: "end" }}
                    >
                      <div>
                        {this.state.histoire.etatHistoire == 'EN_ATTANTE_USER' ? (
                          <Tooltip
                            title={
                              "Accepter les illustrations"
                            }
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                              onClick={() => {
                                this.setState({ accepterIllustration: true });
                              }}
                            >
                              <CheckCircleOutlineIcon
                                style={{ color: "#1e1548" }}
                              />
                            </IconButton>
                          </Tooltip>
                        ):(<div></div>)}
                        {this.state.histoire.etatHistoire == 'EN_ATTANTE_USER' ? (
                          <Tooltip
                            title={
                              "Refuser les illustrations"
                            }
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                              onClick={() => {
                                this.setState({ refuserIllustration: true });
                              }}
                            >
                              <HighlightOffIcon
                                style={{ color: "#1e1548" }}
                              />
                            </IconButton>
                          </Tooltip>
                        ):(<div></div>)}
                        <Link
                          to={
                            "/modifier/histoire/3/" +
                            this.props.match.params.histoireId
                          }
                        >
                          <Tooltip title="Modifier l'histoire">
                            <IconButton
                              aria-controls="customized-menu"
                              aria-haspopup="true"
                              variant="contained"
                            >
                              <UpdateIcon style={{ color: "#1e1548" }} />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip
                          title={
                            this.state.histoire.demandeSuppression
                              ? "Annuler la demande"
                              : "Demande de Supprimer"
                          }
                        >
                          <IconButton
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={() => {
                              this.setState({ deleteHistoire: true });
                            }}
                          >
                            {this.state.histoire.demandeSuppression ? (
                              <DeleteForeverOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            ) : (
                              <DeleteOutlinedIcon
                                style={{ color: "#1e1548" }}
                              />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : (
                  <div></div>
                )}
                <GridContainer
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ padding: 0, textAlign: 'center' }}
                    >
                      <h2 style={{
                        fontFamily: 'goudy',
                        fontWeight: 'bold',
                        color: 'rgba(39, 39, 39, 0.88)',
                        textAlign: 'center'
                      }}>
                        {this.state.histoire.titreHistoire[0].toUpperCase() +  
                           this.state.histoire.titreHistoire.slice(1).toLowerCase()}
                      </h2>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{
                    width: "90%",
                    marginTop: 20,
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {this.state.histoire.userDessin ? (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ padding: 0, position: "relative" }}
                    >
                      <ListItem>
                        <Link
                          to={
                            this.state.histoire.userDessin.id !==
                            this.state.user.id
                              ? "/LesOeuvres/" +
                                this.state.histoire.userDessin.id
                              : null
                          }
                        >
                          <ListItemAvatar>
                            {this.state.histoire.userDessin.lienPhoto == "" ||
                            this.state.histoire.userDessin.lienPhoto == null ? (
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
                                src={this.state.histoire.userDessin.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                        </Link>
                        <Link
                          to={
                            this.state.histoire.userDessin.id !==
                            this.state.user.id
                              ? "/LesOeuvres/" +
                                this.state.histoire.userDessin.id
                              : null
                          }
                        >
                          <ListItemText
                            style={{
                              paddingBottom: 8
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'lato',
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.histoire.userDessin.pseudo}
                            </p>
                          </ListItemText>
                        </Link>
                      </ListItem>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 40
                        }}
                      >
                        {this.state.user.id !==
                        this.state.histoire.userDessin.id ? (
                          this.state.uploadingCommentSignal === true ? (
                            <CircularProgress disableShrink size={20} />
                          ) : this.state.userDessinSignal === false ? (
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"Signaler"}
                            >
                              <ButtonBase
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() =>
                                  this.signaler(
                                    this.state.histoire.userDessin.id
                                  )
                                }
                              >
                                <Report />
                              </ButtonBase>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"annuler le signal"}
                            >
                              <ButtonBase
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() =>
                                  this.designaler(
                                    this.state.histoire.userDessin.id
                                  )
                                }
                              >
                                <ReportOff />
                              </ButtonBase>
                            </Tooltip>
                          )
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </GridItem>
                  ) : (
                    <GridItem
                      xs={0}
                      sm={0}
                      md={0}
                      style={{ padding: 0 }}
                    ></GridItem>
                  )}
                  {this.state.histoire.userText ? (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ padding: 0, position: "relative" }}
                    >
                      <ListItem>
                        <Link
                          to={
                            this.state.histoire.userText.id !==
                            this.state.user.id
                              ? "/LesOeuvres/" + this.state.histoire.userText.id
                              : null
                          }
                        >
                          <ListItemAvatar>
                            {this.state.histoire.userText.lienPhoto == "" ||
                            this.state.histoire.userText.lienPhoto == null ? (
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
                                src={this.state.histoire.userText.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                        </Link>
                        <Link
                          to={"/LesOeuvres/" + this.state.histoire.userText.id}
                        >
                          <ListItemText
                            style={{
                              paddingBottom: 8
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'lato',
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.histoire.userText.pseudo}
                            </p>
                          </ListItemText>
                        </Link>
                      </ListItem>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 40
                        }}
                      >
                        {this.state.histoire.userText.id !==
                        this.state.user.id ? (
                          this.state.uploadingCommentSignal === true ? (
                            <CircularProgress disableShrink size={20} />
                          ) : this.state.userTextSignal === false ? (
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"Signaler"}
                            >
                              <ButtonBase
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() =>
                                  this.signaler(this.state.histoire.userText.id)
                                }
                              >
                                <Report />
                              </ButtonBase>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"annuler le signal"}
                            >
                              <ButtonBase
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() =>
                                  this.designaler(
                                    this.state.histoire.userText.id
                                  )
                                }
                              >
                                <ReportOff />
                              </ButtonBase>
                            </Tooltip>
                          )
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </GridItem>
                  ) : (
                    <GridItem
                      xs={0}
                      sm={0}
                      md={0}
                      style={{ padding: 0 }}
                    ></GridItem>
                  )}
                  {/* <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: 0, display: "flex" }}
                  >
                    <ButtonBase
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          imgUrl: this.state.histoire.lienIllustration
                        })
                      }
                      style={isMobile ? { width: "100%" } : { width: "30%" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "black",
                          margin: 0,
                          borderRadius: "15px 15px 15px 15px"
                        }}
                      >
                        <Parallax
                          style={
                            (imagesStyles.imgCard,
                            {
                              opacity: 0.7,
                              height: 150,
                              borderRadius: "15px 15px 15px 15px"
                            })
                          }
                          image={this.state.histoire.lienIllustration}
                        ></Parallax>

                        <div
                          style={
                            (imagesStyles.imgCardOverlay,
                            {
                              alignItems: "center",
                              position: "absolute",
                              top: 0,
                              right: 0,
                              left: 0,
                              height: "100%"
                            })
                          }
                        >
                          <h3
                            style={
                              (cardTitle.cardTitle,
                              {
                                width: "100%",
                                paddingLeft: 15,
                                color: "white",
                                textAlign: "left"
                              })
                            }
                          >
                            {this.state.histoire.titreHistoire}
                          </h3>

                          <p
                            style={{
                              color: "white",
                              textAlign: "left",
                              width: "100%",
                              paddingLeft: 15,
                              fontSize: 13
                            }}
                          >
                            {this.functionDate(
                              this.state.histoire.dateDeCreation
                            )}
                          </p>
                        </div>
                      </Card>
                    </ButtonBase>
                  </GridItem> */}
                </GridContainer>
                <div style={{
                  position: 'relative'
                }}>
                <SampleNextArrow
                    onClick={() => this.next()}
                    style={Styles.NextArrow}
                    Color={
                      this.state.counter === this.state.planches.length
                        ? "rgba(0, 0, 0, 0.26)"
                        : "#332861"
                    }
                    disabled={
                      this.state.counter === this.state.planches.length
                        ? true
                        : false
                    }
                  />
                <div
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    borderRadius: 15
                  }}
                >
                  <Slider
                    ref={slider => (this.slider = slider)}
                    {...settings}
                    style={{
                      height: "100%"
                    }}
                  >
                    {this.state.planches != []
                      ? this.state.planches.map((planche, index) => {
                          console.log("histoire" + this.state.histoire);
                          return (
                            <div key={1}>
                              <GridContainer
                                justify="center"
                                alignItems="center"
                              ></GridContainer>
                              {planche.text === "" ? (
                                <GridContainer
                                  style={{
                                    margin: 0,
                                    marginBottom: 30,
                                    marginTop: 0
                                  }}
                                  justify="center"
                                  alignItems="center"
                                >
                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    justify="center"
                                    alignItems="center"
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            borderRadius: "15px 15px 15px 15px",
                                            padding: 0
                                          }
                                        : {
                                            height: 550,
                                            borderRadius: "15px 15px 15px 15px",
                                            padding: 0
                                          }
                                    }
                                  >
                                    <div
                                      style={
                                        isMobile
                                          ? {
                                              textAlign: "-webkit-center",
                                              background: "#5a517f",
                                              borderRadius:
                                                "15px 15px 15px 15px",
                                              height: "100%",
                                              width: "100%"
                                            }
                                          : {
                                              textAlign: "-webkit-center",
                                              background: "#2f99b1",
                                              borderRadius:
                                                "15px 15px 15px 15px",
                                              height: "100%",
                                              width: "100%"
                                            }
                                      }
                                    >
                                      <ButtonBase
                                        onClick={() =>
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.lienDessin
                                          })
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        <Parallax
                                          image={planche.lienDessin}
                                          style={
                                            isMobile
                                              ? {
                                                  height: 400,
                                                  borderRadius:
                                                    "15px 15px 15px 15px",
                                                  display: "block",
                                                  width: "100%"
                                                }
                                              : {
                                                  height: 550,

                                                  display: "block",
                                                  width: "70%",
                                                  marginLeft: "auto",
                                                  marginRight: "auto"
                                                }
                                          }
                                        ></Parallax>
                                      </ButtonBase>
                                    </div>
                                  </GridItem>
                                </GridContainer>
                              ) : planche.lienDessin === null ||
                                planche.lienDessin === "" ? (
                                <GridContainer
                                  style={
                                    isMobile
                                      ? {
                                          width: "100%",
                                          margin: 0,
                                          marginBottom: 30,
                                          marginTop: 5
                                        }
                                      : {
                                          width: "100%",
                                          margin: 0,
                                          marginBottom: 30,
                                          marginTop: 0,
                                          marginLeft: "auto",
                                          marginRight: "auto"
                                        }
                                  }
                                  justify="center"
                                  alignItems="center"
                                >
                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    justify="center"
                                    alignItems="center"
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            backgroundColor: "#fcd77f",
                                            borderRadius: "15px 15px 15px 15px",
                                            borderRadiusTopLeft: 15,
                                            padding: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                          }
                                        : {
                                            height: 550,
                                            backgroundColor: "#fcd77f",
                                            borderRadius: "15px 15px 15px 15px",
                                            borderRadiusTopLeft: 15,
                                            padding: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                          }
                                    }
                                  >
                                    {" "}
                                    <SimpleBar
                                      style={
                                        isMobile
                                          ? {
                                              maxHeight: "350px",
                                              width: "100%"
                                            }
                                          : {
                                              maxHeight: "450px",
                                              width: "70%",
                                              marginLeft: "auto",
                                              marginRight: "auto"
                                            }
                                      }
                                    >
                                      <p
                                        style={{
                                          color: "#332861",
                                          fontFamily: 'lato',
                                          width: "100%",
                                          maxHeight: "450px",
                                          margin: "0px",
                                          paddingLeft: "30px",
                                          paddingRight: "30px",
                                          fontSize: "24px",
                                          whiteSpace: 'pre-line',
                                          wordWrap: 'break-word'
                                        }}
                                      >
                                        {planche.text}
                                      </p>
                                    </SimpleBar>
                                  </GridItem>
                                </GridContainer>
                              ) : (
                                <GridContainer
                                  justify="center"
                                  alignItems="center"
                                  style={{
                                    margin: 0,
                                    marginBottom: 30,
                                    marginTop: 0
                                  }}
                                >
                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    justify="center"
                                    alignItems="center"
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            borderRadius: "15px 15px 0px 0px",
                                            padding: 0
                                          }
                                        : {
                                            height: 550,
                                            borderRadius: "15px 0px 0px 15px",
                                            padding: 0
                                          }
                                    }
                                  >
                                    <div
                                      style={
                                        isMobile
                                          ? {
                                              textAlign: "-webkit-center",
                                              background: "#2f99b1",
                                              borderRadius: "15px 15px 0px 0px",
                                              height: "100%"
                                            }
                                          : {
                                              textAlign: "-webkit-center",
                                              background: "#2f99b1",
                                              borderRadius: "15px 0px 0px 15px",
                                              height: "100%"
                                            }
                                      }
                                    >
                                      <ButtonBase
                                        onClick={() =>
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.lienDessin
                                          })
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        <Parallax
                                          image={planche.lienDessin}
                                          style={
                                            isMobile
                                              ? {
                                                  height: 400,
                                                  borderRadius:
                                                    "15px 15px 0px 0px",
                                                  display: "block",
                                                  width: "100%"
                                                }
                                              : {
                                                  height: 550,
                                                  borderRadius:
                                                    "15px 0px 0px 15px",
                                                  display: "block",
                                                  width: "100%"
                                                }
                                          }
                                        ></Parallax>
                                      </ButtonBase>
                                    </div>
                                  </GridItem>

                                  <GridItem
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    justify="center"
                                    alignItems="center"
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            backgroundColor: "#fcd77f",
                                            borderRadius: "0px 0px 15px 15px",
                                            borderRadiusTopLeft: 15,
                                            padding: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                          }
                                        : {
                                            height: 550,
                                            backgroundColor: "#fcd77f",
                                            borderRadius: "0px 15px 15px 0px",
                                            borderRadiusTopLeft: 15,
                                            padding: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                          }
                                    }
                                  >
                                    <div
                                      style={{
                                        width: "100%"
                                      }}
                                    >
                                      <SimpleBar
                                        style={
                                          isMobile
                                            ? {
                                                maxHeight: "350px",
                                                width: "100%"
                                              }
                                            : {
                                                maxHeight: "450px",
                                                width: "100%",
                                                marginLeft: "auto",
                                                marginRight: "auto"
                                              }
                                        }
                                      >
                                        <p
                                          style={{
                                            color: "#332861",
                                            fontFamily: 'lato',
                                            width: "100%",
                                            maxHeight: "450px",
                                            margin: "0px",
                                            paddingLeft: "30px",
                                            paddingRight: "30px",
                                            fontSize: "24px",
                                            whiteSpace: 'pre-line',
                                            wordWrap: 'break-word'
                                          }}
                                        >
                                          {planche.text}
                                        </p>
                                      </SimpleBar>
                                    </div>
                                  </GridItem>
                                </GridContainer>
                              )}
                            </div>
                          );
                        })
                      : () => {
                          console.log(this.state.histoire);
                          return (
                            <div>
                              <p>mazal maja</p>
                            </div>
                          );
                        }}
                  </Slider>
                </div>

                  <SamplePrevArrow
                    onClick={() => this.previous()}
                    Color={
                      this.state.counter === 1
                        ? "rgba(0, 0, 0, 0.26)"
                        : "#332861"
                    }
                    disabled={this.state.counter === 1 ? true : false}
                  />
                </div>
                <Divider
                  style={{
                    height: 2,
                    marginBottom: 15,
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                />

                <GridContainer
                  justify="flex-end"
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 15
                  }}
                >
                  <GridItem xs={2} sm={1} md={1}>
                    <small>
                      <CommentIcon style={{ width: 20 }} />
                      {this.state.histoire.nombreComment}
                    </small>
                  </GridItem>
                  <GridItem xs={2} sm={1} md={1}>
                    <small>
                      <VisibilityIcon style={{ width: 20 }} />
                      {this.state.histoire.nombreVue}
                    </small>
                  </GridItem>
                </GridContainer>

                <Divider
                  style={{
                    width: "100%",
                    height: "2px"
                  }}
                />

                <List
                  className={classes.root}
                  style={{ background: "rgb(79, 78, 78)", color: "aliceblue", padding: 0 }}
                >
                  {this.state.commentaires.map((commentaire, index) => {
                    return (
                      <div key={index}>
                        <GridContainer>
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ position: "relative" }}
                          >
                            <ListItem
                              alignItems="flex-start"
                              className={classes.card}
                              style={{
                                width: "100%",
                                minHeight: 50,
                                maxHeight: "auto"
                              }}
                            >
                              <Link
                                to={
                                  commentaire.user.id !== this.state.user.id
                                    ? "/LesOeuvres/" + commentaire.user.id
                                    : null
                                }
                              >
                                <ListItemAvatar>
                                  {commentaire.user.lienPhoto == "" ||
                                  commentaire.user.lienPhoto == null ? (
                                    <Avatar
                                      alt=""
                                      src={
                                        config.API_URL +
                                        "images/asset/defaultPhotoProfil.jpg"
                                      }
                                      style={{
                                        border: "aliceblue",
                                        borderStyle: "solid"
                                      }}
                                    />
                                  ) : (
                                    <Avatar
                                      alt=""
                                      src={commentaire.user.lienPhoto}
                                      style={{
                                        border: "aliceblue",
                                        borderStyle: "solid"
                                      }}
                                    />
                                  )}
                                </ListItemAvatar>
                              </Link>
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <span style={{ color: "aliceblue", fontFamily: 'lato', fontWeight: 'bold' }}>
                                      {commentaire.user.pseudo}
                                    </span>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <small style={{ color: "aliceblue" }}>
                                      {this.functionDate(
                                        commentaire.dateDeCreation
                                      )}
                                    </small>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <div
                              style={{
                                position: "absolute",
                                top: 25,
                                right: 40
                              }}
                            >
                              {this.state.user.id !== commentaire.user.id ? (
                                this.state.uploadingCommentSignal === true ? (
                                  <CircularProgress disableShrink size={20} />
                                ) : this.state.commentsSignal.indexOf(
                                    commentaire.user.id
                                  ) === -1 ? (
                                  <Tooltip
                                    disableFocusListener
                                    disableTouchListener
                                    title={"Signaler"}
                                  >
                                    <ButtonBase
                                      aria-controls="simple-menu"
                                      aria-haspopup="true"
                                      onClick={() =>
                                        this.signaler(commentaire.user.id)
                                      }
                                    >
                                      <Report />
                                    </ButtonBase>
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    disableFocusListener
                                    disableTouchListener
                                    title={"annuler le signal"}
                                  >
                                    <ButtonBase
                                      aria-controls="simple-menu"
                                      aria-haspopup="true"
                                      onClick={() =>
                                        this.designaler(commentaire.user.id)
                                      }
                                    >
                                      <ReportOff />
                                    </ButtonBase>
                                  </Tooltip>
                                )
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </GridItem>
                          { commentaire.noteDessin > 0 || commentaire.noteHistoire > 0 ? (
                          <GridItem xs={12} sm={12} md={12}>
                            <GridContainer
                              justify="flex-start"
                              style={{
                                width: "100%",
                                marginBottom: 13,
                                paddingLeft: 60
                              }}
                            >
                              {this.state.histoire.userDessin ? (
                                <GridItem
                                  xs={3}
                                  sm={2}
                                  md={1}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    textAlign: "-webkit-center"
                                  }}
                                >
                                  <div
                                    style={{
                                      height: 40,
                                      width: 40
                                    }}
                                  >
                                    <Tooltip
                                      disableFocusListener
                                      disableTouchListener
                                      title={"Dessin"}
                                    >
                                      <ButtonBase style={{ borderRadius: 50 }}>
                                        <CircularProgressbarWithChildren
                                          text={
                                            commentaire.noteDessin === 0
                                              ? "0"
                                              : commentaire.noteDessin
                                          }
                                          maxValue={5}
                                          minValue={0}
                                          strokeWidth={3}
                                          value={commentaire.noteDessin}
                                          styles={buildStyles({
                                            textColor: "transparent",
                                            pathColor: "#2e99b0",
                                            trailColor: "#fff",
                                            strokeLinecap: "butt"
                                          })}
                                        >
                                          <div
                                            style={{
                                              height: "100%",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              display: "flex"
                                            }}
                                          >
                                            <p
                                              style={{
                                                color: "#2e99b0",
                                                fontSize: "14px",
                                                margin: 0
                                              }}
                                            >
                                              {commentaire.noteDessin}
                                            </p>
                                          </div>
                                        </CircularProgressbarWithChildren>
                                      </ButtonBase>
                                    </Tooltip>
                                  </div>
                                </GridItem>
                              ) : (
                                <GridItem xs={0} sm={0} md={0}></GridItem>
                              )}
                              {this.state.histoire.userText ? (
                                <GridItem
                                  xs={3}
                                  sm={2}
                                  md={1}
                                  style={{
                                    textAlign: "-webkit-center",
                                    display: "flex",
                                    justifyContent: "center"
                                  }}
                                >
                                  <div
                                    style={{
                                      height: 40,
                                      width: 40
                                    }}
                                  >
                                    <Tooltip
                                      disableFocusListener
                                      disableTouchListener
                                      title={"Text"}
                                    >
                                      <ButtonBase style={{ borderRadius: 50 }}>
                                        <CircularProgressbarWithChildren
                                          maxValue={5}
                                          minValue={0}
                                          strokeWidth={3}
                                          value={commentaire.noteHistoire}
                                          text={
                                            commentaire.noteHistoire === 0
                                              ? "0"
                                              : commentaire.noteHistoire
                                          }
                                          styles={buildStyles({
                                            textColor: "transparent",
                                            pathColor: "#fcd77f",
                                            trailColor: "#fff",
                                            strokeLinecap: "butt"
                                          })}
                                        >
                                          <div
                                            style={{
                                              height: "100%",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              display: "flex"
                                            }}
                                          >
                                            <p
                                              style={{
                                                color: "#fcd77f",
                                                fontSize: "14px",
                                                margin: 0
                                              }}
                                            >
                                              {commentaire.noteHistoire}
                                            </p>
                                          </div>
                                        </CircularProgressbarWithChildren>
                                      </ButtonBase>
                                    </Tooltip>
                                  </div>
                                </GridItem>
                              ) : (
                                <GridItem xs={0} sm={0} md={0}></GridItem>
                              )}
                            </GridContainer>
                          </GridItem>
                          ) : (<div></div>) }
                        </GridContainer>

                        <p
                          style={{
                            color: "white",
                            fontSize: 17,
                            textAlign: "left",
                            paddingLeft: 72,
                            paddingRight: 16,
                            fontFamily: 'goudy'
                          }}
                        >
                          {commentaire.commentaire}
                        </p>
                        <Divider style={{ background: "white" }} />
                      </div>
                    );
                  })}
                </List>
                {this.state.histoire.etatHistoire == 'VALIDE' ? (
                <div>
                <Button2
                  style={{ width: "100%", height: 60 }}
                  onClick={() => this.fetchCommentaires()}
                >
                  Voir plus de commentaires +
                </Button2>

                <Divider />
                <ListItem
                  alignItems="flex-start"
                  className={classes.card}
                  style={{ width: "100%", minHeight: 50, maxHeight: "auto" }}
                >
                  <ListItemAvatar>
                    {this.state.user.lienPhoto == "" ? (
                      <Avatar
                        alt=""
                        src={
                          config.API_URL + "images/asset/defaultPhotoProfil.jpg"
                        }
                      />
                    ) : (
                      <Avatar alt="" src={this.state.user.lienPhoto} />
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {!this.state.errorCommentaire ? (
                          <TextField
                            style={{ width: "100%" }}
                            id="nomContact"
                            variant="outlined"
                            rows="1"
                            value={this.state.commentaire}
                            onChange={commentaire =>
                              this.setState({
                                commentaire: commentaire.target.value,
                                errorCommentaire: false
                              })
                            }
                            multiline
                          />
                        ) : (
                          <TextField
                            style={{ width: "100%" }}
                            id="nomContact"
                            variant="outlined"
                            rows="1"
                            value={this.state.commentaire}
                            onChange={commentaire =>
                              this.setState({
                                commentaire: commentaire.target.value,
                                errorCommentaire: false
                              })
                            }
                            multiline
                            error
                          />
                        )}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <GridContainer style={{ marginRight: 0 }}>
                <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={this.state.permition ? {
                      display: "flex",
                      justifyContent: "flex-end",
                    }:{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 10
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "rgb(31, 23, 72)",
                      }}
                      color="rgb(90, 81, 127)"
                      onClick={() => this.submitCommantaire()}
                    >
                      Commenter
                    </Button>
                  </GridItem>
                  {console.log(this.state.permition)}
                  {this.state.permition == true ? (
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer
                      justify="flex-start"
                      style={{
                        width: "100%",
                        margin: "auto",
                        paddingLeft: 50,
                        justifyContent: 'center'
                      }}
                      spacing={1}
                    >
                      {this.state.histoire.userDessin ? (
                        <GridItem
                          xs={isMobile ? 6 : 3}
                          sm={isMobile ? 6 : 2}
                          md={isMobile ? 6 : 1}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "-webkit-center"
                          }}
                        >
                          <div
                            style={{
                              height: 50,
                              width: 50
                            }}
                          >
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"Dessin"}
                            >
                              <ButtonBase
                                style={{ borderRadius: 50 }}
                                onClick={() =>
                                  this.setState({
                                    modal: true
                                  })
                                }
                              >
                                <CircularProgressbarWithChildren
                                  text={
                                    this.state.ratingDessin === 0
                                      ? "0"
                                      : this.state.ratingDessin
                                  }
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={this.state.ratingDessin}
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#2e99b0",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt"
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex"
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#2e99b0",
                                        fontSize: "20px",
                                        margin: 0
                                      }}
                                    >
                                      {this.state.ratingDessin}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </div>
                        </GridItem>
                      ) : (
                        <GridItem xs={0} sm={0} md={0}></GridItem>
                      )}
                      {this.state.histoire.userText ? (
                        <GridItem
                          xs={isMobile ? 6 : 3}
                          sm={isMobile ? 6 : 2}
                          md={isMobile ? 6 : 1}
                          style={{
                            textAlign: "-webkit-center"
                          }}
                        >
                          <div
                            style={{
                              height: 50,
                              width: 50
                            }}
                          >
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title={"Text"}
                            >
                              <ButtonBase
                                style={{ borderRadius: 50 }}
                                onClick={() =>
                                  this.setState({
                                    modal2: true
                                  })
                                }
                              >
                                <CircularProgressbarWithChildren
                                  maxValue={5}
                                  minValue={0}
                                  strokeWidth={3}
                                  value={this.state.ratingText}
                                  text={
                                    this.state.ratingText === 0
                                      ? "0"
                                      : this.state.ratingText
                                  }
                                  styles={buildStyles({
                                    textColor: "transparent",
                                    pathColor: "#c7a650",
                                    trailColor: "#d6d6d6",
                                    strokeLinecap: "butt"
                                  })}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex"
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#c7a650",
                                        fontSize: "20px",
                                        margin: 0
                                      }}
                                    >
                                      {this.state.ratingText}
                                    </p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </ButtonBase>
                            </Tooltip>
                          </div>
                        </GridItem>
                      ) : (
                        <GridItem xs={0} sm={0} md={0}></GridItem>
                      )}
                      <GridItem
                        xs={this.state.histoire.userText && this.state.histoire.userDessin && !isMobile ? 6 : isMobile ? 12 : 9}
                        sm={this.state.histoire.userText && this.state.histoire.userDessin && !isMobile ? 8 : isMobile ? 12 : 10}
                        md={this.state.histoire.userText && this.state.histoire.userDessin && !isMobile ? 10 : isMobile ? 12 : 11}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingBottom: "15px"
                        }}
                      >
                        <Button
                          onClick={() => {
                            this.setState({
                              ratingDessin: 0,
                              ratingText: 0,
                              ratingDessinTemp: 0,
                              ratingTextTemp: 0,
                              commentaire: ""
                            });
                          }}
                          style={{ backgroundColor: "rgb(255, 44, 77)" }}
                        >
                          Annuler
                        </Button>

                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(31, 23, 72)",
                            marginLeft: 15
                          }}
                          color="rgb(90, 81, 127)"
                          onClick={() => this.submitNote()}
                          disabled={this.state.ratingText == 0 && this.state.ratingDessin == 0 ? true : false}
                        >
                          noter
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  ):(<div></div>)}
                  {/* <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingBottom: "15px"
                    }}
                  >
                    <Button
                      onClick={() => {
                        this.setState({
                          ratingDessin: 0,
                          ratingText: 0,
                          ratingDessinTemp: 0,
                          ratingTextTemp: 0,
                          commentaire: ""
                        });
                      }}
                      style={{ backgroundColor: "rgb(255, 44, 77)" }}
                    >
                      Annuler
                    </Button>

                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "rgb(31, 23, 72)",
                        marginLeft: 15
                      }}
                      color="rgb(90, 81, 127)"
                      onClick={() => this.submitNote()}
                      disabled={this.state.ratingText == 0 && this.state.ratingDessin == 0 ? true : false}
                    >
                      noter
                    </Button>
                  </GridItem> */}
                </GridContainer>
                </div>):(<div></div>)}
              </Paper>
            </GridItem>
          </GridContainer>
          <Snackbar
            open={this.state.deleteHistoire}
            autoHideDuration={12000}
            onClose={this.handleCloseSnack}
          >
            <Alert
              onClose={this.handleCloseSnack}
              severity="warning"
              action={
                <div>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.deleteHistoire();
                    }}
                  >
                    OUI
                  </Buttons>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={this.handleCloseSnack}
                  >
                    NON
                  </Buttons>
                </div>
              }
            >
              {!this.state.histoire.demandeSuppression
                ? "Souhaites-tu vraiment supprimer ton histoire ?"
                : "voudrai tu annuler la suppression de cette histoire?"}
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.snackValidation}
            autoHideDuration={6000}
            onClose={this.handleCloseSnack}
          >
            <Alert onClose={this.handleCloseSnack} severity="success">
              Ton histoire est en cours de validation, tu seras informé très vite si elle est publiée ou non.
            </Alert>
        </Snackbar>
        <Snackbar
            open={this.state.snackValidationSuppresion}
            autoHideDuration={6000}
            onClose={this.handleCloseSnack}
          >
            <Alert onClose={this.handleCloseSnack} severity="success">
            {!this.state.histoire.demandeSuppression
                ? "tu as annuler la suppression de ton histoire."
                : "Ta demande de suppression est en cours."}
            </Alert>
        </Snackbar>
          <Snackbar
            open={this.state.accepterIllustration}
            autoHideDuration={12000}
            onClose={this.handleCloseSnack}
          >
            <Alert
              onClose={this.handleCloseSnack}
              severity="warning"
              action={
                <div>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.accepterIllustrations();
                    }}
                  >
                    OUI
                  </Buttons>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={this.handleCloseSnack}
                  >
                    NON
                  </Buttons>
                </div>
              }
            >
              Voulez vous accepter les illustrations de cette histoire ?
            </Alert>
          </Snackbar><Snackbar
            open={this.state.refuserIllustration}
            autoHideDuration={12000}
            onClose={this.handleCloseSnack}
          >
            <Alert
              onClose={this.handleCloseSnack}
              severity="warning"
              action={
                <div>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.refuserIllustrations();
                    }}
                  >
                    OUI
                  </Buttons>
                  <Buttons
                    color="inherit"
                    size="small"
                    onClick={this.handleCloseSnack}
                  >
                    NON
                  </Buttons>
                </div>
              }
            >
              Voulez vous refuser les illustrations de cette histoire ?
            </Alert>
          </Snackbar>
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DialogTitle = withStyles(styles1)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function SampleNextArrow(props) {
  const { className, style, onClick, disabled, Color } = props;
  return (
    <IconButton
      aria-label="delete"
      style={
        !isMobile ? {
        ...style,
        display: "block",
        position: "absolute",
        top: "42%",
        right: "6px",
        zIndex: 100,
        padding: 0
      } : {
        ...style,
        display: "block",
        position: "absolute",
        top: "45.1%",
        right: "-15px",
        zIndex: 100,
        padding: 0
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={className} style={{ height: "50px", width: "50px" }}>
        <ArrowRightOutlined
          color="green"
          style={{ color: Color, fontSize: "50px" }}
        />
      </div>
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, disabled, Color } = props;
  return (
    <IconButton
      style={
        !isMobile ? {
        ...style,
        display: "block",
        position: "absolute",
        top: "42%",
        zIndex: 100,
        left: "6px",
        padding: 0
      }:{
        ...style,
        display: "block",
        position: "absolute",
        top: "45.1%",
        zIndex: 100,
        left: "-15px",
        padding: 0
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={className} style={{ height: "50px", width: "50px" }}>
        <ArrowLeftOutlined style={{ fontSize: "50px", color: Color }} />
      </div>
    </IconButton>
  );
}
const fab = {
  style: {
    top: "100px",
    left: "10px",
    position: "fixed",
    zIndex: 1999,
    color: "white",
    backgroundColor: "#ff2c4d",
    "&:hover": {
      backgroundColor: "#c40025"
    },
    "&:active": {
      backgroundColor: "#c40025"
    }
  },
  icon: <AddIcon />,
  label: "Add"
};
HistoireView.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(HistoireView));
