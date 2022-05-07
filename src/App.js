import React, { useState } from "react";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Profiles from "./components/Profiles/Profiles";
import ProfileUpdate from "./components/Profiles/UpdateProfile/ProfileUpdate";
import Footer from "./components/Footer/Footer";
import PostDetails from "./components/PostDetails/PostDetails";
import ProfileHome from "./components/Profiles/ProfileHome";
import ProfileDetail from "./components/Profiles/ProfileDetail/ProfileDetail";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

const App = () => {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [currentId, setCurrentId] = useState(0);

  return (
    <Router>
      <Navbar />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/profiles' exact element={<ProfileHome />} />
          <Route path='/profiles/search' exact element={<ProfileHome />} />
          <Route path='/profile/add-update' exact element={<ProfileUpdate />} />
          <Route path='/profile/:id' exact element={<ProfileDetail />} />
          <Route path={"/creators/:name"} element={<CreatorOrTag />} />
          <Route path={"/tags/:name"} element={<CreatorOrTag />} />

          <Route
            path='/auth'
            exact
            element={!user ? <Auth /> : <Navigate to='/posts' />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
