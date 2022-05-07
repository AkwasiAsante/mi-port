import {
  Button,
  Container,
  Grid,
  Grow,
  Typography,
  Paper,
  AppBar,
  TextField,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "../Form/Modal/Modal";
import Posts from "../Posts/Posts";
import Pagination from "../pagination/Pagination";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from "../../redux/apiCalls/postApiCalls";
import { DynamicFeed } from "@mui/icons-material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const { isPending } = useSelector((state) => state.posts);

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    getPostsBySearch({ search, tags: tags.join(",") }, dispatch);
    if (search.trim() || tags) {
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    if (currentId != 0) {
      setOpen(true);
    }
  }, [currentId]);
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const handleCreatePost = () => {
    setCurrentId(0);
    setOpen(true);
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={10}>
            <Posts setCurrentId={setCurrentId} />

            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={2}>
                <Pagination page={page} type='post' />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography>Quick Links</Typography>
              <Button
                onClick={handleCreatePost}
                className={classes.buttons}
                disabled={isPending}
              >
                <PostAddIcon sx={{ mr: 1 }} />
                Create Post
              </Button>
              <Link to='/posts'>
                <Button className={classes.buttons}>
                  <DynamicFeed sx={{ mr: 1 }} />
                  Posts
                </Button>
              </Link>
              <Link to='/profiles'>
                <Button className={classes.buttons}>
                  <PeopleIcon sx={{ mr: 1 }} />
                  Profiles
                </Button>
              </Link>
              <ModalForm
                open={open}
                setOpen={setOpen}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Paper>

            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
              sx={{ width: "100%" }}
            >
              <TextField
                onKeyDown={handleKeyPress}
                name='search'
                variant='outlined'
                label='Search Post'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </AppBar>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
