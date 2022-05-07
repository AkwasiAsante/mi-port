import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
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
