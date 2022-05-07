import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    width: "100%",
    margin: 0,
    marginBottom: "1rem",
    display: "flex",
    padding: "8px 10px", //002171
    background: "#00675b !important",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px !important",
    },
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    [theme.breakpoints.down("sm")]: {
      fontsize: "1em",
    },
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    background: "#009688 !important",
  },
  linkButton: {
    color: "#000",
  },
  mobileApp: {
    display: "none !important",
    background: "#fff !important", //263238
    top: "auto",
    bottom: 0,
    // background: "white",
    [theme.breakpoints.down("sm")]: {
      display: "flex !important",
    },
  },
  mobileToolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px !important",
  },
  iconButton: {
    color: "#000a12",
    fontSize: "18px !important",
    fontWeight: "bold",
  },
}));
