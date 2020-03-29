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
// core components
import Tooltip from '@material-ui/core/Tooltip';
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
import SnackbarContent from '@material-ui/core/SnackbarContent';
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
import Pagination from '@material-ui/lab/Pagination';
import { Link } from "react-router-dom";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TitleIcon from '@material-ui/icons/Title';

class MesOeuvres extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      idUser: "3c500b25-cb58-4be3-861e-2bb2926bd75f",
      page: 1,
      counter: 1,
      numberPage: 0,
      search: "",
      currentFiltre: 1,
      selectedFiltre: "",
      modal: false,
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
      ratingText: 0,
      ratingDessin: 0,
      histoires: [],
      selectedHistoire: "",
      planches: [],
      impressions: [],
      image: ""
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.fetchHistoire();
  }
  handleChangePage = (event, value) => {
    this.setState({ page: value });
    if (this.state.search === "") {
      Axios.get(
        config.API_URL +
          "histoires/takeByUser/6/" +
          (value - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/xxxx/" +
          this.state.idUser,
        {}
      ).then(res => {
        this.setState({ histoires: res.data });
        this.forceUpdate();
      });
    } else {
      Axios.get(
        config.API_URL +
          "histoires/takeByUser/6/" +
          (value - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/" +
          this.state.search +
          "/" +
          this.state.idUser,
        {}
      ).then(res => {
        this.setState({ histoires: res.data });
        this.forceUpdate();
      });
    }
  };
  fetchHistoire() {
    console.log("URL api" + config.API_URL);
    Axios.get(
      config.API_URL +
        "histoires/takeByUser/6/" +
        (this.state.page - 1) * 6 +
        "/1/xxxx/" +
        this.state.idUser,
      {}
    ).then(res => {
      this.setState({ histoires: res.data });
    });
    Axios.get(
      config.API_URL + "histoires/numberHistoiresById/" + this.state.idUser,
      {}
    ).then(res => {
      this.setState({ numberPage: Math.ceil(res.data / 6) });
    });
  }

  handleChange = e => {
    this.setState({ selectedFiltre: e.target.value });
    console.log(this.state.selectedFiltre);
  };
  searchCheck() {
    if (this.state.currentFiltre == 1) {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/numberHistoiresSearchById/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) +
            "/" +
            this.state.currentFiltre +
            "/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 1 });
          this.forceUpdate();
          console.log(this.state.histoires);
        });
      }

      if (this.state.search === "") {
        Axios.get(
          config.API_URL + "histoires/numberHistoiresById/" + this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) +
            "/" +
            this.state.currentFiltre +
            "/xxxx/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 1 });
          this.forceUpdate();
          console.log(this.state.histoires);
        });
      }
    } else if (this.state.currentFiltre == 2) {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/numberHistoiresSearchById/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 2 });
          this.forceUpdate();
        });
      }
      if (this.state.search === "") {
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/xxxx/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 2 });
          this.forceUpdate();
        });
        Axios.get(
          config.API_URL + "histoires/numberHistoiresById/" + this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
      }
    } else if (this.state.currentFiltre == 3) {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/numberHistoiresSearchById/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 3 });
          this.forceUpdate();
        });
      }
      if (this.state.search === "") {
        Axios.get(
          config.API_URL +
            "histoires/takeByUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/xxxx/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 3 });
          this.forceUpdate();
        });
        Axios.get(
          config.API_URL + "histoires/numberHistoiresById/" + this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
      }
    } else if (this.state.currentFiltre == 4) {
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/numberHistoiresSearchById/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
        Axios.get(
          config.API_URL +
            "histoires/takeUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/" +
            this.state.search +
            "/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 4 });
          this.forceUpdate();
        });
      }
      if (this.state.search === "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUser/6/" +
            (this.state.page - 1) * 6 +
            "/" +
            this.state.currentFiltre +
            "/xxxx/" +
            this.state.idUser,
          {}
        ).then(res => {
          this.setState({ histoires: res.data, currentFiltre: 4 });
          this.forceUpdate();
        });
        Axios.get(
          config.API_URL + "histoires/numberHistoiresById/" + this.state.idUser,
          {}
        ).then(res => {
          this.setState({ numberPage: Math.ceil(res.data / 6) });
        });
      }
    }
  }

  handleCheck(e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setState({ currentFiltre: 1 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
    } else if (e.currentTarget.dataset.id == 2) {
      this.setState({ currentFiltre: 2 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
    } else if (e.currentTarget.dataset.id == 3) {
      this.setState({ currentFiltre: 3 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
    } else if (e.currentTarget.dataset.id == 4) {
      this.setState({ currentFiltre: 4 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
    }
  }
  fetchPlanche(histoire) {
    Axios.get(config.API_URL + "planches/histoire/" + histoire.id, {}).then(
      res => {
        this.setState({ planches: res.data });
        histoire.nombreVue = histoire.nombreVue + 1;
        console.log(histoire);
        Axios.put(config.API_URL + "histoires/", histoire).then(res => {
          this.forceUpdate();
        });
      }
    );
    Axios.get(config.API_URL + "impressions/histoire/" + histoire.id, {}).then(
      res => {
        this.setState({ impressions: res.data });
      }
    );
  }
  getDay(date) {
    const d = moment(new Date());
    const dHistoire = moment(date);
    let dt = "";
    if (d.diff(dHistoire, "days") > 30) {
      dt =
        Math.floor(d.diff(dHistoire, "month")) +
        " mois " +
        (d.diff(dHistoire, "days") - d.diff(dHistoire, "month") * 30) +
        " jours ";
    } else {
      dt = d.diff(dHistoire, "days") + " jours";
    }
    return dt;
  }

  next() {
    console.log(this.slider);
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  gotToIndex(index) {
    this.slider.slickGoTo(index - 1);
    this.setState({ counter: 1 });
  }
  submitCommantaire() {
    Axios.post(config.API_URL + "impressions", {
      histoire: this.state.selectedHistoire,
      commentaire: this.state.commentaire,
      noteHistoire: this.state.ratingText,
      noteDessin: this.state.ratingDessin,
      isActive: true
    }).then(res => {
      this.searchCheck();
      this.forceUpdate();
    });
  }
  //modal - carousel
  render() {
    const { settings, modal } = this.state;
    const { classes } = this.props;
    if (this.state.histoires !== [])
      return (
        <div className={classes.section}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            onBackdropClick={() => {
              this.setState({
                modal: false,
                ratingDessin: 0,
                ratingText: 0,
                commentaire: ""
              });
              this.gotToIndex(1);
            }}
            open={modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() =>
              this.setState({
                modal: false,
                ratingDessin: 0,
                ratingText: 0,
                commentaire: ""
              })
            }
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
            maxWidth={"md"}
            fullWidth={true}
            scroll="paper"
            style={{ backgroundColor: "#e3f3fd" }}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={() => {
                this.setState({
                  modal: false,
                  ratingDessin: 0,
                  ratingText: 0,
                  commentaire: ""
                });
                this.gotToIndex(1);
              }}
              style={{
                paddingBottom: "0px",
                backgroundColor: "#e3f3fd",
                color: "#332861"
              }}
            >
              <h3
                style={{
                  color: "#332861",
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "0px",
                  fontWeight: "600"
                }}
              >
                {this.state.selectedHistoire.titreHistoire}
              </h3>
            </DialogTitle>
            <DialogContent
              id="modal-slide-description"
              className={classes.modalBody}
              style={{ padding: 0, backgroundColor: "#e3f3fd" }}
            >
              <SampleNextArrow
                onClick={() => this.next()}
                style={Styles.NextArrow}
                Color={
                  this.state.counter === this.state.planches.length + 1
                    ? "rgba(0, 0, 0, 0.26)"
                    : "#332861"
                }
                disabled={
                  this.state.counter === this.state.planches.length + 1
                    ? true
                    : false
                }
              />
              <Slider
                ref={slider => (this.slider = slider)}
                {...settings}
                style={{
                  height: "100%",
                  paddingLeft: 30,
                  paddingRight: 30,
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                {this.state.planches !== []
                  ? this.state.planches.map((planche, index) => {
                      console.log("histoire" + this.state.histoire);
                      return (
                        <div key={1}>
                          <GridContainer justify="center" alignItems="center">
                            <GridItem xs={12} sm={12} md={12}>
                              <h5
                                style={{
                                  textAlign: "center",
                                  fontSize: "17px",
                                  fontWeight: "400",
                                  color: "#332861"
                                }}
                              >
                                Texts par
                                <strong>
                                  {" "}
                                  {this.state.selectedHistoire.userText.pseudo +
                                    " - "}
                                </strong>
                                Dessins par
                                <strong>
                                  {" "}
                                  {
                                    this.state.selectedHistoire.userDessin
                                      .pseudo
                                  }
                                </strong>
                              </h5>
                            </GridItem>
                          </GridContainer>
                          {planche.text === "" ? (
                            <GridContainer
                              style={{ height: "365px" }}
                              justify="center"
                              alignItems="center"
                            >
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                justify="center"
                                alignItems="center"
                              >
                                <div
                                  style={{
                                    height: "365px",
                                    width: "100%",
                                    textAlign: "center",
                                    display: "block"
                                  }}
                                >
                                  <img
                                    src={planche.lienDessin}
                                    style={{
                                      height: "365px",
                                      maxWidth: '800px',
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      display: "block"
                                    }}
                                  />
                                </div>
                              </GridItem>
                            </GridContainer>
                          ) : planche.lienDessin === null ||
                            planche.lienDessin === "" ? (
                            <GridContainer
                              style={{ height: "365px" }}
                              justify="center"
                              alignItems="center"
                            >
                              <GridItem
                                xs={12}
                                sm={12}
                                md={12}
                                justify="center"
                                alignItems="center"
                                style={{ paddingRight: "20px" }}
                              >
                                {" "}
                                <SimpleBar style={{ maxHeight: "365px" }}>
                                  <h5
                                    style={{
                                      color: "#332861",
                                      width: "100%",
                                      maxHeight: "365px",
                                      margin: "0px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                      fontSize: "16px"
                                    }}
                                  >
                                    {planche.text}
                                  </h5>
                                </SimpleBar>
                              </GridItem>
                            </GridContainer>
                          ) : (
                            <GridContainer
                              style={{ height: "365px" }}
                              justify="center"
                              alignItems="center"
                            >
                              <GridItem
                                xs={7}
                                sm={7}
                                md={7}
                                justify="center"
                                alignItems="center"
                                style={{ paddingRight: "20px" }}
                              >
                                {" "}
                                <SimpleBar style={{ maxHeight: "365px" }}>
                                  <h5
                                    style={{
                                      color: "#332861",
                                      width: "100%",
                                      maxHeight: "365px",
                                      margin: "0px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                      fontSize: "16px"
                                    }}
                                  >
                                    {planche.text}
                                  </h5>
                                </SimpleBar>
                              </GridItem>
                              <GridItem
                                xs={5}
                                sm={5}
                                md={5}
                                justify="center"
                                alignItems="center"
                              >
                                <div style={{ textAlign: "-webkit-center" }}>
                                  <img
                                    src={planche.lienDessin}
                                    className=""
                                    style={{
                                      alignSelf: "center",
                                      maxHeight: "365px",
                                      height: "auto",
                                      maxWidth: "330px",
                                      paddingRight: "10px"
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
                <div key={this.state.planches.length + 1}>
                  <GridContainer style={{ height: "411px" }}>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      justify="center"
                      alignItems="center"
                      style={{ marginTop: "40px" }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                          textAlign: "center",
                          color: "#332861"
                        }}
                      >
                        L’histoire est terminée.
                      </p>
                    </GridItem>

                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      justify="center"
                      alignItems="center"
                    >
                      <SimpleBar style={{ maxHeight: "325px", width: "100%" }}>
                        <List className={classes.root}>
                          {this.state.impressions.map((imp, index) => {
                            console.log(imp);
                            return (
                              <div>
                                <ListItem
                                  alignItems="flex-start"
                                  className={classes.card}
                                  // selected={selectedIndex === 11}
                                  // onClick={event =>
                                  //   this.handleListItemClick(event, 11, 3)
                                  // }
                                  button
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={config.API_URL + imp.user.lienPhoto}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <React.Fragment>
                                        {/* <h4>
                                        
                                      </h4> */}
                                        <GridContainer>
                                          <GridItem xs={3} sm={3} md={3}>
                                            {imp.user.pseudo}
                                          </GridItem>
                                          <GridItem xs={4} sm={4} md={4}>
                                            <Tooltip
                                              disableFocusListener
                                              disableTouchListener
                                              title={
                                                imp.noteHistoire
                                                  ? "Text: " +
                                                    parseFloat(
                                                      Math.round(
                                                        imp.noteHistoire * 100
                                                      ) / 100
                                                    ).toFixed(2) +
                                                    "/5"
                                                  : "Text: " + 0
                                              }
                                            >
                                              <ButtonBase>
                                                <StyledRating
                                                  name="read-only"
                                                  value={
                                                    imp.noteHistoire
                                                      ? imp.noteHistoire
                                                      : 0
                                                  }
                                                  emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" />
                                                  }
                                                  precision={0.5}
                                                  readOnly
                                                />
                                              </ButtonBase>
                                            </Tooltip>
                                          </GridItem>
                                          <GridItem xs={4} sm={4} md={4}>
                                            <Tooltip
                                              disableFocusListener
                                              disableTouchListener
                                              title={
                                                imp.noteDessin
                                                  ? "Dessin: " +
                                                    parseFloat(
                                                      Math.round(
                                                        imp.noteDessin * 100
                                                      ) / 100
                                                    ).toFixed(2) +
                                                    "/5"
                                                  : "Dessin: " + 0
                                              }
                                            >
                                              <ButtonBase>
                                                <StyledRating
                                                  name="read-only"
                                                  value={
                                                    imp.noteDessin
                                                      ? imp.noteDessin
                                                      : 0
                                                  }
                                                  emptyIcon={
                                                    <StarBorderIcon fontSize="inherit" />
                                                  }
                                                  precision={0.5}
                                                  readOnly
                                                />
                                              </ButtonBase>
                                            </Tooltip>
                                          </GridItem>
                                        </GridContainer>
                                      </React.Fragment>
                                    }
                                    secondary={
                                      <React.Fragment>
                                        <p className={classes.messageTab}>
                                          {imp.commentaire}
                                        </p>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                              </div>
                            );
                          })}
                        </List>
                      </SimpleBar>
                    </GridItem>
                  </GridContainer>
                </div>
                <div key={this.state.planches.length + 2}></div>
              </Slider>
              <SamplePrevArrow
                onClick={() => this.previous()}
                Color={
                  this.state.counter === 1 ? "rgba(0, 0, 0, 0.26)" : "#332861"
                }
                disabled={this.state.counter === 1 ? true : false}
              />
            </DialogContent>
            <MuiDialogActions style={{ padding: 0 }}>
              <h3
                style={{
                  height: "49px",
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "0px",
                  width: "100%",
                  fontWeight: "400",
                  backgroundColor: "#e3f3fd",
                  color: "#332861"
                }}
              >
                {this.state.counter !== this.state.planches.length + 1 ? (
                  this.state.counter
                ) : (
                  <Button
                    color="white"
                    style={{
                      color: "rgb(89, 79, 118)",
                      fontWeight: "bold",
                      margin: 0
                    }}
                    onClick={() => {
                      this.setState({
                        modal: false,
                        ratingDessin: 0,
                        ratingText: 0,
                        commentaire: ""
                      });
                      this.gotToIndex(1);
                    }}
                  >
                    Terminée
                  </Button>
                )}
              </h3>
            </MuiDialogActions>
          </Dialog>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>MES OEUVRES</h2>
            </GridItem>
          </GridContainer>

          <GridContainer justify="flex-end">
            <GridItem xs={7} sm={7} md={7}>
              <CustomInput
                labelText="Recherche"
                id="material"
                formControlProps={{
                  fullWidth: true
                }}
                value={this.state.search}
                onChange={(search, event) => {
                  this.setState({
                    search: search.target.value
                  });
                }}
                inputProps={{
                  endAdornment: (
                    <ButtonBase onClick={this.searchCheck.bind(this)}>
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    </ButtonBase>
                  )
                }}
              />
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <CustomDropdown
                buttonProps={{
                  round: true,
                  color: "white"
                }}
                color="white"
                style={{ color: "rgb(89, 79, 118)", fontWeight: "bold" }}
                buttonText="Filtre"
                value={this.state.selectedFiltre}
                onChange={this.handleChange}
                dropdownList={[
                  <li onClick={this.handleCheck.bind(this)} data-id="1">
                    <span>Les plus lues</span>
                  </li>,
                  <li onClick={this.handleCheck.bind(this)} data-id="2">
                    <span>Les plus populaires</span>
                  </li>,
                  <li onClick={this.handleCheck.bind(this)} data-id="3">
                    <span>Les plus recentes</span>
                  </li>,
                  <li onClick={this.handleCheck.bind(this)} data-id="4">
                    <span>Les plus anciennes</span>
                  </li>
                ]}
              />
            </GridItem>
          </GridContainer>
          <div>
            <GridContainer justify="center" spacing={"auto"}>
              {this.state.histoires.map((histoire, index) => {
                return (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    justify="center"
                    style={{ width: "auto" }}
                    key={index}
                  >
                    <ButtonBase
                      focusRipple
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: "20rem"
                      }}
                      onClick={() => {
                        this.setState({
                          modal: true,
                          selectedHistoire: histoire
                        });
                        this.fetchPlanche(histoire);
                      }}
                    >
                      <Card
                        style={{ width: "20rem", backgroundColor: "#e3f3fd" }}
                      >
                        <h4
                          className={classes.cardTitle}
                          style={{
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            backgroundColor: "#594f76",
                            color: "white",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            margin: 0
                          }}
                        >
                          {histoire.titreHistoire}
                        </h4>
                        <div
                          style={{
                            height: "240px",
                            width: "100%",
                            textAlign: "center",
                            display: "block"
                          }}
                        >
                          <img
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
                                ? histoire.lienIllustration
                                : ""
                            }
                            alt={histoire.titreHistoire}
                          />
                        </div>

                        <h5
                          style={{
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            backgroundColor: "#594f76",
                            color: "white",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            margin: 0
                          }}
                        >
                          {histoire.nombreVue ? histoire.nombreVue : 0} vues -{" "}
                          {this.getDay(histoire.dateDeCreation)}
                        </h5>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <p>{"Text par " + histoire.userText.pseudo}</p>
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title={
                                  histoire.noteHistoireMoy
                                    ? parseFloat(
                                        Math.round(
                                          histoire.noteHistoireMoy * 100
                                        ) / 100
                                      ).toFixed(2) + "/5"
                                    : 0
                                }
                              >
                                <ButtonBase>
                                  <StyledRating
                                    name="read-only"
                                    value={
                                      histoire.noteHistoireMoy
                                        ? histoire.noteHistoireMoy
                                        : 0
                                    }
                                    emptyIcon={
                                      <StarBorderIcon fontSize="inherit" />
                                    }
                                    precision={0.5}
                                    readOnly
                                  />
                                </ButtonBase>
                              </Tooltip>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <p>
                                {" "}
                                {"Dessin par " + histoire.userDessin.pseudo}
                              </p>
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title={
                                  histoire.noteHistoireMoy
                                    ? parseFloat(
                                        Math.round(
                                          histoire.noteDessinMoy * 100
                                        ) / 100
                                      ).toFixed(2) + "/5"
                                    : 0
                                }
                              >
                                <ButtonBase>
                                  <StyledRating
                                    name="read-only"
                                    value={
                                      histoire.noteDessinMoy
                                        ? histoire.noteDessinMoy
                                        : 0
                                    }
                                    emptyIcon={
                                      <StarBorderIcon fontSize="inherit" />
                                    }
                                    precision={0.5}
                                    readOnly
                                  />
                                </ButtonBase>
                              </Tooltip>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </ButtonBase>
                  </GridItem>
                );
              })}
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={4} sm={4} md={4}>
                {this.state.numberPage > 1 ? (
                  <Pagination
                    count={this.state.numberPage}
                    page={this.state.page}
                    onChange={this.handleChangePage}
                  />
                ) : (
                  <div></div>
                )}
              </GridItem>
            </GridContainer>
          </div>
          <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <Link to="/">
                <Button
                  color="white"
                  style={{
                    color: "rgb(89, 79, 118)",
                    fontWeight: "bold",
                    margin: 0
                  }}
                >
                  Retour
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}
const StyledRating = withStyles({
  decimal: {display:'flex'},
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
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "45%",
        right: "3px",
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
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "45%",
        zIndex: 100,
        left: "3px",
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
MesOeuvres.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MesOeuvres);
