import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
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
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import { makeStyles } from "@material-ui/core/styles";
//scroll bare text
import CustomInput from "components/CustomInput/CustomInput.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import { subscriber, messageService } from "./../../../services/messageService";
class Publier extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      imgSrc: "",
      dataImgPlanche: "",
      lienImgPlanche: "",
      testNext: 0,
      testNextText: 0,
      textHistoire: "",
      titleHistoire: "",
      imgHistoire: "",
      lienImgHistoire: "",
      dataImgHistoire: "",
      planche: [{ text: "", img: "", data: "", lien: "" }],
      counter: 1,
      selectedIndex: 0,
      typeModal: -1,
      modal: false,
      lienInputUpload: "",
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
        autoplay: false,
        swipe: false,
        draggable: false
      },
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.testTextNext = this.testTextNext.bind(this);
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

  // save image histoire
  saveHistoire(file) {
    this.setState({ lienInputUploadhistoire: file[0].name });
    console.log(this.state.titleHistoire);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file[0]);
    let data = new FormData();
    data.append("file", file[0]);
    reader.onloadend = function(e) {
      this.setState({
        imgHistoire: [reader.result],
        dataImgHistoire: data,
        lienImgHistoire: "images/histoires/" + file[0].name
      });
    }.bind(this);
    console.log(file[0].name); // Would see a path?
  }
  saveHistoireWithPlanche() {
    console.log("///////////" + this.state.dataImgHistoire);
    const _this = this;
    return Axios({
      method: "post",
      url: config.API_URL + "sendImage/histoires/",
      data: this.state.dataImgHistoire,
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
      return Axios.post(config.API_URL + "histoires", {
        userText: { id: "4305f81f-8e67-45df-80eb-54a646387457" },
        userDessin: { id: "4305f81f-8e67-45df-80eb-54a646387457" },
        // userText: { id: "3c500b25-cb58-4be3-861e-2bb2926bd75f" },
        // userDessin: { id: "3c500b25-cb58-4be3-861e-2bb2926bd75f" },
        lienIllustration: config.API_URL + s,
        titreHistoire: this.state.titleHistoire
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
            subscriber.next(true);
            _this.setState({
              imgSrc: "",
              dataImgPlanche: "",
              lienImgPlanche: "",
              testNext: 0,
              testNextText: 0,
              textHistoire: "",
              titleHistoire: "",
              imgHistoire: "",
              lienImgHistoire: "",
              dataImgHistoire: "",
              planche: [{ text: "", img: "", data: "", lien: "" }],
              lienInputUpload: "",
              lienInputUploadhistoire: ""
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  //exemple sauvgarger planches avec image
  savePlanches(file) {
    this.setState({ testNext: 1 });
    this.forceUpdate();
    this.setState({ lienInputUpload: file[0].name });
    var reader = new FileReader();
    var url = reader.readAsDataURL(file[0]);

    let data = new FormData();
    data.append("file", file[0]);

    reader.onloadend = function(e) {
      this.setState({
        imgSrc: [reader.result],
        dataImgPlanche: data,
        lienImgPlanche: "images/planches/" + file[0].name
      });
    }.bind(this);
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
  //modal - carousel
  handleListItemClick(event, index, type) {
    this.setState(
      { selectedIndex: index, typeModal: type, modal: true },
      () => {
        setTimeout(() => {
          this.next();
        }, 1);
      }
    );
  }
  handleListItemValide(event, index, type) {
    this.setState({ selectedIndex: index, typeModal: type, modal: true });
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
  modalContent() {
    const { settings, modal } = this.state;
    const { classes } = this.props;
    if (this.state.modal === true && this.state.typeModal === 1) {
      return (
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          onBackdropClick={() => {
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            });
            this.gotToIndex(1);
          }}
          TransitionComponent={Transition}
          keepMounted
          onClose={() =>
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            })
          }
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          maxWidth={"md"}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({
                modal: false,
                planche: [{ text: "", img: "", data: "", lien: "" }]
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
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                fontWeight: "600",
                marginRight: "4%"
              }}
            >
              Texte & Dessins
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
          >
            <SampleNextArrow
              onClick={() => this.next()}
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
            />
            <Slider
              ref={slider => (this.slider = slider)}
              {...settings}
              style={{
                height: "100%",
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 20,
                marginRight: 20,
                maxWidth: "890px"
              }}
            >
              {this.state.planche.map((planch, index) => {
                return (
                  <div key={index}>
                    <GridContainer
                      justify="center"
                      alignItems="center"
                      style={{
                        backgroundColor: "#e3f3fd",
                        color: "#332861"
                      }}
                    >
                      <GridItem xs={12} sm={12} md={12}>
                        <h5
                          style={{
                            textAlign: "center",
                            fontSize: "17px",
                            fontWeight: "400",
                            color: "#332861"
                          }}
                        >
                          Planche {index}
                        </h5>
                      </GridItem>
                    </GridContainer>
                    <GridContainer
                      style={{ height: "365px" }}
                      justify="center"
                      alignItems="center"
                    >
                      <GridItem
                        xs={7}
                        sm={7}
                        md={7}
                        // style={{ textAlign: '-webkit-center' }}
                      >
                        <TextField
                          primary
                          id="standard-multiline-static"
                          placeholder="Ecrire votre texte"
                          variant="outlined"
                          label="Texte"
                          multiline
                          rows="12"
                          style={{ width: "100%", backgroundColor: "white" }}
                          value={this.state.textHistoire}
                          autoFocus={
                            this.state.counter !==
                            this.state.planche[this.state.counter - 1]
                              ? false
                              : true
                          }
                          onChange={(textHistoire, event) => {
                            this.setState(
                              {
                                textHistoire: textHistoire.target.value
                              },
                              () => {
                                this.testTextNext();
                              }
                            );
                          }}
                        />
                        {/* <h5
                          style={{
                            fontWeight: "bold",
                            fontFamily: "monospace",
                            marginTop: 30
                          }}
                        >
                          Illustration
                        </h5>
                        <Input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={file =>
                            this.savePlanches(file.target.files)
                          }
                        ></Input>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="white"
                            component="span"
                          >
                            Choisir une image
                          </Button>

                          <strong style={{ marginLeft: 10 }}>
                            {this.state.lienInputUpload !== ""
                              ? this.state.lienInputUpload
                              : planch.lien.substring(16)}
                          </strong>
                        </label> */}
                      </GridItem>

                      <GridItem
                        xs={5}
                        sm={5}
                        md={5}
                        style={{ textAlign: "-webkit-center" }}
                      >
                        {/* <img
                          src={this.state.imgSrc}
                          style={{
                            maxWidth: 270,
                            maxHeight: 360,
                            marginLeft: "10%"
                          }}
                        /> */}
                        <Input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={file =>
                            this.savePlanches(file.target.files)
                          }
                        ></Input>
                        <label htmlFor="contained-button-file">
                          {this.state.imgSrc == "" ? (
                            //   <div>
                            //   <i
                            //   className={
                            //     this.headerClasse.socialIcons + " far fa-image"
                            //   }
                            //   style={{ color: "#000000", fontSize: 60 }}
                            // />
                            // <i
                            //   className={
                            //     this.headerClasse.socialIcons + " fas fa-plus"
                            //   }
                            //   style={{ color: "#000000", fontSize: 20,position: 'absolute' }}
                            // />
                            // </div>
                            <img
                              src={
                                config.API_URL + "images/asset/imageUpload.png"
                              }
                              style={{
                                maxWidth: 270,
                                maxHeight: 360,
                                marginLeft: "10%"
                              }}
                            />
                          ) : (
                            <img
                              src={this.state.imgSrc}
                              style={{
                                maxWidth: 270,
                                maxHeight: 360,
                                marginLeft: "10%"
                              }}
                            />
                          )}
                        </label>
                      </GridItem>
                    </GridContainer>
                  </div>
                );
              })}
            </Slider>
            <SamplePrevArrow
              onClick={() => this.previous()}
              Color={
                this.state.counter === 2 ? "rgba(0, 0, 0, 0.26)" : "#332861"
              }
              disabled={this.state.counter === 2 ? true : false}
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
              <Button
                color="white"
                style={{
                  color: "rgb(89, 79, 118)",
                  fontWeight: "bold",
                  margin: 0
                }}
                onClick={event => {
                  // this.setState({ modal: false });
                  this.handleListItemValide(event, 1, 2);
                }}
                disabled={
                  this.state.testNext == 1 &&
                  this.state.testNextText == 1 &&
                  this.state.planche.length == this.state.counter
                    ? false
                    : true
                }
              >
                Valider
              </Button>
            </h3>
          </MuiDialogActions>
        </Dialog>
      );
    }

    if (this.state.modal === true && this.state.typeModal === 4) {
      return (
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          onBackdropClick={() => {
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            });
            this.gotToIndex(1);
          }}
          TransitionComponent={Transition}
          keepMounted
          onClose={() =>
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            })
          }
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          maxWidth={"md"}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({
                modal: false,
                planche: [{ text: "", img: "", data: "", lien: "" }]
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
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                fontWeight: "600",
                marginRight: "3.5%"
              }}
            >
              Dessins uniquement
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
          >
            <SampleNextArrow
              onClick={() => this.next()}
              style={Styles.NextArrow}
              Color={
                this.state.testNext == 1 ? "#332861" : "rgba(0, 0, 0, 0.26)"
              }
              disabled={this.state.testNext == 1 ? false : true}
              style={Styles.NextArrow}
            />
            <Slider
              ref={slider => (this.slider = slider)}
              {...settings}
              style={{
                height: "100%",
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 20,
                marginRight: 20,
                maxWidth: "890px"
              }}
            >
              {this.state.planche.map((planch, index) => {
                return (
                  <div key={index}>
                    <GridContainer justify="center" alignItems="center">
                      <GridItem xs={12} sm={12} md={12}>
                        <h5
                          style={{
                            textAlign: "center",
                            fontSize: "17px",
                            fontWeight: "400"
                          }}
                        >
                          Planche {index}
                        </h5>
                      </GridItem>
                    </GridContainer>
                    <GridContainer
                      style={{ height: "365px" }}
                      justify="center"
                      alignItems="center"
                    >
                      {/* <GridItem
                        xs={7}
                        sm={7}
                        md={7}
                        style={{ paddingRight: "20px", paddingRight: "10px" }}
                      >
                        <h5
                          style={{
                            fontWeight: "bold",
                            fontFamily: "monospace",
                            marginTop: 30
                          }}
                        >
                          Illustration (facultatif)
                        </h5>
                        <Input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={file =>
                            this.savePlanches(file.target.files)
                          }
                        ></Input>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="white"
                            component="span"
                          >
                            Choisir une image
                          </Button>

                          <strong style={{ marginLeft: 10 }}>
                            {this.state.lienInputUpload !== ""
                              ? this.state.lienInputUpload
                              : planch.lien.substring(16)}
                          </strong>
                        </label>
                      </GridItem> */}

                      <GridItem
                        xs={10}
                        sm={10}
                        md={10}
                        style={{ textAlign: "-webkit-center" }}
                      >
                        {/* <img
                          src={this.state.imgSrc}
                          style={{
                            maxWidth: 270,
                            maxHeight: 360,
                            marginLeft: "10%"
                          }}
                        /> */}
                        <Input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={file =>
                            this.savePlanches(file.target.files)
                          }
                        ></Input>
                        <label htmlFor="contained-button-file">
                          {this.state.imgSrc == "" ? (
                            <img
                              src={
                                config.API_URL + "images/asset/imageUpload.png"
                              }
                              style={{
                                maxWidth: 270,
                                maxHeight: 360,
                                marginLeft: "10%"
                              }}
                            />
                          ) : (
                            <img
                              src={this.state.imgSrc}
                              style={{
                                maxWidth: 270,
                                maxHeight: 360,
                                marginLeft: "10%"
                              }}
                            />
                          )}
                        </label>
                      </GridItem>
                    </GridContainer>
                  </div>
                );
              })}
            </Slider>
            <SamplePrevArrow
              onClick={() => this.previous()}
              Color={
                this.state.counter === 2 ? "rgba(0, 0, 0, 0.26)" : "#332861"
              }
              disabled={this.state.counter === 2 ? true : false}
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
              <Button
                color="white"
                style={{
                  color: "rgb(89, 79, 118)",
                  fontWeight: "bold",
                  margin: 0
                }}
                onClick={event => {
                  // this.setState({ modal: false });
                  this.handleListItemValide(event, 1, 2);
                }}
                disabled={
                  this.state.testNext == 1 &&
                  this.state.planche.length == this.state.counter
                    ? false
                    : true
                }
              >
                Valider
              </Button>
            </h3>
          </MuiDialogActions>
        </Dialog>
      );
    }

    if (this.state.modal === true && this.state.typeModal === 3) {
      return (
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          onBackdropClick={() => {
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            });
            this.gotToIndex(1);
          }}
          TransitionComponent={Transition}
          keepMounted
          onClose={() =>
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }]
            })
          }
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          maxWidth={"md"}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({
                modal: false,
                planche: [{ text: "", img: "", data: "", lien: "" }]
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
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                fontWeight: "600",
                marginRight: "3.5%"
              }}
            >
              Texte uniquement
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
          >
            <SampleNextArrow
              onClick={() => this.next()}
              style={Styles.NextArrow}
              Color={
                this.state.testNextText == 1 ? "#332861" : "rgba(0, 0, 0, 0.26)"
              }
              disabled={this.state.testNextText == 1 ? false : true}
              style={Styles.NextArrow}
            />
            <Slider
              ref={slider => (this.slider = slider)}
              {...settings}
              style={{
                height: "100%",
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 20,
                marginRight: 20,
                maxWidth: "890px"
              }}
            >
              {this.state.planche.map((planch, index) => {
                return (
                  <div key={index}>
                    <GridContainer justify="center" alignItems="center">
                      <GridItem xs={12} sm={12} md={12}>
                        <h5
                          style={{
                            textAlign: "center",
                            fontSize: "17px",
                            fontWeight: "400"
                          }}
                        >
                          Planche {index}
                        </h5>
                      </GridItem>
                    </GridContainer>
                    <GridContainer
                      style={{ height: "365px" }}
                      justify="center"
                      alignItems="center"
                    >
                      <GridItem
                        xs={10}
                        sm={10}
                        md={10}
                        style={{ paddingRight: "20px", paddingRight: "10px" }}
                      >
                        <TextField
                          primary
                          id="standard-multiline-static"
                          placeholder="Ecrire votre texte"
                          variant="outlined"
                          label="Texte"
                          multiline
                          rows="13"
                          style={{ width: "100%", backgroundColor: "white" }}
                          value={this.state.textHistoire}
                          autoFocus={
                            this.state.counter !==
                            this.state.planche[this.state.counter - 1]
                              ? false
                              : true
                          }
                          onChange={(textHistoire, event) => {
                            this.setState({
                              textHistoire: textHistoire.target.value,
                              testNextText: 1
                            });
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                );
              })}
            </Slider>
            <SamplePrevArrow
              onClick={() => this.previous()}
              Color={
                this.state.counter === 2 ? "rgba(0, 0, 0, 0.26)" : "#332861"
              }
              disabled={this.state.counter === 2 ? true : false}
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
              <Button
                color="white"
                style={{
                  color: "rgb(89, 79, 118)",
                  fontWeight: "bold",
                  margin: 0
                }}
                onClick={event => {
                  this.handleListItemValide(event, 1, 2);
                }}
                disabled={
                  this.state.testNextText == 1 &&
                  this.state.planche.length == this.state.counter
                    ? false
                    : true
                }
              >
                Valider
              </Button>
            </h3>
          </MuiDialogActions>
        </Dialog>
      );
    }

    if (this.state.modal === true && this.state.typeModal === 2) {
      return (
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => {
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }],
              titleHistoire: "",
              lienImgHistoire: "",
              dataImgHistoire: "",
              imgHistoire: "",
              lienInputUploadhistoire: ""
            });
            this.gotToIndex(1);
          }}
          onClose={() =>
            this.setState({
              modal: false,
              planche: [{ text: "", img: "", data: "", lien: "" }],
              titleHistoire: "",
              lienImgHistoire: "",
              dataImgHistoire: "",
              imgHistoire: "",
              lienInputUploadhistoire: ""
            })
          }
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          maxWidth={"md"}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({
                modal: false,
                planche: [{ text: "", img: "", data: "", lien: "" }],
                titleHistoire: "",
                lienImgHistoire: "",
                dataImgHistoire: "",
                imgHistoire: "",
                lienInputUploadhistoire: ""
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
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                fontWeight: "600"
              }}
            >
              Affiche d'histoire
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
          >
            <Slider
              ref={slider => (this.slider = slider)}
              {...settings}
              style={{
                height: "100%",
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 20,
                marginRight: 20,
                maxWidth: "890px"
              }}
            >
              <div key={1}>
                <GridContainer justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={10}>
                    <h5
                      style={{
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: "400"
                      }}
                    >
                      Histoire
                    </h5>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ height: "365px" }}
                  justify="center"
                  alignItems="center"
                >
                  <GridItem
                    xs={10}
                    sm={10}
                    md={10}
                    style={{ paddingRight: "20px", paddingRight: "10px" }}
                  >
                    <h3
                      style={{
                        fontWeight: "bold",
                        color: "#332861",
                        textAlign: "left",
                        fontFamily: "cursive"
                      }}
                    >
                      Tu as presque terminé la publication de l’histoire, il ne
                      reste qu’à finaliser...
                    </h3>
                  </GridItem>

                  <GridItem
                    xs={10}
                    sm={10}
                    md={6}
                    justify="center"
                    alignItems="center"
                    style={{
                      paddingRight: "20px",
                      paddingRight: "10px",
                      marginTop: -20
                    }}
                  >
                    <CustomInput
                      labelText="Titre de l'histoire"
                      id="float"
                      value={this.state.titleHistoire}
                      onChange={event => {
                        const { value } = event.target;
                        this.setState({
                          titleHistoire: value
                        });
                      }}
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                    />
                    {/* <h5 style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                      Illustration (facultatif)
                    </h5>
                    <Input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      onChange={file => this.saveHistoire(file.target.files)}
                    ></Input>
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="white"
                        component="span"
                      >
                        Choisir une image
                      </Button>

                      <strong style={{ marginLeft: 10 }}>
                        {this.state.lienInputUploadhistoire}
                      </strong>
                    </label> */}
                  </GridItem>

                  <GridItem
                    xs={10}
                    sm={10}
                    md={4}
                    style={{ paddingRight: "20px", paddingRight: "10px" }}
                  >
                    <Input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      onChange={file => this.saveHistoire(file.target.files)}
                    ></Input>
                    <label htmlFor="contained-button-file">
                      {this.state.imgHistoire == "" ? (
                        <img
                          src={config.API_URL + "images/asset/imageUpload.png"}
                          style={{
                            maxWidth: 200,
                            maxHeight: 300,
                            marginLeft: "auto"
                          }}
                        />
                      ) : (
                        <img
                          src={this.state.imgHistoire}
                          style={{
                            maxWidth: 200,
                            maxHeight: 300,
                            marginLeft: "auto"
                          }}
                        />
                      )}
                    </label>
                  </GridItem>
                </GridContainer>
              </div>
            </Slider>
          </DialogContent>
          <MuiDialogActions
            style={{
              padding: 0
            }}
          >
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
              <Button
                color="white"
                style={{
                  color: "rgb(89, 79, 118)",
                  fontWeight: "bold",
                  margin: 0
                }}
                onClick={() => {
                  this.saveHistoireWithPlanche();
                  this.setState({ modal: false });
                  this.gotToIndex(1);
                }}
              >
                Terminer
              </Button>
            </h3>
          </MuiDialogActions>
        </Dialog>
      );
    }
  }
  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className={classes.section}>
        {this.modalContent()}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>PUBLIER</h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-start" style={{ marginTop: 30 }}>
          <GridItem xs={12} sm={12} md={10}>
            <h3
              style={{
                fontWeight: "bold",
                color: "#000000",
                textAlign: "left",
                fontFamily: "cursive"
              }}
            >
              Tu souhaites écrire ou dessiner ?... ou même les 2 ?
            </h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <h4
              style={{
                fontWeight: "lite",
                fontFamily: "monospace",
                color: "#000000",
                textAlign: "left"
              }}
            >
              Choisis ton mode de publication et montre-nous tes talents ! Les
              lecteurs attendent de découvrir de nouvelles histoires avec
              impatience...
            </h4>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                selected={selectedIndex === 1}
                onClick={event => this.handleListItemClick(event, 1, 1)}
              >
                <Card
                  style={{
                    width: "20rem",
                    backgroundColor: "#e3f3fd"
                  }}
                >
                  <h4
                    className={classes.cardTitle}
                    style={{
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      backgroundColor: "#594f76",
                      color: "white",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      margin: 0
                    }}
                  >
                    Ecrire & illustrer
                  </h4>
                  <Tooltip
                    id="instagram-tooltip"
                    title="Texte & dessins"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: this.headerClasse.tooltip }}
                  >
                    <Button
                      color="transparent"
                      target="_blank"
                      className={this.headerClasse.navLink}
                      style={{ backgroundColor: "white", marginTop: 0 }}
                    >
                      <i
                        className={
                          this.headerClasse.socialIcons + " fas fa-keyboard"
                        }
                        style={{ color: "#000000", fontSize: 100 }}
                      />
                      <i
                        className={
                          this.headerClasse.socialIcons + " fas fa-pencil-alt"
                        }
                        style={{
                          color: "#000000",
                          fontSize: 100,
                          marginLeft: 30
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                    Texte & dessins
                  </h5>
                </Card>
              </ButtonBase>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                onClick={event => this.handleListItemClick(event, 1, 3)}
              >
                <Card
                  style={{
                    width: "20rem",
                    backgroundColor: "#e3f3fd"
                  }}
                >
                  <h4
                    className={classes.cardTitle}
                    style={{
                      fontWeight: "bold",
                      fontFamily: "monospace",

                      backgroundColor: "#594f76",
                      color: "white",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      margin: 0
                    }}
                  >
                    Ecrire
                  </h4>
                  <Tooltip
                    id="instagram-tooltip"
                    title="Texte uniquement"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: this.headerClasse.tooltip }}
                  >
                    <Button
                      color="transparent"
                      target="_blank"
                      className={this.headerClasse.navLink}
                      style={{ backgroundColor: "white", marginTop: 0 }}
                    >
                      <i
                        className={
                          this.headerClasse.socialIcons + " fas fa-keyboard"
                        }
                        style={{ color: "#000000", fontSize: 100 }}
                      />
                    </Button>
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                    Texte uniquement
                  </h5>
                </Card>
              </ButtonBase>
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                onClick={event => this.handleListItemClick(event, 1, 4)}
              >
                <Card style={{ width: "20rem", backgroundColor: "#e3f3fd" }}>
                  <h4
                    className={classes.cardTitle}
                    style={{
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      color: "white",
                      backgroundColor: "#594f76",
                      color: "white",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      margin: 0
                    }}
                  >
                    Illustrer
                  </h4>
                  <Tooltip
                    id="instagram-tooltip"
                    title="Dessins uniquement"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: this.headerClasse.tooltip }}
                  >
                    <Button
                      color="transparent"
                      target="_blank"
                      className={this.headerClasse.navLink}
                      style={{ backgroundColor: "white", marginTop: 0 }}
                    >
                      <i
                        className={
                          this.headerClasse.socialIcons + " fas fa-pencil-alt"
                        }
                        style={{ color: "#000000", fontSize: 100 }}
                      />
                    </Button>
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                    Dessins uniquement
                  </h5>
                </Card>
              </ButtonBase>
            </GridItem>
            {/* <img src={config.API_URL+"images/planches/18107.jpg"} style={{maxWidth: 270, maxHeight: 360, marginLeft: "10%"}} /> */}
          </GridContainer>
        </div>
      </div>
    );
  }
}
const StyledRating = withStyles({
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
          style={{ fontSize: "50px", color: Color }}
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
Publier.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Publier);
