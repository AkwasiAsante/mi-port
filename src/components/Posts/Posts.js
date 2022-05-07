import React, { useState } from "react";
import { Grid, CircularProgress, Container, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { postInfo, isPending } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!postInfo?.length && !isPending) return "No posts";

  return isPending ? (
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
      {postInfo?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
