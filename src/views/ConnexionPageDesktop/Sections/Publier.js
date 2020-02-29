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

class Publier extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      imgSrc: '',
      dataImgPlanche: '',
      lienImgPlanche: '',
      textHistoire: '',
      titleHistoire: '',
      imgHistoire: '',
      lienImgHistoire: '',
      dataImgHistoire: '',
      planche: [{text: '', img: '', data: '', lien: ''}],
      counter: 1,
      selectedIndex: 0,
      typeModal: -1,
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
  }
  next() {
  
    this.state.planche[this.state.counter - 1].img = this.state.imgSrc;
    this.state.planche[this.state.counter - 1].text = this.state.textHistoire;
    this.state.planche[this.state.counter - 1].data = this.state.dataImgPlanche;
    this.state.planche[this.state.counter - 1].lien = this.state.lienImgPlanche;
    this.state.textHistoire = '';
    this.state.imgSrc = '';
    this.state.dataImgPlanche = '';
    this.state.lienImgPlanche = '';
    if (this.state.counter < this.state.planche.length) {
      this.state.textHistoire = this.state.planche[this.state.counter].text;
      this.state.imgSrc = this.state.planche[this.state.counter].img;
      this.state.dataImgPlanche = this.state.planche[this.state.counter].data;
      this.state.lienImgPlanche = this.state.planche[this.state.counter].lien;
    }

    if (this.state.counter == this.state.planche.length) {
      this.state.planche.push({text: '', img: '', data: '', lien: ''});
      this.state.textHistoire = '';
      this.state.imgSrc = '';
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
    this.state.textHistoire = this.state.planche[this.state.counter - 2].text;
    this.state.imgSrc = this.state.planche[this.state.counter - 2].img;
    this.state.dataImgPlanche = this.state.planche[this.state.counter - 2].data;
    this.state.lienImgPlanche = this.state.planche[this.state.counter - 2].lien;
    this.slider.slickPrev();
  }
  gotToIndex(index) {
    this.slider.slickGoTo(index - 1);
    this.setState({ counter: 1 });
  }

  // save image histoire
  saveHistoire(file){
    console.log(this.state.titleHistoire);
   var reader = new FileReader();
   var url = reader.readAsDataURL(file[0]);
    let data = new FormData();
    data.append("file", file[0]);
   reader.onloadend = function (e) {
      this.setState({
          imgHistoire: [reader.result],
          dataImgHistoire: data,
          lienImgHistoire: "images/histoires/" + file[0].name
      })
    }.bind(this);
    console.log(file[0].name) // Would see a path?
  }
  saveHistoireWithPlanche(){
    const _this = this;
    Axios.post(config.API_URL + "images/histoires/", this.state.dataImgHistoire).then(() =>
    Axios.post(config.API_URL + "histoires", {
      userText: { id: "5448c755-5085-4652-88fa-ffcac3987071" },
      userDessin: { id: "5448c755-5085-4652-88fa-ffcac3987071" },
      lienIllustration: this.state.lienImgHistoire,
      titreHistoire: this.state.titleHistoire
    }).then(function (response) {
      _this.state.planche.map((planch , index) => {
        if (index > 0) {
          
            Axios.post(config.API_URL + "planches", {
              histoire: response.data.id,
              lienDessin: planch.lien,
              text: planch.text,
              index: index
            }).then(() =>  Axios.post(config.API_URL + "images/planches/", planch.data)
          );
          console.log("planche numero : "+ index)
          console.log(planch)
        }
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  );
  }
  //exemple sauvgarger planches avec image
  savePlanches(file) {
   var reader = new FileReader();
   var url = reader.readAsDataURL(file[0]);

    let data = new FormData();
    data.append("file", file[0]);

   reader.onloadend = function (e) {
      this.setState({
          imgSrc: [reader.result],
          dataImgPlanche: data,
          lienImgPlanche: "images/planches/" + file[0].name
      })
    }.bind(this);
  }
 

  //modal - carousel
  handleListItemClick(event, index, type) {
    
    this.setState({ selectedIndex: index, typeModal: type, modal: true }, ()=>{setTimeout(()=>{this.next();
      }, 1);});
  }
  handleListItemValide(event, index, type) {
    this.setState({ selectedIndex: index, typeModal: type, modal: true });
    this.state.planche[this.state.planche.length - 1].text = this.state.textHistoire;
    this.state.planche[this.state.planche.length - 1].img = this.state.imgSrc;
    this.state.planche[this.state.planche.length - 1].data = this.state.dataImgPlanche;
    this.state.planche[this.state.planche.length - 1].lien = this.state.lienImgPlanche;
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
            this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
            this.gotToIndex(1);
          }}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] })}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          maxWidth={"md"}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
              this.gotToIndex(1);
            }}
            style={{ paddingBottom: "0px" }}
          >
            <h3
              style={{
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                fontWeight: "600"
              }}
            >
              Texte & Dessins
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{ padding: 0 }}
          >
            <SampleNextArrow
              onClick={() => this.next()}
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
                maxWidth: '890px'
              }}
            >
             {  this.state.planche.map((planch , index) => {
              return (
              
              <div key={index} >
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
                    xs={7}
                    sm={7}
                    md={7}
                    justify="center"
                    alignItems="center"
                    style={{ paddingRight: "20px", paddingRight: "10px" }}
                  >
                    <TextField
                      id="standard-multiline-static"
                      placeholder="Ecrire votre text"
                      label="Text"
                      multiline
                      rows="9"
                      style={{ width: "100%" }}
                      value={this.state.textHistoire}
                      autoFocus={
                        this.state.counter !== this.state.planche[this.state.counter - 1]
                          ? false
                          : true
                      }
                      onChange={(textHistoire, event) => {
                        this.setState({
                          textHistoire: textHistoire.target.value
                        });
                      }}
                    />
                    <h5 style={{fontWeight: 'bold', fontFamily: 'monospace', marginTop: 30}}>Illustration (facultatif)</h5>
                    <Input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{ }}
                        onChange={file => this.savePlanches(file.target.files)}
                      ></Input>
                  </GridItem>
                  
                  <GridItem
                    xs={5}
                    sm={5}
                    md={5}
                    justify="center"
                    alignItems="center"
                    style={{ paddingRight: "20px", paddingRight: "10px" }}>
                      <img src={this.state.imgSrc} style={{maxWidth: 270, maxHeight: 360, marginLeft: "10%"}} />
                    </GridItem>
                </GridContainer>
              </div>
               );
              })
            }
              
            </Slider>
            <SamplePrevArrow
              onClick={() => this.previous()}
              disabled={this.state.counter === 2 ? true : false}
            />
          </DialogContent>
          <MuiDialogActions>
            <h3
              style={{
                height: "41px",
                textAlign: "center",
                marginTop: "0px",
                marginBottom: "0px",
                width: "100%",
                fontWeight: "400"
              }}
            >
                <Button
                  color="primary"
                  style={{ margin: 0 }}
                  onClick={event => {
                    // this.setState({ modal: false });
                    this.handleListItemValide(event, 1, 2)
                  }}
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
                  this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                  this.gotToIndex(1);
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] })}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
                maxWidth={"md"}
                fullWidth={true}
                scroll="paper"
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={() => {
                    this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                    this.gotToIndex(1);
                  }}
                  style={{ paddingBottom: "0px" }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontWeight: "600"
                    }}
                  >
                    Dessins
                  </h3>
                </DialogTitle>
                <DialogContent
                  id="modal-slide-description"
                  className={classes.modalBody}
                  style={{ padding: 0 }}
                >
                  <SampleNextArrow
                    onClick={() => this.next()}
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
                      maxWidth: '890px'
                    }}
                  >
                   {  this.state.planche.map((planch , index) => {
                    return (
                    
                    <div key={index} >
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
                          xs={7}
                          sm={7}
                          md={7}
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px" }}
                        >
                          <h5 style={{fontWeight: 'bold', fontFamily: 'monospace', marginTop: 30}}>Illustration (facultatif)</h5>
                          <Input
                              accept="image/*"
                              className={classes.input}
                              id="contained-button-file"
                              multiple
                              type="file"
                              style={{ }}
                              onChange={file => this.savePlanches(file.target.files)}
                            ></Input>
                        </GridItem>
                        
                        <GridItem
                          xs={5}
                          sm={5}
                          md={5}
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px" }}>
                            <img src={this.state.imgSrc} style={{maxWidth: 270, maxHeight: 360, marginLeft: "10%"}} />
                          </GridItem>
                      </GridContainer>
                    </div>
                     );
                    })
                  }
                    
                  </Slider>
                  <SamplePrevArrow
                    onClick={() => this.previous()}
                    disabled={this.state.counter === 2 ? true : false}
                  />
                </DialogContent>
                <MuiDialogActions>
                  <h3
                    style={{
                      height: "41px",
                      textAlign: "center",
                      marginTop: "0px",
                      marginBottom: "0px",
                      width: "100%",
                      fontWeight: "400"
                    }}
                  >
                      <Button
                        color="primary"
                        style={{ margin: 0 }}
                        onClick={event => {
                          // this.setState({ modal: false });
                          this.handleListItemClick(event, 1, 2)
                        }}
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
                  this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                  this.gotToIndex(1);
                }}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] })}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
                maxWidth={"md"}
                fullWidth={true}
                scroll="paper"
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={() => {
                    this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                    this.gotToIndex(1);
                  }}
                  style={{ paddingBottom: "0px" }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontWeight: "600"
                    }}
                  >
                    Ecrire
                  </h3>
                </DialogTitle>
                <DialogContent
                  id="modal-slide-description"
                  className={classes.modalBody}
                  style={{ padding: 0 }}
                >
                  <SampleNextArrow
                    onClick={() => this.next()}
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
                      maxWidth: '890px'
                    }}
                  >
                   {  this.state.planche.map((planch , index) => {
                    return (
                    
                    <div key={index} >
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
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px" }}
                        >
                          <TextField
                            id="standard-multiline-static"
                            placeholder="Ecrire votre text"
                            label="Text"
                            multiline
                            rows="9"
                            style={{ width: "100%" }}
                            value={this.state.textHistoire}
                            autoFocus={
                              this.state.counter !== this.state.planche[this.state.counter - 1]
                                ? false
                                : true
                            }
                            onChange={(textHistoire, event) => {
                              this.setState({
                                textHistoire: textHistoire.target.value
                              });
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </div>
                     );
                    })
                  }
                    
                  </Slider>
                  <SamplePrevArrow
                    onClick={() => this.previous()}
                    disabled={this.state.counter === 2 ? true : false}
                  />
                </DialogContent>
                <MuiDialogActions>
                  <h3
                    style={{
                      height: "41px",
                      textAlign: "center",
                      marginTop: "0px",
                      marginBottom: "0px",
                      width: "100%",
                      fontWeight: "400"
                    }}
                  >
                      <Button
                        color="primary"
                        style={{ margin: 0 }}
                        onClick={event => {
                          this.handleListItemClick(event, 1, 2)
                        }}
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
                  this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                  this.gotToIndex(1);
                }}
                onClose={() => this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] })}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
                maxWidth={"md"}
                fullWidth={true}
                scroll="paper"
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={() => {
                    this.setState({ modal: false, planche: [{text: '', img: '', data: '', lien: ''}] });
                    this.gotToIndex(1);
                  }}
                  style={{ paddingBottom: "0px" }}
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
                  style={{ padding: 0 }}
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
                      maxWidth: '890px'
                    }}
                  >
                    
                    <div key={1} >
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
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px" }}
                        >
                          <h3 style={{fontWeight: 'bold', color: '#000000', textAlign: 'left', fontFamily: 'cursive'}}>Tu as presque terminé la publication de l’histoire, il ne reste qu’à finaliser...</h3>
                        </GridItem>
                         
                        <GridItem
                          xs={10}
                          sm={10}
                          md={6}
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px", marginTop: -20 }}
                        >
                          <CustomInput
                            labelText="Titre de l'histoire"
                            id="float"
                            value={this.state.titleHistoire}
                            onChange={ event => {
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
                          <h5 style={{fontWeight: 'bold', fontFamily: 'monospace'}}>Illustration (facultatif)</h5>
                          <Input
                            aria-describedby=""
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={file => this.saveHistoire(file.target.files)}
                            // onChange={file => this.saveHistoire(file.target.files)}
                          ></Input>
                          
                        </GridItem>
                        
                        <GridItem
                          xs={10}
                          sm={10}
                          md={4}
                          justify="center"
                          alignItems="center"
                          style={{ paddingRight: "20px", paddingRight: "10px" }}>
                            <img src={this.state.imgHistoire} style={{maxWidth: 200, maxHeight: 300, marginLeft: "auto"}} />
                          </GridItem>
                      </GridContainer>
                    </div>
                    
                  </Slider>
                </DialogContent>
                <MuiDialogActions>
                  <h3
                    style={{
                      height: "41px",
                      textAlign: "center",
                      marginTop: "0px",
                      marginBottom: "0px",
                      width: "100%",
                      fontWeight: "400"
                    }}
                  >
                      <Button
                        color="primary"
                        style= {{margin: 0}}
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
        <GridContainer justify="flex-start" style={{marginTop: 30}}>
          <GridItem xs={12} sm={12} md={10}>
            <h3 style={{fontWeight: 'bold', color: '#000000', textAlign: 'left', fontFamily: 'cursive'}}>Tu souhaites écrire ou dessiner ?... ou même les 2 ?</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
          <h4 style={{fontWeight: 'lite', fontFamily: 'monospace', color: '#000000', textAlign: 'left'}}>Choisis ton mode de publication et montre-nous tes talents ! Les lecteurs attendent de découvrir de nouvelles histoires avec impatience...</h4>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify="center" spacing={"auto"} style={{marginTop: 20}}>
            <GridItem
              xs={12}
              sm={12}
              md={4}
              justify="center"
              style={{ width: "auto" }}
            >
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                selected={selectedIndex === 1}
                onClick={event =>
                  this.handleListItemClick(event, 1, 1)
                }
              >
                <Card style={{ width: "20rem" }}>
                  <h4 className={classes.cardTitle} style={{ fontWeight: "bold", fontFamily: "monospace"}} >Ecrire & illustrer</h4>
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
                      >
                        <i className={this.headerClasse.socialIcons + " fas fa-keyboard"} style={{color: '#000000', fontSize: 100}} />
                        <i className={this.headerClasse.socialIcons + " fas fa-pencil-alt"} style={{color: '#000000', fontSize: 100, marginLeft: 30}} />
                      </Button>
                      
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace"}}>Texte & dessins</h5>
                  <CardBody>
                    
                  </CardBody>
                </Card>
              </ButtonBase>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={4}
              justify="center"
              style={{ width: "auto" }}
            >
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                onClick={event =>
                  this.handleListItemClick(event, 1, 3)
                }
              >
                <Card style={{ width: "20rem" }}>
                <h4 className={classes.cardTitle} style={{ fontWeight: "bold", fontFamily: "monospace"}} >Ecrire</h4>
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
                      >
                          <i className={this.headerClasse.socialIcons + " fas fa-keyboard"} style={{color: '#000000', fontSize: 100}} />
                      </Button>
                      
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace"}}>Texte uniquement</h5>
                  <CardBody>
                    
                  </CardBody>
                </Card>
              </ButtonBase>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={4}
              justify="center"
              style={{ width: "auto" }}
            >
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "20rem"
                }}
                onClick={event =>
                  this.handleListItemClick(event, 1, 4)
                }
              >
                <Card style={{ width: "20rem" }}>
                <h4 className={classes.cardTitle} style={{ fontWeight: "bold", fontFamily: "monospace"}} >Illustrer</h4>
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
                      >
                          <i className={this.headerClasse.socialIcons + " fas fa-pencil-alt"} style={{color: '#000000', fontSize: 100}} />
                      </Button>
                      
                  </Tooltip>
                  <h5 style={{ fontWeight: "bold", fontFamily: "monospace"}}>Dessins uniquement</h5>
                  <CardBody>
                    
                  </CardBody>
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
  const { className, style, onClick, disabled } = props;
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
        <ArrowRightOutlined color="green" style={{ fontSize: "50px" }} />
      </div>
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, disabled } = props;
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
        <ArrowLeftOutlined style={{ fontSize: "50px" }} />
      </div>
    </IconButton>
  );
}
Publier.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Publier);
