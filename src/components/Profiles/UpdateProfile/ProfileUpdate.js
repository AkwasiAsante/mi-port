import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileBase from "react-file-base64";
import React, { useEffect, useState } from "react";
import Input from "../../Auth/Input";
import useStyles from "./styles";
import logo from "../../../assets/mg.png";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../../../redux/apiCalls/profileApiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    popularName: "",
    gender: "",
    phone: "",
    email: "",
    church: "",
    ayclasses: "",
    position: "",
    skills: [],
    branch: [],
    address: "",
    profession: "",
    selectedFile: "",
    fb: "",
    ig: "",
    twitter: "",
    whatsApp: "",
    parentName: "",
    contact: "",
    relation: "",
  });

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [currentId, setCurrentId] = useState(0);

  const [checkedValue, setCheckedValue] = useState([0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileId, setProfileId] = useState(
    user?.result?._id ? user.result._id : user.result.googleId
  );

  const { profile, isLoading, isError } = useSelector(
    (state) => state.profiles
  );

  useEffect(() => {
    if (profileId) {
      getProfile(profileId, dispatch);
      setUserData({ ...profile });

      if (userData.firstName != "") {
        setCurrentId(profile?._id);
      } else {
        setCurrentId(0);
      }
      setCheckedValue(profile?.branch);
    }
  }, [profileId]);

  useEffect(() => {
    if (profile) {
      setCurrentId(profile?._id);
      setUserData({ ...profile });
      setCheckedValue(profile?.branch);
    } else {
      setCurrentId(0);
      setCheckedValue([]);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      createProfile({ ...userData }, dispatch, navigate);
      // clear();
    } else {
      updateProfile(
        currentId,
        { ...userData, userId: profileId },
        dispatch,
        navigate
      );
      // clear();
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let val = "";
    if (e.target.value) {
      if (
        name === "email" ||
        name === "twitter" ||
        name === "ig" ||
        name === "fb"
      ) {
        val = e.target.value;
      } else {
        val = e.target?.value
          .toLowerCase()
          .replace(/\b(\w)/g, (x) => x.toUpperCase());
      }
    }

    setUserData({
      ...userData,
      [name]: val,
      //   .toLowerCase()
      // .replace(/\b(\w)/g, (x) => x.toUpperCase()),
    });
  };

  const clear = () => {
    setCurrentId(0);
    setUserData({
      firstName: "",
      lastName: "",
      popularName: "",
      gender: "",
      phone: "",
      email: "",
      church: "",
      ayclasses: "",
      position: "",
      skills: [],
      branch: [],
      address: "",
      profession: "",
      selectedFile: "",
      fb: "",
      ig: "",
      twitter: "",
      whatsApp: "",
      parentName: "",
      contact: "",
      relation: "",
    });
  };
  const branches = [
    "Bible Teachings - General",
    "Bible Teachings - Prophecy",
    "Camp Craft",
    "Commanding",
    "Hiking & Track Trailing",
    "Marching & Drilling",
    "Music & Band",
    "Sports",
    "Vocational & Arts",
    "Traditional Games",
    "Church Heritage",
    "First Aid",
  ];

  const churches = [
    "Amakum",
    "Aprah",
    "Living Hope",
    "Nkwantanan",
    "Mount of Blessing",
    "Mount Olives",
    "Opeikuma",
  ];
  const ayclass = [
    "Pastor",
    "Councillor",
    "APLA",
    "PLA",
    "BST",
    "Senoir Youth",
    "Master Guide",
    "Guide",
    "Voyager",
    "Ranger",
    "Explorer",
    "Companion",
    "Friend",
    "Busy Bee",
    "Sun Beam",
    "Builder",
    "Helping Hand",
    "Little Lamb",
    "Eager Beaver",
  ];

  const handleAddSkills = (skill) => {
    setUserData({ ...userData, skills: [...userData.skills, skill] });
  };

  const handleDeleteSkills = (chipToDelete) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter((skill) => skill !== chipToDelete),
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = checkedValue.indexOf(value);
    const newChecked = [...checkedValue];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedValue(newChecked);
    setUserData({ ...userData, branch: newChecked });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to update your profile.
        </Typography>
      </Paper>
    );
  }
  if (isLoading) {
    return (
      <Paper className={classes.paper} elevation={4}>
        <CircularProgress size='4em' />
      </Paper>
    );
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={6}>
        <Avatar
          src={userData.selectedFile || logo}
          alt='userImg'
          sx={{ width: 64, height: 64, mt: 3 }}
        />
        <Typography component='h1' variant='h6' sx={{ color: "gray" }}>
          {userData.firstName
            ? `${userData?.firstName} ${userData?.lastName}`
            : "User Profile"}
        </Typography>
        <Divider fullWidth />

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Input
                name='firstName'
                label='First Name'
                handleChange={handleChange}
                value={userData.firstName}
                autoFocus
                half
                required='required'
              />
              <Input
                name='lastName'
                label='Last Name'
                value={userData.lastName}
                handleChange={handleChange}
                half
                required='required'
              />

              <Input
                name='popularName'
                label='Popular Name'
                value={userData.popularName}
                handleChange={handleChange}
                half
              />
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id='gender-label'>Gender</InputLabel>
                  <Select
                    labelId='gender-label'
                    id='gender'
                    name='gender'
                    label='Gender'
                    value={userData.gender ? userData.gender : ""}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Input
                name='phone'
                label='Phone Number'
                value={userData.phone}
                handleChange={handleChange}
                half
              />
            </>
            <Input
              name='email'
              label='Email Address'
              value={userData.email}
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='address'
              label='Residential Address'
              value={userData.address}
              handleChange={handleChange}
              type='text'
            />
            <Typography sx={{ ml: 2, mt: 5 }}>Church Information</Typography>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id='church-label'>Local Church</InputLabel>
                <Select
                  labelId='church-label'
                  id='church'
                  name='church'
                  label='Local Church'
                  value={userData.church ? userData.church : ""}
                  onChange={handleChange}
                  required
                >
                  {churches.map((c) => (
                    <MenuItem value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Input
              name='position'
              label='Position in Church'
              value={userData.position}
              handleChange={handleChange}
              type='text'
              half
            />

            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='ayclass-label'>AY Class</InputLabel>
                <Select
                  labelId='ayclass-label'
                  id='ayclasses'
                  name='ayclasses'
                  label='AY Class'
                  value={userData.ayclasses ? userData.ayclasses : ""}
                  onChange={handleChange}
                  required
                  //defaultValue=''
                >
                  {ayclass.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div
                style={{
                  padding: "15px 0",
                  width: "100%",
                }}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel-content'
                    id='panel-header'
                  >
                    <Typography>Select Interest Area(s)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {branches.map((value) => {
                        const labelId = { value };

                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge='start'
                                  checked={
                                    checkedValue
                                      ? checkedValue?.indexOf(value) !== -1
                                      : ""
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={value}
                                sx={{ fontSize: 14 }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
            <Typography sx={{ ml: 2, mt: 5 }}>Parent/Guidian Info</Typography>
            <Input
              name='parentName'
              label='Name'
              required='required'
              value={userData.parentName}
              handleChange={handleChange}
            />
            <Input
              name='contact'
              label='Contact Number'
              value={userData.contact}
              handleChange={handleChange}
              half
            />
            <Input
              name='relation'
              label='Relation'
              value={userData.relation}
              handleChange={handleChange}
              half
            />
            <div className={classes.fileInput}>
              <Typography sx={{ mb: 1 }}>Passport Picture</Typography>

              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setUserData({ ...userData, selectedFile: base64 })
                }
              />
            </div>
            <Input
              name='profession'
              type='text'
              label='Profession'
              value={userData.profession}
              handleChange={handleChange}
            />
            <div
              style={{
                padding: "15px 0",
                marginLeft: "15px",
                width: "100%",
              }}
            >
              <ChipInput
                name='skills'
                variant='outlined'
                label='Skills'
                fullWidth
                value={userData.skills}
                onAdd={(chip) => handleAddSkills(chip)}
                onDelete={(chip) => handleDeleteSkills(chip)}
              />
            </div>
            <Typography sx={{ ml: 2, mt: 3 }}>Social Media</Typography>
            <Input
              name='fb'
              type='text'
              label='Facebook Link'
              value={userData.fb}
              handleChange={handleChange}
            />
            <Input
              name='ig'
              type='text'
              label='Instagram Link'
              value={userData.ig}
              handleChange={handleChange}
            />
            <Input
              name='twitter'
              type='text'
              label='Twitter Link'
              value={userData.twitter}
              handleChange={handleChange}
            />

            <Input
              name='whatsApp'
              type='number'
              label='WhatsApp Number'
              value={userData.whatsApp}
              placeholder='eg: 233243860216'
              handleChange={handleChange}
            />
          </Grid>
          <Button
            sx={{ mb: 2, mt: 3 }}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ textTransform: "capitalize" }}
          >
            {isLoading ? <CircularProgress size='3em' /> : "Save Profile"}
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={clear}
            fullWidth
            sx={{
              textTransform: "capitalize",
            }}
          >
            Clear
          </Button>
        </form>
        {isError && (
          <Typography sx={{ color: "red", mt: 3 }}>
            Something went wrong. Try Again.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProfileUpdate;
