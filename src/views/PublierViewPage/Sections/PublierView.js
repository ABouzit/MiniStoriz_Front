import React from "react";
import PropTypes from "prop-types";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import Popper from "@material-ui/core/Popper";
import AddIcon from "@material-ui/icons/ArrowBackOutlined";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
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

class PublierView extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      textHistoire: "",
      testNext: 0,
      testNextText: 0,
      planche: [{ text: "", img: "", data: "", lien: "" }],
      imgSrc: "",
      dataImgPlanche: "",
      lienImgPlanche: "",
      imgHistoire: "",
      dataImgHistoire: "",
      lienImgHistoire: "",
      buttonClick: false,
      anchorElDessin: null,
      anchorElText: null,
      pendingValueText: "",
      pendingValueDessin: "",
      reseauUsers: "",
      id: "4305f81f-8e67-45df-80eb-54a646387457",
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
  saveHistoire(file) {
    console.log(file);
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
  componentDidMount() {
    Axios.get(config.API_URL + "users/", {}).then(res => {
      this.setState({ reseauUsers: res.data });
      if (this.props.match.params.type == "1")
        this.setState({
          userText: res.data[0],
          userDessin: res.data[0]
        });
      else if (this.props.match.params.type == "2")
        this.setState({
          userDessin: res.data[0],
          userText: null
        });
      else if (this.props.match.params.type == "3")
        this.setState({
          userText: res.data[0],
          userDessin: null
        });
    });

    this.next();
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
    if (this.state.imgSrc === "") {
      this.setState({ testNext: 0 });
      this.forceUpdate();
    } else {
      this.setState({ testNext: 1 });
      this.forceUpdate();
    }

    this.slider.slickNext();
    console.log(this.state.planche);
    console.log(this.state.counter);
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
      this.state.userText.id !== "4305f81f-8e67-45df-80eb-54a646387457" &&
      this.state.pendingValueDessin.id !==
        "4305f81f-8e67-45df-80eb-54a646387457"
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
      this.state.userDessin.id !== "4305f81f-8e67-45df-80eb-54a646387457" &&
      this.state.pendingValueText.id !== "4305f81f-8e67-45df-80eb-54a646387457"
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
    this.setState({ anchorElText: null });
  };
  submit() {
    const _this = this;
    return Axios({
      method: "post",
      url: config.API_URL + "sendImage/histoires/",
      data: this.state.dataImgHistoire,
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
      return Axios.post(config.API_URL + "histoires", {
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
                submit: false
              },
              () => _this.props.history.push("/lesHistoires")
            );
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  saveHistoireWithPlanche() {
    this.setState({ submit: true });
    this.handleListItemValide();
    console.log("///////////" + this.state.dataImgHistoire);
    const _this = this;
    const tab = _this.state.planche[_this.state.planche.length - 1];
    console.log(this.props.match.params);
    if (this.props.match.params.type == 1) {
      if (
        tab.text !== "" &&
        tab.img !== "" &&
        tab.data !== "" &&
        tab.lien !== "" &&
        this.state.dataImgHistoire !== "" &&
        this.state.titreHistoire !== ""
      ) {
        this.submit();
      } else {
        this.handleClick();
      }
    } else if (this.props.match.params.type == 2) {
      if (
        tab.img !== "" &&
        tab.data !== "" &&
        tab.lien !== "" &&
        this.state.dataImgHistoire !== "" &&
        this.state.titreHistoire !== ""
      ) {
        this.submit();
      } else {
        this.handleClick();
      }
    } else if (this.props.match.params.type == 3) {
      if (
        tab.text !== "" &&
        this.state.dataImgHistoire !== "" &&
        this.state.titreHistoire !== ""
      ) {
        this.submit();
      } else {
        this.handleClick();
      }
    }
  }
  // redirectFunction(index) {
  //   if (this.props.match.params.type == 1) {
  //     this.setState(
  //       {
  //         imgSrc: "",
  //         dataImgPlanche: "",
  //         lienImgPlanche: "",
  //         testNext: 0,
  //         testNextText: 0,
  //         textHistoire: "",
  //         titreHistoire: "",
  //         imgHistoire: "",
  //         lienImgHistoire: "",
  //         dataImgHistoire: "",
  //         planche: [{ text: "", img: "", data: "", lien: "" }],
  //         lienInputUpload: "",
  //         lienInputUploadhistoire: "",
  //         submit: false
  //       },
  //       () => {
  //         if (index + 2 === 2) {
  //           this.setState({
  //             userDessin: this.state.reseauUsers[0],
  //             userText: null
  //           });
  //           this.props.history.replace("/Publier/2");
  //         } else {
  //           this.setState({
  //             userDessin: null,
  //             userText: this.state.reseauUsers[0]
  //           });
  //           this.props.history.replace("/Publier/3");
  //         }
  //       }
  //     );
  //   } else if (this.props.match.params.type == 2) {
  //     if (index == 0) {
  //       this.setState(
  //         {
  //           imgSrc: "",
  //           dataImgPlanche: "",
  //           lienImgPlanche: "",
  //           testNext: 0,
  //           testNextText: 0,
  //           textHistoire: "",
  //           titreHistoire: "",
  //           imgHistoire: "",
  //           lienImgHistoire: "",
  //           dataImgHistoire: "",
  //           planche: [{ text: "", img: "", data: "", lien: "" }],
  //           lienInputUpload: "",
  //           lienInputUploadhistoire: "",
  //           submit: false
  //         },
  //         () => {
  //           this.setState({
  //             userText: this.state.reseauUsers[0],
  //             userDessin: this.state.reseauUsers[0]
  //           });
  //           this.props.history.replace("/Publier/1");
  //         }
  //       );
  //     } else {
  //       this.setState(
  //         {
  //           imgSrc: "",
  //           dataImgPlanche: "",
  //           lienImgPlanche: "",
  //           testNext: 0,
  //           testNextText: 0,
  //           textHistoire: "",
  //           titreHistoire: "",
  //           imgHistoire: "",
  //           lienImgHistoire: "",
  //           dataImgHistoire: "",
  //           planche: [{ text: "", img: "", data: "", lien: "" }],
  //           lienInputUpload: "",
  //           lienInputUploadhistoire: "",
  //           submit: false
  //         },
  //         () => {
  //           this.setState({
  //             userDessin: null,
  //             userText: this.state.reseauUsers[0]
  //           });
  //           this.props.history.replace("/Publier/3");
  //         }
  //       );
  //     }
  //   } else if (this.props.match.params.type == 3) {
  //     this.setState(
  //       {
  //         imgSrc: "",
  //         dataImgPlanche: "",
  //         lienImgPlanche: "",
  //         testNext: 0,
  //         testNextText: 0,
  //         textHistoire: "",
  //         titreHistoire: "",
  //         imgHistoire: "",
  //         lienImgHistoire: "",
  //         dataImgHistoire: "",
  //         planche: [{ text: "", img: "", data: "", lien: "" }],
  //         lienInputUpload: "",
  //         lienInputUploadhistoire: "",
  //         submit: false
  //       },
  //       () => {
  //         if (index + 2 === 2) {
  //           this.setState({
  //             userDessin: this.state.reseauUsers[0],
  //             userText: null
  //           });
  //           this.props.history.replace("/Publier/2");
  //         } else {
  //           this.setState({
  //             userDessin: this.state.reseauUsers[0],
  //             userText: this.state.reseauUsers[0]
  //           });
  //           this.props.history.replace("/Publier/1");
  //         }
  //       }
  //     );
  //   }
  // }
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

    this.setState({ openSnackBar: false });
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
  //modal - carousel
  render() {
   
    const openDessin = Boolean(this.state.anchorElDessin);
    const idDessin = openDessin ? "Dessin" : undefined;
    const openText = Boolean(this.state.anchorElText);
    const idText = openText ? "Text" : undefined;
    const { settings, modal } = this.state;
    const { classes } = this.props;
    console.log(this.props.match.params.type);
    const dateFormat = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

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
          <Fab aria-label={fab.label} style={fab.style} color={fab.color}>
            {fab.icon}
          </Fab>
        </ButtonBase>
        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            Remplissez touts les champs pour cree cette histoire
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
              {/* {this.state.planches.lenght > 18 ? (
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
              ) : (
                <div></div>
              )}
               */}

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
                          {this.state.userDessin.imgProfil == "" ||
                          this.state.userDessin.imgProfil == null ? (
                            <Avatar
                              alt=""
                              src={
                                config.API_URL + "images/defaultPhotoProfil.jpg"
                              }
                            />
                          ) : (
                            <Avatar
                              alt=""
                              src={this.state.userDessin.imgProfil}
                            />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          style={{
                            paddingBottom: 20
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
                                {option.imgProfil == "" ||
                                option.imgProfil == null ? (
                                  <Avatar
                                    alt=""
                                    src={
                                      config.API_URL +
                                      "images/defaultPhotoProfil.jpg"
                                    }
                                  />
                                ) : (
                                  <Avatar alt="" src={option.imgProfil} />
                                )}
                              </ListItemAvatar>
                              <ListItemText
                                style={{
                                  paddingBottom: 20
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
                        options={[...this.state.reseauUsers].sort((a, b) => {
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
                        })}
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
                          {this.state.userText.imgProfil == "" ||
                          this.state.userText.imgProfil == null ? (
                            <Avatar
                              alt=""
                              src={
                                config.API_URL + "images/defaultPhotoProfil.jpg"
                              }
                            />
                          ) : (
                            <Avatar
                              alt=""
                              src={this.state.userText.imgProfil}
                            />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          style={{
                            paddingBottom: 20
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
                                {option.imgProfil == "" ||
                                option.imgProfil == null ? (
                                  <Avatar
                                    alt=""
                                    src={
                                      config.API_URL +
                                      "images/defaultPhotoProfil.jpg"
                                    }
                                  />
                                ) : (
                                  <Avatar alt="" src={option.imgProfil} />
                                )}
                              </ListItemAvatar>
                              <ListItemText
                                style={{
                                  paddingBottom: 20
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
                        options={[...this.state.reseauUsers].sort((a, b) => {
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
                        })}
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
                        {this.state.userDessin.imgProfil == "" ||
                        this.state.userDessin.imgProfil == null ? (
                          <Avatar
                            alt=""
                            src={
                              config.API_URL + "images/defaultPhotoProfil.jpg"
                            }
                          />
                        ) : (
                          <Avatar
                            alt=""
                            src={this.state.userDessin.imgProfil}
                          />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          paddingBottom: 20
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
                        {this.state.userText.imgProfil == "" ||
                        this.state.userText.imgProfil == null ? (
                          <Avatar
                            alt=""
                            src={
                              config.API_URL + "images/defaultPhotoProfil.jpg"
                            }
                          />
                        ) : (
                          <Avatar alt="" src={this.state.userText.imgProfil} />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          paddingBottom: 20
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
                  style={{ padding: 0, display: "flex" }}
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
                        ? { width: "100%", marginTop: 15 }
                        : { width: "30%", marginTop: 15 }
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
                      >
                        <InputBase
                          className={classes.margin}
                          placeholder="titre histoire"
                          value={this.state.titreHistoire}
                          inputProps={
                            this.state.titreHistoire == "" && this.state.submit
                              ? {
                                  borderLeftWidth: 15,
                                  boderColor: "red"
                                }
                              : {
                                  borderWidth: 10
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
                                color: "red"
                              }}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
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
                            style={
                              this.state.imgHistoire == "" && this.state.submit
                                ? {
                                    background: "red",
                                    color: "white"
                                  }
                                : {
                                    background: "white",
                                    color: "grey"
                                  }
                            }
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>{" "}
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
                    </Card>
                  </ButtonBase>
                </GridItem>
              </GridContainer>
              <div
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 15,
                  position: "relative"
                }}
              >
                {this.props.match.params.type == "1" ? (
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
                {this.props.match.params.type == "2" ? (
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
                {this.props.match.params.type == "3" ? (
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
                            {this.props.match.params.type == "2" ? (
                              <GridContainer
                                style={{
                                  margin: 0,
                                  marginBottom: 30,
                                  marginTop: 20
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
                                            borderRadius: "15px 15px 15px 15px",
                                            height: "100%",
                                            width: "100%"
                                          }
                                        : {
                                            textAlign: "-webkit-center",
                                            background: "#5a517f",
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
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Parallax
                                        image={planche.img}
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
                                                    background: "red",
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
                            ) : this.props.match.params.type == "3" ? (
                              <GridContainer
                                style={
                                  isMobile
                                    ? {
                                        width: "100%",
                                        margin: 0,
                                        marginBottom: 30,
                                        marginTop: 20
                                      }
                                    : {
                                        width: "100%",
                                        margin: 0,
                                        marginBottom: 30,
                                        marginTop: 20,
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
                                          backgroundColor: "rgb(227, 243, 253)",
                                          borderRadius: "15px 15px 15px 15px",
                                          borderRadiusTopLeft: 15,
                                          padding: 0,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center"
                                        }
                                      : {
                                          height: 550,
                                          backgroundColor: "rgb(227, 243, 253)",
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
                                        });
                                      }}
                                    />
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
                                  marginTop: 20
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
                                            background: "#5a517f",
                                            borderRadius: "15px 15px 0px 0px",
                                            height: "100%"
                                          }
                                        : {
                                            textAlign: "-webkit-center",
                                            background: "#5a517f",
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
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Parallax
                                        image={planche.img}
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
                                                    background: "red",
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
                                          backgroundColor: "rgb(227, 243, 253)",
                                          borderRadius: "0px 0px 15px 15px",
                                          borderRadiusTopLeft: 15,
                                          padding: 0,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center"
                                        }
                                      : {
                                          height: 550,
                                          backgroundColor: "rgb(227, 243, 253)",
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
                                            this.testTextNext();
                                          }
                                        );
                                      }}
                                    />
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
                        {this.functionDate(this.state.histoire.dateDeCreation)}
                      </p>
                    </div>
                  </Card>
                </ButtonBase>
              </GridItem> */}
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
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(90, 81, 127)",
                      marginLeft: 15
                    }}
                    color="rgb(90, 81, 127)"
                    onClick={() => this.saveHistoireWithPlanche()}
                  >
                    Publier Histoire
                  </Button>
                </GridItem>
              </GridContainer>
            </Paper>
          </GridItem>
        </GridContainer>
        {/*<div
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
                            marginTop: 20
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
                                      borderRadius: "15px 15px 15px 15px",
                                      height: "100%",
                                      width: "100%"
                                    }
                                  : {
                                      textAlign: "-webkit-center",
                                      background: "#5a517f",
                                      borderRadius: "15px 15px 15px 15px",
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
                                          borderRadius: "15px 15px 15px 15px",
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
                                  marginTop: 20
                                }
                              : {
                                  width: "100%",
                                  margin: 0,
                                  marginBottom: 30,
                                  marginTop: 20,
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
                                    backgroundColor: "rgb(227, 243, 253)",
                                    borderRadius: "15px 15px 15px 15px",
                                    borderRadiusTopLeft: 15,
                                    padding: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                  }
                                : {
                                    height: 550,
                                    backgroundColor: "rgb(227, 243, 253)",
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
                              <h5
                                style={{
                                  color: "#332861",
                                  width: "100%",
                                  maxHeight: "450px",
                                  margin: "0px",
                                  paddingLeft: "30px",
                                  paddingRight: "30px",
                                  fontSize: "17px"
                                }}
                              >
                                {planche.text}
                              </h5>
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
                            marginTop: 20
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
                                      background: "#5a517f",
                                      borderRadius: "15px 15px 0px 0px",
                                      height: "100%"
                                    }
                                  : {
                                      textAlign: "-webkit-center",
                                      background: "#5a517f",
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
                                          borderRadius: "15px 15px 0px 0px",
                                          display: "block",
                                          width: "100%"
                                        }
                                      : {
                                          height: 550,
                                          borderRadius: "15px 0px 0px 15px",
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
                                    backgroundColor: "rgb(227, 243, 253)",
                                    borderRadius: "0px 0px 15px 15px",
                                    borderRadiusTopLeft: 15,
                                    padding: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                  }
                                : {
                                    height: 550,
                                    backgroundColor: "rgb(227, 243, 253)",
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
                                <h5
                                  style={{
                                    color: "#332861",
                                    width: "100%",
                                    maxHeight: "450px",
                                    margin: "0px",
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    fontSize: "17px"
                                  }}
                                >
                                  {planche.text}
                                </h5>
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
        {this.state.planches.lenght > 18 ? (
          <SamplePrevArrow
            onClick={() => this.previous()}
            Color={this.state.counter === 1 ? "rgba(0, 0, 0, 0.26)" : "#332861"}
            disabled={this.state.counter === 1 ? true : false}
          />
        ) : (
          <div></div>
        )} 
            </Paper>
          </GridItem>
        </GridContainer> */}
      </div>
    );
    //   //Moment.locale("fr");
    //   if (this.state.histoire !== "")
    //     return (
    //       <div className={classes.section}>
    //         <ButtonBase onClick={() => this.props.history.goBack()}>
    //           <Fab aria-label={fab.label} style={fab.style} color={fab.color}>
    //             {fab.icon}
    //           </Fab>
    //         </ButtonBase>
    //         {this.state.isOpen ? (
    //           <Lightbox
    //             mainSrc={this.state.imgUrl}
    //             onCloseRequest={() =>
    //               this.setState({ isOpen: false, imgUrl: "" })
    //             }
    //             reactModalStyle={{
    //               overlay: { zIndex: 2000 }
    //             }}
    //           />
    //         ) : (
    //           <div></div>
    //         )}
    //         <Dialog
    //           fullWidth={false}
    //           maxWidth={"lg"}
    //           open={modal}
    //           onClose={() => {
    //             this.setState({ modal: false });
    //           }}
    //           aria-labelledby="max-width-dialog-title"
    //         >
    //           <DialogTitle
    //             id="max-width-dialog-title"
    //             style={{ textAlign: "center" }}
    //           >
    //             Notez les Dessins
    //           </DialogTitle>
    //           <DialogContent style={{ paddingTop: 50 }}>
    //             <Core.Slider
    //               style={{ color: "rgb(26, 153, 170)" }}
    //               defaultValue={0}
    //               value={this.state.ratingDessinTemp}
    //               onChange={(event, value) =>
    //                 this.setState({ ratingDessinTemp: value })
    //               }
    //               aria-labelledby="discrete-slider-small-steps"
    //               step={0.5}
    //               marks
    //               min={0}
    //               max={5}
    //               valueLabelDisplay="auto"
    //               color="#121212"
    //             />
    //           </DialogContent>
    //           <DialogActions>
    //             <Button
    //               onClick={() =>
    //                 this.setState({
    //                   modal: false,
    //                   ratingDessinTemp: this.state.ratingDessin
    //                 })
    //               }
    //               color="default"
    //             >
    //               Annuler
    //             </Button>
    //             <Button
    //               onClick={() =>
    //                 this.setState({
    //                   modal: false,
    //                   ratingDessin: this.state.ratingDessinTemp
    //                 })
    //               }
    //               style={{ backgroundColor: "rgb(26, 153, 170)" }}
    //             >
    //               Confirmer
    //             </Button>
    //           </DialogActions>
    //         </Dialog>
    //         <Dialog
    //           fullWidth={false}
    //           maxWidth={"lg"}
    //           open={this.state.modal2}
    //           onClose={() => {
    //             this.setState({ modal2: false });
    //           }}
    //           aria-labelledby="max-width-dialog-title"
    //         >
    //           <DialogTitle
    //             id="max-width-dialog-title"
    //             style={{ textAlign: "center" }}
    //           >
    //             Notez les Textes
    //           </DialogTitle>
    //           <DialogContent style={{ paddingTop: 50 }}>
    //             <Core.Slider
    //               defaultValue={0}
    //               style={{ color: "rgb(223, 108, 79)" }}
    //               value={this.state.ratingTextTemp}
    //               onChange={(event, value) =>
    //                 this.setState({ ratingTextTemp: value })
    //               }
    //               aria-labelledby="discrete-slider-small-steps"
    //               step={0.5}
    //               marks
    //               min={0}
    //               max={5}
    //               valueLabelDisplay="auto"
    //             />
    //           </DialogContent>
    //           <DialogActions>
    //             <Button
    //               onClick={() =>
    //                 this.setState({
    //                   modal2: false,
    //                   ratingTextTemp: this.state.ratingText
    //                 })
    //               }
    //               color="default"
    //             >
    //               Annuler
    //             </Button>
    //             <Button
    //               onClick={() =>
    //                 this.setState({
    //                   modal2: false,
    //                   ratingText: this.state.ratingTextTemp
    //                 })
    //               }
    //               style={{ backgroundColor: "rgb(223, 108, 79)" }}
    //             >
    //               Confirmer
    //             </Button>
    //           </DialogActions>
    //         </Dialog>
    //         <GridContainer
    //           justify="center"
    //           alignItems="center"
    //           style={{ margin: 0 }}
    //         >
    //           <GridItem xs={12} sm={12} md={12}>
    //             <Paper
    //               variant="outlined"
    //               style={{
    //                 position: "relative",
    //                 width: "90%",
    //                 marginTop: "5%",
    //                 marginLeft: "auto",
    //                 marginRight: "auto"
    //               }}
    //             >
    //               {this.state.planches.lenght > 18 ? (
    //                 <SampleNextArrow
    //                   onClick={() => this.next()}
    //                   style={Styles.NextArrow}
    //                   Color={
    //                     this.state.counter === this.state.planches.length
    //                       ? "rgba(0, 0, 0, 0.26)"
    //                       : "#332861"
    //                   }
    //                   disabled={
    //                     this.state.counter === this.state.planches.length
    //                       ? true
    //                       : false
    //                   }
    //                 />
    //               ) : (
    //                 <div></div>
    //               )}
    //               <GridContainer
    //                 justify="center"
    //                 alignItems="center"
    //                 style={{
    //                   width: "90%",
    //                   marginTop: 20,
    //                   marginLeft: "auto",
    //                   marginRight: "auto"
    //                 }}
    //               >
    //                 <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
    //                   <ListItem>
    //                     <ListItemAvatar>
    //                       {this.state.histoire.userDessin.imgProfil == "" ||
    //                       this.state.histoire.userText.imgProfil == null ? (
    //                         <Avatar
    //                           alt=""
    //                           src={
    //                             config.API_URL + "images/defaultPhotoProfil.jpg"
    //                           }
    //                         />
    //                       ) : (
    //                         <Avatar
    //                           alt=""
    //                           src={this.state.histoire.userDessin.imgProfil}
    //                         />
    //                       )}
    //                     </ListItemAvatar>
    //                     <ListItemText
    //                       style={{
    //                         paddingBottom: 20
    //                       }}
    //                     >
    //                       <p
    //                         style={{
    //                           color: "#5a517f",
    //                           fontWeight: "bold",
    //                           fontSize: 17,
    //                           margin: 0
    //                         }}
    //                       >
    //                         {this.state.histoire.userDessin.pseudo}
    //                       </p>
    //                     </ListItemText>
    //                   </ListItem>
    //                 </GridItem>
    //                 <GridItem xs={12} sm={12} md={6} style={{ padding: 0 }}>
    //                   <ListItem>
    //                     <ListItemAvatar>
    //                       {this.state.histoire.userText.imgProfil == "" ||
    //                       this.state.histoire.userText.imgProfil == null ? (
    //                         <Avatar
    //                           alt=""
    //                           src={
    //                             config.API_URL + "images/defaultPhotoProfil.jpg"
    //                           }
    //                         />
    //                       ) : (
    //                         <Avatar
    //                           alt=""
    //                           src={this.state.histoire.userText.imgProfil}
    //                         />
    //                       )}
    //                     </ListItemAvatar>
    //                     <ListItemText
    //                       style={{
    //                         paddingBottom: 20
    //                       }}
    //                     >
    //                       <p
    //                         style={{
    //                           color: "#5a517f",
    //                           fontWeight: "bold",
    //                           fontSize: 17,
    //                           margin: 0
    //                         }}
    //                       >
    //                         {this.state.histoire.userText.pseudo}
    //                       </p>
    //                     </ListItemText>
    //                   </ListItem>
    //                 </GridItem>
    //                 <GridItem
    //                   xs={12}
    //                   sm={12}
    //                   md={12}
    //                   style={{ padding: 0, display: "flex" }}
    //                 >
    //                   <ButtonBase
    //                     onClick={() =>
    //                       this.setState({
    //                         isOpen: true,
    //                         imgUrl: this.state.histoire.lienIllustration
    //                       })
    //                     }
    //                     style={isMobile ? { width: "100%" } : { width: "30%" }}
    //                   >
    //                     <Card
    //                       style={{
    //                         backgroundColor: "black",
    //                         margin: 0,
    //                         borderRadius: "15px 15px 15px 15px"
    //                       }}
    //                     >
    //                       <Parallax
    //                         style={
    //                           (imagesStyles.imgCard,
    //                           {
    //                             opacity: 0.7,
    //                             height: 150,
    //                             borderRadius: "15px 15px 15px 15px"
    //                           })
    //                         }
    //                         image={this.state.histoire.lienIllustration}
    //                       ></Parallax>

    //                       <div
    //                         style={
    //                           (imagesStyles.imgCardOverlay,
    //                           {
    //                             alignItems: "center",
    //                             position: "absolute",
    //                             top: 0,
    //                             right: 0,
    //                             left: 0,
    //                             height: "100%"
    //                           })
    //                         }
    //                       >
    //                         <h3
    //                           style={
    //                             (cardTitle.cardTitle,
    //                             {
    //                               width: "100%",
    //                               paddingLeft: 15,
    //                               color: "white",
    //                               textAlign: "left"
    //                             })
    //                           }
    //                         >
    //                           {this.state.histoire.titreHistoire}
    //                         </h3>

    //                         <p
    //                           style={{
    //                             color: "white",
    //                             textAlign: "left",
    //                             width: "100%",
    //                             paddingLeft: 15,
    //                             fontSize: 13
    //                           }}
    //                         >
    //                           {this.functionDate(
    //                             this.state.histoire.dateDeCreation
    //                           )}
    //                         </p>
    //                       </div>
    //                     </Card>
    //                   </ButtonBase>
    //                 </GridItem>
    //               </GridContainer>
    //               <div
    //                 style={{
    //                   width: "90%",
    //                   marginLeft: "auto",
    //                   marginRight: "auto",

    //                   borderRadius: 15
    //                 }}
    //               >
    //                 <Slider
    //                   ref={slider => (this.slider = slider)}
    //                   {...settings}
    //                   style={{
    //                     height: "100%"
    //                   }}
    //                 >
    //                   {this.state.planches != []
    //                     ? this.state.planches.map((planche, index) => {
    //                         console.log("histoire" + this.state.histoire);
    //                         return (
    //                           <div key={1}>
    //                             <GridContainer
    //                               justify="center"
    //                               alignItems="center"
    //                             ></GridContainer>
    //                             {planche.text === "" ? (
    //                               <GridContainer
    //                                 style={{
    //                                   margin: 0,
    //                                   marginBottom: 30,
    //                                   marginTop: 20
    //                                 }}
    //                                 justify="center"
    //                                 alignItems="center"
    //                               >
    //                                 <GridItem
    //                                   xs={12}
    //                                   sm={12}
    //                                   md={12}
    //                                   justify="center"
    //                                   alignItems="center"
    //                                   style={
    //                                     isMobile
    //                                       ? {
    //                                           height: 400,
    //                                           borderRadius: "15px 15px 15px 15px",
    //                                           padding: 0
    //                                         }
    //                                       : {
    //                                           height: 550,
    //                                           borderRadius: "15px 15px 15px 15px",
    //                                           padding: 0
    //                                         }
    //                                   }
    //                                 >
    //                                   <div
    //                                     style={
    //                                       isMobile
    //                                         ? {
    //                                             textAlign: "-webkit-center",
    //                                             background: "#5a517f",
    //                                             borderRadius:
    //                                               "15px 15px 15px 15px",
    //                                             height: "100%",
    //                                             width: "100%"
    //                                           }
    //                                         : {
    //                                             textAlign: "-webkit-center",
    //                                             background: "#5a517f",
    //                                             borderRadius:
    //                                               "15px 15px 15px 15px",
    //                                             height: "100%",
    //                                             width: "100%"
    //                                           }
    //                                     }
    //                                   >
    //                                     <ButtonBase
    //                                       onClick={() =>
    //                                         this.setState({
    //                                           isOpen: true,
    //                                           imgUrl: planche.lienDessin
    //                                         })
    //                                       }
    //                                       style={{ width: "100%" }}
    //                                     >
    //                                       <Parallax
    //                                         image={planche.lienDessin}
    //                                         style={
    //                                           isMobile
    //                                             ? {
    //                                                 height: 400,
    //                                                 borderRadius:
    //                                                   "15px 15px 15px 15px",
    //                                                 display: "block",
    //                                                 width: "100%"
    //                                               }
    //                                             : {
    //                                                 height: 550,

    //                                                 display: "block",
    //                                                 width: "70%",
    //                                                 marginLeft: "auto",
    //                                                 marginRight: "auto"
    //                                               }
    //                                         }
    //                                       ></Parallax>
    //                                     </ButtonBase>
    //                                   </div>
    //                                 </GridItem>
    //                               </GridContainer>
    //                             ) : planche.lienDessin === null ||
    //                               planche.lienDessin === "" ? (
    //                               <GridContainer
    //                                 style={
    //                                   isMobile
    //                                     ? {
    //                                         width: "100%",
    //                                         margin: 0,
    //                                         marginBottom: 30,
    //                                         marginTop: 20
    //                                       }
    //                                     : {
    //                                         width: "100%",
    //                                         margin: 0,
    //                                         marginBottom: 30,
    //                                         marginTop: 20,
    //                                         marginLeft: "auto",
    //                                         marginRight: "auto"
    //                                       }
    //                                 }
    //                                 justify="center"
    //                                 alignItems="center"
    //                               >
    //                                 <GridItem
    //                                   xs={12}
    //                                   sm={12}
    //                                   md={12}
    //                                   justify="center"
    //                                   alignItems="center"
    //                                   style={
    //                                     isMobile
    //                                       ? {
    //                                           height: 400,
    //                                           backgroundColor:
    //                                             "rgb(227, 243, 253)",
    //                                           borderRadius: "15px 15px 15px 15px",
    //                                           borderRadiusTopLeft: 15,
    //                                           padding: 0,
    //                                           display: "flex",
    //                                           justifyContent: "center",
    //                                           alignItems: "center"
    //                                         }
    //                                       : {
    //                                           height: 550,
    //                                           backgroundColor:
    //                                             "rgb(227, 243, 253)",
    //                                           borderRadius: "15px 15px 15px 15px",
    //                                           borderRadiusTopLeft: 15,
    //                                           padding: 0,
    //                                           display: "flex",
    //                                           justifyContent: "center",
    //                                           alignItems: "center"
    //                                         }
    //                                   }
    //                                 >
    //                                   {" "}
    //                                   <SimpleBar
    //                                     style={
    //                                       isMobile
    //                                         ? {
    //                                             maxHeight: "350px",
    //                                             width: "100%"
    //                                           }
    //                                         : {
    //                                             maxHeight: "450px",
    //                                             width: "70%",
    //                                             marginLeft: "auto",
    //                                             marginRight: "auto"
    //                                           }
    //                                     }
    //                                   >
    //                                     <h5
    //                                       style={{
    //                                         color: "#332861",
    //                                         width: "100%",
    //                                         maxHeight: "450px",
    //                                         margin: "0px",
    //                                         paddingLeft: "30px",
    //                                         paddingRight: "30px",
    //                                         fontSize: "17px"
    //                                       }}
    //                                     >
    //                                       {planche.text}
    //                                     </h5>
    //                                   </SimpleBar>
    //                                 </GridItem>
    //                               </GridContainer>
    //                             ) : (
    //                               <GridContainer
    //                                 justify="center"
    //                                 alignItems="center"
    //                                 style={{
    //                                   margin: 0,
    //                                   marginBottom: 30,
    //                                   marginTop: 20
    //                                 }}
    //                               >
    //                                 <GridItem
    //                                   xs={12}
    //                                   sm={12}
    //                                   md={6}
    //                                   justify="center"
    //                                   alignItems="center"
    //                                   style={
    //                                     isMobile
    //                                       ? {
    //                                           height: 400,
    //                                           borderRadius: "15px 15px 0px 0px",
    //                                           padding: 0
    //                                         }
    //                                       : {
    //                                           height: 550,
    //                                           borderRadius: "15px 0px 0px 15px",
    //                                           padding: 0
    //                                         }
    //                                   }
    //                                 >
    //                                   <div
    //                                     style={
    //                                       isMobile
    //                                         ? {
    //                                             textAlign: "-webkit-center",
    //                                             background: "#5a517f",
    //                                             borderRadius: "15px 15px 0px 0px",
    //                                             height: "100%"
    //                                           }
    //                                         : {
    //                                             textAlign: "-webkit-center",
    //                                             background: "#5a517f",
    //                                             borderRadius: "15px 0px 0px 15px",
    //                                             height: "100%"
    //                                           }
    //                                     }
    //                                   >
    //                                     <ButtonBase
    //                                       onClick={() =>
    //                                         this.setState({
    //                                           isOpen: true,
    //                                           imgUrl: planche.lienDessin
    //                                         })
    //                                       }
    //                                       style={{ width: "100%" }}
    //                                     >
    //                                       <Parallax
    //                                         image={planche.lienDessin}
    //                                         style={
    //                                           isMobile
    //                                             ? {
    //                                                 height: 400,
    //                                                 borderRadius:
    //                                                   "15px 15px 0px 0px",
    //                                                 display: "block",
    //                                                 width: "100%"
    //                                               }
    //                                             : {
    //                                                 height: 550,
    //                                                 borderRadius:
    //                                                   "15px 0px 0px 15px",
    //                                                 display: "block",
    //                                                 width: "100%"
    //                                               }
    //                                         }
    //                                       ></Parallax>
    //                                     </ButtonBase>
    //                                   </div>
    //                                 </GridItem>

    //                                 <GridItem
    //                                   xs={12}
    //                                   sm={12}
    //                                   md={6}
    //                                   justify="center"
    //                                   alignItems="center"
    //                                   style={
    //                                     isMobile
    //                                       ? {
    //                                           height: 400,
    //                                           backgroundColor:
    //                                             "rgb(227, 243, 253)",
    //                                           borderRadius: "0px 0px 15px 15px",
    //                                           borderRadiusTopLeft: 15,
    //                                           padding: 0,
    //                                           display: "flex",
    //                                           justifyContent: "center",
    //                                           alignItems: "center"
    //                                         }
    //                                       : {
    //                                           height: 550,
    //                                           backgroundColor:
    //                                             "rgb(227, 243, 253)",
    //                                           borderRadius: "0px 15px 15px 0px",
    //                                           borderRadiusTopLeft: 15,
    //                                           padding: 0,
    //                                           display: "flex",
    //                                           justifyContent: "center",
    //                                           alignItems: "center"
    //                                         }
    //                                   }
    //                                 >
    //                                   <div
    //                                     style={{
    //                                       width: "100%"
    //                                     }}
    //                                   >
    //                                     <SimpleBar
    //                                       style={
    //                                         isMobile
    //                                           ? {
    //                                               maxHeight: "350px",
    //                                               width: "100%"
    //                                             }
    //                                           : {
    //                                               maxHeight: "450px",
    //                                               width: "100%",
    //                                               marginLeft: "auto",
    //                                               marginRight: "auto"
    //                                             }
    //                                       }
    //                                     >
    //                                       <h5
    //                                         style={{
    //                                           color: "#332861",
    //                                           width: "100%",
    //                                           maxHeight: "450px",
    //                                           margin: "0px",
    //                                           paddingLeft: "30px",
    //                                           paddingRight: "30px",
    //                                           fontSize: "17px"
    //                                         }}
    //                                       >
    //                                         {planche.text}
    //                                       </h5>
    //                                     </SimpleBar>
    //                                   </div>
    //                                 </GridItem>
    //                               </GridContainer>
    //                             )}
    //                           </div>
    //                         );
    //                       })
    //                     : () => {
    //                         console.log(this.state.histoire);
    //                         return (
    //                           <div>
    //                             <p>mazal maja</p>
    //                           </div>
    //                         );
    //                       }}
    //                 </Slider>
    //               </div>
    //               {this.state.planches.lenght > 18 ? (
    //                 <SamplePrevArrow
    //                   onClick={() => this.previous()}
    //                   Color={
    //                     this.state.counter === 1
    //                       ? "rgba(0, 0, 0, 0.26)"
    //                       : "#332861"
    //                   }
    //                   disabled={this.state.counter === 1 ? true : false}
    //                 />
    //               ) : (
    //                 <div></div>
    //               )}

    //               <Divider
    //                 style={{
    //                   height: 2,
    //                   marginBottom: 15,
    //                   width: "90%",
    //                   marginLeft: "auto",
    //                   marginRight: "auto"
    //                 }}
    //               />
    //               <GridContainer
    //                 justify="flex-end"
    //                 style={{
    //                   width: "90%",
    //                   marginLeft: "auto",
    //                   marginRight: "auto",
    //                   marginBottom: 15
    //                 }}
    //               >
    //                 <GridItem xs={2} sm={1} md={1}>
    //                   <small>
    //                     <CommentIcon style={{ width: 20 }} />
    //                     {this.state.histoire.nombreComment}
    //                   </small>
    //                 </GridItem>
    //                 <GridItem xs={2} sm={1} md={1}>
    //                   <small>
    //                     <VisibilityIcon style={{ width: 20 }} />
    //                     {this.state.histoire.nombreVue}
    //                   </small>
    //                 </GridItem>
    //               </GridContainer>
    //               <Divider
    //                 style={{
    //                   width: "100%",
    //                   height: "2px"
    //                 }}
    //               />
    //               <List
    //                 className={classes.root}
    //                 style={{ background: "#d6d6d6", padding: 0 }}
    //               >
    //                 {this.state.commentaires.map((commentaire, index) => {
    //                   return (
    //                     <div key={index}>
    //                       <GridContainer>
    //                         <GridItem xs={12} sm={12} md={12}>
    //                           <ListItem
    //                             alignItems="flex-start"
    //                             className={classes.card}
    //                             style={{
    //                               width: "100%",
    //                               minHeight: 50,
    //                               maxHeight: "auto"
    //                             }}
    //                           >
    //                             <ListItemAvatar>
    //                               {commentaire.user.imgProfil == "" ||
    //                               commentaire.user.imgProfil == null ? (
    //                                 <Avatar
    //                                   alt=""
    //                                   src={
    //                                     config.API_URL +
    //                                     "images/defaultPhotoProfil.jpg"
    //                                   }
    //                                 />
    //                               ) : (
    //                                 <Avatar
    //                                   alt=""
    //                                   src={
    //                                     this.state.histoire.userDessin.imgProfil
    //                                   }
    //                                 />
    //                               )}
    //                             </ListItemAvatar>
    //                             <ListItemText
    //                               primary={commentaire.user.pseudo}
    //                               secondary={this.functionDate(
    //                                 commentaire.dateDeCreation
    //                               )}
    //                             />
    //                           </ListItem>
    //                         </GridItem>
    //                         <GridItem xs={12} sm={12} md={12}>
    //                           <GridContainer
    //                             justify="flex-start"
    //                             style={{
    //                               width: "100%",
    //                               margin: "auto",
    //                               marginLeft: 50
    //                             }}
    //                             spacing={1}
    //                           >
    //                             <GridItem
    //                               xs={3}
    //                               sm={2}
    //                               md={1}
    //                               style={{
    //                                 display: "flex",
    //                                 justifyContent: "center",
    //                                 textAlign: "-webkit-center"
    //                               }}
    //                             >
    //                               <div
    //                                 style={{
    //                                   height: 50,
    //                                   width: 50
    //                                 }}
    //                               >
    //                                 <Tooltip
    //                                   disableFocusListener
    //                                   disableTouchListener
    //                                   title={"Dessin"}
    //                                 >
    //                                   <ButtonBase style={{ borderRadius: 50 }}>
    //                                     <CircularProgressbarWithChildren
    //                                       text={
    //                                         commentaire.noteDessin === 0
    //                                           ? "0"
    //                                           : commentaire.noteDessin
    //                                       }
    //                                       maxValue={5}
    //                                       minValue={0}
    //                                       strokeWidth={3}
    //                                       value={commentaire.noteDessin}
    //                                       styles={buildStyles({
    //                                         textColor: "transparent",
    //                                         pathColor: "#1a99aa",
    //                                         trailColor: "#d6d6d6",
    //                                         strokeLinecap: "butt"
    //                                       })}
    //                                     >
    //                                       <div
    //                                         style={{
    //                                           height: "100%",
    //                                           justifyContent: "center",
    //                                           alignItems: "center",
    //                                           display: "flex"
    //                                         }}
    //                                       >
    //                                         <p
    //                                           style={{
    //                                             color: "#1a99aa",
    //                                             fontSize: "20px",
    //                                             margin: 0
    //                                           }}
    //                                         >
    //                                           {commentaire.noteDessin}
    //                                         </p>
    //                                       </div>
    //                                     </CircularProgressbarWithChildren>
    //                                   </ButtonBase>
    //                                 </Tooltip>
    //                               </div>
    //                             </GridItem>
    //                             <GridItem
    //                               xs={3}
    //                               sm={2}
    //                               md={1}
    //                               style={{
    //                                 textAlign: "-webkit-center",
    //                                 display: "flex",
    //                                 justifyContent: "center"
    //                               }}
    //                             >
    //                               <div
    //                                 style={{
    //                                   height: 50,
    //                                   width: 50
    //                                 }}
    //                               >
    //                                 <Tooltip
    //                                   disableFocusListener
    //                                   disableTouchListener
    //                                   title={"Text"}
    //                                 >
    //                                   <ButtonBase style={{ borderRadius: 50 }}>
    //                                     <CircularProgressbarWithChildren
    //                                       maxValue={5}
    //                                       minValue={0}
    //                                       strokeWidth={3}
    //                                       value={commentaire.noteHistoire}
    //                                       text={
    //                                         commentaire.noteHistoire === 0
    //                                           ? "0"
    //                                           : commentaire.noteHistoire
    //                                       }
    //                                       styles={buildStyles({
    //                                         textColor: "transparent",
    //                                         pathColor: "#df6c4f",
    //                                         trailColor: "#d6d6d6",
    //                                         strokeLinecap: "butt"
    //                                       })}
    //                                     >
    //                                       <div
    //                                         style={{
    //                                           height: "100%",
    //                                           justifyContent: "center",
    //                                           alignItems: "center",
    //                                           display: "flex"
    //                                         }}
    //                                       >
    //                                         <p
    //                                           style={{
    //                                             color: "#df6c4f",
    //                                             fontSize: "20px",
    //                                             margin: 0
    //                                           }}
    //                                         >
    //                                           {commentaire.noteHistoire}
    //                                         </p>
    //                                       </div>
    //                                     </CircularProgressbarWithChildren>
    //                                   </ButtonBase>
    //                                 </Tooltip>
    //                               </div>
    //                             </GridItem>
    //                           </GridContainer>
    //                         </GridItem>
    //                       </GridContainer>

    //                       <p
    //                         style={{
    //                           color: "#808080",
    //                           fontSize: 17,
    //                           textAlign: "left",
    //                           paddingLeft: 72,
    //                           paddingRight: 16
    //                         }}
    //                       >
    //                         {commentaire.commentaire}
    //                       </p>
    //                       <Divider />
    //                     </div>
    //                   );
    //                 })}
    //               </List>

    //               <Button2
    //                 style={{ width: "100%", height: 60 }}
    //                 onClick={() => this.fetchCommentaires()}
    //               >
    //                 Voir plus de commentaires +
    //               </Button2>

    //               <Divider />
    //               <ListItem
    //                 alignItems="flex-start"
    //                 className={classes.card}
    //                 style={{ width: "100%", minHeight: 50, maxHeight: "auto" }}
    //               >
    //                 <ListItemAvatar>
    //                   <Avatar
    //                     alt="Travis Howard"
    //                     src={require("assets/img/faces/avatar.jpg")}
    //                   />
    //                 </ListItemAvatar>
    //                 <ListItemText
    //                   primary={
    //                     <React.Fragment>
    //                       {!this.state.errorCommentaire ? (
    //                         <TextField
    //                           style={{ width: "100%" }}
    //                           id="nomContact"
    //                           variant="outlined"
    //                           rows="1"
    //                           value={this.state.commentaire}
    //                           onChange={commentaire =>
    //                             this.setState({
    //                               commentaire: commentaire.target.value,
    //                               errorCommentaire: false
    //                             })
    //                           }
    //                           multiline
    //                         />
    //                       ) : (
    //                         <TextField
    //                           style={{ width: "100%" }}
    //                           id="nomContact"
    //                           variant="outlined"
    //                           rows="1"
    //                           value={this.state.commentaire}
    //                           onChange={commentaire =>
    //                             this.setState({
    //                               commentaire: commentaire.target.value,
    //                               errorCommentaire: false
    //                             })
    //                           }
    //                           multiline
    //                           error
    //                         />
    //                       )}
    //                     </React.Fragment>
    //                   }
    //                 />
    //               </ListItem>
    //               <GridContainer style={{ marginRight: 0 }}>
    //                 <GridItem xs={12} sm={12} md={12}>
    //                   <GridContainer
    //                     justify="flex-start"
    //                     style={{
    //                       width: "100%",
    //                       margin: "auto",
    //                       marginLeft: 50
    //                     }}
    //                     spacing={1}
    //                   >
    //                     <GridItem
    //                       xs={3}
    //                       sm={2}
    //                       md={1}
    //                       style={{
    //                         display: "flex",
    //                         justifyContent: "center",
    //                         textAlign: "-webkit-center"
    //                       }}
    //                     >
    //                       <div
    //                         style={{
    //                           height: 50,
    //                           width: 50
    //                         }}
    //                       >
    //                         <Tooltip
    //                           disableFocusListener
    //                           disableTouchListener
    //                           title={"Dessin"}
    //                         >
    //                           <ButtonBase
    //                             style={{ borderRadius: 50 }}
    //                             onClick={() =>
    //                               this.setState({
    //                                 modal: true
    //                               })
    //                             }
    //                           >
    //                             <CircularProgressbarWithChildren
    //                               text={
    //                                 this.state.ratingDessin === 0
    //                                   ? "0"
    //                                   : this.state.ratingDessin
    //                               }
    //                               maxValue={5}
    //                               minValue={0}
    //                               strokeWidth={3}
    //                               value={this.state.ratingDessin}
    //                               styles={buildStyles({
    //                                 textColor: "transparent",
    //                                 pathColor: "#1a99aa",
    //                                 trailColor: "#d6d6d6",
    //                                 strokeLinecap: "butt"
    //                               })}
    //                             >
    //                               <div
    //                                 style={{
    //                                   height: "100%",
    //                                   justifyContent: "center",
    //                                   alignItems: "center",
    //                                   display: "flex"
    //                                 }}
    //                               >
    //                                 <p
    //                                   style={{
    //                                     color: "#1a99aa",
    //                                     fontSize: "20px",
    //                                     margin: 0
    //                                   }}
    //                                 >
    //                                   {this.state.ratingDessin}
    //                                 </p>
    //                               </div>
    //                             </CircularProgressbarWithChildren>
    //                           </ButtonBase>
    //                         </Tooltip>
    //                       </div>
    //                     </GridItem>
    //                     <GridItem
    //                       xs={3}
    //                       sm={2}
    //                       md={1}
    //                       style={{
    //                         textAlign: "-webkit-center"
    //                       }}
    //                     >
    //                       <div
    //                         style={{
    //                           height: 50,
    //                           width: 50
    //                         }}
    //                       >
    //                         <Tooltip
    //                           disableFocusListener
    //                           disableTouchListener
    //                           title={"Text"}
    //                         >
    //                           <ButtonBase
    //                             style={{ borderRadius: 50 }}
    //                             onClick={() =>
    //                               this.setState({
    //                                 modal2: true
    //                               })
    //                             }
    //                           >
    //                             <CircularProgressbarWithChildren
    //                               maxValue={5}
    //                               minValue={0}
    //                               strokeWidth={3}
    //                               value={this.state.ratingText}
    //                               text={
    //                                 this.state.ratingText === 0
    //                                   ? "0"
    //                                   : this.state.ratingText
    //                               }
    //                               styles={buildStyles({
    //                                 textColor: "transparent",
    //                                 pathColor: "#df6c4f",
    //                                 trailColor: "#d6d6d6",
    //                                 strokeLinecap: "butt"
    //                               })}
    //                             >
    //                               <div
    //                                 style={{
    //                                   height: "100%",
    //                                   justifyContent: "center",
    //                                   alignItems: "center",
    //                                   display: "flex"
    //                                 }}
    //                               >
    //                                 <p
    //                                   style={{
    //                                     color: "#df6c4f",
    //                                     fontSize: "20px",
    //                                     margin: 0
    //                                   }}
    //                                 >
    //                                   {this.state.ratingText}
    //                                 </p>
    //                               </div>
    //                             </CircularProgressbarWithChildren>
    //                           </ButtonBase>
    //                         </Tooltip>
    //                       </div>
    //                     </GridItem>
    //                   </GridContainer>
    //                 </GridItem>
    //                 <GridItem
    //                   xs={12}
    //                   sm={12}
    //                   md={12}
    //                   style={{
    //                     display: "flex",
    //                     justifyContent: "flex-end",
    //                     paddingBottom: "15px"
    //                   }}
    //                 >
    //                   <Button
    //                     onClick={() => {
    //                       this.setState({
    //                         ratingDessin: 0,
    //                         ratingText: 0,
    //                         ratingDessinTemp: 0,
    //                         ratingTextTemp: 0,
    //                         commentaire: ""
    //                       });
    //                     }}
    //                     color="default"
    //                   >
    //                     Annuler
    //                   </Button>
    //                   <Button
    //                     variant="contained"
    //                     style={{
    //                       backgroundColor: "rgb(90, 81, 127)",
    //                       marginLeft: 15
    //                     }}
    //                     color="rgb(90, 81, 127)"
    //                     onClick={() => this.submitCommantaire()}
    //                   >
    //                     Commenter
    //                   </Button>
    //                 </GridItem>
    //               </GridContainer>
    //             </Paper>
    //           </GridItem>
    //         </GridContainer>
    //       </div>
    //     );
    //   else return <p>mazal matchargat</p>;
    // }
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
    zIndex: 1999
  },
  color: "primary",
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
