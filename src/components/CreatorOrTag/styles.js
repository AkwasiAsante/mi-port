import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em !important",
      fontWeight: "500 !important",
    },
  },
  subText: {
    color: "grey",
  },
}));
