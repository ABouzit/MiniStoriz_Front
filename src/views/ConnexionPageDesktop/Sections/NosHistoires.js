import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

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
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";

class NosHistoires extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      counter: 1,
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
    this.fetchHistoire();
  }
  fetchHistoire() {
    console.log("URL api" + config.API_URL);
    Axios.get(config.API_URL + "histoires/take/3", {}).then(res => {
      this.setState({ histoires: res.data });
    });
  }
  fetchPlanche(histoire) {
    Axios.get(config.API_URL + "planches/histoire/" + histoire.id, {}).then(
      res => {
        this.setState({ planches: res.data });
      }
    );
  }
  //exemple sauvgarger histoire avec image
  saveHistoire(file) {
    console.log(file[0]);
    let data = new FormData();
    data.append("file", file[0]);

    Axios.post(config.API_URL + "images/upload/", data).then(() =>
      Axios.post(config.API_URL + "histoires", {
        userText: { id: "4305f81f-8e67-45df-80eb-54a646387457" },
        userDessin: { id: "4305f81f-8e67-45df-80eb-54a646387457" },
        lienIllustration: "images/" + file[0].name,
        titreHistoire: "histoireTestUpload"
      })
    );
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
            open={modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.setState({ modal: false })}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
            maxWidth={"md"}
            fullWidth={true}
            scroll="paper"
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={() => {
                this.setState({ modal: false });
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
                {this.state.selectedHistoire.titreHistoire}
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
                                  fontWeight: "400"
                                }}
                              >
                                Texts par
                                <strong>
                                  {" "}
                                  {this.state.selectedHistoire.userText.pseudo +
                                    " "}
                                </strong>
                                et Dessins par
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
                                    color: "black",
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
                              <img
                                src={require("assets/img/landing-bg.jpg")}
                                alt="First slide"
                                className="slick-image"
                                style={{
                                  alignSelf: "center",
                                  maxHeight: "365px",
                                  height: "auto",
                                  maxWidth: "auto",
                                  paddingRight: "10px"
                                }}
                              />
                            </GridItem>
                          </GridContainer>
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
                  <GridContainer>
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
                          textAlign: "center"
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
                          <p>Text :</p>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                          <StyledRating
                            style={{ fontSize: "20px" }}
                            name="rating-Text"
                            value={this.state.ratingText}
                            emptyIcon={<StarBorderIcon fontSize="24px" />}
                            onChange={(event, newValue1) => {
                              this.setState({ ratingText: newValue1 });
                            }}
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
                          <p>Dessins :</p>
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
                          />
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      justify="center"
                      alignItems="center"
                    >
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
              </Slider>
              <SamplePrevArrow
                onClick={() => this.previous()}
                disabled={this.state.counter === 1 ? true : false}
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
                {this.state.counter !== this.state.planches.length + 1 ? (
                  this.state.counter
                ) : (
                  <Button
                    color="primary"
                    style={{ margin: 0 }}
                    onClick={() => {
                      this.setState({ modal: false });
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
            <GridItem xs={4} sm={4} md={2}>
              <CustomDropdown
                buttonText="Regular"
                dropdownList={[
                  "Action",
                  "Another action",
                  "Something else here"
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
                      <Card style={{ width: "20rem" }}>
                        <h4 className={classes.cardTitle}>
                          {histoire.titreHistoire}
                        </h4>
                        <img
                          style={{
                            height: "180px",
                            width: "100%",
                            display: "block"
                          }}
                          className={classes.imgCardTop}
                          src={require("assets/img/landing-bg.jpg")}
                          alt="Card-img-cap"
                        />
                        <h5>
                          {histoire.nombreVue ? histoire.nombreVue : 0} vues - 3
                          jours
                        </h5>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <p>{"Text par " + histoire.userText.pseudo}</p>
                              <Rating
                                name="read-only"
                                value={
                                  histoire.noteHistoireMoy
                                    ? histoire.noteHistoireMoy
                                    : 0
                                }
                                emptyIcon={
                                  <StarBorderIcon fontSize="inherit" />
                                }
                                readOnly
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <p>
                                {" "}
                                {"Dessin par " + histoire.userDessin.pseudo}
                              </p>
                              <Rating
                                name="read-only"
                                value={
                                  histoire.noteDessinMoy
                                    ? histoire.noteDessinMoy
                                    : 0
                                }
                                emptyIcon={
                                  <StarBorderIcon fontSize="inherit" />
                                }
                                readOnly
                              />
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </ButtonBase>
                  </GridItem>
                );
              })}
              <Input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={file => this.saveHistoire(file.target.files)}
              ></Input>
              <p style={{ color: "black" }}>create histoire with upload file</p>
            </GridContainer>
          </div>
        </div>
      );
    else return <p>mazal matchargat</p>;
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
NosHistoires.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NosHistoires);
