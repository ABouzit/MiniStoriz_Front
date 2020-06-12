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
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Lightbox from "react-image-lightbox";
import { Link, withRouter } from "react-router-dom";
import "react-image-lightbox/style.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
// Sections for this page
import HeaderGloble from "components/Header/HeaderGloble";
import { subscriber, messageService } from "../../services/messageService";
import { Redirect } from "react-router-dom";
import { Unsubscribe } from "@material-ui/icons";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function ErrorPage(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [user, setUser] = React.useState("");
  const [userCurrent, setUserCurrent] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const HEIGHT = window.innerHeight;
  React.useEffect(() => {
    const Unsubscribe = subscriber.subscribe(v => {
      if (v.user) {
        setUser(v.user);
      }
    });
    return () => Unsubscribe;
  }, []);
  if (userCurrent == null) {
    return <Redirect to="/Connexion" />;
  }
  return (
    <div style={{ width: "100%" }}>
      <HeaderGloble />
      {isOpen ? (
        <Lightbox
          mainSrc={imgUrl}
          onCloseRequest={() => {
            setIsOpen(false);
            setImgUrl("");
          }}
          reactModalStyle={{
            overlay: { zIndex: 2000 }
          }}
        />
      ) : (
        <div></div>
      )}
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
      <div style={{ backgroundColor: "#ecfbfc" }}>
        {isMobile ? (
          <GridContainer justify="center" style={{ margin: 0, padding: 0 }}>
            <GridItem
              xs={12}
              sm={12}
              md={11}
              position="center"
              justify="center"
              alignItems="center"
              style={{
                margin: 0,
                padding: 0,
                height: HEIGHT,
                flexDirection: "column",
                display: "flex"
              }}
            >
              <p style={{ fontSize: 100, height: 60 }}>404</p>
              <p style={{ fontSize: 20, textAlign: "center" }}>
                le contenue que vous chervez n'est plus disponible!{" "}
              </p>
              <ButtonBase
              >
                <Link to={"/AllHistoires"}>retorunez a l'acceuil</Link>
              </ButtonBase>
            </GridItem>
          </GridContainer>
        ) : (
          <GridContainer justify="center" style={{ margin: 0, padding: 0 }}>
            <GridItem
              xs={12}
              sm={12}
              md={11}
              position="center"
              justify="center"
              alignItems="center"
              style={{
                margin: 0,
                padding: 0,
                height: HEIGHT,
                flexDirection: "column",
                display: "flex"
              }}
            >
              <p style={{ fontSize: 100, height: 60 }}>404</p>
              <p style={{ fontSize: 30, textAlign: "center" }}>
                le contenue que vous chervez n'est plus disponible!{" "}
              </p>
              <ButtonBase
              >
                <Link to={"/AllHistoires"}>retorunez a l'acceuil</Link>
              </ButtonBase>
            </GridItem>
          </GridContainer>
        )}
      </div>
    </div>
  );
}
