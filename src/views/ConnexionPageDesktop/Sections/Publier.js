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
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class Publier extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      planche: [{text: '', img: ''}],
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
        autoplay: false
      },
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    if (this.state.counter == this.state.planche.length) {
      this.state.planche.push({text: '', img: ''});
      this.forceUpdate();
    }
    
    this.slider.slickNext();
    console.log(this.state.planche);
  }
  previous() {
    this.slider.slickPrev();
  }
  gotToIndex(index) {
    this.slider.slickGoTo(index - 1);
    this.setState({ counter: 1 });
  }

  //modal - carousel
  handleListItemClick(event, index, type) {
    
    this.setState({ selectedIndex: index, typeModal: type, modal: true });
    this.forceUpdate();
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
                marginRight: 20
              }}
            >
             {  this.state.planche.map((planch , index) => {
              return (
              
              <div key={index}>
                <GridContainer justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={10}>
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
                    xs={12}
                    sm={12}
                    md={12}
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
                <Button
                  color="primary"
                  style={{ margin: 0 }}
                  onClick={() => {
                    this.setState({ modal: false });
                    this.gotToIndex(1);
                  }}
                >
                  Valider
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
