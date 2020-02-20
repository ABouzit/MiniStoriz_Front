import React from "react";
import PropTypes from "prop-types";
import "simplebar/dist/simplebar.min.css";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
class Echanger extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }

  //modal - carousel
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title} style={Styles.title}>
              ECHANGER
            </h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end">
          <GridItem xs={4} sm={4} md={2}></GridItem>
        </GridContainer>
      </div>
    );
  }
}
const Styles = {
  title: {
  }
};
Echanger.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Echanger);
