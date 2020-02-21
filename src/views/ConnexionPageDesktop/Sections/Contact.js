import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import Tooltip from "@material-ui/core/Tooltip";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.headerClasse = makeStyles(headerStyle);
    }
render() {
  const { classes } = this.props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>CONTACT</h2>
        </GridItem>
      </GridContainer>
      <GridContainer direction="row"
        justify="flex-start"
        alignItems="flex-start" style={{ marginTop: 35 }}>
      <GridItem xs={12} sm={12} md={6} style={{color: '#212121', textAlign: "justify" }} >
            <h4>
                Si tu souhaites nous laisser un commentaire, voici un formulaire de contact. Tu peux également nous envoyer un mail ou nous retrouver sur les réseaux sociaux !
            </h4>
        </GridItem>
  </GridContainer>
      <GridContainer justify="center" style={{ marginTop: 5 }}>
        <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Nom ou pseudo"
                id="float"
                formControlProps={{
                    fullWidth: true,
                    required: true
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <CustomInput
                labelText="Adresse mail"
                id="float"
                formControlProps={{
                    fullWidth: true,
                    required: true
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Objet"
                id="float"
                formControlProps={{
                    fullWidth: true,
                    required: true
                }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <TextField
                color="primary"
                fullWidth
                label="Votre commentaire"
                id="float"
                multiline
                rows="5"
                required
            />
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer justify="center" spacing={"auto"} style={{ marginTop: 20 }}>
          <GridItem
            xs={12}
            sm={12}
            md={4}
            justify="center"
            style={{ width: "auto" }}
          >
            <Button color="primary">Envoyer</Button>
          </GridItem>
        </GridContainer>
        <GridContainer direction="row"
                        justify="center"
                        alignItems="center" 
                        spacing={4}
                     style={{ marginTop: 30 }}>
          <GridItem xs={4} sm={4} md={4} style={{ textAlign: 'center'}}>
            <Tooltip
                id="instagram-tooltip"
                title="Follow us on instagram"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: this.headerClasse.tooltip }}
                >
                <Button
                    color="transparent"
                    href="https://www.instagram.com/ministoriz/"
                    target="_blank"
                    className={this.headerClasse.navLink}
                >
                    <i className={this.headerClasse.socialIcons + " fab fa-instagram"} style={{color: '#000000', fontSize: 35}} />
                </Button>
                
            </Tooltip>
            <h4 alignItems="center" style={{color: '#000000', fontFamily: 'monospace'}}>Instagram</h4>
            <h4 style={{color: "#9c27b0", fontFamily: 'monospace'}}>Ministoriz</h4>
          </GridItem>
          <GridItem xs={4} sm={4} md={4} style={{ textAlign: 'center'}}>
          <Tooltip
                id="instagram-tooltip"
                title="Contact us on mail"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: this.headerClasse.tooltip }}
                >
                <Button
                    color="transparent"
                    href="mailto:contact@ministoriz.com"
                    target="_blank"
                    className={this.headerClasse.navLink}
                >
                    <i className={this.headerClasse.socialIcons + " far fa-envelope"} style={{color: '#000000', fontSize: 35}} />
                </Button>
            </Tooltip>
                <h4 style={{color: '#000000', fontFamily: 'monospace' }}>Mail</h4>
                <h4 style={{color: "#9c27b0", fontFamily: 'monospace'}}>contact@ministoriz.com</h4>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
}
Contact.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(Contact);