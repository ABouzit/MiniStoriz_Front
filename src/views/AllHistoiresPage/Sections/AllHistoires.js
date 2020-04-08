import React from "react";
import PropTypes from "prop-types";
// react component for creating beautiful carousel
import Slider from "react-slick";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { Link, withRouter } from "react-router-dom";
// core components
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
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
// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Parallax from "components/Parallax/Parallax.js";
import EditIcon from "@material-ui/icons/Edit";
//scroll bare text
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Axios from "axios";
import config from "config/config";
import { Input } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from "moment";
// import Pagination from "components/Pagination/Pagination.js";
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";
// @material-ui/icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PeopleIcon from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TitleIcon from "@material-ui/icons/Title";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import CommentIcon from "@material-ui/icons/Comment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Divider from "@material-ui/core/Divider";
import { subscriber, messageService } from "./../../../services/messageService";

class AllHistoires extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      page: 1,
      pageUsers: 1,
      numberPage: 0,
      numberPageUsers: 0,
      search: "",
      currentFiltre: 1,
      selectedFiltre: "",
      showMore: false,
      showMoreUsers: true,
      commentaire: "",
      ratingText: 0,
      ratingDessin: 0,
      histoires: [],
      histoireUsers: [],
      selectedHistoire: "",
      image: "",
      hidden: false,
      openBackdrop: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.fetchHistoire();
    this.handleOpenBackDrop = this.handleOpenBackDrop.bind(this);
    this.handleCloseBackDrop = this.handleCloseBackDrop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }
  componentDidMount() {
    subscriber.subscribe(v => {
      this.setState({ search: v.search, currentFiltre: v.filtre }, () => {
        this.searchCheck();
      });
    });
  }
  handleChangePage() {
    // this.setState({ page: this.state.page + 1 });
    if (this.state.numberPage == this.state.page) {
      this.setState({ showMore: false });
    }

    if (this.state.search == "") {
      Axios.get(
        config.API_URL +
          "histoires/take/6/" +
          (this.state.page - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/xxxx",
        {}
      ).then(res => {
        this.setState({
          histoires: this.state.histoires.concat(res.data)
        });

        this.forceUpdate();
      });
    } else {
      Axios.get(
        config.API_URL +
          "histoires/take/6/" +
          (this.state.page - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/" +
          this.state.search,
        {}
      ).then(res => {
        this.setState({
          histoires: this.state.histoires.concat(res.data)
        });
        this.forceUpdate();
      });
    }
  }
  handleChangePageUsers() {
    if (this.state.numberPageUsers == this.state.pageUsers) {
      this.setState({ showMoreUsers: false });
    }
    if (this.state.search == "") {
      Axios.get(
        config.API_URL +
          "histoires/takeUsers/6/" +
          (this.state.pageUsers - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/xxxx",
        {}
      ).then(res => {
        this.setState({
          histoireUsers: this.state.histoireUsers.concat(res.data)
        });
        this.forceUpdate();
      });
    } else {
      Axios.get(
        config.API_URL +
          "histoires/takeUsers/6/" +
          (this.state.pageUsers - 1) * 6 +
          "/" +
          this.state.currentFiltre +
          "/" +
          this.state.search,
        {}
      ).then(res => {
        this.setState({
          histoireUsers: this.state.histoireUsers.concat(res.data)
        });
        this.forceUpdate();
      });
    }
  }
  fetchHistoire() {
    console.log("URL api" + config.API_URL);
    Axios.get(
      config.API_URL +
        "histoires/take/6/" +
        (this.state.page - 1) * 6 +
        "/1/xxxx",
      {}
    ).then(res => {
      this.setState({ histoires: res.data, showMore: true });
    });
    Axios.get(config.API_URL + "histoires/numberHistoires", {}).then(res => {
      this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
        if (res.data <= 6) {
          this.setState({ showMore: false });
        }
      });
    });
  }
  handleChange = e => {
    this.setState({ selectedFiltre: e.target.value });
    console.log(this.state.selectedFiltre);
  };
  searchCheck() {
    this.setState({ page: 1, showMore: true }, () => {
      if (this.state.currentFiltre == 1) {
        if (this.state.search !== "") {
          this.setState({ histoireUsers: [] });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearch/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMore: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearchUsers/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPageUsers: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMoreUsers: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/takeUsers/6/" +
              (this.state.pageUsers - 1) * 6 +
              "/1/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoireUsers: res.data });
          });
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) +
              "/" +
              this.state.currentFiltre +
              "/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 1 });
            this.forceUpdate();
            console.log(this.state.histoires);
          });
        }
        if (this.state.search === "") {
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) +
              "/" +
              this.state.currentFiltre +
              "/xxxx",
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 1 });
            this.forceUpdate();
            console.log(this.state.histoires);
          });
          Axios.get(config.API_URL + "histoires/numberHistoires", {}).then(
            res => {
              this.setState(
                {
                  numberPage: Math.ceil(res.data / 6),
                  histoireUsers: []
                },
                () => {
                  if (res.data <= 6) {
                    this.setState({ showMore: false });
                  }
                }
              );
            }
          );
        }
      } else if (this.state.currentFiltre == 2) {
        if (this.state.search !== "") {
          this.setState({ histoireUsers: [] });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearch/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMore: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearchUsers/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPageUsers: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMoreUsers: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/takeUsers/6/" +
              (this.state.pageUsers - 1) * 6 +
              "/2/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoireUsers: res.data });
          });
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 2 });
            this.forceUpdate();
          });
        }
        if (this.state.search === "") {
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/xxxx",
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 2 });
            this.forceUpdate();
          });
          Axios.get(config.API_URL + "histoires/numberHistoires", {}).then(
            res => {
              this.setState(
                {
                  numberPage: Math.ceil(res.data / 6),
                  histoireUsers: []
                },
                () => {
                  if (res.data <= 6) {
                    this.setState({ showMore: false });
                  }
                }
              );
            }
          );
        }
      } else if (this.state.currentFiltre == 3) {
        if (this.state.search !== "") {
          this.setState({ histoireUsers: [] });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearch/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMore: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearchUsers/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPageUsers: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMoreUsers: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/takeUsers/6/" +
              (this.state.pageUsers - 1) * 6 +
              "/3/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoireUsers: res.data });
          });
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 3 });
            this.forceUpdate();
          });
        }
        if (this.state.search === "") {
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/xxxx",
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 3 });
            this.forceUpdate();
          });
          Axios.get(config.API_URL + "histoires/numberHistoires", {}).then(
            res => {
              this.setState(
                {
                  numberPage: Math.ceil(res.data / 6),
                  histoireUsers: []
                },
                () => {
                  if (res.data <= 6) {
                    this.setState({ showMore: false });
                  }
                }
              );
            }
          );
        }
      } else if (this.state.currentFiltre == 4) {
        if (this.state.search !== "") {
          this.setState({ histoireUsers: [] });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearch/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPage: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMore: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/numberHistoiresSearchUsers/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ numberPageUsers: Math.ceil(res.data / 6) }, () => {
              if (res.data <= 6) {
                this.setState({ showMoreUsers: false });
              }
            });
          });
          Axios.get(
            config.API_URL +
              "histoires/takeUsers/6/" +
              (this.state.pageUsers - 1) * 6 +
              "/4/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoireUsers: res.data });
          });
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/" +
              this.state.search,
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 4 });
            this.forceUpdate();
          });
        }
        if (this.state.search === "") {
          Axios.get(
            config.API_URL +
              "histoires/take/6/" +
              (this.state.page - 1) * 6 +
              "/" +
              this.state.currentFiltre +
              "/xxxx",
            {}
          ).then(res => {
            this.setState({ histoires: res.data, currentFiltre: 4 });
            this.forceUpdate();
          });
          Axios.get(config.API_URL + "histoires/numberHistoires", {}).then(
            res => {
              this.setState(
                {
                  numberPage: Math.ceil(res.data / 6),
                  histoireUsers: []
                },
                () => {
                  if (res.data <= 6) {
                    this.setState({ showMore: false });
                  }
                }
              );
            }
          );
        }
      }
    });
  }
  handleVisibility = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleOpenBackDrop = () => {
    this.setState({ openBackdrop: true });
  };

  handleCloseBackDrop = () => {
    this.setState({ openBackdrop: false });
  };
  handleCheck(e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setState({ currentFiltre: 1 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });

      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 2) {
      this.setState({ currentFiltre: 2 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 3) {
      this.setState({ currentFiltre: 3 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    } else if (e.currentTarget.dataset.id == 4) {
      this.setState({ currentFiltre: 4 }, () => {
        this.searchCheck();
        this.forceUpdate();
      });
      if (this.state.search !== "") {
        Axios.get(
          config.API_URL +
            "histoires/takeUsers/6/" +
            (this.state.pageUsers - 1) * 6 +
            "/1/" +
            this.state.search,
          {}
        ).then(res => {
          this.setState({ histoireUsers: res.data });
        });
      }
    }
  }
  redirectFunction(index) {
    this.props.history.push("/publier/" + (index + 1));
  }

  //modal - carousel
  render() {
    const { settings, modal } = this.state;
    const { classes } = this.props;
    const actions = [
      {
        icon: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BrushIcon
              style={{
                position: "absolute",
                right: 0,
                height: 40,
                width: 18
              }}
            />
            &
            <EditIcon
              style={{ position: "absolute", left: 0, height: 40, width: 18 }}
            />
          </div>
        ),
        name: "Text et Dessins"
      },
      { icon: <BrushIcon />, name: "Dessins uniquement" },
      { icon: <EditIcon />, name: "Texte uniquement" }
    ];

    if (this.state.histoires !== [])
      return (
        <div className={classes.section} style={{ width: "99%" }}>
          <div className={classes.root}>
            <Backdrop open={this.state.openBackdrop} style={{ zIndex: 2000 }} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              style={{
                position: "fixed",
                bottom: 30,
                right: 30,
                zIndex: 2001
              }}
              hidden={this.state.hidden}
              icon={<SpeedDialIcon />}
              onClose={this.handleCloseBackDrop}
              onOpen={this.handleOpenBackDrop}
              open={this.state.openBackdrop}
            >
              {actions.map((action, index) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={() => this.redirectFunction(index)}
                />
              ))}
            </SpeedDial>
          </div>
          {this.state.search === "" ? (
            <div>
              <GridContainer justify="center" spacing={"auto"}>
                {this.state.histoires.map((histoire, index) => {
                  return (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={4}
                      justify="center"
                      key={index}
                    >
                      <Link to={"/Histoire/" + histoire.id}>
                        <CardHistoire histoire={histoire} />
                      </Link>
                    </GridItem>
                  );
                })}
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={4} sm={4} md={4}>
                  {this.state.showMore ? (
                    <Tooltip
                      title="plus de résultats"
                      aria-label="plus de résultats"
                      onClick={() => {
                        this.setState({ page: this.state.page + 1 }, () => {
                          this.handleChangePage();
                        });
                      }}
                    >
                      <Fab color="primary" className={classes.fab}>
                        <MoreHorizIcon />
                      </Fab>
                    </Tooltip>
                  ) : null}
                </GridItem>
              </GridContainer>
            </div>
          ) : (
            <div style={{ marginTop: "6%" }}>
              {/* <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h3 className={classes.title}>
                  LES HISTOIRES PAR TITRE 
                </h3>
              </GridItem>
            </GridContainer> */}
              <GridContainer justify="center">
                <GridItem xs={11} sm={11} md={12}>
                  <CustomTabs
                    variant="fullWidth"
                    headerColor="info"
                    value={2}
                    tabs={[
                      {
                        tabName: "LES HISTOIRES PAR TITRE",
                        tabIcon: TitleIcon,
                        tabContent: (
                          <div style={{ minHeight: 1280 }}>
                            <GridContainer justify="center" spacing={"auto"}>
                              {this.state.histoires.length > 0 ? (
                                this.state.histoires.map((histoire, index) => {
                                  return (
                                    <GridItem
                                      xs={12}
                                      sm={12}
                                      md={4}
                                      justify="center"
                                      key={index}
                                    >
                                      <Link to={"/Histoire/" + histoire.id}>
                                        <CardHistoire histoire={histoire} />
                                      </Link>
                                    </GridItem>
                                  );
                                })
                              ) : (
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  justify="center"
                                  style={{ width: "auto" }}
                                >
                                  <SnackbarContent
                                    message={
                                      "aucun résultat correspond à votre recherche."
                                    }
                                  />
                                </GridItem>
                              )}
                            </GridContainer>
                            <GridContainer justify="center">
                              <GridItem xs={4} sm={4} md={4}>
                                {this.state.showMore ? (
                                  <Tooltip
                                    title="plus de résultats"
                                    aria-label="plus de résultats"
                                    onClick={() => {
                                      this.setState(
                                        { page: this.state.page + 1 },
                                        () => {
                                          this.handleChangePage();
                                        }
                                      );
                                    }}
                                  >
                                    <Fab
                                      color="primary"
                                      className={classes.fab}
                                    >
                                      <MoreHorizIcon />
                                    </Fab>
                                  </Tooltip>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                          </div>
                        )
                      },
                      {
                        tabName: "LES HISTOIRES PAR UTILISATEUR",
                        tabIcon: AccountBoxIcon,
                        tabContent: (
                          <div style={{ minHeight: 1280 }}>
                            <GridContainer justify="center" spacing={"auto"}>
                              {this.state.histoireUsers.length > 0 ? (
                                this.state.histoireUsers.map(
                                  (histoire, index) => {
                                    return (
                                      <GridItem
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        justify="center"
                                        key={index}
                                      >
                                        <Link to={"/Histoire/" + histoire.id}>
                                          <CardHistoire histoire={histoire} />
                                        </Link>
                                      </GridItem>
                                    );
                                  }
                                )
                              ) : (
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  justify="center"
                                  style={{ width: "auto" }}
                                >
                                  <SnackbarContent
                                    message={
                                      "aucun résultat correspond à votre recherche."
                                    }
                                  />
                                </GridItem>
                              )}
                            </GridContainer>
                            <GridContainer justify="center" spacing={"auto"}>
                              <GridItem
                                xs={4}
                                sm={4}
                                md={4}
                                justify="center"
                                alignItems="center"
                              >
                                {this.state.showMoreUsers ? (
                                  <Tooltip
                                    title="plus de résultats"
                                    aria-label="plus de résultats"
                                    onClick={() => {
                                      this.setState(
                                        { pageUsers: this.state.pageUsers + 1 },
                                        () => {
                                          this.handleChangePageUsers();
                                        }
                                      );
                                    }}
                                  >
                                    <Fab
                                      color="primary"
                                      className={classes.fab}
                                    >
                                      <MoreHorizIcon />
                                    </Fab>
                                  </Tooltip>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                          </div>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          )}
          {/* <GridContainer justify="center" style={{ marginTop: 20 }}>
            <GridItem xs={12} sm={12} md={4} style={{ width: "auto" }}>
              <Link to="/">
                <Button
                  color="white"
                  style={{ color: "rgb(89, 79, 118)", fontWeight: "bold" }}
                  href="http://localhost:3000/"
                >
                  Retour
                </Button>
              </Link>
            </GridItem>
          </GridContainer> */}
        </div>
      );
    else return <p>mazal matchargat</p>;
  }
}

function dateNew(date) {
  return new Date(date);
}
function CardHistoire(props) {
  const { histoire } = props;
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return (
    <Card style={{ backgroundColor: "white" }}>
      <div
        style={{
          height: "240px",
          width: "100%",
          textAlign: "center",
          display: "block"
        }}
      >
        <Parallax
          image={
            histoire.lienIllustration !== null ? histoire.lienIllustration : ""
          }
          style={{
            height: "240px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        ></Parallax>
        {/* <img
            style={{
              height: "240px",
              maxWidth: "320px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            className={classes.imgCardTop}
            src={
              histoire.lienIllustration !== null
                ?  histoire.lienIllustration
                : ""
            }
            alt={histoire.titreHistoire}
          /> */}
      </div>

      <h5
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          color: "black",
          marginLeft: "5%",
          textAlign: "left"
        }}
      >
        {histoire.titreHistoire}
        {/* {histoire.nombreVue ? histoire.nombreVue : 0} vues -{" "}
          {this.getDay(histoire.dateDeCreation)} */}
      </h5>
      <h6
        style={{
          fontFamily: "monospace",
          color: "black",
          marginLeft: "5%",
          textAlign: "left"
        }}
      >
        {dateNew(histoire.dateDeCreation).toLocaleDateString(
          "fr-FR",
          dateFormat
        )}
        {/* {this.getDay(histoire.dateDeCreation)} */}
      </h6>
      <CardBody>
        <Divider />
        <GridContainer style={{ marginTop: "4%" }}>
          <GridItem xs={6} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <Avatar
                  alt=""
                  src={histoire.userText.lienPhoto}
                  // style={{ width: 200, height: 200 }}
                />
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <h6
                  style={{
                    fontFamily: "monospace",
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "5%",
                    textAlign: "left"
                  }}
                >
                  {histoire.userText.pseudo}
                </h6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <div style={{ width: 40 }}>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title={
                  histoire.noteHistoireMoy
                    ? parseFloat(
                        Math.round(histoire.noteHistoireMoy * 100) / 100
                      ).toFixed(2) + "/5"
                    : 0
                }
              >
                <ButtonBase>
                  <CircularProgressbarWithChildren
                    maxValue={5}
                    minValue={0}
                    strokeWidth={3}
                    value={parseFloat(
                      Math.round(histoire.noteHistoireMoy * 100) / 100
                    ).toFixed(2)}
                    text={parseFloat(
                      Math.round(histoire.noteHistoireMoy * 100) / 100
                    ).toFixed(1)}
                    styles={buildStyles({
                      textColor: "transparent",
                      pathColor: "#df6c4f",
                      trailColor: "#d6d6d6",
                      strokeLinecap: "butt"
                    })}
                  >
                    <div
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex"
                      }}
                    >
                      <p
                        style={{
                          color: "#df6c4f",
                          fontSize: 15,
                          margin: 0
                        }}
                      >
                        {parseFloat(
                          Math.round(histoire.noteHistoireMoy * 100) / 100
                        ).toFixed(1)}
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                </ButtonBase>
              </Tooltip>
            </div>
          </GridItem>
          <GridItem xs={3} sm={3} md={3} style={{ textAlign: "right" }}>
            <div style={{ height: 40, paddingTop: 8 }}>
              <CreateIcon style={{ width: 20 }} />
            </div>
          </GridItem>
        </GridContainer>
        <Divider style={{ marginTop: "4%" }} />
        <GridContainer style={{ marginTop: "4%" }}>
          <GridItem xs={6} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <Avatar
                  alt=""
                  src={histoire.userDessin.lienPhoto}
                  // style={{ width: 200, height: 200 }}
                />
              </GridItem>
              <GridItem xs={8} sm={8} md={8}>
                <h6
                  style={{
                    fontFamily: "monospace",
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "5%",
                    textAlign: "left"
                  }}
                >
                  {histoire.userDessin.pseudo}
                </h6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <div style={{ width: 40 }}>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title={
                  histoire.noteHistoireMoy
                    ? parseFloat(
                        Math.round(histoire.noteDessinMoy * 100) / 100
                      ).toFixed(2) + "/5"
                    : 0
                }
              >
                <ButtonBase>
                  <CircularProgressbarWithChildren
                    text={parseFloat(
                      Math.round(histoire.noteDessinMoy * 100) / 100
                    ).toFixed(1)}
                    maxValue={5}
                    minValue={0}
                    strokeWidth={3}
                    value={parseFloat(
                      Math.round(histoire.noteDessinMoy * 100) / 100
                    ).toFixed(2)}
                    styles={buildStyles({
                      textColor: "transparent",
                      pathColor: "#1a99aa",
                      trailColor: "#d6d6d6",
                      strokeLinecap: "butt"
                    })}
                  >
                    <div
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex"
                      }}
                    >
                      <p
                        style={{
                          color: "#1a99aa",
                          fontSize: 15,
                          margin: 0
                        }}
                      >
                        {parseFloat(
                          Math.round(histoire.noteDessinMoy * 100) / 100
                        ).toFixed(1)}
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                </ButtonBase>
              </Tooltip>
            </div>
          </GridItem>
          <GridItem xs={3} sm={3} md={3} style={{ textAlign: "right" }}>
            <div style={{ height: 40, paddingTop: 8 }}>
              {" "}
              <BrushIcon style={{ width: 20 }} />
            </div>{" "}
          </GridItem>
        </GridContainer>
        <Divider
          style={{ marginTop: "4%", marginLeft: -30, marginRight: -30 }}
        />
        <GridContainer justify="flex-end" style={{ marginTop: "7%" }}>
          <GridItem xs={4} sm={4} md={4}>
            <small>
              <CommentIcon style={{ width: 20 }} /> {histoire.nombreComment}
            </small>{" "}
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <small>
              <VisibilityIcon style={{ width: 20 }} /> {histoire.nombreVue}
            </small>{" "}
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

AllHistoires.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(AllHistoires));
