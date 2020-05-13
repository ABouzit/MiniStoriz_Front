import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

// core components
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
//scroll bare text
import { Link } from "react-router-dom";
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
import { subscriber, messageService } from "./../../../services/messageService";
class NosHistoires extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      idUser: "3c500b25-cb58-4be3-861e-2bb2926bd75f",
      counter: 1,
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
      image: ""
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchHistoire();
  }
  componentDidMount() {
    subscriber.subscribe(v => {
      if (v) {
        this.handleCheckRefresh();
        console.log("xxx");
      }
    });
  }
  async fetchHistoire() {
    console.log("URL api" + config.API_URL);
    await Axios.get(config.API_URL + "histoires/nbrvue", {}).then(res => {
      this.setState({ histoires: res.data });
    });
  }

  handleChange = e => {
    this.setState({ selectedFiltre: e.target.value });
    console.log(this.state.selectedFiltre);
  };
  async handleCheckRefresh() {
    if (this.state.currentFiltre == 1) {
      await Axios.get(config.API_URL + "histoires/nbrvue", {}).then(res => {
        this.setState({ histoires: res.data });
        this.forceUpdate();
        console.log(this.state.histoires);
      });
    } else if (this.state.currentFiltre == 2) {
      await Axios.get(config.API_URL + "histoires/populaire", {}).then(res => {
        this.setState({ histoires: res.data });
        this.forceUpdate();
      });
    } else if (this.state.currentFiltre == 3) {
      await Axios.get(config.API_URL + "histoires/plusrecent", {}).then(res => {
        this.setState({ histoires: res.data });
        this.forceUpdate();
      });
    } else if (this.state.currentFiltre == 4) {
      await Axios.get(config.API_URL + "histoires/plusancient", {}).then(
        res => {
          this.setState({ histoires: res.data });
          this.forceUpdate();
        }
      );
    }
  }
  async handleCheck(e) {
    if (e.currentTarget.dataset.id == 1) {
      await Axios.get(config.API_URL + "histoires/nbrvue", {}).then(res => {
        this.setState({ histoires: res.data, currentFiltre: 1 });
        this.forceUpdate();
        console.log(this.state.histoires);
      });
    } else if (e.currentTarget.dataset.id == 2) {
      await Axios.get(config.API_URL + "histoires/populaire", {}).then(res => {
        this.setState({ histoires: res.data, currentFiltre: 2 });
        this.forceUpdate();
      });
    } else if (e.currentTarget.dataset.id == 3) {
      await Axios.get(config.API_URL + "histoires/plusrecent", {}).then(res => {
        this.setState({ histoires: res.data, currentFiltre: 3 });
        this.forceUpdate();
      });
    } else if (e.currentTarget.dataset.id == 4) {
      await Axios.get(config.API_URL + "histoires/plusancient", {}).then(
        res => {
          this.setState({ histoires: res.data, currentFiltre: 4 });
          this.forceUpdate();
        }
      );
    }
  }

  async fetchPlanche(histoire) {
    await Axios.get(
      config.API_URL + "planches/histoire/" + histoire.id,
      {}
    ).then(res => {
      this.setState({ planches: res.data });
      histoire.nombreVue = histoire.nombreVue + 1;
      console.log(histoire);
      Axios.put(config.API_URL + "histoires/", histoire).then(res => {
        this.forceUpdate();
      });
    });
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
  seeAllHistoire() {
    console.log("URL api" + config.API_URL);
    Axios.get(config.API_URL + "histoires/", {}).then(res => {
      this.setState({ histoires: res.data });
    });
    const listmenu = document.getElementById("buttonSeeAll");
    listmenu.style.display = "none";
    this.forceUpdate();
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
      user: { id: this.state.idUser },
      isActive: true
    }).then(res => {
      console.log(res);
      if (this.state.currentFiltre == 1) {
        return Axios.get(config.API_URL + "histoires/nbrvue", {}).then(res => {
          return this.setState({ histoires: res.data }, () =>
            this.forceUpdate()
          );
        });
      } else if (this.state.currentFiltre == 2) {
        return Axios.get(config.API_URL + "histoires/populaire", {}).then(
          res => {
            return this.setState({ histoires: res.data }, () =>
              this.forceUpdate()
            );
          }
        );
      } else if (this.state.currentFiltre == 3) {
        console.log("Debut de requet");
        return Axios.get(config.API_URL + "histoires/plusrecent", {}).then(
          res => {
            console.log("res2" + res);
            return this.setState({ histoires: res.data }, () =>
              this.forceUpdate()
            );
          }
        );
      } else if (this.state.currentFiltre == 4) {
        return Axios.get(config.API_URL + "histoires/plusancient", {}).then(
          res => {
            return this.setState({ histoires: res.data }, () =>
              this.forceUpdate()
            );
          }
        );
      }
    });
  }
  /*submitCommantaire() {
    Axios.post(config.API_URL + "impressions", {
      histoire: this.state.selectedHistoire,
      commentaire: this.state.commentaire,
      noteHistoire: this.state.ratingText,
      noteDessin: this.state.ratingDessin,
      isActive: true
    }).then(res => {
      if (this.state.currentFiltre == 1) {
        Axios.get(config.API_URL + "histoires/nbrvue", {}).then(res => {
          return this.setState({ histoires: res.data }, () =>
            this.forceUpdate()
          );
        });
      } else if (this.state.currentFiltre == 2) {
        Axios.get(config.API_URL + "histoires/populaire", {}).then(res => {
          return this.setState({ histoires: res.data }, () =>
            this.forceUpdate()
          );
        });
      } else if (this.state.currentFiltre == 3) {
        Axios.get(config.API_URL + "histoires/plusrecent", {}).then(res => {
          return this.setState({ histoires: res.data }, () =>
            this.forceUpdate()
          );
        });
      } else if (this.state.currentFiltre == 4) {
        Axios.get(config.API_URL + "histoires/plusancient", {}).then(res => {
          return this.setState({ histoires: res.data }, () =>
            this.forceUpdate()
          );
        });
      }
    });
  }*/
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
                                      maxWidth: "800px",
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
                                style={{ paddingRight: "20px" }}
                              >
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
                                style={{ textAlign: "center" }}
                              >
                                <div style={{ textAlign: "-webkit-center" }}>
                                  <img
                                    src={planche.lienDessin}
                                    alt="First slide"
                                    className=""
                                    style={{
                                      alignSelf: "center",
                                      maxHeight: "365px",
                                      height: "auto",
                                      maxWidth: "330px",
                                      width: "auto",
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
                        L’histoire est terminée. Encourage les auteurs en leur
                        attribuant une note !
                      </p>
                    </GridItem>

                    <GridItem
                      xs={6}
                      sm={6}
                      md={6}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      <GridContainer>
                        <GridItem xs={2} sm={2} md={2}></GridItem>
                        <GridItem xs={3} sm={3} md={3}>
                          <p style={{ color: "#332861" }}>Text :</p>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                          <StyledRating
                            style={{ fontSize: "20px" }}
                            name="rating-Text"
                            value={this.state.ratingText}
                            emptyIcon={
                              <StarBorderIcon style={{ fontSize: "24px" }} />
                            }
                            onChange={(event, newValue1) => {
                              this.setState({ ratingText: newValue1 });
                            }}
                            precision={0.5}
                          />
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem
                      xs={6}
                      sm={6}
                      md={6}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    >
                      <GridContainer>
                        <GridItem xs={2} sm={2} md={2}></GridItem>
                        <GridItem xs={3} sm={3} md={3}>
                          <p style={{ color: "#332861" }}>Dessins :</p>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                          <StyledRating
                            name="simple-controlled"
                            value={this.state.ratingDessin}
                            emptyIcon={<StarBorderIcon fontSize="24px" />}
                            size="large"
                            onChange={(event, newValue) => {
                              this.setState({ ratingDessin: newValue });
                            }}
                            precision={0.5}
                          />
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="standard-multiline-static"
                        placeholder="Laissez un commentaire(facultatif)"
                        label="commentaire"
                        multiline
                        rows="9"
                        value={this.state.commentaire}
                        style={{ width: "100%" }}
                        autoFocus={
                          this.state.counter !== this.state.planches.length + 1
                            ? false
                            : true
                        }
                        onChange={(commentaire, event) => {
                          this.setState({
                            commentaire: commentaire.target.value
                          });
                        }}
                      />
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
                      this.submitCommantaire();
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
              <h2 className={classes.title}>NOS HISTOIRES</h2>
            </GridItem>
          </GridContainer>
          <GridContainer justify="flex-end">
            <GridItem xs={4} sm={4} md={4}>
              <CustomDropdown
                buttonProps={{
                  round: true,
                  color: "white"
                }}
                style={{ color: "rgb(89, 79, 118)", fontWeight: "bold" }}
                color="white"
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
            <GridContainer justify="center">
              {this.state.histoires.map((histoire, index) => {
                return (
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
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
                      <Card style={{ backgroundColor: "#e3f3fd" }}>
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
                              display: "block",
                              marginTop: "auto",
                              marginBottom: "auto"
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
          </div>
          <GridContainer justify="flex-end">
            <GridItem xs={4} sm={4} md={4}>
              <Link to="/LesHistoires">
                <Button
                  color="white"
                  id="buttonSeeAll"
                  style={{ color: "rgb(89, 79, 118)", fontWeight: "bold" }}
                  // onClick={() => this.seeAllHistoire()}
                >
                  Toutes les histoires
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
        <ArrowRightOutlined style={{ color: Color, fontSize: "50px" }} />
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
NosHistoires.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NosHistoires);
