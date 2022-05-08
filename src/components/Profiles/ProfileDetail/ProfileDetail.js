import {
  Edit,
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  Search,
  Close,
  Verified,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getProfile,
  getProfileBySearch,
  verifiedAccount,
} from "../../../redux/apiCalls/profileApiCalls";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./profiledetail.css";

const ProfileDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, recomendProfiles } = useSelector(
    (state) => state.profiles
  );
  const user = JSON.parse(localStorage.getItem("userProfile"));

  const [currentUser, setCurrentUserd] = useState(
    user?.result?._id ? user?.result?._id : user?.result?.googleId
  );
  const [showSearch, setShowSearch] = useState(false);
  const userId = location.pathname.split("/")[2];
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(true);
  const [alertMe, setAlertMe] = useState(false);

  useEffect(() => {
    getProfile(userId, dispatch);
  }, [userId]);

  useEffect(() => {
    if (profile) {
      getProfileBySearch(
        { search: "none", skills: profile?.skills?.join(",") },
        dispatch
      );
    }
  }, [profile]);

  const handleSearch = () => {
    getProfile(searchValue, dispatch);
  };
  const recommendedProfiles = recomendProfiles[0]?.filter(
    ({ _id }) => _id !== profile?._id
  );
  const handleSearchProfile = () => {
    handleSearch(searchValue);
    setAlertMe(true);
  };
  const handleVerifyAccount = () => {
    verifiedAccount(profile._id, currentUser, dispatch);
  };

  return (
    <div className='profile-detail'>
      {isLoading ? (
        <Container className='progressContainer'>
          <CircularProgress size='4em' />
        </Container>
      ) : (
        <>
          {profile ? (
            <Container>
              {alertMe ? (
                <Collapse in={open}>
                  <Alert
                    action={
                      <>
                        <IconButton
                          aria-label='close'
                          color='inherit'
                          size='medium'
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <Close fontSize='inherit' />
                        </IconButton>
                      </>
                    }
                    sx={{ mb: 2 }}
                    variant='filled'
                    severity='info'
                  >
                    Please kindly verify that this information belongs to you,
                    then click on Verified Account. Thank you!
                    <IconButton
                      color='inherit'
                      size='small'
                      onClick={handleVerifyAccount}
                      sx={{ ml: 3, bgColor: "#00675b !important" }}
                    >
                      <Verified fontSize='inherit' />
                      Verified Account
                    </IconButton>
                  </Alert>
                </Collapse>
              ) : null}

              <Grid
                container
                justifyContent='space-between'
                alignItems='center'
                spacing={3}
              >
                <Grid
                  item
                  lg={12}
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{ mb: -1, mt: 2 }}
                >
                  <Paper elevation={3} className='profile-top'>
                    <Avatar
                      src={profile?.selectedFile}
                      alt=''
                      sx={{ width: 64, height: 64 }}
                    />
                    <Typography className='title'>Profile Details</Typography>
                    {currentUser === profile?.userId && (
                      <Link to='/profile/add-update'>
                        <Edit sx={{ color: "#00acee" }} />
                      </Link>
                    )}
                  </Paper>
                </Grid>
                <Grid item lg={4} sm={12} xs={12} md={6}>
                  <Paper
                    className='profile-paper'
                    elevation={4}
                    sx={{ padding: 3 }}
                  >
                    <Typography className='profile-title'>
                      Personal Information
                    </Typography>
                    <Divider />
                    <Typography>
                      Name:{" "}
                      {profile?.firstName && (
                        <b>{`${profile?.firstName} ${profile?.lastName}`}</b>
                      )}
                    </Typography>
                    <Divider />
                    <Typography>
                      Popular Name: <b> {profile?.popularName}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Gender: <b>{profile?.gender}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Mobile #: <b>{profile?.phone}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Email: <b>{profile?.email}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Address: <b>{profile?.address}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Profession: <b>{profile?.profession}</b>
                    </Typography>
                    <Divider />
                  </Paper>
                </Grid>
                <Grid item lg={4} sm={12} xs={12} md={6}>
                  <Paper
                    className='profile-paper'
                    elevation={4}
                    sx={{ padding: 3 }}
                  >
                    <Typography className='profile-title'>
                      Church Information
                    </Typography>
                    <Divider />
                    <Typography>
                      Church: <b>{profile?.church}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      AY Class: <b>{profile?.ayclasses}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Position: <b>{profile?.position}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      <b>Branch(s):</b>
                    </Typography>
                    {profile?.branch?.map((b, index) => (
                      <Typography key={index}>
                        <b>#</b>
                        {` ${b}`}
                      </Typography>
                    ))}

                    <Divider />
                  </Paper>
                </Grid>
                <Grid item lg={4} sm={12} xs={12} md={6}>
                  <Paper
                    className='profile-paper'
                    elevation={4}
                    sx={{ padding: 3 }}
                  >
                    <Typography className='profile-title'>
                      Other Information
                    </Typography>
                    <Divider />
                    <Typography>
                      Parent Name: <b>{profile?.parentName}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Contact #: <b>{profile?.contact}</b>
                    </Typography>
                    <Divider />
                    <Typography>
                      Relation: <b>{profile?.relation}</b>
                    </Typography>
                    <Divider />
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <WhatsApp sx={{ color: "green", mr: 2 }} />{" "}
                      <b>{profile?.whatsApp}</b>
                    </Typography>
                    <Divider />
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Twitter sx={{ color: "#00acee", mr: 2 }} />{" "}
                      <b>{profile?.twitter}</b>
                    </Typography>
                    <Divider />
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Facebook sx={{ color: "  #4267B2", mr: 2 }} />{" "}
                      <b>{profile?.fb}</b>
                    </Typography>
                    <Divider />
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <Instagram sx={{ color: "#bc2a8d", mr: 2 }} />{" "}
                      <b>{profile?.ig}</b>
                    </Typography>
                    <Divider />
                  </Paper>
                </Grid>
                <Grid item lg={4} sm={12} xs={12} md={6}>
                  <Paper
                    className='profile-paper'
                    elevation={4}
                    sx={{ padding: 3 }}
                  >
                    <Typography className='profile-title'>Skills</Typography>
                    <Divider />

                    {profile?.skills?.map((s, index) => (
                      <Typography key={index}>
                        <b>#</b>
                        {` ${s}`}
                      </Typography>
                    ))}

                    <Divider />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <div
              style={{
                width: "100%",
                height: "40vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>👍 No Profile Found.</Typography>
              <Typography> Click below to add/search your profile.</Typography>

              <div
                style={{
                  color: "#000",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link to='/profile/add-update' disabled={showSearch}>
                  <Button
                    sx={{
                      bgcolor: "#4169E1",
                      color: "#fff",
                      textTransform: "capitalize",
                      padding: "0.5em 1.3em",
                    }}
                    className='searchMe'
                  >
                    <Edit sx={{ mr: 1 }} />
                    Add Profile
                  </Button>
                </Link>
                <Button
                  sx={{
                    bgcolor: "#4169E1",
                    color: "#fff",

                    textTransform: "capitalize",
                    ml: 2,
                    padding: "0.5em 1.3em",
                  }}
                  className='searchMe'
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search sx={{ mr: 1, cursor: "pointer" }} />
                  Search
                </Button>
              </div>
              {showSearch && (
                <div
                  style={{
                    marginTop: "2em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <TextField
                      name='search'
                      variant='outlined'
                      label='Search Profile'
                      size='small'
                      sx={{ width: 250 }}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                      sx={{
                        bgcolor: "#4169E1",
                        color: "#fff",
                        borderRadius: 0,
                        textTransform: "capitalize",
                        hover: "",
                      }}
                      className='searchMe'
                      onClick={handleSearchProfile}
                    >
                      Search
                    </Button>
                  </div>
                  <p
                    style={{
                      color: "blue",
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginTop: "2px",
                    }}
                  >
                    Please note that you can search by your email or phone
                    number or first name
                  </p>
                </div>
              )}
            </div>
          )}
          <div className='recommendedProfiles'>
            {recommendedProfiles && (
              <>
                {recommendedProfiles?.length > 0 ? (
                  <>
                    <Divider sx={{ mb: 2 }} />
                    <h1 className='recommed-title'>Similar Profile(s)</h1>
                    <Divider sx={{ mb: 3, mt: 2 }} />{" "}
                  </>
                ) : null}

                <Grid
                  className='container'
                  container
                  alignItems='stretch'
                  spacing={3}
                >
                  {recommendedProfiles?.map((profile) => (
                    <Grid key={profile._id} item xs={12} sm={12} md={6} lg={4}>
                      <ProfileCard profile={profile} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetail;
