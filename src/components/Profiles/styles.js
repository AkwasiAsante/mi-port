import { makeStyles } from "@mui/styles";
// import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  container: {
    marginBottom: "20px",
    marginTop: "-15px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  progressContainer: {},

  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    marginTop: "1rem",
    display: "flex",
    padding: "16px",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "6rem",
    },
    // [theme.breakpoints.down("xs")]: {
    //   marginBottom: "60rem",
    // },
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse !important",
    },
  },
  buttons: {
    textTransform: "capitalize !important",
  },
}));
