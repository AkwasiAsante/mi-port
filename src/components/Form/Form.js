import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../redux/apiCalls/postApiCalls";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    state?.posts?.postInfo?.find((pst) => pst?._id === currentId)
  );
  const { isPending } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const navigate = useNavigate();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", description: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    if (currentId === 0) clear();
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      createPost({ ...postData, name: user?.result?.name }, dispatch, navigate);
      // clear();
    } else {
      updatePost(
        currentId,
        { ...postData, name: user?.result?.name },
        dispatch,
        navigate
      );
      // clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={0}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own post and like other's post.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? `Editing "${post?.title}"` : "Create a Post"}
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title
            .toLowerCase()
            .replace(/\b(\w)/g, (x) => x.toUpperCase())}
          required
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='description'
          variant='outlined'
          label='Description'
          fullWidth
          multiline
          minRows={4}
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name='tags'
            variant='outlined'
            label='Tags'
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
          sx={{ textTransform: "capitalize" }}
        >
          {isPending ? (
            <CircularProgress size='2em' color={"inherit"} />
          ) : (
            "Create Post"
          )}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          onClick={clear}
          fullWidth
          sx={{
            textTransform: "capitalize",
            // color: "black",
            // backgroundColor: "transparent",
            // hover: "transparent",
          }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
