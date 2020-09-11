/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Link, withRouter } from "react-router-dom";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import config from "config/config";
import HeaderUser from "./HeaderUser2";
import Header from './Header';
import IconButton from "@material-ui/core/IconButton";
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import InputIcon from '@material-ui/icons/Input';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
// react components for routing our app without refresh

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import Buttonss from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';
import moment from "moment";
import "moment/locale/fr";
// import { Link } from "react-scroll";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { subscriber, subscriberTest, messageService } from "./../../services/messageService";
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
const useStyles = makeStyles(styles);
const dashboardRoutes = [];
class HeaderGloale extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            user: JSON.parse(localStorage.getItem('user')),
            anchorEl2: null,
            anchorEl: null,
            vue: 0,
            vueNotif: 0,
            nbrReq: 0,
            requestFriend: [],
            notifications: [],
            numberMessage: 0,
        }
      
    }
    
    handleClick(event) {
        this.getRequestFriend();
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClick2(event) {
        this.notification();
        this.setState({ anchorEl2: event.currentTarget });

    };
    accepteRequest(id, id2) {
        Axios.put(config.API_URL + "users/relation/" + this.state.user.id, {
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
                function (error) {
                    console.log(error);
                }
            );
    }
    refuseRequest(id) {
        Axios.delete(config.API_URL + "relations/" + id).then(res => {
            this.getRequestFriend()
        })
            .catch(
                function (error) {
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
            this.setState({ requestFriend: res.data }, () => this.forceUpdate())
        });
    }
    getNumberVue() {
        Axios.get(
            config.API_URL +
            "messages/numberVueTotal/" + this.state.user.id,
            {}
        ).then(res => {
            console.log(res.data)

            this.setState({ vue: res.data },()=>this.forceUpdate())
        });
    }
    notification() {
        Axios.get(
            config.API_URL +
            "notification/for/" + this.state.user.id,
            {}
        ).then(res => {
            this.setState({ notifications: res.data }, () => this.forceUpdate());
        });
    }
    NumberVue() {
        Axios.get(
            config.API_URL +
            "notification/nbrNotification/" + this.state.user.id,
            {}
        ).then(res => {
            this.setState({ VueNotif: res.data }, () => this.forceUpdate())
        });
    }

    getNumberRequest() {
        Axios.get(
            config.API_URL +
            "relations/getNumberRequest/" + this.state.user.id,
            {}
        ).then(res => {
            this.setState({ nbrReq: res.data }, () => this.forceUpdate());
        });
    }
    handleClose() {
        this.setState({ anchorEl: null })
    };
    handleClose2() {
        this.setState({ anchorEl2: null })
    };

    render(){
        const { classes } = this.props;
        const ITEM_HEIGHT = 48;
        const open = Boolean(this.state.anchorEl);
        const open2 = Boolean(this.state.anchorEl2);
        const { ...rest } = this.props;
    return (
        <div>
            {this.state.user ? (
            <Header
                color="info"
                routes={dashboardRoutes}
                brand={null}
                leftLinks={
                    <img
                        src={config.API_URL + "images/asset/logo.png"}
                        alt="Logo"
                        style={{
                            display: "block",
                            width: "146px"
                        }}
                    />
                }
                rightLinks={<HeaderUser />}
                fixed
                changeColorOnScroll={{
                    height: -1,
                    color: "info"
                }}
                {...rest}
            />
      ):(
            <Header
                color="info"
                routes={dashboardRoutes}
                // brand="Mateeeerial Kit React"
                leftLinks={
                    <img
                        src={config.API_URL + "images/asset/logo.png"}
                        alt="Logo"
                        style={{
                            display: "block",
                            width: "146px"
                        }}
                    />
                }
                rightLinks={
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Link to="/" className={classes.dropdownLink}>
                                <Button
                                    color="transparent"
                                    className={classes.navLink}
                                    style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end' }}
                                >
                                    <MenuBookOutlinedIcon style={{ width: 22, height: 22 }} />{" "}
              Histoires
            </Button>
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to="/Connexion" className={classes.dropdownLink}>
                                <Button
                                    color="transparent"
                                    className={classes.navLink}
                                    style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end' }}
                                >
                                    <InputIcon style={{ width: 22, height: 22 }} />{" "}
              Connexion
            </Button>
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link to="/Contact" className={classes.dropdownLink}>
                                <Button
                                    color="transparent"
                                    className={classes.navLink}
                                    style={{ padding: 0, fontFamily: 'goudy', fontWeight: 'bold', alignItems: 'flex-end' }}
                                >
                                    <PhoneForwardedIcon style={{ width: 22, height: 22 }} />
              Contactez-nous
            </Button>
                            </Link>
                        </ListItem>
                        </List>
                }
                fixed
                changeColorOnScroll={{
                    height: -1,
                    color: "info"
                }}
                {...rest}
            />
      )}
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
export default withStyles(styles)(HeaderGloale);