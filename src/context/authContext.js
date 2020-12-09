import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState("");

  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Push the user to dashboras
        console.log("User pushed to dashboard");
      })
      .catch((err) => alert(err.message));
  };

  const login = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Push the user to dashboras
        console.log("User pushed to dashboard");
      })
      .catch((err) => alert(err.message));
  };
  const logout = () => auth.signOut();

  const resetPassword = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("We have sent an reset password link to your email");
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const updateEmail = (email) => {
    return currentUser.updateEmail(email).catch((err) => alert(err.message));
  };
  const updatePassword = (pass) => {
    return currentUser.updatePassword(pass);
  };

  const value = {
    currentUser,
    signUp,
    error,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
