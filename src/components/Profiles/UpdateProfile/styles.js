import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(13),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    height: "90px !important",
    width: "90px !important",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  fileInput: {
    width: "97%",
    margin: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column !important",
    },
  },
  containerLeft: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  containerRight: {
    flex: 1,
  },
}));
