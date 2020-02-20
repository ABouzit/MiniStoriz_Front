import React from "react";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import LocationOn from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export default class NosHistoires extends React.Component {
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
      ratingDessin: 0
    };
    this.classes = makeStyles(styles);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  gotToIndex(index) {
    this.slider.slickGoTo(index - 1);
    this.setState({ counter: 1 });
  }

  //modal - carousel
  render() {
    const { settings, modal } = this.state;
    const { classes } = this;
    return (
      <div className={this.classes.section}>
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
              histoire numero 23
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
              disabled={this.state.counter === 3 ? true : false}
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
                      cree par houssam et houssa
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
                        <LocationOn className="slick-icons" />
                        Yellowstone National Park, United Statesjhvjh vjhvjhvjh
                        vjhvj hvjhvj hvjhvjhv j hvjhvjhvj hvjhvjhvjh vjhvjhvh
                        jvjhvhjv jhvhjvhj vhjvhjv jhvhjvjhvj hvhjv hgchgch gcSta
                        tesjhvjh vjhvjhvjh vjhvjhvjhvjh vjhvjhvj hvjhvjhv
                        jhvjhvjh vjhvjhvjhv hjvjhv hjvjh vhjvhjv hjvhjvjhvh
                        jvjhvjh vhjv Statesj hvjhvjhv jhvjhvjh vjhvjhvjh
                        vjhvjhvjhv jhvjhvjhvj hvjhvjhvj hvjhvhjvjhvhjv jhvhjvh
                        jvhjvhjvj hvhjvjhvjhv hjv Statesj hvjhvjhv jhvjhvjh
                        vjhvjhvjh vjhvjh vjhvjhv jhvjhvjhvj hvjhvjhvjhv
                        hjvjhvhjvjh vhjvhjvhj vhjvjhvhjv jhvjhvhjv Yellows tone
                        National Park, United Statesj hvjhvjhv jhvjhvjhv jhvjhvj
                        hvjhvjhvj hvjhvjhvjhvj hvjhvjhvj hvjhvhjvjh vhjvjh
                        vhjvhjvhjv hjvjhv hjvjhv jhvhjv hgchgch gcStatesjhvj
                        hvjhvjhvjhv jhvjhvjhv jhvjhvjhvj hvjhvjhvj
                        hvjhvjhvjhvjhvjhv hjvjhvhj vjhvhjv hjvhjvh jvjhvhj
                        vjhvjhvhjv Statesj hvjhvjhvjhvj hvjhvjhvj hvjhvjhv
                        jhvjhvjhvj hvjhvjhvjhv jhvjhvjhvhj vjhvhjvjhvhjvhjvhj
                        vhjvjhvhjvj hvjhvhjv Statesj hvjhvjhvjhv jhvjhvjhv
                        jhvjhvjhv jhvjhvjhvj hvjhvjhvjh vjhvjhvjh vhjvjhvhj
                        vjhvhjvh jvhjvhjvjh vhjvjhvjhv hjv Yellows tone National
                        Park, United Statesj hvjhvjhvjhv jhvjhvjhvjh vjhvjhvj
                        hvjhvjhvj hvjhvjhvj hvjhvjhvjh vhjvjhvh jvjhvhjvhjv
                        hjvhjvjhvh jvjhvjhvhjv hgchgch gcStatesjhvj h vjhvjhvj
                        hvjhvjhvj hvjhvjhvj hvjhvjhvjh vjhvjhvjh vjhvjhvjh
                        vhjvjhvhj vjhvhjvhjv hjvhjvjhvh jvjhvjh vhjv Statesj
                        hvjhvjhvjhvj hvjh vjhvjhv jhvjhvjhv jhvjhvjhv jhvjhvjhv
                        jhvjhvjhvh jvjhvhjvj hvhjvhjv hjvhjvjhv hjvjhvj hvhjv
                        Statesj hvjhvjhvjhvjhvjhvj hvjhvjhvjhv jhvjhvjhvjhvjhv j
                        hvjhvhjvjh vhjvjhvh jvhjvhjv hjvjhvhj vjhvjh vhjv
                        Yellows tone National Park, United Statesj
                        hvjhvjhvjhvjhv jhvjhvjhvjh vjhvjhvjh vjhvjhvjhvjh
                        vjhvjhvjh vjhvhjvjhvhjvj hvhjvhjvhjvhj vjhvhjvjh vjhvhjv
                        hgchgchgcState sjhvjhvjhv jhvjhv jhvjhvjhvjhvjhvj hvjhv
                        jhvjhvjhvjhvjh vjhvjhvjhvhjvj hvhjvjhv hjvhjvh jvhjvjhvh
                        jvjhvjhvhjv Stat esjhvjhvjhvjhvjhv jhvjhvjhvjh
                        vjhvjhvjhvjh vjhvjhvjhvjh vjhvjhvjhvhj vjhvhjvjh
                        vhjvhjvhjv hjvjhvhjvj hvjhvhjv Statesjhvjhv jhvjhvjhvjh
                        vjhvjhvjhvjhvjhvj hvjhvjhvjhvj hvjhvjhvjhvjhv
                        hjvjhvhjvjhvhj vhjvhjvh jvjhvhjv jhvjhvhjv Yellowstone
                        National Park, United Statesj hvjhvjhvjhvjhv
                        jhvjhvjhvjhvjhvjhvjhvjhvj hvjhvjhvjhvj hvjhvj hvhjvj
                        hvhjvjhvhjvhj vhjvhjvj hvhjvjh vjhvhjv hgchgchgc
                        Statesjh vjhvjhvj hvjhvjh vjhvj hvjhvjhvjhvjh
                        vjhvjhvjhvjhvjhv jhvjhvjh vhjvjhvhjvj hvhjvhjvh
                        jvhjvjhvhjvjhv jhvhjv Statesjhvjh vjhvj hvjhv jhvjhv
                        jhvjhvjhvjhvj hvjhvjhv jhvjhvjh vjhvjhvjhv hjvjhvh
                        jvjhvhjv hjvhj vhjvj hvhjvjhv jhvhjv Statesjhv jhvj
                        hvjhvj hvjhvjh vjhvjhvjhv jhvjhvjhv jhvjhvjhvjh vjhvjhv
                        jhvhjvjhvhjv jhvhjvhjv hjvhjv jhvhjvj hvjhvhjv
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
              <div key={2}>
                <GridContainer justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <h5
                      style={{
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: "400"
                      }}
                    >
                      cree par houssam et houssa
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
                    <SimpleBar style={{ maxHeight: "365px" }}>
                      <h5
                        style={{
                          color: "black",
                          width: "100%",
                          maxHeight: "365px",
                          overflowY: "auto",
                          margin: "0px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          fontSize: "16px"
                        }}
                      >
                        <LocationOn className="slick-icons" />
                        Yellowstone National Park, United Statesjhvjh vjhvjhvjh
                        vjhvj hvjhvj hvjhvjhv j hvjhvjhvj hvjhvjhvjh vjhvjhvh
                        jvjhvhjv jhvhjvhj vhjvhjv jhvhjvjhvj hvhjv hgchgch gcSta
                        tesjhvjh vjhvjhvjh vjhvjhvjhvjh vjhvjhvj hvjhvjhv
                        jhvjhvjh vjhvjhvjhv hjvjhv hjvjh vhjvhjv hjvhjvjhvh
                        jvjhvjh vhjv Statesj hvjhvjhv jhvjhvjh vjhvjhvjh
                        vjhvjhvjhv jhvjhvjhvj hvjhvjhvj hvjhvhjvjhvhjv jhvhjvh
                        jvhjvhjvj hvhjvjhvjhv hjv Statesj hvjhvjhv jhvjhvjh
                        vjhvjhvjh vjhvjh vjhvjhv
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
                      src={require("assets/img/examples/clem-onojegaw.jpg")}
                      alt="First slide"
                      className="slick-image"
                      style={{
                        alignSelf: "center",
                        maxHeight: "365px",
                        height: "auto",
                        width: "auto",
                        paddingRight: "10px"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </div>
              <div key={3}>
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
                      autoFocus={this.state.counter !== 3 ? false : true}
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
              {this.state.counter !== 3 ? (
                this.state.counter
              ) : (
                <Button
                  color="primary"
                  style={{ margin: 0 }}
                  onClick={() => {
                    this.setState({ counter: 1, modal: false });
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
            <h2 className={classes.title}>NOS HISTOIRES</h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end">
          <GridItem xs={4} sm={4} md={2}>
            <CustomDropdown
              buttonText="Regular"
              dropdownList={["Action", "Another action", "Something else here"]}
            />
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify="center" spacing={"auto"}>
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
                onClick={() => this.setState({ modal: true })}
              >
                <Card style={{ width: "20rem" }}>
                  <h4 className={classes.cardTitle}>Card title</h4>
                  <img
                    style={{ height: "180px", width: "100%", display: "block" }}
                    className={classes.imgCardTop}
                    src={require("assets/img/landing-bg.jpg")}
                    alt="Card-img-cap"
                  />
                  <h5>135 vues - 3 jours</h5>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          value={3}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          readOnly
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          value={3}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          readOnly
                        />
                      </GridItem>
                    </GridContainer>
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
              >
                <Card style={{ width: "20rem" }}>
                  <h4 className={classes.cardTitle}>Card title</h4>
                  <img
                    style={{ height: "180px", width: "100%", display: "block" }}
                    className={classes.imgCardTop}
                    src={require("assets/img/landing-bg.jpg")}
                    alt="Card-img-cap"
                  />
                  <h5>135 vues - 3 jours</h5>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          value={3}
                          readOnly
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          value={4}
                          readOnly
                        />
                      </GridItem>
                    </GridContainer>
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
              >
                <Card style={{ width: "20rem" }}>
                  <h4 className={classes.cardTitle}>Card title</h4>
                  <img
                    style={{ height: "180px", width: "100%", display: "block" }}
                    className={classes.imgCardTop}
                    src={require("assets/img/landing-bg.jpg")}
                    alt="Card-img-cap"
                  />
                  <h5>135 vues - 3 jours</h5>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          value={3}
                          readOnly
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <p>Histoire par pseudo1</p>
                        <Rating
                          name="read-only"
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          value={4}
                          readOnly
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </ButtonBase>
            </GridItem>
          </GridContainer>
          <GridContainer justify="flex-end">
            <GridItem xs={4} sm={4} md={2}>
              <Button color="primary">Toutes les histoires</Button>
            </GridItem>
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
