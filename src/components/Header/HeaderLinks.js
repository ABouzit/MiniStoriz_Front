/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Link } from "react-scroll";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const headerClasse = makeStyles(headerStyle);
  return (
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
          color="transparent"
          style={{color:"white"}}
          activeClass="active"
          to="noshistoire"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
          >
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <i
            className={
              headerClasse.socialIcons + " fab fa-readme"
            }
            style={{  fontSize: 15 }}
          /> Lire
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link
          color="transparent"
          style={{color:"white"}}
          activeClass="active"
          to="publier"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
          >
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <i
            className={
              headerClasse.socialIcons + " fas fa-pen-square"
            }
            style={{  fontSize: 15 }}
          /> Publier
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link
          color="transparent"
          style={{color:"white"}}
          activeClass="active"
          to="echanger"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
          >
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <i
            className={
              headerClasse.socialIcons + " fas fa-comments"
            }
            style={{  fontSize: 15 }}
          /> Echanger
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link
          color="transparent"
          style={{color:"white"}}
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={0}
          duration= {500}
          >
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <i
            className={
              headerClasse.socialIcons + " fas fa-comment-dots"
            }
            style={{  fontSize: 15 }}
          /> Contact
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
