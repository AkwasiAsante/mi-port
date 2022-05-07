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
import Pagination from "../pagination/Pagination";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Profiles from "./Profiles";
import { getProfileBySearch } from "../../redux/apiCalls/profileApiCalls";
import ModalForm from "../Form/Modal/Modal";
import ChipInput from "material-ui-chip-input";
import { DynamicFeed } from "@mui/icons-material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfileHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const { isPending } = useSelector((state) => state.posts);

  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const searchProfiles = () => {
    getProfileBySearch({ search, skills: skills.join(",") }, dispatch);

    if (search.trim() || skills) {
      navigate(
        `/profiles/search?searchQuery=${search || "none"}&skills=${skills.join(
          ","
        )}`
      );
    } else {
      navigate("/profiles");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProfiles();
    }
  };
  const handleCreatePost = () => {
    setCurrentId(0);
    setOpen(true);
  };
  const handleAddChip = (skill) => setSkills([...skills, skill]);

  const handleDeleteChip = (chipToDelete) =>
    setSkills(skills.filter((skill) => skill !== chipToDelete));

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
            <Profiles setCurrentId={setCurrentId} />

            {!searchQuery && (
              <Paper className={classes.pagination} elevation={2}>
                <Pagination page={page} type='people' />
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
                label='Search Profile'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={skills}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label='Search Skills'
                variant='outlined'
              />
              <Button
                onClick={searchProfiles}
                className={classes.searchButton}
                sx={{ mt: 2 }}
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

export default ProfileHome;
