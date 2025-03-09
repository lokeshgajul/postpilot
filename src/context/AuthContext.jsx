import { createContext, useEffect, useState } from "react";
import { auth } from "../components/services/Config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserUid(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserUid(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe(); // cleanup listener
  }, []);

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setIsLoggedIn(true);
      setUserUid(user.uid);
      localStorage.setItem("userUid", user.uid);
      localStorage.setItem("status", "true");

      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setUserUid(null);
      localStorage.removeItem("userUid");
      localStorage.removeItem("status");
    });
  };

  const value = {
    isLoggedIn,
    isLoading,
    userUid,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
