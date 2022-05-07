import React, { useState } from "react";
import { Grid, CircularProgress, Container, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import ProfileCard from "./ProfileCard/ProfileCard";
import useStyles from "./styles";
import Pagination from "../pagination/Pagination";
import { useLocation } from "react-router-dom";

const Profiles = ({ setCurrentId }) => {
  const { profiles, isLoading } = useSelector((state) => state.profiles);
  const classes = useStyles();

  if (!profiles?.length && !isLoading) return "No Profile Found !";

  return isLoading ? (
    <Container className={classes.progressContainer}>
      <CircularProgress />
    </Container>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {profiles?.map((profile) => (
        <Grid key={profile._id} item xs={12} sm={12} md={6} lg={4}>
          <ProfileCard profile={profile} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Profiles;
