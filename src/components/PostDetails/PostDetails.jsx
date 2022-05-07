import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import CommentSection from "./CommentSection";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../redux/apiCalls/postApiCalls";

const PostDetails = () => {
  const { post, posts, isPending } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    getPost(id, dispatch);
  }, [id]);

  useEffect(() => {
    if (post) {
      getPostsBySearch(
        { search: "none", tags: post?.tags?.join(",") },
        dispatch
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isPending) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recommendedPosts = posts[0]?.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography className={classes.title} variant='h3' component='h3'>
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
          >
            {post?.tags?.map((tag, i) => (
              <Link
                key={i}
                to={`/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post?.description}
          </Typography>
          <Typography variant='h6'>
            Posted by:
            <Link
              to={`/creators/${post?.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${post?.name}`}
            </Link>
          </Typography>
          <Typography variant='body1'>
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <Divider style={{ margin: "20px 0" }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>

      {!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(
              (
                { title, name, description, likes, selectedFile, _id },
                index
              ) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id + index}
                >
                  <Typography gutterBottom variant='h6'>
                    {title}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {description?.split(" ").splice(0, 10).join(" ")}...
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    Likes: {likes?.length}
                  </Typography>
                  <img
                    src={
                      selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    width='200px'
                    height='200px'
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
