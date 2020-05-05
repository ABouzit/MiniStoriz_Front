import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
// core components
import Tooltip from '@material-ui/core/Tooltip';
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
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
// import Pagination from "components/Pagination/Pagination.js";
import Pagination from '@material-ui/lab/Pagination';
import { Link, withRouter } from "react-router-dom";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TitleIcon from '@material-ui/icons/Title';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import BrushIcon from '@material-ui/icons/Brush';
import CommentIcon from '@material-ui/icons/Comment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CircularProgressbar,CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Parallax from "components/Parallax/Parallax.js";
import "moment/locale/fr";
import Moment from "moment";
import { subscriber, messageService } from "./../../../services/messageService";
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ChatIcon from '@material-ui/icons/Chat';
import Badge from '@material-ui/core/Badge';
import * as firebase from "firebase/app";
import "firebase/database";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    // this.app = firebase.initializeApp(config.firebaseConfig);
    
    // this.database = this.app.database();
    this.state = {
      idUserChat: '',
      redirect: 0,
      idUser: "",
      userChat: '',
      message: '',
      messages: [],
      usersMessages: [],
      isOpen: false,
      imgUrl: '',
      user: "",
      page: 1,
      numberPage: 0,
      search: "",
      currentFiltre: 1,
      selectedFiltre: "",
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0,
      histoires: [],
      showMore: false,
      image: ""
    };
    this.SimpleBar = React.createRef();

    this.scrollBottom = this.scrollBottom.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    
  }
  componentDidMount() {
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.setState({  redirect: 1 }, ()=> {this.forceUpdate()});
    }else{
      if (typeof this.props.match.params.userId === 'undefined') {
        this.setState({  idUser: user.id, user:user }, ()=> {this.fetchUsersMessages();this.forceUpdate()});
      } else {
        this.setState({  idUser: user.id, user:user,idUserChat: this.props.match.params.userId }, ()=> {this.fetchUser(this.props.match.params.userId);});
      }
    }
    var messageRef = firebase.database().ref('messages/' + this.state.idUser);
    const _this = this;
    messageRef.on('value', function(snapshot) {
      snapshot.forEach (function (data) {
        if (data.val().to == _this.state.idUser) {
          if (data.val().from == _this.state.idUserChat) {
            _this.fetchMessages();
          } else {
            _this.fetchUsersMessages();
          }
          
        }
        console.log()
      });
      
    });
    subscriber.subscribe(v => {
      
    });
  }
  handleChangePage() {
    // this.setState({ page: this.state.page + 1 });
    if (this.state.numberPage == this.state.page) {
      this.setState({ showMore: false });
    }

    Axios.get(config.API_URL + "messages/between/" + this.state.idUser+"/"+this.state.idUserChat+"/10/"+
    (this.state.page - 1) * 10 ,{}
      ).then(res => {
        this.setState({
          messages: this.state.messages.concat(res.data)
        });

        this.forceUpdate();
      });
    
  }
  fetchUser(id) {
    Axios.get(config.API_URL + "users/" + id, {}).then(res => {
      this.setState(
        {
          userChat: res.data[0]
        },
        () => {
          this.fetchMessages();
          this.forceUpdate();
        }
      );
    });
  }
  fetchMessages() {
    Axios.get(config.API_URL + "messages/between/" + this.state.idUser+"/"+this.state.idUserChat+"/10/"+
    (this.state.page - 1) * 10, {}).then(res => {
      this.setState({messages: res.data}, ()=>{this.scrollBottom();this.fetchUsersMessages();this.forceUpdate();})
    });
    Axios.get(config.API_URL + "messages/nbrMessage/" + this.state.idUser+"/"+this.state.idUserChat, {}).then(res => {
      this.setState({ numberPage: Math.ceil(res.data / 10) }, () => {
        if (res.data > 10) {
          this.setState({ showMore: true });
        }
      });
    });
  }
  fetchUsersMessages() {
    const _this = this;
    var _ = require('lodash');
    if (_this.state.search !== "") {
      console.log(_.filter(_this.state.usersMessages, function(o) { return o.userOne_pseudo.toLowerCase().includes(_this.state.search) }))
      let usersMessage = _.filter(_this.state.usersMessages, function(o) { return o.userOne_pseudo.toLowerCase().includes(_this.state.search);})
      _this.setState(
        {usersMessages: usersMessage
      }, ()=>{
          _this.forceUpdate()
        })
      console.log()
    } else {
    
    Axios.get(config.API_URL + "messages/users/" + _this.state.idUser, {}).then(function(res) {
      
      _this.setState({usersMessages: res.data}, ()=>{
        if (_this.state.idUserChat == '') {
          if (_this.state.idUser == res.data[0].message_userOneId) {
            _this.setState({idUserChat: res.data[0].message_userTwoId}, ()=>{_this.fetchUsersMessages();_this.fetchUser(_this.state.idUserChat);})
          } else {
            _this.setState({idUserChat: res.data[0].message_userOneId}, ()=>{_this.fetchUsersMessages();_this.fetchUser(_this.state.idUserChat);})
          }
        } 
        })
    });
    }
  }
  sendMessage() {
    this.setState({page: 1}, ()=>{
    Axios.post(config.API_URL + "messages", {
      userOne: {id: this.state.idUser},
      userTwo: {id: this.state.idUserChat},
      message: this.state.message
    }).then(res => {
      
      this.fetchMessages()
      firebase.database().ref('messages/' + this.state.idUserChat).set({
        from: this.state.idUser,
        to: this.state.idUserChat,
        message: this.state.message
      });
      this.setState({message: ''})
    });
    })
  }
  savePhotoMessage(file) {
    const _this = this;
    var reader = new FileReader();
    var url = reader.readAsDataURL(file[0]);
    let data = new FormData();
    data.append("file", file[0]);
    reader.onloadend = function(e) {
      return Axios.post(
        config.API_URL + "sendImage/photoMessage/",
        data
      ).then(res => {
        let s = res.data.filePath.replace("\\", "/").replace("\\", "/");
        return Axios.post(config.API_URL + "messages", {
          userOne: {id: _this.state.idUser},
          userTwo: {id: _this.state.idUserChat},
          lienPhoto: config.API_URL + s
        }).then(res => {
          _this.fetchMessages();
          firebase.database().ref('messages/' + this.state.idUserChat).set({
            from: this.state.idUser,
            to: this.state.idUserChat,
            message: this.state.message
          });
        })
        .catch(
          function(error) {
            console.log(error);
          }
        );
      });
    }.bind(this);
    console.log(file.name); // Would see a path?
  }
  serfUser(id){
    this.setState({idUserChat: id, page: 1}, ()=>{
      this.fetchUser(this.state.idUserChat, ()=>{
        subscriber.next({messageUser:this.state.idUserChat});
      })
      });
      
  }
  scrollBottom() {
    this.SimpleBar.current.getScrollElement().scrollTo(0, 1000000000);
  }
 
  
  //modal - carousel
  render() {
    const { classes } = this.props;
    if (this.state.redirect == 1) {
      return <Redirect to='/Connexion' />
    }
    if (this.state.histoires !== [])
      return (
        <div className={classes.section} style={{paddingTop : 87,paddingBottom: 0}}>
          {this.state.isOpen ? (
            <Lightbox
              mainSrc={this.state.imgUrl}
              onCloseRequest={() =>
                {this.setState({isOpen: false, imgUrl: ''})}
              }
              reactModalStyle={{
                overlay: { zIndex: 2000 }
              }}
            />
          ) : (
            <div></div>
          )}
          <div>
             {/* conversation //////////////////////////////////////// */}
             
             <GridContainer >
              <GridItem 
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ alignItems: "center",paddingLeft: 0 }}
                >
                  <Paper  style={{ alignItems: "center",height: 70,marginBottom: 5 }}>
                    <GridContainer style={{height: 70, alignItems: 'center'}}>
                        <GridItem 
                            xs={12}
                            sm={12}
                            md={12}
                          ><h4 style={{fontWeight: 'bold', color: '#1e1548'}}>Message</h4></GridItem>
                    </GridContainer>
                  </Paper>
                  
                </GridItem>
              <GridItem 
                  xs={9}
                  sm={9}
                  md={9}
                  style={{ alignItems: "center",paddingLeft: 0 }}
                >
                  <Paper style={{marginBottom: 5}}>
                    <GridContainer style={{height: 70, alignItems: 'center'}}>
                      <GridItem 
                          xs={1}
                          sm={1}
                          md={1}
                        ></GridItem>
                      <GridItem 
                          xs={8}
                          sm={8}
                          md={8}
                        >
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            {this.state.userChat.lienPhoto == "" ? (
                              <Avatar
                                style={{borderStyle: 'solid',borderWidth: 1.2,
                                        borderColor: '#1e1548',width: 80,height:80}}
                                alt=""
                                src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                              />
                            ):(
                                <Avatar
                                  style={{borderStyle: 'solid',borderWidth: 1.2,
                                          borderColor: '#1e1548',width: 51,height:51}}
                                  alt=""
                                  src={this.state.userChat.lienPhoto}
                                />
                            )}
                              
                            <span style={{marginLeft:13,color: '#1e1548',fontWeight: 'normal'}}>{this.state.userChat.pseudo}</span>
                          </div>
                        </GridItem>
                      <GridItem 
                          xs={3}
                          sm={3}
                          md={3}
                          style={{ alignItems: "center",paddingLeft: 0 }}
                        ></GridItem>  
                    </GridContainer>
                  </Paper>
                </GridItem>
               <GridItem 
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ alignItems: "center",paddingLeft: 0 }}
                >
                  
                  <Paper>
                    <CustomInput
                      labelText="Recherche"
                      id="material"
                      style={{
                        width:295
                      }}
                      value={this.state.search}
                      onChange={(search, event) => {
                        this.setState(
                          {search : search.target.value},()=>{this.fetchUsersMessages()}
                        );
                        
                      }}
                      inputProps={{ 'autoComplete': 'off',
                        endAdornment: (
                          <ButtonBase  >
                            <InputAdornment position="end">
                              <Search />
                            </InputAdornment>
                          </ButtonBase>
                        )
                      }}
                    />
                      <SimpleBar
                        // ref={this.SimpleBar}
                        style={{
                          maxHeight: "482px",
                          height: "482px",
                          overflowX: "hidden"
                        }}
                        autoHide={true}
                      >
                        {this.state.usersMessages.map((user, index) => {
                        if(user.message_userTwoId == this.state.idUser){
                          return (
                            <MenuItem selected={user.message_userOneId == this.state.idUserChat ? true : false} 
                               onClick={()=>{if(user.message_userOneId !== this.state.idUserChat) this.serfUser(user.message_userOneId)}}>
                              <div style={{marginLeft: 32}}></div>
                              <div style={{display: 'contents'}}>
                                {user.userOne_lienPhoto == "" ? (
                                  <Avatar
                                    style={{borderStyle: 'solid',borderWidth: 1.2,
                                            borderColor: '#1e1548'}}
                                    alt=""
                                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                                  />
                                ):(
                                    <Avatar
                                      style={{borderStyle: 'solid',borderWidth: 1.2,
                                              borderColor: '#1e1548'}}
                                      alt=""
                                      src={user.userOne_lienPhoto}
                                    />
                                )}
                                  
                                <span style={{marginLeft:6,color: '#1e1548'}}>{user.userOne_pseudo}</span>
                              </div>
                              <Tooltip
                                title="message"
                              >
                                <ButtonBase onClick={()=>{}}style={{marginLeft: 'auto'}}>
                                  <Badge badgeContent={user.vue} color="secondary">
                                    <ChatIcon style={{color: '#1e1548'}}/>
                                  </Badge>
                              </ButtonBase>
                              </Tooltip>
                            </MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem selected={user.message_userTwoId == this.state.idUserChat ? true : false} 
                              onClick={()=>{if(user.message_userTwoId !== this.state.idUserChat) this.serfUser(user.message_userTwoId)}}>
                              <div style={{marginLeft: 32}}></div>
                              <div style={{display: 'contents'}}>
                                {user.userTwo_lienPhoto == "" ? (
                                  <Avatar
                                    style={{borderStyle: 'solid',borderWidth: 1.2,
                                            borderColor: '#1e1548'}}
                                    alt=""
                                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                                  />
                                ):(
                                    <Avatar
                                      style={{borderStyle: 'solid',borderWidth: 1.2,
                                              borderColor: '#1e1548'}}
                                      alt=""
                                      src={user.userTwo_lienPhoto}
                                    />
                                )}
                                  
                                <span style={{marginLeft:6,color: '#1e1548'}}>{user.userTwo_pseudo}</span>
                              </div>
                              <Tooltip
                                title="message"
                              >
                                <ButtonBase style={{marginLeft: 'auto'}}>
                                  <Badge badgeContent={user.vue} color="secondary">
                                    <ChatIcon style={{color: '#1e1548'}}/>
                                  </Badge>
                              </ButtonBase>
                              </Tooltip>
                            </MenuItem>
                          );
                        }})}
                        
                      </SimpleBar>
                  </Paper>
                </GridItem>
                
                <GridItem 
                  xs={9}
                  sm={9}
                  md={9}
                  style={{ alignItems: "center",paddingLeft: 0 }}
                >
                  <Paper>
                
                  <SimpleBar
                    ref={this.SimpleBar}
                    style={{
                      maxHeight: "485px",
                      height: "485px",
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
                      {this.state.messages.map((message, index) => {
                        if(message.userTwo.id !== this.state.idUserChat){
                          return (
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
                            marginLeft: "0px",
                            alignItems: "center"
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
                             { this.state.userChat.lienPhoto == "" ? (
                                <Avatar
                                    alt=""
                                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                                  />
                                ):(
                                  <Avatar
                                    alt=""
                                    src={this.state.userChat.lienPhoto}
                                  />
                                )}
                          </GridItem>
                          <GridItem
                            xs={9}
                            sm={9}
                            md={9}
                            style={{ alignItems: "center", width: 'auto' }}
                            className={classes.root}
                            spacing={2}
                          >
                            <SnackbarContent
                              message={
                                <div style={{textAlign: 'left'}}>
                                   {message.lienPhoto == null ? (<div></div>):(
                                    <ButtonBase
                                    onClick={() => {
                                      this.setState({isOpen: true, imgUrl: message.lienPhoto})
                                    }}
                                  >
                                    <Avatar  variant="square" className={classes.square}
                                              style={{width: 'auto',maxWidth: 600, height: 'auto'}}>
                                      <img src={message.lienPhoto} style={{maxWidth: 600}}></img>
                                    </Avatar>
                                  </ButtonBase>
                                  )}
                                  <span>
                                    {message.message}
                                  </span><br></br>
                                  <small style={{color: '#3c4858'}}>{moment(message.dateDeCreation).fromNow()}</small>
                                </div>
                              }
                              style={{
                                backgroundColor: "#2e99b0",
                                color: "white",
                                textAlign: 'left',
                                boxShadow: '0px 3px 5px -1px rgba(4, 144, 243, 0.2), 0px 6px 10px 0px rgba(7, 169, 246, 0.14), 0px 1px 18px 0px rgba(4, 134, 196, 0.12)'
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
                      )
                    } else {
                      return (
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
                            marginLeft: "0px",
                            justifyContent:"flex-end",
                            alignItems: "center"
                          }}
                          alignItems="flex-end"
                        >
                          
                          <GridItem
                            xs={9}
                            sm={9}
                            md={9}
                            style={{ alignItems: "center",width: "auto" }}
                            className={classes.root}
                            spacing={2}
                          >
                            <SnackbarContent
                              message={
                                <div style={{textAlign: 'left'}}>
                                  {message.lienPhoto == null ? (<div></div>):(
                                    <ButtonBase
                                    onClick={() => {
                                      this.setState({isOpen: true, imgUrl: message.lienPhoto})
                                    }}
                                  >
                                    <Avatar  variant="square" className={classes.square}
                                              style={{width: 'auto',maxWidth: 600, height: 'auto'}}>
                                      <img src={message.lienPhoto} style={{maxWidth: 600}}></img>
                                    </Avatar>
                                  </ButtonBase>
                                  )}
                                  <span>
                                    {message.message}
                                  </span><br></br>
                                  <small style={{color: 'darkgray'}}>{moment(message.dateDeCreation).fromNow()}</small>
                                </div>
                              }
                              style={{
                                background: "#1e1548",
                                color: "white",
                                alignItems: "center",
                                boxShadow: '0px 3px 5px -1px rgba(2, 61, 122, 0.2), 0px 6px 10px 0px rgba(0, 16, 211, 0.14), 0px 1px 18px 0px rgba(13, 12, 112, 0.12)'
                              }}
                            />
                          </GridItem>
                          <GridItem
                            xs={1}
                            sm={1}
                            md={1}
                            style={{ alignItems: "center", padding: "24px" }}
                          >
                            { this.state.user.lienPhoto == "" ? (
                                <Avatar
                                    alt=""
                                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                                  />
                                ):(
                                  <Avatar
                                    alt=""
                                    src={this.state.user.lienPhoto}
                                  />
                                )}
                          </GridItem>
                          <GridItem
                            xs={1}
                            sm={1}
                            md={1}
                            style={{ alignItems: "center" }}
                          ></GridItem>
                        </GridContainer>
                      </GridItem>
                          )
                        }
                      })}
                      
                      {this.state.showMore ? (
                        <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ alignItems: "center" }}
                          >
                        <Tooltip
                          title="plus de messages"
                          aria-label="plus de messages"
                          onClick={() => {
                            this.setState(
                              { page: this.state.page + 1 },
                              () => {
                                this.handleChangePage();
                              }
                            );
                          }}
                        >
                          <Fab
                            color="primary"
                            className={classes.fab}
                            style={{width:40,height:40}}
                          >
                            <MoreHorizIcon />
                          </Fab>
                        </Tooltip>
                        </GridItem>
                      ) : null}
                      {/* fin message 2 gris*/}
                    </GridContainer>
                  </SimpleBar>
                  <GridContainer
                    style={{ margin: "0px", padding: "0px", width: "100%" }}
                    spacing={2}
                    justify="center"
                  >
                    <GridItem xs={9} sm={9} md={9}>
                      <TextField
                        id="filled-helperText"
                        label="Message"
                        placeholder="Aa"
                        value={this.state.message}
                        onChange={(message, event) => {
                          this.setState({
                            message: message.target.value
                          });
                        }}
                        onKeyPress={(ev) => {
                          if (ev.key === 'Enter' && this.state.message.length > 0) {
                            // Do code here
                            this.sendMessage();
                            console.log('detected');
                          }
                        }}
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
                        onChange={file => {
                          this.savePhotoMessage(file.target.files);
                        }}
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
                </Paper>
              </GridItem>
            </GridContainer>
            
          </div>
          {/* <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <Link to="/">
                <Button
                  color="white"
                  style={{
                    color: "rgb(89, 79, 118)",
                    fontWeight: "bold",
                    margin: 0
                  }}
                >
                  Retour
                </Button>
              </Link>
            </GridItem>
          </GridContainer> */}
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}
const StyledRating = withStyles({
  decimal: {display:'flex'},
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


Messages.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(Messages));
