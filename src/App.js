import "./App.css";
import React from "react";

import SignInSignUp from "./components/SignInSignUp";
import { useAuth } from "./context/authContext";
import Dashboard from "./components/Dashboard";
function App() {
  const { currentUser } = useAuth();

  console.log("the user is ", currentUser);

  return <>{currentUser ? <Dashboard /> : <SignInSignUp />}</>;
}

export default App;
