/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

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


class HeaderUser extends React.Component {
  constructor(props){
    super(props);
    this.state={
      modal:false,
      user: JSON.parse(localStorage.getItem('user')),
      anchorEl2:null,
      anchorEl:null,
      vue:0,
      vueNotif:0,
      nbrReq:0,
      requestFriend:[],
      notifications:[],
      numberMessage:0,
    }
    this.NumberVue();
    this.getNumberVue();
    this.getNumberRequest();
    this.handleClick=this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);

  
  }
  componentDidMount(){
    console.log("re9")
    console.log(this.state.user)
    firebase.database().ref('messages/' + this.state.user.id).on('value', (snapshot) => {
console.log(snapshot);
      if (snapshot && snapshot.val()) {
        console.log(snapshot.val())
        console.log(snapshot.val().to == this.state.user.id)
        if (snapshot.val().to == this.state.user.id) {
          this.getNumberVue()
        }
      }
    });
    firebase.database().ref('notifications/' + this.state.user.id)
      .on('value', (snapshot) => {
        console.log(snapshot);
        if (snapshot && snapshot.val()) {

          if (snapshot.val().to == this.state.user.id) {
            alert('ra9')
            this.getNumberRequest()
          }
        }

      });
    firebase.database().ref('notifications/' + this.state.user.id)
      .on('value', (snapshot) => {
        console.log(snapshot);
        if (snapshot && snapshot.val()) {
          if (snapshot.val().to == this.state.user.id) {
            this.NumberVue()
          }
        }
      });
    subscriber.subscribe(v => {
      const userss = JSON.parse(localStorage.getItem('user'));
      if (v == 'change') {
        if (userss) {
          this.setState({ user: userss });
        }
      }
      if (v.messageUser) {
        this.getNumberVue()
      }
    });
  }
  componentWillUnmount(){
    firebase.database().ref('messages/' + this.state.user.id).off('value');
    firebase.database().ref('notifications/' + this.state.user.id)
      .off('value');
    firebase.database().ref('notifications/' + this.state.user.id)
      .off('value');

  }
  handleClick(event){
    this.getRequestFriend();
    this.setState({anchorEl:event.currentTarget});
  };
  handleClick2(event){
    this.notification();
    this.setState({anchorEl2:event.currentTarget});
    
  };
  accepteRequest(id,id2) {
    Axios.put(config.API_URL + "users/relation/"+this.state.user.id, {
      id: id,
      isActive: true
    }).then(res => {
      firebase.database().ref('notifications/' + id2).set({
        from: this.state.user.id,
        to: id2,
        numbe: 100000 + Math.random() * (100000 - 1)
      });
      this.getRequestFriend()
    })
    .catch(
      function(error) {
        console.log(error);
      }
    );
  }
  refuseRequest(id){
    Axios.delete(config.API_URL + "relations/"+id).then(res => {
      this.getRequestFriend()
    })
    .catch(
      function(error) {
        console.log(error);
      }
    );
  }
  getRequestFriend() {
    Axios.get(
      config.API_URL +
        "relations/request/" + this.state.user.id,
      {}
    ).then(res => {
      this.setState({requestFriend:res.data})
    });
  }
  getNumberVue(){
    Axios.get(
      config.API_URL +
        "messages/numberVueTotal/" + this.state.user.id,
      {}
    ).then(res => {
      console.log(res.data)

      this.setState({vue:res.data},()=>this.forceUpdate())
    });
  }
  notification () {
    Axios.get(
      config.API_URL +
        "notification/for/" + this.state.user.id,
      {}
    ).then(res => {
      this.setState({notifications:res.data});
    });
  }
  NumberVue (){
    Axios.get(
      config.API_URL +
        "notification/nbrNotification/" + this.state.user.id,
      {}
    ).then(res => {
      this.setState({VueNotif:res.data})
    });
  }
  
  getNumberRequest (){
    Axios.get(
      config.API_URL +
        "relations/getNumberRequest/" + this.state.user.id,
      {}
    ).then(res => {
      this.setState({nbrReq:res.data});
    });
  }
   handleClose(){
    this.setState({anchorEl:null})
  };
  handleClose2() {
  this.setState({ anchorEl2: null })
  };
  
  render(){
    const { classes } = this.props;
    const ITEM_HEIGHT = 48;
    const open = Boolean(this.state.anchorEl);
    const open2 = Boolean(this.state.anchorEl2);
  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={this.state.modal}
        keepMounted
        onClose={() => this.setState({modal:false })}
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
            color: "#332861"
          }}
        >
          <div
            style={{
              textAlign: "-webkit-center"
            }}
          >
            <img
              src={"http://localhost:5600/images/asset/logo.png"}
              alt="Logo"
              style={{
                display: "block",
                width: "200px"
              }}
            />
            <h4
              style={{
                fontWeight: "bold",
                fontFamily: "cursive",
                marginLeft: 20
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
            fontFamily: "cursive"
          }}
          spacing={0}
        >
          <h4 style={{ marginLeft: "5%", fontFamily: "cursive" }}>
            En devenant mini-artiste, je m’engage à respecter les consignes
            suivantes :
          </h4>
          <br></br>
          <h4 style={{ marginLeft: "7%", fontFamily: "cursive" }}>
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
              color: "#332861"
            }}
          >
            <Button
              color="white"
              style={{
                color: "rgb(89, 79, 118)",
                fontWeight: "bold",
                margin: 0,
                backgroundColor: "#e3f3fd"
              }}
              onClick={() => {
                this.setState({modal:false});
              }}
            >
              J’ai compris !
            </Button>
          </h3>
        </MuiDialogActions>
      </Dialog>
      <List className={classes.list}>

        <ListItem className={classes.listItem}>
          <Link to="/" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0 }}
            >
              <MenuBookOutlinedIcon style={{ width: 22, height: 22 }} /> Histoires
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/Utilisateurs" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0 }}
            >
              <PeopleOutlineOutlinedIcon style={{ width: 22, height: 22 }} /> utilisateurs
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/Messages" className={classes.dropdownLink}>
            <Button
              color="transparent"
              className={classes.navLink}
              style={{ padding: 0 }}
            >
              <Badge badgeContent={this.state.vue} max={99} color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
                <MailIcon style={{ width: 22, height: 22 }} />
              </Badge> Messages
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div>

            <Link onClick={this.handleClick} className={classes.dropdownLink}>
              <Button
                color="transparent"
                className={classes.navLink}
                style={{ padding: 0 }}
              >

                <Badge badgeContent={this.state.nbrReq} max={99} color="secondary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                  <LanguageIcon style={{ width: 22, height: 22 }} />
                </Badge> Réseau
            </Button>
            </Link>

            <Menu
              elevation={0}
              getContentAnchorEl={null}
              id="long-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={open}
              onClose={()=>this.handleClose()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: '36ch',
                },
              }}
            >
              <SimpleBar
                style={{
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '36ch',
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                {this.state.requestFriend.length == 0 ? (
                  <MenuItem ><span style={{ textAlign: 'center', width: '100%', color: '#1e1548' }}>aucune nouvelle invitation</span></MenuItem>
                ) :
                  this.state.requestFriend.map((friend) => (
                    <MenuItem >
                      <div style={{ display: 'contents' }}>
                        {friend.userOne.lienPhoto == "" ? (
                          <Avatar
                            style={{
                              borderStyle: 'solid', borderWidth: 1.2,
                              borderColor: '#1e1548'
                            }}
                            alt=""
                            src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                          />
                        ) : (
                            <Avatar
                              style={{
                                borderStyle: 'solid', borderWidth: 1.2,
                                borderColor: '#1e1548'
                              }}
                              alt=""
                              src={friend.userOne.lienPhoto}
                            />
                          )}
                        <span style={{ marginLeft: 6, color: '#1e1548' }}>{friend.userOne.pseudo}</span>
                      </div>
                      <Tooltip
                        title="Accepter"
                      >
                        <ButtonBase onClick={() => { this.accepteRequest(friend.id, friend.userOne.id) }} style={{ marginLeft: 'auto' }}>
                          <CheckCircleOutlineRoundedIcon style={{ color: '#1e1548' }} />
                        </ButtonBase>
                      </Tooltip>
                      <Tooltip
                        title="Refuser"

                      >
                        <ButtonBase onClick={() => { this.refuseRequest(friend.id) }} style={{ marginLeft: 5 }}>
                          <HighlightOffRoundedIcon style={{ color: '#1e1548' }} />
                        </ButtonBase>
                      </Tooltip>


                    </MenuItem>
                  ))}
              </SimpleBar>
              <MenuItem selected={true}>
                <Link to="/MonReseau">
                  <h6
                    style={{
                      fontFamily: "cursive",
                      fontWeight: "bold",
                      color: "#1e1548",
                      margin: 0,
                      textAlign: 'center',
                      fontVariant: 'unicase',
                      width: 287,
                      textDecoration: 'underline'
                    }}
                  >
                    Mon Réseau
                </h6>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <div>

            <Link onClick={this.handleClick2} className={classes.dropdownLink}>
              <Button
                color="transparent"
                className={classes.navLink}
                style={{ padding: 0 }}
              >

                <Badge badgeContent={this.state.vueNotif} max={99} color="secondary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                  <NotificationsNoneIcon style={{ width: 22, height: 22 }} />
                </Badge> Notifications
            </Button>
            </Link>

            <Menu
              elevation={0}
              getContentAnchorEl={null}
              id="long-menu"
              anchorEl={this.state.anchorEl2}
              keepMounted
              open={open2}
              onClose={()=>this.handleClose2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: '36ch',
                },
              }}
            >
              <SimpleBar
                style={{
                  maxHeight: 252,
                  width: '36ch',
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                {this.state.notifications.length == 0 ? (
                  <MenuItem ><span style={{ textAlign: 'center', width: '100%', color: '#1e1548' }}>aucune notification</span></MenuItem>
                ) :
                  this.state.notifications.map((notification) => (
                    <Link to={notification.lien}>
                      <MenuItem >
                        <div style={{ display: 'flex' }}>
                          {notification.lienDessin == "" ? (
                            <Avatar
                              style={{
                                borderStyle: 'solid', borderWidth: 1.2,
                                borderColor: '#1e1548'
                              }}
                              alt=""
                              src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                            />
                          ) : (
                              <Avatar
                                style={{
                                  borderStyle: 'solid', borderWidth: 1.2,
                                  borderColor: '#1e1548'
                                }}
                                alt=""
                                src={notification.lienDessin}
                              />
                            )}
                          <div style={{ marginLeft: 6, maxWidth: 280 }}>
                            <span style={{ color: '#1e1548' }}>{notification.pseudo}</span>
                            <ListItemText primary={
                              <React.Fragment>
                                <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'black', width: 244 }}>
                                  {notification.text}
                                </p>
                              </React.Fragment>
                            } secondary={moment(notification.dateDeCreation).fromNow()} />
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
                  ))}
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
                  <div style={{ display: 'contents' }}>
                    {this.state.user.lienPhoto == "" ? (
                      <Avatar
                        style={{
                          borderStyle: 'solid', borderWidth: 1.2,
                          borderColor: '#1e1548'
                        }}
                        alt=""
                        src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                      />
                    ) : (
                        <Avatar
                          style={{
                            borderStyle: 'solid', borderWidth: 1.2,
                            borderColor: '#1e1548'
                          }}
                          alt=""
                          src={this.state.user.lienPhoto}
                        />
                      )}
                    <span style={{ marginLeft: 6, color: '#1e1548' }}>{this.state.user.pseudo}</span>
                  </div>
                }
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                dropdownList={[
                  <Link to="/LesHistoires" className={classes.dropdownLink}>
                    NOS HISTOIRES
                  </Link>,
                  <Link to="/MonProfil" className={classes.dropdownLink}>
                    MON PROFIL
                  </Link>,
                  <Link to="/MesOeuvres" className={classes.dropdownLink}>
                    MES OEUVRES
                  </Link>,
                  <ButtonBase
                    className={classes.dropdownLink}
                    style={{
                      fontSize: "13px",
                      fontFamily: "Roboto",
                      fontWeight: 400
                    }}
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    NOTRE CHARTE
                  </ButtonBase>,
                  <Link onClick={() => { localStorage.clear() }} className={classes.dropdownLink} divider>
                    DÉCONNEXION
                  </Link>
                ]}
              />
            </Tooltip>
          </Link>
        </ListItem>
      </List>
    </div>
  );
  }
}
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
export default withStyles(styles)(HeaderUser);