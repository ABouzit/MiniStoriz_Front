import React from "react";
import PropTypes from "prop-types";
import "simplebar/dist/simplebar.min.css";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";

//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// @material-ui/icons
import StarBorderIcon from "@material-ui/icons/StarBorder";
import PeopleIcon from "@material-ui/icons/People";
import Search from "@material-ui/icons/Search";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
class Echanger extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      selectedIndex: 0
    };
  }
  handleListItemClick(event, index) {
    this.setState({ selectedIndex: index });
  }
  //modal - carousel
  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.title} style={Styles.title}>
              ECHANGER
            </h2>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              variant="fullWidth"
              headerColor="primary"
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
                                  this.handleListItemClick(event, 1)
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
                                  this.handleListItemClick(event, 2)
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
                                  this.handleListItemClick(event, 3)
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
                                  this.handleListItemClick(event, 4)
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
                                  this.handleListItemClick(event, 5)
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
                                  this.handleListItemClick(event, 6)
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
                                  this.handleListItemClick(event, 7)
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
                                  this.handleListItemClick(event, 8)
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
                                  this.handleListItemClick(event, 9)
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
                                  this.handleListItemClick(event, 10)
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
                          <SimpleBar style={{ maxHeight: "412px" }}>
                            <List className={classes.root}>
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 11}
                                onClick={event =>
                                  this.handleListItemClick(event, 11)
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
                                  this.handleListItemClick(event, 12)
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
                              <Divider variant="inset" component="li" />
                              <ListItem
                                alignItems="flex-start"
                                className={classes.card}
                                selected={selectedIndex === 13}
                                onClick={event =>
                                  this.handleListItemClick(event, 13)
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
                                  this.handleListItemClick(event, 14)
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
                                  this.handleListItemClick(event, 15)
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
Echanger.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Echanger);
