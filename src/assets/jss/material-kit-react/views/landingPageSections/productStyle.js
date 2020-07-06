import { title } from "assets/jss/material-kit-react.js";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999"
  },
  card: {
    minHeight: "100px",
    maxHeight: "100px",
    width: "100%"
  },
  messageTab: {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    height: "60px"
  },
  buttonFB: {
    width: 235,
    height:35,
    borderRadius: 4,
    background: '#3b5998',
    color:'white',
    border:'0px transparent',  
    textAlign: 'center',
    margin:5,
    display: 'inline-block',

    '&:hover':{
        background: '#3b5998',
        opacity: 0.6,
    }
  },
  buttonGoogle: {
    margin:5,
    width: 235,
    marginTop: 5,
    height:35,
    borderRadius: 4,
    background: '#db3236',
    color:'white',
    border:'0px transparent',
    textAlign: 'center',

    '&:hover':{
        background: '#3b5998',
        opacity: 0.6,
    }
  }
};

export default productStyle;
