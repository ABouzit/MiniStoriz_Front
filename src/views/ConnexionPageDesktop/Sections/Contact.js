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
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import headerStyle from "assets/jss/material-kit-react/components/headerStyle";
import Axios from "axios";
import config from "config/config";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.headerClasse = makeStyles(headerStyle);
    this.state = {
      submit: false,
      nom: "",
      email: "",
      objet: "",
      message: ""
    };
    this.valideContact = this.valideContact.bind(this);
  }
  valideContact() {
    this.setState({submit: true})
    if (this.state.nom !== "" && this.state.email !== "" && this.state.objet !== "" && this.state.message !== "") {
      Axios.post(config.API_URL + "messages/contact", {
        nom: this.state.nom,
        objet: this.state.objet,
        email: this.state.email,
        message: this.state.message
      }).then(res => {
        this.setState({submit: false, nom: "", objet: "", message: "", email: ""})
        console.log(res.message)
      });
    } 
  }
  render() {
    const { classes } = this.props;
    const {email, nom, objet, message} = this.state;
    const {submit} = this.state;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>CONTACT</h2>
          </GridItem>
        </GridContainer>
        <GridContainer
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          style={{ marginTop: 35 }}
        >
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{ color: "#212121", textAlign: "justify" }}
          >
            <h4>
              Si tu souhaites nous laisser un commentaire, voici un formulaire
              de contact. Tu peux également nous envoyer un mail ou nous
              retrouver sur les réseaux sociaux !
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" style={{ marginTop: 5 }}>
          <GridItem xs={12} sm={12} md={6}>
          {nom === "" && submit == true ? (
            <CustomInput
              error
              labelText="Nom ou pseudo"
              formControlProps={{
                fullWidth: true,
                required: true
              }}
              id="nomContact"
              value={this.state.nom}
              onChange={(nom, event) => {
                this.setState({
                  nom: nom.target.value
                });
              }}
            />
          ):(
            <CustomInput
              labelText="Nom ou pseudo"
              formControlProps={{
                fullWidth: true,
                required: true
              }}
              id="nomContact"
              value={this.state.nom}
              onChange={(nom, event) => {
                this.setState({
                  nom: nom.target.value
                });
              }}
            /> )}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
          {email === "" && submit == true ? (
            <CustomInput
              error
              labelText="Adresse mail"
              id="emailContact"
              value={this.state.email}
              onChange={(email, event) => {
                this.setState({
                  email: email.target.value
                });
              }}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
            />
          ):(
            <CustomInput
              labelText="Adresse mail"
              id="emailContact"
              value={this.state.email}
              onChange={(email, event) => {
                this.setState({
                  email: email.target.value
                });
              }}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
            />)}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          {objet === "" && submit == true ? (
            <CustomInput
            error
              labelText="Objet"
              id="objetContact"
              value={this.state.objet}
              onChange={(objet, event) => {
                this.setState({
                  objet: objet.target.value
                });
              }}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
            />
          ):(
            <CustomInput
              labelText="Objet"
              id="objetContact"
              value={this.state.objet}
              onChange={(objet, event) => {
                this.setState({
                  objet: objet.target.value
                });
              }}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
            />)}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          {message === "" && submit == true ? (
            <TextField
            error
              color="primary"
              fullWidth
              label="Votre commentaire"
              id="messageContact"
              value={this.state.message}
              onChange={(message, event) => {
                this.setState({
                  message: message.target.value
                });
              }}
              multiline
              rows="5"
              required
            />
          ):(
            <TextField
              color="primary"
              fullWidth
              label="Votre commentaire"
              id="messageContact"
              value={this.state.message}
              onChange={(message, event) => {
                this.setState({
                  message: message.target.value
                });
              }}
              multiline
              rows="5"
              required
            />)}
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <Button
                color="white"
                onClick={() => {
                  this.valideContact();
                }}
                style={{color:'rgb(89, 79, 118)', fontWeight: 'bold',margin: 0}}
              >
                Envoyer
              </Button>
            </GridItem>
          </GridContainer>
          <GridContainer
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
            style={{ marginTop: 30 }}
          >
            <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
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
                  <i
                    className={
                      this.headerClasse.socialIcons + " fab fa-instagram"
                    }
                    style={{ color: "#000000", fontSize: 35 }}
                  />
                </Button>
              </Tooltip>
              <h4 style={{ color: "#000000", fontFamily: "monospace" }}>
                Instagram
              </h4>
              <h4 style={{ color: "#9c27b0", fontFamily: "monospace" }}>
                Ministoriz
              </h4>
            </GridItem>
            <GridItem xs={4} sm={4} md={4} style={{ textAlign: "center" }}>
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
                  <i
                    className={
                      this.headerClasse.socialIcons + " far fa-envelope"
                    }
                    style={{ color: "#000000", fontSize: 35 }}
                  />
                </Button>
              </Tooltip>
              <h4 style={{ color: "#000000", fontFamily: "monospace" }}>
                Mail
              </h4>
              <h4 style={{ color: "#9c27b0", fontFamily: "monospace" }}>
                contact@ministoriz.com
              </h4>
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
