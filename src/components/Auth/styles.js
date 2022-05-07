import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(15),
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    background: "#00675b !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#00675b !important",
    textTransform: "capitalize",
  },
  googleButton: {
    // margin: theme.spacing(5),
  },

  buttonSwitch: {
    border: 0,
    outline: 0,
    backgroundColor: "transparent",
  },
}));
