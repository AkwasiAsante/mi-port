import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    border: "none",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: "10px !important",
    marginTop: "15px !important",
    textTransform: "capitalize",
    background: "#00675b !important",
  },
  buttons: {
    display: "flex",
    marginTop: 20,
  },
}));
