import React, { useContext } from "react";
import Generate from "../Generate/Main";
import Signup from "./Signup";
import Login from "./Login";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Create from "../QuickCreateCard/Create";
import Recent from "../RecentGenerations/Recent";
import ImageGenerator from "../Generate/ImageGenerator";
import Post from "../services/Post";

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);

  // const checkIsLoggedIn = async () => {
  //   try {
  //     const uid = localStorage.getItem("userUid");
  //     const status = localStorage.getItem("status");
  //     if (uid && status) {
  //       console.log("uid ", uid, " status ", status);
  //       setAuth(true);
  //     } else {
  //       setAuth(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkIsLoggedIn();
  // }, [auth]);
  return (
    <Router>
      <Navbar />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <Create />
                  <Recent />
                </>
              }
            />
            <Route path="/generate" Component={Generate} />
            <Route path="/post" Component={Post} />
            <Route path="/image" Component={ImageGenerator} />
          </>
        ) : (
          <>
            <Route path="/signup" Component={Signup} />
            <Route path="/" Component={Login} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default Main;
