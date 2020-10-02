import React from "react";
import PropTypes from "prop-types";
import { Prompt } from 'react-router'
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import Popper from "@material-ui/core/Popper";
import AddIcon from "@material-ui/icons/ArrowBackOutlined";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Chip from '@material-ui/core/Chip';
// core components
import Autocomplete from "@material-ui/lab/Autocomplete";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
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
import MuiAlert from "@material-ui/lab/Alert";
// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Parallax from "components/Parallax/Parallax.js";
import { isMobile } from "react-device-detect";
import Fab from "@material-ui/core/Fab";
import * as firebase from "firebase/app";
import "firebase/database";
//scroll bare text
import BrushIcon from "@material-ui/icons/Brush";
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
import Divider from "@material-ui/core/Divider";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CommentIcon from "@material-ui/icons/Comment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FiberManualRecordIconOutlined from "@material-ui/icons/FiberManualRecordOutlined";
import { subscriber, messageService } from "./../../../services/messageService";
import Lightbox from "react-image-lightbox";
import SettingsIcon from "@material-ui/icons/Settings";
import DoneIcon from "@material-ui/icons/Done";
import InputBase from "@material-ui/core/InputBase";
import "react-image-lightbox/style.css";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import "moment/locale/fr";
import { cardTitle } from "assets/jss/material-kit-react.js";
import EditIcon from "@material-ui/icons/Edit";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import Moment from "moment";
import * as Core from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

class PublierView extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      shouldBlockNavigation: true,
      textHistoire: "",
      userLocal: "",
      numberChar: 0,
      testNext: 0,
      redirect: 0,
      typePage: this.props.match.params.type,
      testNextText: 0,
      planche: [{ text: "", img: "", data: "", lien: "" }],
      imgSrc: "",
      dataImgPlanche: "",
      lienImgPlanche: "",
      imgHistoire: "",
      dataImgHistoire: "",
      lienImgHistoire: "",
      chargement: false,
      buttonClick: false,
      anchorElDessin: null,
      anchorElText: null,
      pendingValueText: "",
      pendingValueDessin: "",
      reseauUsers: "",
      id: "",
      userText: "",
      submit: false,
      userDessin: "",
      titreHistoire: "",
      errorCommentaire: false,
      imgUrl: "",
      isOpen: false,
      typeModal: "",
      histoire: "",
      commentaires: [],
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
      anchorEl: false,
      openSnackBar: false,
      settings: {
        beforeChange: (current, next) => {
          this.setState({ counter: next + 1 });
          console.log(this.state.counter);
        },
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
      },
      commentaire: "",
      histoires: [],
      histoireUsers: [],
      selectedHistoire: "",
      image: "",
      borderRadius: "",
      borderRadius2: "",
      height: ""
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleClickDessin = this.handleClickDessin.bind(this);
    this.handleCloseDessin = this.handleCloseDessin.bind(this);
    this.handleClickText = this.handleClickText.bind(this);
    this.handleCloseText = this.handleCloseText.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOpenBackDrop = this.handleOpenBackDrop.bind(this);
    this.handleCloseBackDrop = this.handleCloseBackDrop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (!user) {
      this.setState({ redirect: 1 }, () => {
        this.forceUpdate();
      });
    } else {
      if (typeof this.props.match.params.histoireId === "undefined") {
        this.setState({ id: user.id, userLocal: user }, () => {
          this.forceUpdate();
        });
      } else {
        this.setState({ id: user.id, userLocal: user }, () => {
          this.fetchHistoire(this.props.match.params.histoireId);
          this.forceUpdate();
        });
      }
    }
    Axios.get(config.API_URL + "users/relations/" + user.id, {}).then(res => {
      console.log(res.data);
      this.setState({ reseauUsers: res.data });
      if (this.props.match.params.type == "1")
        this.setState({
          userText: res.data[0],
          userDessin: res.data[0]
        });
      else if (this.props.match.params.type == "2")
        this.setState({
          userDessin: res.data[0],
        });
      else if (this.props.match.params.type == "3")
        this.setState({
          userText: res.data[0],
          userDessin: null
        });
    });

    this.next();
  }

  fetchHistoire(id) {
    Axios.get(config.API_URL + "histoires/byId/" + id).then(histoire => {
      console.log(histoire.data[0])
      if (this.props.match.params.type !== "2" &&
        histoire.data[0].userText.id !== this.state.userLocal.id &&
        histoire.data[0].userDessin.id !== this.state.userLocal.id
        
      ) {
        this.props.history.push("/Histoire/" + id);
      } else if (this.props.match.params.type == "2") {
        this.setState({userText: histoire.data[0].userText}, console.log(this.state.userDessin))
        Axios.get(config.API_URL + "planches/histoires/" + id).then(
          planches => {
            console.log(planches);
            if (planches.data[1].lien == "") {
              this.setState(
                {
                  planche: planches.data,
                  histoire: histoire.data[0],
                  titreHistoire: histoire.data[0].titreHistoire,
                  imgHistoire: histoire.data[0].lienIllustration,
                  textHistoire: planches.data[1].text,
                  userText: histoire.data[0].userText,
                  testNext: 0,
                  testNextText: 1,
                  lienImgPlanche: planches.data[1].lien
                },
                () => {
                  this.forceUpdate();
                }
              );
            } else {
              this.setState(
                {
                  planche: planches.data,
                  histoire: histoire.data[0],
                  titreHistoire: histoire.data[0].titreHistoire,
                  imgHistoire: histoire.data[0].lienIllustration,
                  textHistoire: planches.data[1].text,
                  userText: histoire.data[0].userText,
                  testNext: 1,
                  testNextText: 1,
                  lienImgPlanche: planches.data[1].lien
                },
                () => {
                  this.forceUpdate();
                }
              );
            }
            
          }
        );
      } else {
        Axios.get(config.API_URL + "planches/histoires/" + id).then(
          planches => {
            console.log(planches);
            this.setState(
              {
                planche: planches.data,
                histoire: histoire.data[0],
                titreHistoire: histoire.data[0].titreHistoire,
                imgHistoire: histoire.data[0].lienIllustration,
                textHistoire: planches.data[1].text,
                userText: histoire.data[0].userText,
                userDessin: histoire.data[0].userDessin,
                testNext: 1,
                testNextText: 1,
                lienImgPlanche: planches.data[1].lien
              },
              () => {
                this.forceUpdate();
              }
            );
          }
        );
      }
    });
  }
  saveHistoire(file) {
    console.log(file);
    const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
    if (file[0] && allowedFileTypes.indexOf(file[0].type) > -1) {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file[0]);
      let data = new FormData();
      data.append("file", file[0]);
      reader.onloadend = function(e) {
        this.setState({
          imgHistoire: reader.result,
          dataImgHistoire: data,
          lienImgHistoire: "images/histoires/" + file[0].name
        });
      }.bind(this);
      console.log(this.state.imgHistoire); // Would see a path?
    }
  }

  next() {
    this.setState({
      lienInputUpload: ""
    });
    this.state.planche[this.state.counter - 1].img = this.state.imgSrc;
    this.state.planche[this.state.counter - 1].text = this.state.textHistoire;
    this.state.planche[this.state.counter - 1].data = this.state.dataImgPlanche;
    this.state.planche[this.state.counter - 1].lien = this.state.lienImgPlanche;
    this.state.textHistoire = "";
    this.state.imgSrc = "";
    this.state.dataImgPlanche = "";
    this.state.lienImgPlanche = "";
    if (this.state.counter < this.state.planche.length) {
      this.state.textHistoire = this.state.planche[this.state.counter].text;
      this.state.imgSrc = this.state.planche[this.state.counter].img;
      this.state.dataImgPlanche = this.state.planche[this.state.counter].data;
      this.state.lienImgPlanche = this.state.planche[this.state.counter].lien;
    }

    if (this.state.counter == this.state.planche.length) {
      this.state.planche.push({ text: "", img: "", data: "", lien: "" });
      this.state.textHistoire = "";
      this.state.imgSrc = "";
      this.forceUpdate();
    }
    if (this.state.textHistoire === "") {
      this.setState({ testNextText: 0 });
      this.forceUpdate();
    } else {
      this.setState({ testNextText: 1 });
      this.forceUpdate();
    }
    if (this.state.imgSrc === "" && this.state.lienImgPlanche === "") {
      this.setState({ testNext: 0 });
      this.forceUpdate();
    } else {
      this.setState({ testNext: 1 });
      this.forceUpdate();
    }
    console.log("UserText :"+this.state.userText)
    console.log("userDessin :"+this.state.userDessin)
    this.slider.slickNext();
  }
  previous() {
    this.state.planche[this.state.counter - 1].img = this.state.imgSrc;
    this.state.planche[this.state.counter - 1].text = this.state.textHistoire;
    this.state.planche[this.state.counter - 1].data = this.state.dataImgPlanche;
    this.state.planche[this.state.counter - 1].lien = this.state.lienImgPlanche;
    this.setState(
      {
        lienInputUpload: "",
        imgSrc: this.state.planche[this.state.counter - 2].img,
        textHistoire: this.state.planche[this.state.counter - 2].text,
        lienImgPlanche: this.state.planche[this.state.counter - 2].lien,
        dataImgPlanche: this.state.planche[this.state.counter - 2].data,
        testNextText: 1,
        testNext: 1
      },
      () => {
        this.forceUpdate();
      }
    );
    console.log("UserText :"+this.state.userText)
    console.log("userDessin :"+this.state.userDessin)
    this.slider.slickPrev();
  }
  gotToIndex(index) {
    this.slider.slickGoTo(index - 1);
    this.setState({ counter: 1 });
  }

  testTextNext() {
    if (this.state.textHistoire === "") {
      this.setState({ testNextText: 0 });
      this.forceUpdate();
    } else {
      this.setState({ testNextText: 1 });
      this.forceUpdate();
    }
  }
  handleListItemValide() {
    this.state.planche[
      this.state.planche.length - 1
    ].text = this.state.textHistoire;
    this.state.planche[this.state.planche.length - 1].img = this.state.imgSrc;
    this.state.planche[
      this.state.planche.length - 1
    ].data = this.state.dataImgPlanche;
    this.state.planche[
      this.state.planche.length - 1
    ].lien = this.state.lienImgPlanche;
  }
  handleClickDessin = event => {
    this.setState({
      pendingValueDessin: this.state.userDessin
    });

    this.setState({ anchorElDessin: event.currentTarget });
  };

  handleCloseDessin = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    if (
      this.state.userText.id !== this.state.id &&
      this.state.pendingValueDessin.id !== this.state.id
    ) {
      this.setState({
        userText: this.state.userDessin,
        userDessin: this.state.pendingValueDessin
      });
    } else {
      this.setState({ userDessin: this.state.pendingValueDessin });
    }
    if (this.state.anchorElDessin) {
      this.state.anchorElDessin.focus();
    }
    if (this.state.userLocal.id !== this.state.pendingValueDessin.id) {
      this.setState({ typePage: 3 }, () => {
        this.forceUpdate();
      });
    } else {
      this.setState({ typePage: 1 }, () => {
        this.forceUpdate();
      });
    }
    this.setState({ anchorElDessin: null });
  };
  handleClickText = event => {
    this.setState({
      pendingValueText: this.state.userText
    });

    this.setState({ anchorElText: event.currentTarget });
  };

  handleCloseText = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    if (
      this.state.userDessin.id !== this.state.id &&
      this.state.pendingValueText.id !== this.state.id
    ) {
      this.setState({
        userDessin: this.state.userText,
        userText: this.state.pendingValueText
      });
    } else {
      this.setState({ userText: this.state.pendingValueText });
    }

    if (this.state.anchorElText) {
      this.state.anchorElText.focus();
    }
    if (this.state.userLocal.id !== this.state.pendingValueText.id) {
      this.setState({ typePage: 2 }, () => {
        this.forceUpdate();
      });
    } else {
      this.setState({ typePage: 1 }, () => {
        this.forceUpdate();
      });
    }
    this.setState({ anchorElText: null });
  };
  submit() {
    const _this = this;
    _this.setState({ chargement: true }, () => {
      this.forceUpdate();
    });
    let idHistoire = "";
    let etatHistoire = "";
    if (_this.state.planche.length > 3) {

    if (this.state.dataImgHistoire == "") {
      if (typeof this.props.match.params.histoireId === "undefined") {
        return Axios.post(config.API_URL + "histoires/"+ this.state.id, {
          userText: this.state.userText,
          userDessin: this.state.userDessin,
          lienIllustration: this.state.imgHistoire,
          titreHistoire: this.state.titreHistoire
        })
          .then(function(response) {
            Promise.all(
              _this.state.planche.map((planch, index) => {
                if (index > 0) {
                  console.log(planch);
                  if (planch.data !== "") {
                    return Axios.post(
                      config.API_URL + "sendImage/planches/",
                      planch.data
                    ).then(res => {
                      let s = res.data.filePath
                        .replace("\\", "/")
                        .replace("\\", "/");
                      return Axios.post(config.API_URL + "planches", {
                        histoire: response.data.id,
                        lienDessin: config.API_URL + s,
                        text: planch.text,
                        index: index
                      });
                    });
                  } else {
                    return Axios.post(config.API_URL + "planches", {
                      histoire: response.data.id,
                      text: planch.text,
                      index: index
                    });
                  }
                }
              })
            ).then(() => {
              if (
                !_this.state.userText ||
                !_this.state.userDessin ||
                _this.state.userText.id === _this.state.userDessin.id
              ) {
                if (!_this.state.userText) {
                  firebase
                    .database()
                    .ref("newStoriz/" + _this.state.userDessin.id)
                    .set({
                      from: _this.state.userLocal.id,
                      numbe: 100000 + Math.random() * (100000 - 1)
                    })
                    .then(() => {
                      _this.setState(
                        {
                          imgSrc: "",
                          dataImgPlanche: "",
                          lienImgPlanche: "",
                          testNext: 0,
                          testNextText: 0,
                          textHistoire: "",
                          titreHistoire: "",
                          imgHistoire: "",
                          lienImgHistoire: "",
                          dataImgHistoire: "",
                          planche: [{ text: "", img: "", data: "", lien: "" }],
                          lienInputUpload: "",
                          lienInputUploadhistoire: "",
                          submit: false,
                          snackValidation: true
                        },
                        () => setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                      );
                    });
                } else if (!_this.state.userDessin) {
                  firebase
                    .database()
                    .ref("newStoriz/" + _this.state.userText.id)
                    .set({
                      from: _this.state.userLocal.id,
                      numbe: 100000 + Math.random() * (100000 - 1)
                    })
                    .then(() => {
                      _this.setState(
                        {
                          imgSrc: "",
                          dataImgPlanche: "",
                          lienImgPlanche: "",
                          testNext: 0,
                          testNextText: 0,
                          textHistoire: "",
                          titreHistoire: "",
                          imgHistoire: "",
                          lienImgHistoire: "",
                          dataImgHistoire: "",
                          planche: [{ text: "", img: "", data: "", lien: "" }],
                          lienInputUpload: "",
                          lienInputUploadhistoire: "",
                          submit: false,
                          snackValidation: true
                        },
                        ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                      );
                    });
                } else if (
                  _this.state.userDessin.id === _this.state.userDessin.id
                ) {
                  firebase
                    .database()
                    .ref("newStoriz/" + _this.state.userText.id)
                    .set({
                      from: _this.state.userLocal.id,
                      numbe: 100000 + Math.random() * (100000 - 1)
                    })
                    .then(() => {
                      _this.setState(
                        {
                          imgSrc: "",
                          dataImgPlanche: "",
                          lienImgPlanche: "",
                          testNext: 0,
                          testNextText: 0,
                          textHistoire: "",
                          titreHistoire: "",
                          imgHistoire: "",
                          lienImgHistoire: "",
                          dataImgHistoire: "",
                          planche: [{ text: "", img: "", data: "", lien: "" }],
                          lienInputUpload: "",
                          lienInputUploadhistoire: "",
                          submit: false,
                          snackValidation: true
                        },
                        ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                      );
                    });
                }
              } else {
                {
                  firebase
                    .database()
                    .ref("newStoriz/" + _this.state.userDessin.id)
                    .set({
                      from: _this.state.userLocal.id,
                      numbe: 100000 + Math.random() * (100000 - 1)
                    });
                  firebase
                    .database()
                    .ref("newStoriz/" + _this.state.userText.id)
                    .set({
                      from: _this.state.userLocal.id,
                      numbe: 100000 + Math.random() * (100000 - 1)
                    })
                    .then(() => {
                      _this.setState(
                        {
                          imgSrc: "",
                          dataImgPlanche: "",
                          lienImgPlanche: "",
                          testNext: 0,
                          testNextText: 0,
                          textHistoire: "",
                          titreHistoire: "",
                          imgHistoire: "",
                          lienImgHistoire: "",
                          dataImgHistoire: "",
                          planche: [{ text: "", img: "", data: "", lien: "" }],
                          lienInputUpload: "",
                          lienInputUploadhistoire: "",
                          submit: false,
                          snackValidation: true
                        },
                        ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                      );
                    });
                }
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        idHistoire = this.props.match.params.histoireId;
        var idHistoire1 = '';
        var originalHistoire= '';
        if (this.props.match.params.type == "1" || this.props.match.params.type == "2" || this.props.match.params.type == "3") {
          if (this.props.match.params.type == "2") {
            etatHistoire = 'EN_ATTANTE_USER';
          } else {
            etatHistoire = 'EN_ATTANTE_UPDATE';
          }
          
          idHistoire1 = "";
          originalHistoire = idHistoire;
        } else {
          etatHistoire = 'EN_ATTANTE';
          idHistoire1 = idHistoire;
          originalHistoire = "";
        }
        return Axios.put(config.API_URL + "histoires", {
          id: idHistoire1,
          userText: this.state.userText,
          userDessin: this.state.userDessin,
          lienIllustration: this.state.imgHistoire,
          titreHistoire: this.state.titreHistoire,
          etatHistoire: etatHistoire,
          originalHistoire: originalHistoire,
        })
          .then(function(response) {
            Promise.all(
              _this.state.planche.map((planch, index) => {
                if (index > 0) {
                  console.log(planch);
                  if (planch.data !== "") {
                    return Axios.post(
                      config.API_URL + "sendImage/planches/",
                      planch.data
                    ).then(res => {
                      let s = res.data.filePath
                        .replace("\\", "/")
                        .replace("\\", "/");
                      return Axios.put(config.API_URL + "planches", {
                        histoire: response.data.id,
                        lienDessin: config.API_URL + s,
                        text: planch.text,
                        index: index
                      });
                    });
                  } else {
                    return Axios.put(config.API_URL + "planches", {
                      histoire: response.data.id,
                      text: planch.text,
                      index: index
                    });
                  }
                }
              })
            ).then(res => {
              if (_this.state.userDessin) {
              firebase
                .database()
                .ref("newStoriz/" + _this.state.userText.id)
                .set({
                  from: _this.state.userDessin.id,
                  numbe: 100000 + Math.random() * (100000 - 1)
                })
              firebase
                .database()
                .ref("notifications/" + _this.state.userText.id)
                .set({
                  from: _this.state.userDessin.id,
                  to: _this.state.userText.id,
                  numbe: 100000 + Math.random() * (100000 - 1)
                });
              }
              _this.setState(
                {
                  imgSrc: "",
                  dataImgPlanche: "",
                  lienImgPlanche: "",
                  testNext: 0,
                  testNextText: 0,
                  textHistoire: "",
                  titreHistoire: "",
                  imgHistoire: "",
                  lienImgHistoire: "",
                  dataImgHistoire: "",
                  planche: [{ text: "", img: "", data: "", lien: "" }],
                  lienInputUpload: "",
                  lienInputUploadhistoire: "",
                  submit: false,
                  snackValidation: true
                },
                ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
              );
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    } else {
      if (typeof this.props.match.params.histoireId === "undefined") {
        return Axios({
          method: "post",
          url: config.API_URL + "sendImage/histoires/",
          data: this.state.dataImgHistoire,
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
          return Axios.post(config.API_URL + "histoires/" + this.state.id, {
            userText: this.state.userText,
            userDessin: this.state.userDessin,
            lienIllustration: config.API_URL + s,
            titreHistoire: this.state.titreHistoire
          })
            .then(function(response) {
              Promise.all(
                _this.state.planche.map((planch, index) => {
                  if (index > 0) {
                    console.log(planch);
                    if (planch.data !== "") {
                      return Axios.post(
                        config.API_URL + "sendImage/planches/",
                        planch.data
                      ).then(res => {
                        let s = res.data.filePath
                          .replace("\\", "/")
                          .replace("\\", "/");
                        return Axios.post(config.API_URL + "planches", {
                          histoire: response.data.id,
                          lienDessin: config.API_URL + s,
                          text: planch.text,
                          index: index
                        });
                      });
                    } else {
                      return Axios.post(config.API_URL + "planches", {
                        histoire: response.data.id,
                        text: planch.text,
                        index: index
                      });
                    }
                  }
                })
              ).then(res => {
                console.log(res);

                if (
                  _this.state.userDessin &&
                  _this.state.userText &&
                  _this.state.userDessin.id != _this.state.userText.id
                ) {
                  if (_this.state.userText.id === _this.state.id) {
                    firebase
                      .database()
                      .ref("notifications/" + _this.state.userDessin.id)
                      .set({
                        from: _this.state.id,
                        to: _this.state.userDessin.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      });
                  } else if (_this.state.userDessin.id === _this.state.id) {
                    firebase
                      .database()
                      .ref("notifications/" + _this.state.userText.id)
                      .set({
                        from: _this.state.id,
                        to: _this.state.userText.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      });
                  }
                }
                if (
                  !_this.state.userText ||
                  !_this.state.userDessin ||
                  _this.state.userText.id === _this.state.userDessin.id
                ) {
                  if (!_this.state.userText) {
                    firebase
                      .database()
                      .ref("newStoriz/" + _this.state.userDessin.id)
                      .set({
                        from: _this.state.userLocal.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      })
                      .then(() => {
                        _this.setState(
                          {
                            imgSrc: "",
                            dataImgPlanche: "",
                            lienImgPlanche: "",
                            testNext: 0,
                            testNextText: 0,
                            textHistoire: "",
                            titreHistoire: "",
                            imgHistoire: "",
                            lienImgHistoire: "",
                            dataImgHistoire: "",
                            planche: [
                              { text: "", img: "", data: "", lien: "" }
                            ],
                            lienInputUpload: "",
                            lienInputUploadhistoire: "",
                            submit: false,
                            snackValidation: true
                          },
                          ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                        );
                      });
                  } else if (!_this.state.userDessin) {
                    firebase
                      .database()
                      .ref("newStoriz/" + _this.state.userText.id)
                      .set({
                        from: _this.state.userLocal.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      })
                      .then(() => {
                        _this.setState(
                          {
                            imgSrc: "",
                            dataImgPlanche: "",
                            lienImgPlanche: "",
                            testNext: 0,
                            testNextText: 0,
                            textHistoire: "",
                            titreHistoire: "",
                            imgHistoire: "",
                            lienImgHistoire: "",
                            dataImgHistoire: "",
                            planche: [
                              { text: "", img: "", data: "", lien: "" }
                            ],
                            lienInputUpload: "",
                            lienInputUploadhistoire: "",
                            submit: false,
                            snackValidation: true
                          },
                          ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                        );
                      });
                  } else if (
                    _this.state.userDessin.id === _this.state.userDessin.id
                  ) {
                    firebase
                      .database()
                      .ref("newStoriz/" + _this.state.userText.id)
                      .set({
                        from: _this.state.userLocal.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      })
                      .then(() => {
                        _this.setState(
                          {
                            imgSrc: "",
                            dataImgPlanche: "",
                            lienImgPlanche: "",
                            testNext: 0,
                            testNextText: 0,
                            textHistoire: "",
                            titreHistoire: "",
                            imgHistoire: "",
                            lienImgHistoire: "",
                            dataImgHistoire: "",
                            planche: [
                              { text: "", img: "", data: "", lien: "" }
                            ],
                            lienInputUpload: "",
                            lienInputUploadhistoire: "",
                            submit: false,
                            snackValidation: true
                          },
                          ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                        );
                      });
                  }
                } else {
                  {
                    firebase
                      .database()
                      .ref("newStoriz/" + _this.state.userDessin.id)
                      .set({
                        from: _this.state.userLocal.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      });
                    firebase
                      .database()
                      .ref("newStoriz/" + _this.state.userText.id)
                      .set({
                        from: _this.state.userLocal.id,
                        numbe: 100000 + Math.random() * (100000 - 1)
                      })
                      .then(() => {
                        _this.setState(
                          {
                            imgSrc: "",
                            dataImgPlanche: "",
                            lienImgPlanche: "",
                            testNext: 0,
                            testNextText: 0,
                            textHistoire: "",
                            titreHistoire: "",
                            imgHistoire: "",
                            lienImgHistoire: "",
                            dataImgHistoire: "",
                            planche: [
                              { text: "", img: "", data: "", lien: "" }
                            ],
                            lienInputUpload: "",
                            lienInputUploadhistoire: "",
                            submit: false,
                            snackValidation: true
                          },
                          ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                        );
                      });
                  }
                }
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      } else {
        idHistoire = this.props.match.params.histoireId;
        var idHistoire1 = '';
        var originalHistoire= '';
        if (this.props.match.params.type == "1" || this.props.match.params.type == "2" || this.props.match.params.type == "3") {
          if (this.props.match.params.type == "2") {
            etatHistoire = 'EN_ATTANTE_USER';
          } else {
            etatHistoire = 'EN_ATTANTE_UPDATE';
          }
          
          idHistoire1 = "";
          originalHistoire = idHistoire;
        } else {
          etatHistoire = 'EN_ATTANTE';
          idHistoire1 = idHistoire;
          originalHistoire = "";
        }
        return Axios({
          method: "post",
          url: config.API_URL + "sendImage/histoires/",
          data: this.state.dataImgHistoire,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
            return Axios.put(config.API_URL + "histoires", {
              id: idHistoire1,
              userText: this.state.userText,
              userDessin: this.state.userDessin,
              lienIllustration: config.API_URL + s,
              titreHistoire: this.state.titreHistoire,
              etatHistoire: etatHistoire,
              originalHistoire: originalHistoire,
            }).then(function(response) {
              Promise.all(
                _this.state.planche.map((planch, index) => {
                  if (index > 0) {
                    console.log(planch);
                    if (planch.data !== "") {
                      return Axios.post(
                        config.API_URL + "sendImage/planches/",
                        planch.data
                      ).then(res => {
                        let s = res.data.filePath
                          .replace("\\", "/")
                          .replace("\\", "/");
                        return Axios.put(config.API_URL + "planches", {
                          histoire: response.data.id,
                          lienDessin: config.API_URL + s,
                          text: planch.text,
                          index: index
                        });
                      });
                    } else {
                      return Axios.put(config.API_URL + "planches", {
                        histoire: response.data.id,
                        text: planch.text,
                        index: index
                      });
                    }
                  }
                })
              ).then(res => {
              if (_this.state.userDessin) {
               firebase
                .database()
                .ref("newStoriz/" + _this.state.userText.id)
                .set({
                  from: _this.state.userDessin.id,
                  numbe: 100000 + Math.random() * (100000 - 1)
                })
              firebase
                .database()
                .ref("notifications/" + _this.state.userText.id)
                .set({
                  from: _this.state.userDessin.id,
                  to: _this.state.userText.id,
                  numbe: 100000 + Math.random() * (100000 - 1)
                });
              }
                _this.setState(
                  {
                    imgSrc: "",
                    dataImgPlanche: "",
                    lienImgPlanche: "",
                    testNext: 0,
                    testNextText: 0,
                    textHistoire: "",
                    titreHistoire: "",
                    imgHistoire: "",
                    lienImgHistoire: "",
                    dataImgHistoire: "",
                    planche: [{ text: "", img: "", data: "", lien: "" }],
                    lienInputUpload: "",
                    lienInputUploadhistoire: "",
                    submit: false,
                    snackValidation: true
                  },
                  ()=>setTimeout(()=>_this.props.history.push("/lesHistoires"),3000)
                );
              });
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
    } else {
        this.setState({snackLimit: true, chargement: false}, ()=>{this.forceUpdate()})
    } 
  }
  saveHistoireWithPlanche() {
    this.setState({ submit: true });
    this.handleListItemValide();
    console.log("///////////" + this.state.dataImgHistoire);
    const _this = this;
    const tab = _this.state.planche[_this.state.planche.length - 1];
    console.log(this.props.match.params);
    if (typeof this.props.match.params.histoireId === "undefined") {
      if (this.state.typePage == 1) {
        if (
          tab.text !== "" &&
          tab.img !== "" &&
          tab.data !== "" &&
          tab.lien !== "" &&
          this.state.titreHistoire !== ""
        ) {
          this.submit();
        } else {
          this.handleClick();
        }
      } else if (this.state.typePage == 2) {
        if (
          tab.img !== "" &&
          tab.data !== "" &&
          tab.lien !== "" &&
          this.state.titreHistoire !== ""
        ) {
          this.submit();
        } else {
          this.handleClick();
        }
      } else if (this.state.typePage == 3) {
        if (
          tab.text !== "" &&
          this.state.titreHistoire !== ""
        ) {
          this.submit();
        } else {
          this.handleClick();
        }
      }
    } else {
      if (this.state.typePage == 1) {
        if (
          tab.text !== "" &&
          (tab.img !== "" || tab.data !== "" || tab.lien !== "") &&
          this.state.titreHistoire !== ""
        ) {
          this.submit();
        } else {
          this.handleClick();
        }
      } else if (this.state.typePage == 2) {
        if (
          (tab.img !== "" || tab.data !== "" || tab.lien !== "") &&
          this.state.titreHistoire !== ""
        ) {
          this.submit();
        } else {
          this.handleClick();
        }
      } else if (this.state.typePage == 3) {
        if (tab.text !== "" && this.state.titreHistoire !== "") {
          this.submit();
        } else {
          this.handleClick();
        }
      }
    }
  }

  redirectFunction(index) {
    if (this.props.match.params.type == 1) {
      this.props.history.push("/publier/back");
      this.props.history.goBack();
      this.props.history.push("/publier/" + (index + 2));
    } else if (this.props.match.params.type == 2) {
      if (index == 0) {
        this.props.history.push("/publier/back");
        this.props.history.goBack();
        this.props.history.push("/publier/1");
      } else {
        this.props.history.push("/publier/back");
        this.props.history.goBack();
        this.props.history.push("/publier/3");
      }
    } else if (this.props.match.params.type == 3) {
      this.props.history.push("/publier/back");
      this.props.history.goBack();
      this.props.history.push("/publier/" + (index + 1));
    }
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
  savePlanches(file) {
    this.setState({ testNext: 1 });
    var reader = new FileReader();
    var url = reader.readAsDataURL(file[0]);

    let data = new FormData();
    data.append("file", file[0]);

    reader.onloadend = function(e) {
      this.setState({
        imgSrc: reader.result,
        dataImgPlanche: data,
        lienImgPlanche: "images/planches/" + file[0].name
      });
      this.state.planche[this.state.counter - 1].img = reader.result;
      this.state.planche[this.state.counter - 1].text = this.state.textHistoire;
      this.state.planche[this.state.counter - 1].data = data;
      this.state.planche[this.state.counter - 1].lien =
        "images/planches/" + file[0].name;
      this.forceUpdate();
    }.bind(this);
  }
  handleClick = () => {
    this.setState({ openSnackBar: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackBar: false, snackLimit: false, snackValidation: false });
  };
  handleVisibility = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleOpenBackDrop = () => {
    this.setState({ openBackdrop: true });
  };

  handleCloseBackDrop = () => {
    this.setState({ openBackdrop: false });
  };
  componentDidUpdate = () => {
    if (this.state.shouldBlockNavigation) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  }
  //modal - carousel
  render() {
    const openDessin = Boolean(this.state.anchorElDessin);
    const idDessin = openDessin ? "Dessin" : undefined;
    const openText = Boolean(this.state.anchorElText);
    const idText = openText ? "Text" : undefined;
    const { settings, modal } = this.state;
    const { classes } = this.props;
    console.log(this.state.planche);
    const dateFormat = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    if (this.state.redirect == 1) {
      return <Redirect to="/Connexion" />;
    }
    return (
      <div style={styles.section}>
        {this.state.isOpen ? (
          <Lightbox
            mainSrc={this.state.imgUrl}
            onCloseRequest={() => this.setState({ isOpen: false, imgUrl: "" })}
            reactModalStyle={{
              overlay: { zIndex: 2000 }
            }}
          />
        ) : (
          <div></div>
        )}
        <ButtonBase onClick={() => this.props.history.goBack()}>
          <Fab aria-label={fab.label} style={fab.style}>
            {fab.icon}
          </Fab>
        </ButtonBase>
        <React.Fragment>
          <Prompt
            when={this.state.shouldBlockNavigation}
            message='Souhaitez-vous vraiment quitter la publication ?'
          />
          {/* Component JSX */}
        </React.Fragment>
        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
          Veuillez remplir tous les champs.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.snackLimit}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
          Veuillez publier une histoire dont le contenu est supérieur à 2 planches.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.snackValidation}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="success">
          Ton histoire est en cours de validation, tu seras informé très vite si elle est publiée ou non.
          </Alert>
        </Snackbar>
        <GridContainer style={{ margin: 0, paddingTop: "20px" }}>
          <GridItem xs={12} sm={12} md={12} style={{ textAlign: "left" }}>
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
              <GridContainer
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 8

                }}
              >
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ padding: 0, textAlign: "center" }}
                >
                  <ButtonBase
                    onClick={() => {
                      if (this.state.imgHistoire !== "")
                        this.setState({
                          isOpen: true,
                          imgUrl: this.state.imgHistoire
                        });
                    }}
                    style={
                      isMobile
                        ? { width: "100%", marginTop: 20 }
                        : { width: "30%", marginTop: 25 }
                    }
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
                        image={
                          this.state.imgHistoire == ""
                            ? config.API_URL + "images/defaultPhotoProfil.jpg"
                            : this.state.imgHistoire
                        }
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
                            height: "100%",

                            textAlign: "center"
                          })
                        }
                      >{this.props.match.params.type == "2" ? (
                        <InputBase
                          readOnly
                          className={classes.margin}
                          placeholder="titre histoire"
                          value={this.state.titreHistoire}
                          
                          inputProps={
                            this.state.titreHistoire == "" && this.state.submit
                              ? {
                                  borderLeftWidth: 15,
                                  boderColor: "rgb(255, 44, 77)",
                                  maxLength: 64
                                }
                              : {
                                  borderWidth: 10,
                                  maxLength: 64
                                }
                            
                          }
                          style={
                            (cardTitle.cardTitle,
                            {
                              marginTop: 20,
                              marginBotton: 10,
                              fontSize: "1.5625rem",
                              width: "100%",
                              paddingLeft: 15,
                              color: "white",
                              textAlign: "left"
                            })
                          }
                          onChange={value => {
                            console.log(value.target.value);
                            this.setState({
                              titreHistoire: value.target.value
                            });
                            console.log(this.state.titreHistoire);
                          }}
                          onBlur={() =>
                            this.setState({
                              isOpen: false
                            })
                          }
                        />
                        ) : (
                        <InputBase
                          className={classes.margin}
                          placeholder="titre histoire"
                          value={this.state.titreHistoire}
                          
                          inputProps={
                            this.state.titreHistoire == "" && this.state.submit
                              ? {
                                  borderLeftWidth: 15,
                                  boderColor: "rgb(255, 44, 77)",
                                  maxLength: 64
                                }
                              : {
                                  borderWidth: 10,
                                  maxLength: 64
                                }
                            
                          }
                          style={
                            (cardTitle.cardTitle,
                            {
                              marginTop: 20,
                              marginBotton: 10,
                              fontSize: "1.5625rem",
                              width: "100%",
                              paddingLeft: 15,
                              color: "white",
                              textAlign: "left"
                            })
                          }
                          onChange={value => {
                            console.log(value.target.value);
                            this.setState({
                              titreHistoire: value.target.value
                            });
                            console.log(this.state.titreHistoire);
                          }}
                          onBlur={() =>
                            this.setState({
                              isOpen: false
                            })
                          }
                        />
                        )}
                        {this.state.titreHistoire == "" && this.state.submit ? (
                          <div
                            style={{
                              position: "absolute",
                              top: 20,
                              right: 10,
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              backgroundColor: "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <CloseIcon
                              style={{
                                color: "rgb(255, 44, 77)"
                              }}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {this.props.match.params.type !== "2" ? (
                        <div>
                        <label htmlFor="icon-button-file1">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onBlur={() =>
                              this.setState({
                                isOpen: false
                              })
                            }
                            style={{
                                    background: "white",
                                    color: "grey"
                                  }}
                          >
                            <PhotoCamera />
                            
                          </IconButton>
                        </label>{" "}<br></br><br></br><small style={{color: 'white', fontFamily: 'lato'}}>Image d’illustration (facultative)</small>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file1"
                          type="file"
                          onTouchStart={() => this.setState({ isOpen: false })}
                          onChange={file => {
                            this.saveHistoire(file.target.files);
                            this.setState({ buttonClick: false });
                          }}
                          onBlur={() => this.setState({ isOpen: false })}
                        />
                        </div>
                        ):(<div></div>)}
                      </div>
                    </Card>
                  </ButtonBase>
                </GridItem>
              </GridContainer>
              {!(typeof this.props.match.params.histoireId === "undefined") ? (
                <GridContainer
                  style={{
                    width: "90%",
                    marginTop: 20,
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {this.state.userDessin ? (
                    <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
                      <ListItem>
                        <Link
                          to={
                            this.state.userDessin.id !== this.state.userLocal.id
                              ? "/LesOeuvres/" + this.state.userDessin.id
                              : null
                          }
                        >
                          <ListItemAvatar>
                            {this.state.userDessin.lienPhoto == "" ||
                            this.state.userDessin.lienPhoto == null ? (
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
                                src={this.state.userDessin.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                        </Link>
                        <Link to={"/LesOeuvres/" + this.state.userDessin.id}>
                          <ListItemText
                            style={{
                              paddingBottom: 8
                            }}
                          >
                            <p
                              style={{
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.userDessin.pseudo}
                            </p>
                          </ListItemText>
                        </Link>
                      </ListItem>
                    </GridItem>
                  ) : (
                    <GridItem
                      xs={0}
                      sm={0}
                      md={0}
                      style={{ padding: 0 }}
                    ></GridItem>
                  )}
                  {this.state.userText ? (
                    <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
                      <ListItem>
                        <Link
                          to={
                            this.state.userText.id !== this.state.userLocal.id
                              ? "/LesOeuvres/" + this.state.userText.id
                              : null
                          }
                        >
                          <ListItemAvatar>
                            {this.state.userText.lienPhoto == "" ||
                            this.state.userText.lienPhoto == null ? (
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
                                src={this.state.userText.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                        </Link>
                        <Link to={"/LesOeuvres/" + this.state.userText.id}>
                          <ListItemText
                            style={{
                              paddingBottom: 8
                            }}
                          >
                            <p
                              style={{
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.userText.pseudo}
                            </p>
                          </ListItemText>
                        </Link>
                      </ListItem>
                    </GridItem>
                  ) : (
                    <GridItem
                      xs={0}
                      sm={0}
                      md={0}
                      style={{ padding: 0 }}
                    ></GridItem>
                  )}
                </GridContainer>
              ) : (
                <div>
                  {this.props.match.params.type == "1" ? (
                    <GridContainer
                      style={{
                        width: "90%",
                        marginTop: 20,

                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
                        <ButtonBase
                          disableRipple
                          style={{
                            width: "100%"
                          }}
                          className={classes.button}
                          onClick={this.handleClickDessin}
                        >
                          <ListItem className={classes.avatarPseudo}>
                            <ListItemAvatar>
                              {this.state.userDessin.lienPhoto == "" ||
                              this.state.userDessin.lienPhoto == null ? (
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
                                  src={this.state.userDessin.lienPhoto}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                
                              }}
                            >
                              <p
                                style={{
                                  color: "#5a517f",
                                  fontWeight: "bold",
                                  fontSize: 17,
                                  margin: 0
                                }}
                              >
                                {this.state.userDessin.pseudo}
                              </p>
                            </ListItemText>
                            <EditIcon className={classes.editeIcon} />
                          </ListItem>
                        </ButtonBase>

                        <Popper
                          id={idDessin}
                          open={openDessin}
                          anchorEl={this.state.anchorElDessin}
                          placement="bottom-start"
                          className={classes.popper}
                        >
                          <Autocomplete
                            open
                            onClose={this.handleCloseDessin}
                            classes={{
                              paper: classes.paper,
                              option: classes.option,
                              popperDisablePortal: classes.popperDisablePortal
                            }}
                            value={this.state.pendingValueDessin}
                            onChange={(event, newValue) => {
                              this.setState(
                                { pendingValueDessin: newValue },
                                () => {}
                              );
                            }}
                            disableCloseOnSelect
                            disablePortal
                            renderTags={() => null}
                            renderOption={(option, { selected }) => (
                              <React.Fragment>
                                <DoneIcon
                                  className={classes.iconSelected}
                                  style={{
                                    visibility: selected ? "visible" : "hidden"
                                  }}
                                />
                                <ListItem>
                                  <ListItemAvatar>
                                    {option.lienPhoto == "" ||
                                    option.lienPhoto == null ? (
                                      <Avatar
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar alt="" src={option.lienPhoto} />
                                    )}
                                  </ListItemAvatar>
                                  <ListItemText
                                    style={{
                                      
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#5a517f",
                                        fontWeight: "bold",
                                        fontSize: 17,
                                        margin: 0
                                      }}
                                    >
                                      {option.pseudo}
                                    </p>
                                  </ListItemText>
                                </ListItem>
                              </React.Fragment>
                            )}
                            options={[...this.state.reseauUsers].sort(
                              (a, b) => {
                                // Display the selected labels first.
                                let ai =
                                  this.state.userDessin === a
                                    ? 0
                                    : this.state.userDessin.length + -1;

                                let bi =
                                  this.state.userDessin === b
                                    ? 0
                                    : this.state.userDessin.length + -1;
                                return ai - bi;
                              }
                            )}
                            getOptionLabel={option => option.pseudo}
                            renderInput={params => (
                              <InputBase
                                ref={params.InputProps.ref}
                                inputProps={params.inputProps}
                                autoFocus
                                className={classes.InputBase}
                              />
                            )}
                          />
                        </Popper>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
                        <ButtonBase
                          disableRipple
                          className={classes.button}
                          style={{ width: "100%" }}
                          onClick={this.handleClickText}
                        >
                          <ListItem className={classes.avatarPseudo}>
                            <ListItemAvatar>
                              {this.state.userText.lienPhoto == "" ||
                              this.state.userText.lienPhoto == null ? (
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
                                  src={this.state.userText.lienPhoto}
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                
                              }}
                            >
                              <p
                                style={{
                                  color: "#5a517f",
                                  fontWeight: "bold",
                                  fontSize: 17,
                                  margin: 0
                                }}
                              >
                                {this.state.userText.pseudo}
                              </p>
                            </ListItemText>
                            <EditIcon />
                          </ListItem>
                        </ButtonBase>
                        <Popper
                          id={idText}
                          open={openText}
                          anchorEl={this.state.anchorElText}
                          placement="bottom-start"
                          className={classes.popper}
                        >
                          <Autocomplete
                            open
                            onClose={this.handleCloseText}
                            classes={{
                              paper: classes.paper,
                              option: classes.option,
                              popperDisablePortal: classes.popperDisablePortal
                            }}
                            value={this.state.pendingValueText}
                            onChange={(event, newValue) => {
                              this.setState(
                                { pendingValueText: newValue },
                                () => {}
                              );
                            }}
                            disableCloseOnSelect
                            disablePortal
                            renderTags={() => null}
                            renderOption={(option, { selected }) => (
                              <React.Fragment>
                                <DoneIcon
                                  className={classes.iconSelected}
                                  style={{
                                    visibility: selected ? "visible" : "hidden"
                                  }}
                                />
                                <ListItem>
                                  <ListItemAvatar>
                                    {option.lienPhoto == "" ||
                                    option.lienPhoto == null ? (
                                      <Avatar
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                      />
                                    ) : (
                                      <Avatar alt="" src={option.lienPhoto} />
                                    )}
                                  </ListItemAvatar>
                                  <ListItemText
                                    style={{
                                      
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#5a517f",
                                        fontWeight: "bold",
                                        fontSize: 17,
                                        margin: 0
                                      }}
                                    >
                                      {option.pseudo}
                                    </p>
                                  </ListItemText>
                                </ListItem>
                              </React.Fragment>
                            )}
                            options={[...this.state.reseauUsers].sort(
                              (a, b) => {
                                // Display the selected labels first.
                                let ai =
                                  this.state.userText === a
                                    ? 0
                                    : this.state.userText.length + -1;

                                let bi =
                                  this.state.userText === b
                                    ? 0
                                    : this.state.userText.length + -1;
                                return ai - bi;
                              }
                            )}
                            getOptionLabel={option => option.pseudo}
                            renderInput={params => (
                              <InputBase
                                ref={params.InputProps.ref}
                                inputProps={params.inputProps}
                                autoFocus
                                className={classes.InputBase}
                              />
                            )}
                          />
                        </Popper>
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <div></div>
                  )}
                  {this.props.match.params.type == "2" ? (
                    <GridContainer
                      style={{
                        width: "90%",
                        marginTop: 20,

                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      <GridItem xs={12} sm={12} md={12} style={{ padding: 0 }}>
                        <ListItem className={classes.avatarPseudo1}>
                          <ListItemAvatar>
                            {this.state.userDessin.lienPhoto == "" ||
                            this.state.userDessin.lienPhoto == null ? (
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
                                src={this.state.userDessin.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            style={{
                              
                            }}
                          >
                            <p
                              style={{
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.userDessin.pseudo}
                            </p>
                          </ListItemText>
                        </ListItem>
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <div></div>
                  )}
                  {this.props.match.params.type == "3" ? (
                    <GridContainer
                      style={{
                        width: "90%",
                        marginTop: 20,

                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      <GridItem xs={12} sm={12} md={12} style={{ padding: 0 }}>
                        <ListItem className={classes.avatarPseudo1}>
                          <ListItemAvatar>
                            {this.state.userText.lienPhoto == "" ||
                            this.state.userText.lienPhoto == null ? (
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
                                src={this.state.userText.lienPhoto}
                              />
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            style={{
                            }}
                          >
                            <p
                              style={{
                                color: "#5a517f",
                                fontWeight: "bold",
                                fontSize: 17,
                                margin: 0
                              }}
                            >
                              {this.state.userText.pseudo}
                            </p>
                          </ListItemText>
                        </ListItem>
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
              
              <div
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 15,
                  position: "relative"
                }}
              >
                {this.state.typePage == "1" ? (
                  <SampleNextArrow
                    onClick={() => this.next()}
                    style={Styles.NextArrow}
                    Color={
                      this.state.testNext == 1 && this.state.testNextText == 1
                        ? "#332861"
                        : "rgba(0, 0, 0, 0.26)"
                    }
                    disabled={
                      this.state.testNext == 1 && this.state.testNextText == 1
                        ? false
                        : true
                    }
                    style={Styles.NextArrow}
                    right={isMobile ? "-11%" : "-5%"}
                  />
                ) : (
                  <div></div>
                )}
                {this.state.typePage == "2" ? (
                  <SampleNextArrow
                    onClick={() => this.next()}
                    style={Styles.NextArrow}
                    Color={
                      (this.state.testNext == 1) == 1
                        ? "#332861"
                        : "rgba(0, 0, 0, 0.26)"
                    }
                    disabled={(this.state.testNext == 1) == 1 ? false : true}
                    style={Styles.NextArrow}
                    right={isMobile ? "-11%" : "-5%"}
                  />
                ) : (
                  <div></div>
                )}
                {this.state.typePage == "3" ? (
                  <SampleNextArrow
                    onClick={() => this.next()}
                    style={Styles.NextArrow}
                    Color={
                      this.state.testNextText == 1
                        ? "#332861"
                        : "rgba(0, 0, 0, 0.26)"
                    }
                    disabled={this.state.testNextText == 1 ? false : true}
                    style={Styles.NextArrow}
                    right={isMobile ? "-11%" : "-5%"}
                  />
                ) : (
                  <div></div>
                )}
                <Slider
                  ref={slider => (this.slider = slider)}
                  {...settings}
                  style={{
                    height: "100%"
                  }}
                >
                  {this.state.planche != []
                    ? this.state.planche.map((planche, index) => {
                        return (
                          <div key={1}>
                            <GridContainer
                              justify="center"
                              alignItems="center"
                            ></GridContainer>
                            {this.state.typePage == "2" && typeof this.props.match.params.histoireId === "undefined" ? (
                              <GridContainer
                                style={{
                                  margin: 0,
                                  marginBottom: 30,
                                  marginTop: 3
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
                                            background: "#2f99b1",
                                            borderRadius: "15px 15px 15px 15px",
                                            height: "100%",
                                            width: "100%"
                                          }
                                        : {
                                            textAlign: "-webkit-center",
                                            background: "#2f99b1",
                                            borderRadius: "15px 15px 15px 15px",
                                            height: "100%",
                                            width: "100%"
                                          }
                                    }
                                  >
                                    <ButtonBase
                                      onClick={() => {
                                        if (planche.img !== "")
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.img
                                          });
                                        else if (planche.lien !== "") {
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.lien
                                          });
                                        }
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Parallax
                                        image={
                                          planche.img !== ""
                                            ? planche.img
                                            : planche.lien
                                        }
                                        style={
                                          isMobile
                                            ? {
                                                height: 400,
                                                borderRadius:
                                                  "15px 15px 15px 15px",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                              }
                                            : {
                                                height: 550,
                                                width: "70%",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                display: "flex",
                                                justifyContent: "center"
                                              }
                                        }
                                      >
                                        <input
                                          accept="image/*"
                                          className={classes.input}
                                          id="icon-button-file"
                                          type="file"
                                          onTouchStart={() =>
                                            this.setState({ isOpen: false })
                                          }
                                          onChange={file => {
                                            this.savePlanches(
                                              file.target.files
                                            );
                                            this.setState({
                                              buttonClick: false
                                            });
                                          }}
                                          onBlur={() =>
                                            this.setState({ isOpen: false })
                                          }
                                        />
                                        <label htmlFor="icon-button-file">
                                          <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onBlur={() =>
                                              this.setState({
                                                isOpen: false
                                              })
                                            }
                                            style={
                                              index ===
                                                this.state.planche.length - 1 &&
                                              planche.img === "" &&
                                              this.state.submit
                                                ? {
                                                    background:
                                                      "rgb(255, 44, 77)",
                                                    color: "white",
                                                    marginLeft: 15
                                                  }
                                                : {
                                                    background: "white",
                                                    color: "grey",
                                                    marginLeft: 15
                                                  }
                                            }
                                          >
                                            <PhotoCamera />
                                          </IconButton>
                                        </label>
                                      </Parallax>
                                    </ButtonBase>
                                  </div>
                                </GridItem>
                              </GridContainer>
                            ) : this.state.typePage == "2" ? (
                              <GridContainer
                                style={{
                                  margin: 0,
                                  marginBottom: 30,
                                  marginTop: 3
                                }}
                                justify="center"
                                alignItems="center"
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
                                            background: "#2f99b1",
                                            borderRadius: "15px 15px 0px 0px",
                                            height: "100%",
                                            width: "100%"
                                          }
                                        : {
                                            textAlign: "-webkit-center",
                                            background: "#2f99b1",
                                            borderRadius: "15px 0px 0px 15px",
                                            height: "100%",
                                            width: "100%"
                                          }
                                    }
                                  >
                                    <ButtonBase
                                      onClick={() => {
                                        if (planche.img !== "")
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.img
                                          });
                                        else if (planche.lien !== "") {
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.lien
                                          });
                                        }
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Parallax
                                        image={
                                          planche.img !== ""
                                            ? planche.img
                                            : planche.lien
                                        }
                                        style={
                                          isMobile
                                            ? {
                                                height: 400,
                                                borderRadius:
                                                  "15px 15px 15px 15px",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                              }
                                            : {
                                                height: 550,
                                                width: "70%",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                display: "flex",
                                                justifyContent: "center"
                                              }
                                        }
                                      >
                                        <input
                                          accept="image/*"
                                          className={classes.input}
                                          id="icon-button-file"
                                          type="file"
                                          onTouchStart={() =>
                                            this.setState({ isOpen: false })
                                          }
                                          onChange={file => {
                                            this.savePlanches(
                                              file.target.files
                                            );
                                            this.setState({
                                              buttonClick: false
                                            });
                                          }}
                                          onBlur={() =>
                                            this.setState({ isOpen: false })
                                          }
                                        />
                                        <label htmlFor="icon-button-file">
                                          <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onBlur={() =>
                                              this.setState({
                                                isOpen: false
                                              })
                                            }
                                            style={
                                              index ===
                                                this.state.planche.length - 1 &&
                                              planche.img === "" &&
                                              this.state.submit
                                                ? {
                                                    background:
                                                      "rgb(255, 44, 77)",
                                                    color: "white",
                                                    marginLeft: 15
                                                  }
                                                : {
                                                    background: "white",
                                                    color: "grey",
                                                    marginLeft: 15
                                                  }
                                            }
                                          >
                                            <PhotoCamera />
                                          </IconButton>
                                        </label>
                                      </Parallax>
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
                                        width: "100%",
                                        textAlign: 'justify'
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
                                            whiteSpace: 'pre-line'
                                          }}
                                        >
                                          {planche.text == "" ? (<div style={
                                            {
                                              width: "100%",
                                              textAlign: 'center',
                                              fontSize: 'medium'
                                            }
                                          }>Cette planche ne contient aucun Texte</div>) : planche.text}
                                        </p>
                                      </SimpleBar>
                                    </div>
                                  </GridItem>
                              </GridContainer>
                            ) : this.state.typePage == "3" ? (
                              <GridContainer
                                style={
                                  isMobile
                                    ? {
                                        width: "100%",
                                        margin: 0,
                                        marginBottom: 30,
                                        marginTop: 3
                                      }
                                    : {
                                        width: "100%",
                                        margin: 0,
                                        marginBottom: 30,
                                        marginTop: 3,
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
                                  <div
                                    style={
                                      isMobile
                                        ? {
                                            width: "90%",
                                            marginLeft: "auto",
                                            marginRight: "auto"
                                          }
                                        : {
                                            width: "70%",
                                            marginLeft: "auto",
                                            marginRight: "auto"
                                          }
                                    }
                                  >
                                    <TextField
                                      primary
                                      id="standard-multiline-static"
                                      placeholder="Ecrire votre texte"
                                      variant="outlined"
                                      label="Texte"
                                      multiline
                                      rows="13"
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white"
                                      }}
                                      inputProps={{
                                        maxLength: 1500
                                      }}
                                      error={
                                        index ===
                                          this.state.planche.length - 1 &&
                                        this.state.textHistoire === "" &&
                                        this.state.submit
                                          ? true
                                          : false
                                      }
                                      value={this.state.textHistoire}
                                      autoFocus={
                                        this.state.counter !==
                                        this.state.planche[
                                          this.state.counter - 1
                                        ]
                                          ? false
                                          : true
                                      }
                                      onChange={(textHistoire, event) => {
                                        this.setState({
                                          textHistoire:
                                          textHistoire.target.value,
                                          testNextText: 1
                                        }, ()=>{
                                          this.setState((state)=>({
                                            numberChar: state.textHistoire.length
                                          }));
                                        });
                                      }}
                                    />
                                    <div style={{textAlign: 'end', marginTop: 1}}>
                                      <Chip label={this.state.numberChar +" / 1500"} color="white" variant="outlined" />
                                    </div>
                                  </div>
                                  
                                </GridItem>
                              </GridContainer>
                            ) : (
                              <GridContainer
                                justify="center"
                                alignItems="center"
                                style={{
                                  margin: 0,
                                  marginBottom: 30,
                                  marginTop: 3
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
                                      onClick={() => {
                                        if (planche.img !== "")
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.img
                                          });
                                        else if (planche.lien !== "") {
                                          this.setState({
                                            isOpen: true,
                                            imgUrl: planche.lien
                                          });
                                        }
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Parallax
                                        image={
                                          planche.img !== ""
                                            ? planche.img
                                            : planche.lien
                                        }
                                        style={
                                          isMobile
                                            ? {
                                                height: 400,
                                                borderRadius:
                                                  "15px 15px 0px 0px",
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%"
                                              }
                                            : {
                                                height: 550,
                                                borderRadius:
                                                  "15px 0px 0px 15px",
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%"
                                              }
                                        }
                                      >
                                        <div>
                                          <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="icon-button-file"
                                            type="file"
                                            onTouchStart={() =>
                                              this.setState({ isOpen: false })
                                            }
                                            onChange={file => {
                                              this.savePlanches(
                                                file.target.files
                                              );
                                              this.setState({
                                                buttonClick: false
                                              });
                                            }}
                                            onBlur={() =>
                                              this.setState({ isOpen: false })
                                            }
                                          />
                                          <label htmlFor="icon-button-file">
                                            <IconButton
                                              color="primary"
                                              aria-label="upload picture"
                                              component="span"
                                              onBlur={() =>
                                                this.setState({
                                                  isOpen: false
                                                })
                                              }
                                              style={
                                                index ===
                                                  this.state.planche.length -
                                                    1 &&
                                                planche.img === "" &&
                                                this.state.submit
                                                  ? {
                                                      background:
                                                        "rgb(255, 44, 77)",
                                                      color: "white",
                                                      marginLeft: 15
                                                    }
                                                  : {
                                                      background: "white",
                                                      color: "grey",
                                                      marginLeft: 15
                                                    }
                                              }
                                            >
                                              <PhotoCamera />
                                            </IconButton>
                                          </label>
                                        </div>
                                      </Parallax>
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
                                      width: "90%",
                                      marginLeft: "auto",
                                      marginRight: "auto"
                                    }}
                                  >
                                    <TextField
                                      primary
                                      id="standard-multiline-static"
                                      placeholder="Ecrire votre texte"
                                      variant="outlined"
                                      label="Texte"
                                      multiline
                                      rows="12"
                                      inputProps={{
                                        maxLength: 1500
                                      }}
                                      error={
                                        index ===
                                          this.state.planche.length - 1 &&
                                        this.state.textHistoire === "" &&
                                        this.state.submit
                                          ? true
                                          : false
                                      }
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white"
                                      }}
                                      value={this.state.textHistoire}
                                      autoFocus={
                                        this.state.counter !==
                                        this.state.planche[
                                          this.state.counter - 1
                                        ]
                                          ? false
                                          : true
                                      }
                                      onChange={(textHistoire, event) => {
                                        this.setState(
                                          {
                                            textHistoire:
                                              textHistoire.target.value
                                          },
                                          () => {
                                            this.setState((state)=>({
                                              numberChar: state.textHistoire.length
                                            }), ()=>{this.testTextNext();});
                                            
                                          }
                                        );
                                      }}
                                    />
                                    <div style={{textAlign: 'end', marginTop: 1}}>
                                      <Chip label={this.state.numberChar +" / 1500"} color="white" variant="outlined" />
                                    </div>
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
                <SamplePrevArrow
                  onClick={() => this.previous()}
                  Color={
                    this.state.counter === 2 ? "rgba(0, 0, 0, 0.26)" : "#332861"
                  }
                  disabled={this.state.counter === 2 ? true : false}
                  left={isMobile ? "-11%" : "-5%"}
                />
              </div>

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
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: "15px"
                  }}
                >
                  {this.state.chargement == false ? (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "rgb(31, 23, 72)",
                        marginLeft: 15
                      }}
                      color="rgb(90, 81, 127)"
                      onClick={() => this.setState({shouldBlockNavigation: false},()=>{this.saveHistoireWithPlanche()})}
                    >
                      Publier Histoire
                    </Button>
                  ) : (
                    <CircularProgress
                      style={{ marginRight: 55, color: "rgb(31, 23, 72)" }}
                    />
                  )}
                </GridItem>
              </GridContainer>
            </Paper>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
const Styles = {};
const styles1 = theme => ({
  input: {
    display: "none"
  },
  iconSelected: {
    width: 20,
    height: 20,
    marginTop: 25,
    marginRight: 5,
    marginLeft: -2
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2
  },
  text: {
    flexGrow: 1
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa"
  },
  root: {
    width: 221,
    fontSize: 13
  },
  InputBase: {
    padding: 0,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        //  boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  },
  error: {
    borderWidth: 10,
    borderColor: "grey"
  },
  buttonBase: {
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    paddingBottom: 8,
    color: "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: "#0366d6"
    },
    "& span": {
      width: "100%"
    },
    "& svg": {
      width: 16,
      height: 16
    }
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent"
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover
    }
  },
  header: {
    borderBottom: "1px solid #e1e4e8",
    padding: "8px 10px",
    fontWeight: 600
  },
  popperDisablePortal: {
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  avatarPseudo: {
    "&:hover,&:focus": {
      backgroundColor: "rgba(0,0,0,0.05)",
      color: "rgba(0,0,0,0.5)"
    }
  },
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2001
  },
  editeIcon: {}
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
  const { className, style, onClick, disabled, Color, right } = props;
  return (
    <IconButton
      aria-label="delete"
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "45%",
        right: right,
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
  const { className, style, onClick, disabled, Color, left } = props;
  return (
    <IconButton
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "45%",
        zIndex: 100,
        left: left,
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
const labels = [
  {
    name: "good first issue",
    color: "#7057ff",
    description: "Good for newcomers"
  },
  {
    name: "help wanted",
    color: "#008672",
    description: "Extra attention is needed"
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: ""
  },

  {
    name: "priority: high",
    color: "#d93f0b",
    description: ""
  },
  {
    name: "priority: low",
    color: "#0e8a16",
    description: ""
  },
  {
    name: "priority: medium",
    color: "#fbca04",
    description: ""
  },
  {
    name: "status: can't reproduce",
    color: "#fec1c1",
    description: ""
  },
  {
    name: "status: confirmed",
    color: "#215cea",
    description: ""
  },
  {
    name: "status: duplicate",
    color: "#cfd3d7",
    description: "This issue or pull request already exists"
  },
  {
    name: "status: needs information",
    color: "#fef2c0",
    description: ""
  },
  {
    name: "status: wont do/fix",
    color: "#eeeeee",
    description: "This will not be worked on"
  },
  {
    name: "type: bug",
    color: "#d73a4a",
    description: "Something isn't working"
  },
  {
    name: "type: discussion",
    color: "#d4c5f9",
    description: ""
  },
  {
    name: "type: documentation",
    color: "#006b75",
    description: ""
  },
  {
    name: "type: enhancement",
    color: "#84b6eb",
    description: ""
  },
  {
    name: "type: epic",
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks"
  },
  {
    name: "type: feature request",
    color: "#fbca04",
    description: "New feature or request"
  },
  {
    name: "type: question",
    color: "#d876e3",
    description: "Further information is requested"
  }
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
PublierView.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles1)(PublierView));
