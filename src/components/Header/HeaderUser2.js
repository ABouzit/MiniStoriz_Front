/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import config from "config/config";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Buttonss from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';
import moment from "moment";
import "moment/locale/fr";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
// import { Link } from "react-scroll";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { subscriber, messageService } from "./../../services/messageService";
import GridContainer from "components/Grid/GridContainer";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import GridItem from "components/Grid/GridItem";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/MailOutline';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MenuBookOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
const useStyles = makeStyles(styles);
const ITEM_HEIGHT = 48;
export default function HeaderUser(props) {
  let forceUpdate = useForceUpdate();
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);
  const headerClasse = makeStyles(headerStyle);
  const [modal, setModal] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vue, setVue] = React.useState(0);
  const [vueNotif, setVueNotif] = React.useState(0);
  const [nbrReq, setNbrReq] = React.useState(0);
  const [requestFriend, setRequestFriend] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [snapMessage, setSnapMessage] = React.useState({});
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    getRequestFriend();
    setAnchorEl(event.currentTarget);
    
  };
  const handleClick2 = (event) => {
    notification();
    setAnchorEl2(event.currentTarget);
    
  };
  const accepteRequest = (id,id2) => {
    Axios.put(config.API_URL + "users/relation/"+user.id, {
      id: id,
      isActive: true
    }).then(res => {
      firebase.database().ref('notifications/' + id2).set({
        from: user.id,
        to: id2,
        numbe: 100000 + Math.random() * (100000 - 1)
      });
      getRequestFriend()
    })
    .catch(
      function(error) {
        console.log(error);
      }
    );
  }
  const refuseRequest = (id) => {
    Axios.delete(config.API_URL + "relations/"+id).then(res => {
      getRequestFriend()
    })
    .catch(
      function(error) {
        console.log(error);
      }
    );
  }
  const getRequestFriend = () =>{
    Axios.get(
      config.API_URL +
        "relations/request/" + user.id,
      {}
    ).then(res => {
      setRequestFriend(res.data)
    });
  }
  const getNumberVue = () =>{
    Axios.get(
      config.API_URL +
        "messages/numberVueTotal/" + user.id,
      {}
    ).then(res => {
      console.log(res.data)

      setVue(res.data)
    });
  }
  const notification = () =>{
    Axios.get(
      config.API_URL +
        "notification/for/" + user.id,
      {}
    ).then(res => {
      setNotifications(res.data)
    });
  }
  const NumberVue = () =>{
    Axios.get(
      config.API_URL +
        "notification/nbrNotification/" + user.id,
      {}
    ).then(res => {
      setVueNotif(res.data)
    });
  }
  NumberVue();
  const getNumberRequest = () =>{
    Axios.get(
      config.API_URL +
        "relations/getNumberRequest/" + user.id,
      {}
    ).then(res => {
      setNbrReq(res.data)
    });
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  React.useEffect(() => {
    var userBloque = firebase.database().ref('signalUsers/' + user.id);
    const messageFunction = (snapshot) => {
        if (snapshot && snapshot.val()) {
          if (snapshot.val().stat === "BLOQUE")
            localStorage.clear();
          forceUpdate();
        }
    }
    userBloque.on("value", messageFunction);
    return () => userBloque.off('value');
  }, [firebase]);
  React.useEffect(() => {
    var userBloque = firebase.database().ref('activeUsers/' + user.id);
    const messageFunction = (snapshot) => {
      if (snapshot && snapshot.val()) {
        if (snapshot.val().stat === "DESACTIVE" || snapshot.val().stat === "DEMANDEACTIVE")
          localStorage.clear();
        forceUpdate();
      }
    }
    userBloque.on("value", messageFunction);
    return () => userBloque.off('value');
  }, [firebase]);
  React.useEffect(() => {
    var messageRef = firebase.database().ref('messages/' + user.id);
    const messageFunction=(snapshot)=>{
     
        if (snapshot && snapshot.val()) {
          console.log(snapshot.val())
          console.log(snapshot.val().to == user.id)
          if (snapshot.val().to == user.id) {
            getNumberVue()
          }
        }
    }
    messageRef.on("value",messageFunction);
    return () => messageRef.off('value');
  }, [firebase]);
  React.useEffect(() => {
const functionRel=(snapshot)=>{
    if (snapshot && snapshot.val()) {

      if (snapshot.val().to == user.id) {
        getNumberRequest()
      }
    }
  
}
    var relationRef = firebase.database().ref('relations/' + user.id);
    relationRef.on('value', functionRel );
    return () =>
      relationRef.off('value')
  }, [firebase]);
  React.useEffect(() => {
    var notificationRef = firebase.database().ref('notifications/' + user.id);
    const notificationFunction = (snapshot) => {
      if (snapshot && snapshot.val()) {
        if (snapshot.val().to == user.id) {
          NumberVue()
        }
      }
    }
    notificationRef.on('value', notificationFunction); 
    return () =>
      notificationRef.off('value')
  }, [firebase]);
  React.useEffect(() => {
    subscriber.subscribe(v => {
      console.log(v);
      const userss = JSON.parse(localStorage.getItem('user'));
      if(v == 'change'){
        if (userss) {
          setUser(userss);
        }
      }
      if (v.messageUser) {
        console.log('ta9');
        getNumberVue()
      }
    });
  },[]);
  getNumberVue();
  getNumberRequest();
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
         <div></div>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  return (
    <div>
      {console.log(JSON.parse(localStorage.getItem("user")))}
      {JSON.parse(localStorage.getItem("user")) ? (
        <div></div>
      ) : (
        <Redirect to="/Connexion" />
      )}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
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
            setModal(false);
          }}
          style={{
            paddingBottom: "0px",
            backgroundColor: "#fff",
            color: "#332861",
          }}
        >
          <div
            style={{
              textAlign: "-webkit-center",
            }}
          >
            <img
              src={"http://localhost:5600/images/asset/logo.png"}
              alt="Logo"
              style={{
                display: "block",
                width: "200px",
              }}
            />
            <h4
              style={{
                fontWeight: "bold",
                fontFamily: "goudy",
                marginLeft: 20,
              }}
            >
              NOTRE CHARTE
            </h4>
          </div>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
          style={{
            padding: 0,
            width: "100%",
            backgroundColor: "#fff",
            color: "#332861",
            marginTop: "2%",
            fontFamily: "goudy",
          }}
          spacing={0}
        >
          <h4 style={{ marginLeft: "5%", fontFamily: "goudy" }}>
            En devenant mini-artiste, je m’engage à respecter les consignes
            suivantes :
          </h4>
          <br></br>
          <h4 style={{ marginLeft: "7%", fontFamily: "goudy" }}>
            Je ne communique pas de fausses informations
            <br></br>
            <br></br>
            Je respecte tous les membres de la communauté Ministoriz
            <br></br>
            <br></br>
            Je ne publie pas de textes vulgaires, racistes, discriminatoires,
            xénophobes ou homophobes
            <br></br>
            <br></br>
            Je ne publie pas de dessins pouvant être interprétés comme étant
            vulgaires, racistes, discriminatoires,<br></br> xénophobes ou
            homophobes
            <br></br>
            <br></br>
            Je ne publie pas de dessins à caractère pornographiques
          </h4>
          <br></br>
          <br></br>
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
              backgroundColor: "#fff",
              color: "#332861",
            }}
          >
            <Button
              color="white"
              style={{
                color: "rgb(89, 79, 118)",
                fontWeight: "bold",
                fontFamily: 'goudy',
                margin: 0,
                backgroundColor: "#e3f3fd",
              }}
              onClick={() => {
                setModal(false);
              }}
            >
              J’ai compris !
            </Button>
          </h3>
        </MuiDialogActions>
      </Dialog>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Link to="/LesHistoires" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end' }}
            >
              <MenuBookOutlinedIcon style={{ width: 22, height: 22,  }} />{" "}
              Histoires
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/Utilisateurs" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end'  }}
            >
              <PeopleOutlineOutlinedIcon style={{ width: 22, height: 22 }} />{" "}
              utilisateurs
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/Messages" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end'  }}
            >
              <Badge
                badgeContent={vue}
                max={99}
                color="secondary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MailIcon style={{ width: 22, height: 22 }} />
              </Badge>{" "}
              Messages
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div>
            <Link onClick={handleClick} className={classes.dropdownLink}>
              <Button
                color="transparent"
                className={classes.navLink}
                style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end'  }}
              >
                <Badge
                  badgeContent={nbrReq}
                  max={99}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <LanguageIcon style={{ width: 22, height: 22 }} />
                </Badge>{" "}
                Réseau
              </Button>
            </Link>

            <Menu
              elevation={0}
              getContentAnchorEl={null}
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: "36ch",
                },
              }}
            >
              <SimpleBar
                style={{
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "36ch",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {requestFriend.length == 0 ? (
                  <MenuItem>
                    <span
                      style={{
                        textAlign: "center",
                        fontFamily: 'goudy',
                        width: "100%",
                        color: "#1e1548",
                      }}
                    >
                      aucune nouvelle invitation
                    </span>
                  </MenuItem>
                ) : (
                  requestFriend.map((friend) => (
                    <MenuItem>
                      <div style={{ display: "contents" }}>
                        {friend.userOne.lienPhoto == "" ? (
                          <Avatar
                            style={{
                              borderStyle: "solid",
                              borderWidth: 1.2,
                              borderColor: "#1e1548",
                            }}
                            alt=""
                            src={
                              config.API_URL +
                              "images/asset/defaultPhotoProfil.jpg"
                            }
                          />
                        ) : (
                          <Avatar
                            style={{
                              borderStyle: "solid",
                              borderWidth: 1.2,
                              borderColor: "#1e1548",
                            }}
                            alt=""
                            src={friend.userOne.lienPhoto}
                          />
                        )}
                        <span style={{ marginLeft: 6, color: "#1e1548" }}>
                          {friend.userOne.pseudo}
                        </span>
                      </div>
                      <Tooltip title="Accepter">
                        <ButtonBase
                          onClick={() => {
                            accepteRequest(friend.id, friend.userOne.id);
                          }}
                          style={{ marginLeft: "auto" }}
                        >
                          <CheckCircleOutlineRoundedIcon
                            style={{ color: "#1e1548" }}
                          />
                        </ButtonBase>
                      </Tooltip>
                      <Tooltip title="Refuser">
                        <ButtonBase
                          onClick={() => {
                            refuseRequest(friend.id);
                          }}
                          style={{ marginLeft: 5 }}
                        >
                          <HighlightOffRoundedIcon
                            style={{ color: "#1e1548" }}
                          />
                        </ButtonBase>
                      </Tooltip>
                    </MenuItem>
                  ))
                )}
              </SimpleBar>
              <MenuItem selected={true}>
                <Link to="/MonReseau">
                  <h6
                    style={{
                      fontFamily: "goudy",
                      fontWeight: "bold",
                      color: "#1e1548",
                      margin: 0,
                      textAlign: "center",
                      fontVariant: "unicase",
                      width: 287,
                      textDecoration: "underline",
                    }}
                  >
                    Mon réseau
                  </h6>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div>
            <Link onClick={handleClick2} className={classes.dropdownLink}>
              <Button
                color="transparent"
                className={classes.navLink}
                style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end'  }}
              >
                <Badge
                  badgeContent={vueNotif}
                  max={99}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <NotificationsNoneIcon style={{ width: 22, height: 22 }} />
                </Badge>{" "}
                Notifications
              </Button>
            </Link>

            <Menu
              elevation={0}
              getContentAnchorEl={null}
              id="long-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={open2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: "36ch",
                },
              }}
            >
              <SimpleBar
                style={{
                  maxHeight: 252,
                  width: "36ch",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {notifications.length == 0 ? (
                  <MenuItem>
                    <span
                      style={{
                        textAlign: "center",
                        fontFamily: 'goudy',
                        width: "100%",
                        color: "#1e1548",
                      }}
                    >
                      aucune notification
                    </span>
                  </MenuItem>
                ) : (
                  notifications.map((notification) => (
                    <Link to={notification.lien}>
                      <MenuItem>
                        <div style={{ display: "flex" }}>
                          {notification.lienDessin == "" ? (
                            <Avatar
                              style={{
                                borderStyle: "solid",
                                borderWidth: 1.2,
                                borderColor: "#1e1548",
                              }}
                              alt=""
                              src={
                                config.API_URL +
                                "images/asset/defaultPhotoProfil.jpg"
                              }
                            />
                          ) : (
                            <Avatar
                              style={{
                                borderStyle: "solid",
                                borderWidth: 1.2,
                                borderColor: "#1e1548",
                              }}
                              alt=""
                              src={notification.lienDessin}
                            />
                          )}
                          <div style={{ marginLeft: 6, maxWidth: 280 }}>
                            <span style={{ color: "#1e1548" }}>
                              {notification.pseudo}
                            </span>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  <p
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      color: "black",
                                      width: 244,
                                    }}
                                  >
                                    {notification.text}
                                  </p>
                                </React.Fragment>
                              }
                              secondary={moment(
                                notification.dateDeCreation
                              ).fromNow()}
                            />
                          </div>
                        </div>
                        {/* <Tooltip
                    title="Accepter"
                  >
                    <ButtonBase onClick={()=>{}}style={{marginLeft: 'auto'}}>
                        <CheckCircleOutlineRoundedIcon style={{color: '#1e1548'}}/>
                  </ButtonBase>
                  </Tooltip> */}
                      </MenuItem>
                    </Link>
                  ))
                )}
              </SimpleBar>
            </Menu>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.dropdownLink} style={{ padding: 0 }}>
            <Tooltip
              id="instagram-tooltip"
              title="Mon Compte"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
              style={{ marginLeft: 30, padding: 0 }}
            >
              <CustomDropdown
                noLiPadding
                buttonText={
                  <div style={{ display: "contents" }}>
                    {user.lienPhoto == "" ? (
                      <Avatar
                        style={{
                          borderStyle: "solid",
                          borderWidth: 1.2,
                          borderColor: "#1e1548",
                        }}
                        alt=""
                        src={
                          config.API_URL + "images/asset/defaultPhotoProfil.jpg"
                        }
                      />
                    ) : (
                      <Avatar
                        style={{
                          borderStyle: "solid",
                          borderWidth: 1.2,
                          borderColor: "#1e1548",
                        }}
                        alt=""
                        src={user.lienPhoto}
                      />
                    )}
                    <span style={{ marginLeft: 6, color: "#1e1548", fontFamily: 'lato', fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {user.pseudo}
                    </span>
                  </div>
                }
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                dropdownList={[
                  <Link to="/MonProfil" className={classes.dropdownLink} style={{fontFamily: "goudy",
                  fontWeight: 'bold'}}>
                    MON PROFIL
                  </Link>,
                  <Link to="/MesOeuvres" className={classes.dropdownLink} style={{fontFamily: "goudy",
                  fontWeight: 'bold'}}>
                    MES OEUVRES
                  </Link>,
                  <Link to="/MonReseau" className={classes.dropdownLink} style={{fontFamily: "goudy",
                  fontWeight: 'bold'}}>
                    MON RESEAU
                  </Link>,
                  <Link to="/Contact" className={classes.dropdownLink} style={{fontFamily: "goudy",
                  fontWeight: 'bold'}}>
                    CONTACTEZ-NOUS
                  </Link>,
                  <ButtonBase
                    className={classes.dropdownLink}
                    style={{
                      fontSize: "13px",
                      fontFamily: "goudy",
                      fontWeight: 'bold',
                    }}
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    NOTRE CHARTE
                  </ButtonBase>,
                  <Link
                    onClick={() => {
                      firebase.auth().signOut()
                      localStorage.clear();
                    }}
                    style={{fontFamily: "goudy",
                    fontWeight: 'bold'}}
                    className={classes.dropdownLink}
                    divider
                  >
                    DÉCONNEXION
                  </Link>,
                ]}
              />
            </Tooltip>
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
