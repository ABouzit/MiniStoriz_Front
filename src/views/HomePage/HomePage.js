import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HeaderUser from "components/Header/HeaderUser.js";
import Parallax from "components/Parallax/Parallax.js";
import config from "config/config";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import PhotoCamera from "@material-ui/icons/CameraAltOutlined";
import ButtonBase from "@material-ui/core/ButtonBase";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import CreateIcon from '@material-ui/icons/Create';
import BrushIcon from '@material-ui/icons/Brush';
import { CircularProgressbar,CircularProgressbarWithChildren,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
// Sections for this page
import { subscriber, messageService } from "../../services/messageService";
import Login from "./Sections/Login";
import { Input } from "@material-ui/core";
import useForceUpdate from 'use-force-update';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import HeaderGloble from "components/Header/HeaderGloble";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [imgProf, setImgProf] = React.useState("");
  const [imgCov, setImgCov] = React.useState("");
  const [user, setUser] = React.useState("");
  const [filtre, setFiltre] = React.useState(1);
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  React.useEffect(() => {
    subscriber.subscribe(v => {
      if(v.imgProfil){
        setImgProf(v.imgProfil)
      }
      if(v.imgCov){
        setImgCov(v.imgCov)
      }
      if(v.user){
        setImgProf(v.user.lienPhoto)
        setImgCov(v.user.lienCouverture)
        setUser(v.user)
      }
    });
      window.addEventListener("scroll", scrollBalise);
    return function cleanup() {
        window.removeEventListener("scroll", scrollBalise);
    };
  });
  const scrollBalise = () => {
    const windowsScrollTop = window.pageYOffset;
    // if (!isMobile) {
    //   if (windowsScrollTop > 110) {
    //     document.getElementById("navBarLeft")
    //       .style.position = "fixed";
    //     document.getElementById("navBarLeft1")
    //       .style.width = "42%";
    //     document.getElementById("navBarLeft1")
    //       .style.marginTop = "-100px";
    //   } else {
    //     document.getElementById("navBarLeft")
    //       .style.position = "";
    //     document.getElementById("navBarLeft1")
    //       .style.width = "";
    //     document.getElementById("navBarLeft1")
    //       .style.marginTop = "0";
    //   }
    // }else {
    //   if (windowsScrollTop > 110) {
    //     document.getElementById("scrollTop")
    //       .style.display = "block";
    //   } else {
    //     document.getElementById("scrollTop")
    //       .style.display = "none";
    //   }
    // }
    
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      {/* <div style={{width: '100%',
                    backgroundColor: '#e3f3fd',
                    color: 'rgb(89, 79, 118)',
                    marginTop: '-9px',
                    height: 30,
                    position: 'fixed',
                    zIndex: '100',
                    boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'}}>
                      <h4 style={{fontFamily: 'cursive', marginTop: 2, marginLeft: '5%', fontWeight: 'bold'}}>
                        Bienvenue à toi, Azzedine le mini-artiste
                      </h4>
      </div> */}
      <HeaderGloble />
      <div style={{backgroundColor: "#ecfbfc"}}>
        <GridContainer justify="center" direction={isMobile ? "column-reverse" : null} style={{margin: 0,marginTop: 95, padding: 0 }}>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer justify="center">
              <GridItem xs={10} sm={10} md={11} style={isMobile? {marginTop: 20, padding: 0}:{marginTop: 20}}>
                <Paper elevation={0}>
                <GridContainer justify="center">
                  <GridItem xs={10} sm={10} md={10}>
                    <h3 style={{fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center'}}>
                      C’EST QUOI MINISTORIZ ?
                    </h3>
                    <h5 style={{fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'left',marginTop: 20}}>
                    Tu aimes écrire ?
                    </h5>
                    <h5 style={{fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'right'}}>
                    Tu es passionné(e) de dessin ?...
                    </h5>
                    <h5 style={{fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center'}}>
                    ... ou tu souhaites lire des histoires originales ?
                    </h5>
                    
                  </GridItem>
                  <GridItem xs={10} sm={10} md={10} style={{marginTop: 20}}>
                    <GridContainer justify="center">
                      <GridItem xs={10} sm={10} md={4}>
                        <img
                            src={config.API_URL + "images/asset/logo.png"}
                            alt="Logo"
                            style={{
                              display: "block",
                              width: "inherit"
                            }}
                          />
                      </GridItem>
                      <GridItem xs={10} sm={10} md={8}>
                        <p style={{textAlign: 'justify'}}>Ministoriz est un site collaboratif permettant à nos membres (les mini-artistes), passionnés d’écriture ou de dessin, de publier des histoires et de ravir nos lecteurs !
                        En devenant membre, il sera possible d’écrire un conte, de l’illustrer et même d’illustrer un conte existant.
                        Viens donc partager ton imagination et tes talents de dessinateur en devenant un mini-artiste !</p>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={10} sm={10} md={10} style={{textAlign: 'center',marginTop: 20,paddingBottom: 20}}>
                    {/* <Button  color="primary" size="md" onClick={()=>{}}>
                      Je m’inscris
                    </Button> */}
                  </GridItem>
                </GridContainer>
                </Paper>
              </GridItem>
            </GridContainer>
            
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer justify="center">
              <GridItem xs={11} sm={11} md={11}>
                <Login/>
              </GridItem>
            </GridContainer>
          </GridItem>
          
        </GridContainer>
      </div>
      
    </div>
  );
}