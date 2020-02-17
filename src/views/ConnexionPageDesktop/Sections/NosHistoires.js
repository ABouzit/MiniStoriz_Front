import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";

const useStyles = makeStyles(styles);

export default function NosHistoires() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>NOS HISTOIRES</h2>
        </GridItem>
      </GridContainer>
      <GridContainer justify="flex-end">
        <GridItem xs={4} sm={4} md={2}>
          <CustomDropdown
            buttonText="Regular"
            dropdownList={["Action", "Another action", "Something else here"]}
          />
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer justify="center" spacing={"auto"}>
          <GridItem
            xs={12}
            sm={12}
            md={4}
            justify="center"
            style={{ width: "auto" }}
          >
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "20rem"
              }}
            >
              <Card style={{ width: "20rem" }}>
                <h4 className={classes.cardTitle}>Card title</h4>
                <img
                  style={{ height: "180px", width: "100%", display: "block" }}
                  className={classes.imgCardTop}
                  src={require("assets/img/landing-bg.jpg")}
                  alt="Card-img-cap"
                />
                <h5>135 vues - 3 jours</h5>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={3} readOnly />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={4} readOnly />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </ButtonBase>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={4}
            justify="center"
            style={{ width: "auto" }}
          >
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "20rem"
              }}
            >
              <Card style={{ width: "20rem" }}>
                <h4 className={classes.cardTitle}>Card title</h4>
                <img
                  style={{ height: "180px", width: "100%", display: "block" }}
                  className={classes.imgCardTop}
                  src={require("assets/img/landing-bg.jpg")}
                  alt="Card-img-cap"
                />
                <h5>135 vues - 3 jours</h5>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={3} readOnly />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={4} readOnly />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </ButtonBase>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={4}
            justify="center"
            style={{ width: "auto" }}
          >
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "20rem"
              }}
            >
              <Card style={{ width: "20rem" }}>
                <h4 className={classes.cardTitle}>Card title</h4>
                <img
                  style={{ height: "180px", width: "100%", display: "block" }}
                  className={classes.imgCardTop}
                  src={require("assets/img/landing-bg.jpg")}
                  alt="Card-img-cap"
                />
                <h5>135 vues - 3 jours</h5>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={3} readOnly />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <p>Histoire par pseudo1</p>
                      <Rating name="read-only" value={4} readOnly />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </ButtonBase>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end">
          <GridItem xs={4} sm={4} md={2}>
            <Button color="primary">Toutes les histoires</Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
