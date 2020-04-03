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
// import Button from "components/CustomButtons/Button.js";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HeaderUser from "components/Header/HeaderUser.js";
import Parallax from "components/Parallax/Parallax.js";
import config from "config/config";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
// Sections for this page
import { subscriber, messageService } from "./../../services/messageService";
import MesOeuvres from "./Sections/MesOeuvres";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function MesOeuvresPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filtre, setFiltre] = React.useState(1);
  let refreshCallBackFunction = publierData => {
    console.log(publierData);
    setRefresh(true);
  };
  React.useEffect(() => {
      window.addEventListener("scroll", scrollBalise);
    return function cleanup() {
        window.removeEventListener("scroll", scrollBalise);
    };
  });
  const scrollBalise = () => {
    const windowsScrollTop = window.pageYOffset;
    if (!isMobile) {
      if (windowsScrollTop > 110) {
        document.getElementById("navBarLeft")
          .style.position = "fixed";
        document.getElementById("navBarLeft1")
          .style.width = "28%";
        document.getElementById("navBarLeft1")
          .style.marginTop = "-8%";
      } else {
        document.getElementById("navBarLeft")
          .style.position = "";
        document.getElementById("navBarLeft1")
          .style.width = "";
        document.getElementById("navBarLeft1")
          .style.marginTop = "0";
      }
    }else {
      if (windowsScrollTop > 110) {
        document.getElementById("scrollTop")
          .style.display = "block";
      } else {
        document.getElementById("scrollTop")
          .style.display = "none";
      }
    }
    
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
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
        rightLinks={<HeaderUser />}
        fixed
        changeColorOnScroll={{
          height: 0,
          color: "info"
        }}
        {...rest}
      />
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
      <div style={{backgroundColor: 'white'}}>
        <GridContainer justify="center" style={{margin: 0, padding: 0}}>
          <GridItem xs={12} sm={12} md={12} style={{margin: 0, padding: 0, boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'}}>
            <Parallax image={
                // histoire.lienIllustration !== null
                //   ?  histoire.lienIllustration
                //   : ""
                config.API_URL + "images/asset/bg1.jpg"
              }
              style={{
                height: "240px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
            ></Parallax>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end" style={{margin: 0}}>
          <GridItem xs={12} sm={12} md={3}>
            {isMobile ? (
            <div style={{ display: 'contents'}}>
              <GridContainer justify="center" style={{marginTop: '0%'}}>
              
              <GridItem xs={11} sm={11} md={11}>
              <Card
                style={{ backgroundColor: "white", marginTop: 0, borderRadius: 0 }}
              >
                <div style={{textAlign: '-webkit-center', position: 'absolute', top: -65, width: '100%'}}>
                <Avatar
                    alt=""
                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                    style={{ width: 130, height: 130, borderStyle: 'solid', borderWidth: 7, borderColor: 'white' }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 65,
                    textAlign: 'center'
                  }}
                >
                  GetX
                </h3>
                <CardBody style={{paddingTop: 0, paddingBottom: 8}}>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                <GridContainer justify="center">
                  <GridItem xs={8} sm={8} md={6}>
                  <h6
                    style={{
                      fontFamily: "cursive",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    Histoires
                  </h6>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                  <h6
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    18
                  </h6>
                  </GridItem>
                </GridContainer>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                <GridContainer justify="center">
                  <GridItem xs={8} sm={8} md={6}>
                  <h6
                    style={{
                      fontFamily: "cursive",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    Reseau
                  </h6>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                  <h6
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    29
                  </h6>
                  </GridItem>
                </GridContainer>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                  <GridContainer justify="center">

                    <GridItem xs={12} sm={12} md={12}>
                      <h6
                      style={{
                        fontFamily: "cursive",
                        color: "black",
                        textAlign: 'center'
                      }}
                    >
                      Note moyenne
                    </h6>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <Tooltip
                        disableFocusListener
                        disableTouchListener
                        title={
                          // histoire.noteHistoireMoy
                          //   ? parseFloat(
                          //       Math.round(
                          //         histoire.noteHistoireMoy * 100
                          //       ) / 100
                          //     ).toFixed(2) + "/5"
                          //   : 0
                          4.4
                        }
                      >
                      <ButtonBase>
                      <CircularProgressbar value={parseFloat(
                                Math.round(
                                  4.4 * 100
                                ) / 100
                              ).toFixed(2)} maxValue={5} text={parseFloat( Math.round( 4.4* 100) / 100).toFixed(1)} />
                      </ButtonBase>
                      </Tooltip>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2} style={{textAlign:'left', paddingLeft: 0}}><div style={{height:40, paddingTop: 8}}><CreateIcon style={{width:20}} /></div></GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <Tooltip
                        disableFocusListener
                        disableTouchListener
                        title={
                          // histoire.noteHistoireMoy
                          //   ? parseFloat(
                          //       Math.round(
                          //         histoire.noteDessinMoy * 100
                          //       ) / 100
                          //     ).toFixed(2) + "/5"
                          //   : 0
                          4.4
                        }
                      >
                      <ButtonBase>
                    <CircularProgressbar value={parseFloat(
                                Math.round(
                                  4.3 * 100
                                ) / 100
                              ).toFixed(2)} maxValue={5} text={parseFloat(
                                Math.round(
                                  4.4 * 100
                                ) / 100
                              ).toFixed(1)} />
                      </ButtonBase>
                    </Tooltip>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2} style={{textAlign:'left', paddingLeft: 0}}><div style={{height:40, paddingTop: 8}}> <BrushIcon style={{width:20}} /></div> </GridItem>
                    </GridContainer>
                  <Divider  style={{marginTop: '2%', marginLeft: -30, marginRight: -30}} />
                  <GridContainer justify="center">
                    
                    <GridItem xs={12} sm={12} md={12}>
                      <h5
                        style={{
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          color: "black",
                          margin: 0,
                          marginTop: '2%',
                          textAlign: 'center'
                        }}
                      >
                        Mon Reseau
                      </h5>
                    </GridItem>
                    </GridContainer>
                    <Divider  style={{marginTop: '2%', marginLeft: -30, marginRight: -30}} />
                   
                    <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                      <h5
                        style={{
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          color: "black",
                          margin: 0,
                          marginTop: '2%',
                          textAlign: 'center'
                        }}
                      >
                        Mon Profil
                      </h5>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              </GridItem>
              <GridItem xs={10} sm={10} md={10} style={{ marginTop: -30}} >
                <CustomInput
                  labelText="Recherche"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={search}
                  onChange={(search, event) => {
                    setSearch(
                      search.target.value
                    );
                    window.scrollTo(0, 0)
                  }}
                  inputProps={{
                    endAdornment: (
                      <ButtonBase onClick={subscriber.next({search: search, filtre: filtre})}>
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      </ButtonBase>
                    )
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={10} style={{textAlign: 'center'}}>
                <ButtonGroup
                    orientation="vertical"
                    // color="secondary"
                    aria-label="Les filtres"
                    variant="contained"
                    style={{width : '-webkit-fill-available'}}
                  >
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 1}); setFiltre(1); window.scrollTo(0, 0)}}>Les plus lues</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 2}); setFiltre(2); window.scrollTo(0, 0)}}>Les plus populaires</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 3}); setFiltre(3); window.scrollTo(0, 0)}}>Les plus recentes</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 4}); setFiltre(4); window.scrollTo(0, 0)}}>Les plus anciennes</Button>
                </ButtonGroup>
              </GridItem>
            </GridContainer>
            <div id="scrollTop" style={{ display: 'none', position: 'fixed', width: '100%', textAlign: 'left', zIndex: 10, bottom: 5, right: -5}}>
              <Fab
                onClick={()=> {window.scrollTo(0, 0)}}
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.margin}
              >
                <NavigationIcon className={classes.extendedIcon} />
              </Fab>
            </div>
            </div>
              ) : (
            <div id="navBarLeft"> 
            <GridContainer justify="center" id="navBarLeft1">
              <GridItem xs={11} sm={11} md={11}>
              <Card
                style={{ backgroundColor: "white", marginTop: 0, borderRadius: 0 }}
              >
                <div style={{textAlign: '-webkit-center', position: 'absolute', top: -65, width: '100%'}}>
                <Avatar
                    alt=""
                    src={config.API_URL + "images/defaultPhotoProfil.jpg"}
                    style={{ width: 130, height: 130, borderStyle: 'solid', borderWidth: 7, borderColor: 'white' }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    color: "black",
                    marginTop: 65,
                    textAlign: 'center'
                  }}
                >
                  GetX
                </h3>
                <CardBody style={{paddingTop: 0, paddingBottom: 8}}>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                <GridContainer justify="center">
                  <GridItem xs={4} sm={4} md={6}>
                  <h6
                    style={{
                      fontFamily: "cursive",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    Histoires
                  </h6>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                  <h6
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    18
                  </h6>
                  </GridItem>
                </GridContainer>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                <GridContainer justify="center">
                  <GridItem xs={4} sm={4} md={6}>
                  <h6
                    style={{
                      fontFamily: "cursive",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    Reseau
                  </h6>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                  <h6
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                      textAlign: 'center'
                    }}
                  >
                    29
                  </h6>
                  </GridItem>
                </GridContainer>
                <Divider  style={{ marginLeft: -30, marginRight: -30}} />
                  <GridContainer justify="center">

                    <GridItem xs={12} sm={12} md={12}>
                      <h6
                      style={{
                        fontFamily: "cursive",
                        color: "black",
                        textAlign: 'center'
                      }}
                    >
                      Note moyenne
                    </h6>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <Tooltip
                        disableFocusListener
                        disableTouchListener
                        title={
                          // histoire.noteHistoireMoy
                          //   ? parseFloat(
                          //       Math.round(
                          //         histoire.noteHistoireMoy * 100
                          //       ) / 100
                          //     ).toFixed(2) + "/5"
                          //   : 0
                          4.4
                        }
                      >
                      <ButtonBase>
                      <CircularProgressbar value={parseFloat(
                                Math.round(
                                  4.4 * 100
                                ) / 100
                              ).toFixed(2)} maxValue={5} text={parseFloat( Math.round( 4.4* 100) / 100).toFixed(1)} />
                      </ButtonBase>
                      </Tooltip>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2} style={{textAlign:'left', paddingLeft: 0}}><div style={{height:40, paddingTop: 8}}><CreateIcon style={{width:20}} /></div></GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <Tooltip
                        disableFocusListener
                        disableTouchListener
                        title={
                          // histoire.noteHistoireMoy
                          //   ? parseFloat(
                          //       Math.round(
                          //         histoire.noteDessinMoy * 100
                          //       ) / 100
                          //     ).toFixed(2) + "/5"
                          //   : 0
                          4.4
                        }
                      >
                      <ButtonBase>
                    <CircularProgressbar value={parseFloat(
                                Math.round(
                                  4.3 * 100
                                ) / 100
                              ).toFixed(2)} maxValue={5} text={parseFloat(
                                Math.round(
                                  4.4 * 100
                                ) / 100
                              ).toFixed(1)} />
                      </ButtonBase>
                    </Tooltip>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2} style={{textAlign:'left', paddingLeft: 0}}><div style={{height:40, paddingTop: 8}}> <BrushIcon style={{width:20}} /></div> </GridItem>
                    </GridContainer>
                  <Divider  style={{marginTop: '2%', marginLeft: -30, marginRight: -30}} />
                  <GridContainer justify="center">
                    
                    <GridItem xs={12} sm={12} md={12}>
                      <h5
                        style={{
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          color: "black",
                          margin: 0,
                          marginTop: '2%',
                          textAlign: 'center'
                        }}
                      >
                        Mon Reseau
                      </h5>
                    </GridItem>
                    </GridContainer>
                    <Divider  style={{marginTop: '2%', marginLeft: -30, marginRight: -30}} />
                   
                    <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                      <h5
                        style={{
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          color: "black",
                          margin: 0,
                          marginTop: '2%',
                          textAlign: 'center'
                        }}
                      >
                        Mon Profil
                      </h5>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              </GridItem>
              <GridItem xs={10} sm={10} md={10} style={{ marginTop: -30}} >
                <CustomInput
                  labelText="Recherche"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={search}
                  onChange={(search, event) => {
                    setSearch(
                      search.target.value
                    );
                    window.scrollTo(0, 0)
                  }}
                  inputProps={{
                    endAdornment: (
                      <ButtonBase onClick={subscriber.next({search: search, filtre: filtre})}>
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      </ButtonBase>
                    )
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={10} style={{textAlign: 'center'}}>
                <ButtonGroup
                    orientation="vertical"
                    // color="secondary"
                    aria-label="Les filtres"
                    variant="contained"
                    style={{width : '-webkit-fill-available'}}
                  >
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 1}); setFiltre(1); window.scrollTo(0, 0)}}>Les plus lues</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 2}); setFiltre(2); window.scrollTo(0, 0)}}>Les plus populaires</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 3}); setFiltre(3); window.scrollTo(0, 0)}}>Les plus recentes</Button>
                  <Button onClick={()=> {subscriber.next({search: search, filtre: 4}); setFiltre(4); window.scrollTo(0, 0)}}>Les plus anciennes</Button>
                </ButtonGroup>
              </GridItem>
            </GridContainer>
            </div> )}
          </GridItem>
          {isMobile ? (
          <GridItem xs={12} sm={12} md={9} position="center">
            <div>
            <MesOeuvres /></div>
            
          </GridItem>
          ):(
          <GridItem xs={12} sm={12} md={9} position="end">
          <MesOeuvres />
        </GridItem>
        )}
        </GridContainer>
      </div>
      
    </div>
  );
}