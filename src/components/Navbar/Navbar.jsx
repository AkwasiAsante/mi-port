import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
  Fab,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../assets/mg.png";
import { styled } from "@mui/material/styles";
import { logoutUser } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import ModalForm from "../Form/Modal/Modal";

const settings = ["Profile", "My Post", "Logout"];

const Navbar = () => {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const { isPending } = useSelector((state) => state.posts);
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setCurrentId(0);
    setAnchorElUser(null);
  };
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#00675b",
    "&:hover": {
      backgroundColor: "#00675b",
    },
  });

  const logout = () => {
    dispatch(logoutUser());
    setUser(null);
    handleCloseUserMenu();
    navigate("/");
  };

  const handleCreatePost = () => {
    setCurrentId(0);
    setOpen(true);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("userProfile")));
  }, [location]);

  return (
    <>
      <AppBar
        position='static'
        className={classes.appBar}
        sx={{ padding: "0px" }}
      >
        <Container maxWidth='xl' sx={{ padding: "0px" }}>
          <Toolbar className={classes.toolBar}>
            <Link className={classes.logo} to='/'>
              <Avatar alt='logo' src={logo} sx={{ mr: 1 }} />
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ color: "white" }}
              >
                MI-PORT
              </Typography>
            </Link>
            {user?.result ? (
              <Box sx={{ flexGrow: 0 }} className={classes.userInfo}>
                <Typography variant='h6' sx={{ mr: 2 }}>
                  {user?.result.name.split(" ")[0]}
                </Typography>
                <Tooltip title='User Menu'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.result.name}
                      src={user?.result.imageUrl}
                      style={{ background: "black" }}
                    >
                      {user?.result.name.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar
                      alt='user'
                      src={user?.result.imageUrl}
                      sx={{ mr: 1 }}
                    />
                    <Typography
                      textAlign='center'
                      style={{ fontWeight: "bold" }}
                    >
                      {user?.result.name}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <Link
                    to={`/profile/${user?.result._id || user.result.googleId}`}
                    className={classes.linkButton}
                  >
                    <MenuItem onClick={handleCloseUserMenu} color='black'>
                      <Typography textAlign='center'>Profile</Typography>
                    </MenuItem>
                  </Link>

                  <Link
                    to={`/creators/${user?.result?.name}`}
                    className={classes.linkButton}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>My Post</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleCloseUserMenu} disabled>
                    <Link
                      to='/profile/add-update'
                      className={classes.linkButton}
                    >
                      <Typography textAlign='center'>Update Profile</Typography>
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={Link}
                to='/auth'
                variant='contained'
                className={classes.button}
                // color='secondary'
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Container>
        {/* MOBILE TAB  */}
      </AppBar>
      {user?.result && (
        <AppBar
          position='fixed'
          color='primary'
          sx={{ top: "auto", bottom: 0 }}
          className={classes.mobileApp}
        >
          <Toolbar className={classes.mobileToolbar}>
            <Link to='/profiles'>
              <IconButton
                onClick={() => setSelectedTab(1)}
                className={classes.iconButton}
                // sx={selectedTab === 1 ? { color: "#00675b" } : ""}
              >
                <PeopleIcon sx={{ mr: 1 }} />
                Profiles
              </IconButton>
            </Link>
            <StyledFab
              color='primary'
              aria-label='add'
              onClick={handleCreatePost}
              disabled={isPending}
            >
              <AddIcon />
            </StyledFab>
            <Link to='/posts'>
              <IconButton
                onClick={() => setSelectedTab(0)}
                className={classes.iconButton}
                // sx={selectedTab === 0 ? { color: "#00675b" } : ""}
              >
                <PostAddIcon sx={{ mr: 1 }} />
                Post
              </IconButton>
            </Link>
          </Toolbar>
          <ModalForm
            open={open}
            setOpen={setOpen}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
