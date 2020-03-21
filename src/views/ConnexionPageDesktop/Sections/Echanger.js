import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import List from "@material-ui/core/List";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PeopleIcon from "@material-ui/icons/People";
import Search from "@material-ui/icons/Search";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import CloseIcon from "@material-ui/icons/Close";
class Echanger extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      selectedIndex: 0,
      typeModal: -1,
      modal: false
    };
    this.SimpleBar = React.createRef();

    this.scrollBottom = this.scrollBottom.bind(this);
  }
  handleListItemClick(event, index, type) {
    this.setState({ selectedIndex: index, typeModal: type, modal: true });
  }
  scrollBottom() {
    this.SimpleBar.current.getScrollElement().scrollTop = 3000;
    console.log(this.SimpleBar.current.getScrollElement());
  }
  modalContent() {
    const { classes } = this.props;
    const { modal } = this.state;
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
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({ modal: false });
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
              histoire numero 23
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              width: "100%",
              height: "200px",
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
            spacing={0}
          >
            <GridContainer
              style={{ padding: 0, width: "100%" }}
              spacing={2}
              alignItems="center"
            >
              <GridItem
                xs={1}
                sm={1}
                md={1}
                style={{ alignItems: "center" }}
              ></GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ alignItems: "center", marginTop: "40px" }}
              >
                <Avatar
                  style={{ height: "80px", width: "80px" }}
                  alt="Remy Sharp"
                  src={require("assets/img/faces/christian.jpg")}
                />
              </GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Rating
                  name="read-only"
                  value={3}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p>18 histoires</p>
              </GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Rating
                  name="read-only"
                  value={3}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p>13 dessins</p>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "center", marginLeft: "30px" }}
              >
                <Button
                  color="white"
                  style={{ margin: 0 }}
                  onClick={() => {
                    this.setState({ typeModal: 3 });
                  }}
                >
                  Contacter
                </Button>
              </GridItem>
            </GridContainer>
          </DialogContent>
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
          onClose={() => this.setState({ modal: false })}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({ modal: false });
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
              histoire numero 23
            </h3>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              width: "100%",
              height: "200px",
              backgroundColor: "#e3f3fd",
              color: "#332861"
            }}
            spacing={0}
          >
            <GridContainer
              style={{ padding: 0, width: "100%" }}
              spacing={2}
              alignItems="center"
            >
              <GridItem
                xs={1}
                sm={1}
                md={1}
                style={{ alignItems: "center" }}
              ></GridItem>
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ alignItems: "center", marginTop: "40px" }}
              >
                <Avatar
                  style={{ height: "80px", width: "80px" }}
                  alt="Remy Sharp"
                  src={require("assets/img/faces/christian.jpg")}
                />
              </GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Rating
                  name="read-only"
                  value={3}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p>18 histoires</p>
              </GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Rating
                  name="read-only"
                  value={3}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p>13 dessins</p>
              </GridItem>
              <GridItem
                xs={3}
                sm={3}
                md={3}
                style={{ textAlign: "center" }}
              ></GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Button
                  color="white"
                  style={{ margin: 0 }}
                  onClick={() => {
                    this.setState({ modal: false });
                  }}
                >
                  Ajouter
                </Button>
              </GridItem>
              <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
                <Button
                  color="white"
                  style={{ margin: 0 }}
                  onClick={() => {
                    this.setState({ typeModal: 3 });
                  }}
                >
                  Contacter
                </Button>
              </GridItem>
            </GridContainer>
          </DialogContent>
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
          maxWidth={"md"}
          fullWidth={true}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ modal: false })}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
          scroll="paper"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              this.setState({ modal: false });
            }}
            style={{ backgroundColor: "#e3f3fd", color: "#332861" }}
          >
            {" "}
            <GridContainer>
              <GridItem
                xs={1}
                sm={1}
                md={1}
                style={{ alignItems: "center" }}
              ></GridItem>
              <GridItem xs={2} sm={2} md={2} style={{ alignItems: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={require("assets/img/faces/christian.jpg")}
                />
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <h3
                  style={{
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontWeight: "600",
                    paddingTop: "5px",
                    height: "40px"
                  }}
                >
                  histoire numero 23
                </h3>
              </GridItem>
            </GridContainer>
          </DialogTitle>
          <DialogContent
            dividers
            id="modal-slide-description"
            className={classes.modalBody}
            style={{
              padding: 0,
              width: "100%",
              height: "500px",
              color: "#332861"
            }}
            spacing={0}
          >
            {/* conversation //////////////////////////////////////// */}
            <SimpleBar
              ref={this.SimpleBar}
              style={{
                maxHeight: "367px",
                height: "367px",
                maxWidth: "960px",
                overflowX: "hidden"
              }}
              autoHide={true}
            >
              <GridContainer
                style={{
                  padding: 0,
                  width: "100%",
                  marginTop: "15px",
                  marginLeft: "0px"
                }}
                spacing={2}
                direction="column-reverse"
                justify="flex-end"
                alignItems="center"
              >
                {" "}
                {/* message 1 vert ( envoyee par l utilisateur)*/}
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            1You've got some friends nearby, stop looking at
                            your phone and find them...
                          </span>
                        }
                        style={{
                          backgroundColor: "#e3f3fd",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                  </GridContainer>
                </GridItem>
                {/* message 2 gris ( envoyee par le recepteur)*/}
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                    alignItems="flex-end"
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            You've got some friends nearby, stop looking at your
                            phone and find them...
                          </span>
                        }
                        style={{
                          background: "#ebebeb",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center", padding: "24px" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            You've got some friends nearby, stop looking at your
                            phone and find them...
                          </span>
                        }
                        style={{
                          backgroundColor: "#e3f3fd",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                  </GridContainer>
                </GridItem>
                {/* message 2 gris ( envoyee par le recepteur)*/}
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                    alignItems="flex-end"
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            You've got some friends nearby, stop looking at your
                            phone and find them...
                          </span>
                        }
                        style={{
                          background: "#ebebeb",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center", padding: "24px" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            You've got some friends nearby, stop looking at your
                            phone and find them...
                          </span>
                        }
                        style={{
                          backgroundColor: "#e3f3fd",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                  </GridContainer>
                </GridItem>
                {/* message 2 gris ( envoyee par le recepteur)*/}
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ alignItems: "center" }}
                >
                  <GridContainer
                    style={{
                      padding: 0,
                      width: "100%",
                      marginLeft: "0px"
                    }}
                    alignItems="flex-end"
                  >
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center" }}
                    ></GridItem>
                    <GridItem
                      xs={9}
                      sm={9}
                      md={9}
                      style={{ alignItems: "center" }}
                      className={classes.root}
                      spacing={2}
                    >
                      <SnackbarContent
                        message={
                          <span>
                            You've got some friends nearby, stop looking at your
                            phone and find them...
                          </span>
                        }
                        style={{
                          background: "#ebebeb",
                          color: "#332861"
                        }}
                      />
                    </GridItem>
                    <GridItem
                      xs={1}
                      sm={1}
                      md={1}
                      style={{ alignItems: "center", padding: "24px" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={require("assets/img/faces/christian.jpg")}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                {/* fin message 2 gris*/}
              </GridContainer>
            </SimpleBar>
          </DialogContent>
          {/* input*/}
          <MuiDialogActions style={{ width: "100%" }}>
            <GridContainer
              style={{ margin: "0px", padding: "0px", width: "100%" }}
              spacing={2}
            >
              <GridItem
                xs={2}
                sm={2}
                md={2}
                style={{ alignItems: "center" }}
              ></GridItem>
              <GridItem xs={9} sm={9} md={9}>
                <TextField
                  id="filled-helperText"
                  label="Message"
                  placeholder="Aa"
                  variant="filled"
                  style={{
                    paddingLeft: "0px",
                    paddingRigth: "0px",
                    width: "100%"
                  }}
                />
              </GridItem>
              <GridItem
                xs={1}
                sm={1}
                md={1}
                style={{ alignItems: "center", paddingTop: "12px" }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onClick={() => this.scrollBottom()}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </GridItem>
            </GridContainer>
          </MuiDialogActions>
        </Dialog>
      );
    }
  }
  //modal - carousel
  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className={classes.section}>
        {this.modalContent()}

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.title} style={Styles.title}>
              ECHANGER
            </h2>
          </GridItem>
          <GridItem xs={10} sm={10} md={10}>
            <h3 style={{fontWeight: 'bold', fontFamily: 'cursive', color:'#000000', textAlign: 'left'}}>Reste connecté !</h3>
            <h5 style={{fontFamily: 'cursive', color:'#000000', textAlign: 'left'}}>Entretiens ton réseau de Mini-artist.</h5><br></br><br></br>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              variant="fullWidth"
              headerColor="info"
              tabs={[
                {
                  tabName: "Mon réseau (23)",
                  tabIcon: Contacts,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Recherche"
                          id="material"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Search />
                              </InputAdornment>
                            )
                          }}
                        />
                        <GridItem xs={12} sm={12} md={12}>
                          <SimpleBar style={{ maxHeight: "412px" }}>
                            <List className={classes.root}>
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 1}
                                onClick={event =>
                                  this.handleListItemClick(event, 1, 1)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={require("assets/img/faces/christian.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Pseudo 1"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>18 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>13 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 2}
                                button
                                onClick={event =>
                                  this.handleListItemClick(event, 2, 1)
                                }
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Travis Howard"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Summer BBQ"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>59 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>45 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 3}
                                onClick={event =>
                                  this.handleListItemClick(event, 3, 1)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>29 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>15 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 4}
                                onClick={event =>
                                  this.handleListItemClick(event, 4, 1)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/camp.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>14 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>63 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>{" "}
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 5}
                                onClick={event =>
                                  this.handleListItemClick(event, 5, 1)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/card-profile1-square.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>25 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>39 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                            </List>
                          </SimpleBar>
                        </GridItem>
                      </GridItem>
                    </GridContainer>
                  )
                },
                {
                  tabName: "Les membres",
                  tabIcon: PeopleIcon,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Recherche"
                          id="material"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Search />
                              </InputAdornment>
                            )
                          }}
                        />
                        <GridItem xs={12} sm={12} md={12}>
                          <SimpleBar style={{ maxHeight: "412px" }}>
                            <List className={classes.root}>
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 6}
                                onClick={event =>
                                  this.handleListItemClick(event, 6, 2)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={require("assets/img/faces/christian.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Pseudo 1"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>18 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>13 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 7}
                                onClick={event =>
                                  this.handleListItemClick(event, 7, 2)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Travis Howard"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Summer BBQ"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>59 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>45 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 8}
                                onClick={event =>
                                  this.handleListItemClick(event, 8, 2)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>29 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>15 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 9}
                                onClick={event =>
                                  this.handleListItemClick(event, 9, 2)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/camp.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>14 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>63 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>{" "}
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 10}
                                onClick={event =>
                                  this.handleListItemClick(event, 10, 2)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/card-profile1-square.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      <GridContainer>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>25 histoires</p>
                                        </GridItem>
                                        <GridItem
                                          xs={6}
                                          sm={6}
                                          md={6}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={3}
                                            emptyIcon={
                                              <StarBorderIcon fontSize="inherit" />
                                            }
                                            readOnly
                                          />
                                          <p>39 dessins</p>
                                        </GridItem>
                                      </GridContainer>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                            </List>
                          </SimpleBar>
                        </GridItem>
                      </GridItem>
                    </GridContainer>
                  )
                },
                {
                  tabName: "Messagerie",
                  tabIcon: Chat,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Recherche"
                          id="material"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Search />
                              </InputAdornment>
                            )
                          }}
                        />
                        <GridItem xs={12} sm={12} md={12}>
                          <SimpleBar
                            style={{ maxHeight: "412px", width: "100%" }}
                          >
                            <List className={classes.root}>
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 11}
                                onClick={event =>
                                  this.handleListItemClick(event, 11, 3)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={require("assets/img/faces/christian.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Pseudo 1"
                                  secondary={
                                    <React.Fragment>
                                      <p className={classes.messageTab}>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley
                                      </p>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 12}
                                onClick={event =>
                                  this.handleListItemClick(event, 12, 3)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Travis Howard"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Summer BBQ"
                                  secondary={
                                    <React.Fragment>
                                      <p className={classes.messageTab}>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley
                                      </p>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 13}
                                onClick={event =>
                                  this.handleListItemClick(event, 13, 3)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/avatar.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      {" "}
                                      <p className={classes.messageTab}>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley Lorem
                                        Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley Lorem
                                        Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley Lorem
                                        Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley
                                      </p>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 14}
                                onClick={event =>
                                  this.handleListItemClick(event, 14, 3)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/camp.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      {" "}
                                      <p className={classes.messageTab}>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley
                                      </p>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>{" "}
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 15}
                                onClick={event =>
                                  this.handleListItemClick(event, 15, 3)
                                }
                                button
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Cindy Baker"
                                    src={require("assets/img/faces/card-profile1-square.jpg")}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary="Oui Oui"
                                  secondary={
                                    <React.Fragment>
                                      {" "}
                                      <p className={classes.messageTab}>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an
                                        unknown printer took a galley
                                      </p>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                            </List>
                          </SimpleBar>
                        </GridItem>
                      </GridItem>
                    </GridContainer>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end">
          <GridItem xs={4} sm={4} md={2}></GridItem>
        </GridContainer>
      </div>
    );
  }
}
styles.textCenter = {
  textAlign: "center"
};
const Styles = {
  title: {}
};
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Echanger.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Echanger);
