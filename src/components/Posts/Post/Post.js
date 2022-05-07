import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  getPost,
  likePost,
  deletePost,
} from "../../../redux/apiCalls/postApiCalls";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    likePost(post._id, dispatch);

    if (hasLikedPost) {
      setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1} others`
            : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    getPost(post._id, dispatch);

    navigate(`/posts/${post._id}`);
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
      raised
      elevation={4}
    >
      <ButtonBase
        component='span'
        name='test'
        style={{
          display: "block",
          textAlign: "initial",
        }}
        onClick={openPost}
      >
        <CardMedia
          style={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
          image={
            post?.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post?.title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant='h6'>{post?.name}</Typography>
          <Typography variant='body2'>
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              color: "white",
            }}
            name='edit'
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post?._id);
              }}
              style={{ color: "white" }}
              size='small'
            >
              <MoreHorizIcon fontSize='default' />
            </Button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 16px",
          }}
        >
          <Typography variant='body2' color='textSecondary' component='h2'>
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          style={{ padding: "0 16px" }}
          gutterBottom
          variant='h5'
          component='h2'
        >
          {post?.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post?.description?.split(" ").splice(0, 10).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        style={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button size='small' color='secondary'>
            <DeleteIcon
              fontSize='small'
              onClick={() => deletePost(post?._id, navigate)}
            />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
