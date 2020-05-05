import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
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
import EditIcon from "@material-ui/icons/Edit";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CardBody from "components/Card/CardBody.js";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import { makeStyles } from "@material-ui/core/styles";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Avatar from "@material-ui/core/Avatar";
//scroll bare text
import CustomInput from "components/CustomInput/CustomInput.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Base64 } from 'js-base64';
import { Redirect } from 'react-router-dom'
class ActivationPage extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    // Don't call this.setState() here!
    this.state = {
      redirect: 0
    };
    
  }
  componentDidMount() {
    this.fetchUser();
  }
  
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({alertError: false,signinUtilisateur: false,signinError: false,signinPassword: false,signUpSuccess: false,updatePassword: false});
  };
  fetchUser() {
    var id = this.props.match.params.userId;
    const _this = this;
    var user;
    if (id) {
    
    return Axios.get(config.API_URL + "users/" + id, {}).then(res => {

        if (res.data[0].isActive) {
            _this.setState({redirect: 1},() => {_this.forceUpdate();});
        } else {
            user = res.data[0];
            user.isActive = true;
            return Axios.put(config.API_URL + "users", user).then(res => {
            _this.setState({ redirect: 2 }, ()=> {_this.forceUpdate()});
            }).catch(
            function(error) {
                console.log(error);
            }
            );
        }
    });
    }
  }
 

  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    if (this.state.redirect == 1) {
      return <Redirect to='/' />
     }
     if (this.state.redirect == 2) {
        return <Redirect to='/' />
    }
     return <Redirect to='/MonCompte' />
    }
}
ActivationPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ActivationPage);
  