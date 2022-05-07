import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import {
  getPostsByCreator,
  getPostsBySearch,
} from "../../redux/apiCalls/postApiCalls";

import useStyles from "./styles";
import ModalForm from "../Form/Modal/Modal";

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { creatorPost, isPending } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const location = useLocation();
  const classes = useStyles();
  const [type, setType] = useState("tags");
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      getPostsBySearch({ tags: name }, dispatch);
      setType("tags");
    } else {
      getPostsByCreator(name, dispatch);
      setType("creator");
    }
  }, [name]);

  useEffect(() => {
    if (currentId != 0) {
      setOpen(true);
    }
  }, [currentId]);

  if (!creatorPost?.length && !isPending) return "No posts";

  return (
    <div>
      <div>
        <Typography variant='h2' className={classes.title}>
          {name === user?.result?.name ? "My Dashboard" : name}
        </Typography>
        {creatorPost?.length && (
          <p className={classes.subText}>
            {type === "creator"
              ? name === user?.result?.name
                ? creatorPost?.length + " Post(s) created"
                : creatorPost?.length + " Post(s) by this creator"
              : creatorPost?.length + " Post Avaliable"}
          </p>
        )}
      </div>
      <Divider style={{ margin: "20px 0 50px 0" }} />
      {isPending ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems='stretch' spacing={3}>
          {creatorPost?.map((post) => (
            <Grid key={post?._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
      <ModalForm
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default CreatorOrTag;
