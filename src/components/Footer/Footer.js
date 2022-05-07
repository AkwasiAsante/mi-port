import { AppBar, Container, Typography } from "@mui/material";
import useStyles from "./styles";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <Typography sx={{ display: "flex", align: "center" }}>
          <LaptopChromebookIcon sx={{ mr: 2 }} />
          Mi-Portfolio
        </Typography>
        <Typography>MTech Solutions @ 2022</Typography>
        <Typography>All Right Reserved</Typography>
      </div>
    </div>
  );
};

export default Footer;
