import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Avatar,
} from "@mui/material";
import { Facebook, Instagram, Twitter, WhatsApp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../../redux/apiCalls/profileApiCalls";
import "./profilecard.css";
import useravatar from "../../../assets/avatar.svg";

const ProfileCard = ({ profile, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;

  const openPost = (e) => {
    getProfile(profile._id, dispatch);

    navigate(`/profile/${profile._id}`);
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
      elevation={2}
    >
      <CardContent className='content'>
        <div className='card-top'>
          <Avatar
            size={60}
            sx={{ width: 56, height: 56 }}
            src={profile.selectedFile || useravatar}
            alt=''
          />
          <div className='card-title'>
            <p>{`${profile.firstName} ${profile.lastName}`}</p>
            <h5>{profile?.address || "(~No Address~)"}</h5>
          </div>
        </div>
        <div className='card-center'>
          <h1 className='card-profession'>
            {profile?.profession || profile?.popularName || "No Prefession"}
          </h1>
          <p> {profile?.skills?.map((skill) => `#${skill} `)}</p>
          <p
            style={{ color: "#00acee", fontStyle: "italic", cursor: "pointer" }}
          >
            {profile?.email || "No email address"}
          </p>
          <p>{profile?.phone || "XXXXXXXXX"}</p>
        </div>
        <div className='card-bottom'>
          <div className='card-social'>
            {profile.fb && (
              <a target='_blank' rel='noopener noreferrer' href={profile?.fb}>
                <Facebook sx={{ color: "  #4267B2" }} />
              </a>
            )}
            {profile?.ig && (
              <a target='_blank' rel='noopener noreferrer' href={profile?.ig}>
                <Instagram sx={{ color: "#bc2a8d" }} />
              </a>
            )}
            {profile?.twitter && (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={`${profile?.twitter}`}
              >
                <Twitter sx={{ color: "#00acee" }} />
              </a>
            )}
            {profile?.whatsApp && (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={`https://wa.me/+${profile?.whatsApp}`}
              >
                <WhatsApp sx={{ color: "green" }} />
              </a>
            )}
          </div>
          <Link to={`/profile/${profile?.userId}`}>
            <button>View</button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
