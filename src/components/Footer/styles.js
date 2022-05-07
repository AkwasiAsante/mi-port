import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  footer: {
    width: "100%",
    background: "#00675b", // !important",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6rem",
    },
  },
  container: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    color: "#fff",
    paddingTop: "50px",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "6rem",
    },
  },
}));
