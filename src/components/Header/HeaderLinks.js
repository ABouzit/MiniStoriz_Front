/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import * as Links  from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Link } from "react-scroll";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import config from "config/config";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const headerClasse = makeStyles(headerStyle);
  const [modal, setModal] = React.useState(false);
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
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
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
                setModal(false);
              }}
            >
              J’ai compris !
            </Button>
          </h3>
        </MuiDialogActions>
      </Dialog>

      <List className={classes.list}>
        {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   All components
            // </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem> */}
        <ListItem className={classes.listItem}>
          <Link
            // color="transparent"
            style={{ color: "currentColor" }}
            activeClass="active"
            to="noshistoire"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <i
                className={headerClasse.socialIcons + " fab fa-readme"}
                style={{ fontSize: 15 }}
              />{" "}
              Lire
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link
            style={{ color: "currentColor" }}
            activeClass="active"
            to="publier"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <i
                className={headerClasse.socialIcons + " fas fa-pen-square"}
                style={{ fontSize: 15 }}
              />{" "}
              Publier
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link
            style={{ color: "currentColor" }}
            activeClass="active"
            to="echanger"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <i
                className={headerClasse.socialIcons + " fas fa-comments"}
                style={{ fontSize: 15 }}
              />{" "}
              Echanger
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link
            style={{ color: "currentColor" }}
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <i
                className={headerClasse.socialIcons + " fas fa-comment-dots"}
                style={{ fontSize: 15 }}
              />{" "}
              Contact
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.dropdownLink}>
            <Tooltip
              id="instagram-tooltip"
              title="Mon Compte"
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
              style={{ marginLeft: 30, padding: 0 }}
            >
              <CustomDropdown
                noLiPadding
                buttonText=""
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                iconStyle={{ width: 30, height: 30 }}
                buttonIcon={PersonIcon}
                dropdownList={[
                  <Links.Link
                    to="/LesHistoires"
                    className={classes.dropdownLink}
                  >
                    NOS HISTOIRES
                  </Links.Link>,
                  <Links.Link to="/MonProfil" className={classes.dropdownLink}>
                    MON PROFIL
                  </Links.Link>,
                  <Links.Link to="/MesOeuvres" className={classes.dropdownLink}>
                    MES OEUVRES
                  </Links.Link>,
                  <ButtonBase
                      style={{fontSize: "13px",
                              fontFamily: "Roboto",
                              fontWeight: 400, }}
                    className={classes.dropdownLink}
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    NOTRE CHARTE
                  </ButtonBase>,
                  <Links.Link
                    to="/Logout"
                    className={classes.dropdownLink}
                    divider
                  >
                    DÉCONNEXION
                  </Links.Link>
                ]}
              />
            </Tooltip>
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
