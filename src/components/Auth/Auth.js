import {
  Container,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Input from "./Input";
import Icon from "./icon";
import useStyles from "./styles";
import { authUser } from "../../redux/userReducer";

import { signUp, signIn } from "../../redux/apiCalls/userApiCalls";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { isPending, isError } = (state) => state.users;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      signUp({ userData: form }, dispatch, navigate);
    } else {
      signIn({ userData: form }, dispatch, navigate);
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(authUser({ data: { result, token } }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  console.log(isPending);
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                  required='required'
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                  required='required'
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
              required='required'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              required='required'
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
                required='required'
              />
            )}
          </Grid>
          <Button
            sx={{ mb: 2, mt: 3 }}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ textTransform: "capitalize" }}
          >
            {isPending ? (
              <CircularProgress size='3em' />
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
            {/* {isSignup ? "Sign Up" : "Sign In"} */}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                sx={{ mb: 2 }}
                className={classes.googleButton}
                color='secondary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={isSignup}
                startIcon={<Icon />}
                variant='contained'
                style={{ textTransform: "capitalize" }}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='center'>
            <Grid item>
              <button
                onClick={switchMode}
                className={classes.buttonSwitch}
                style={{ textTransform: "capitalize" }}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
