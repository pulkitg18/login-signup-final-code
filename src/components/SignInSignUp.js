import React, { useEffect, useRef, useState } from "react";
import {
  Facebook,
  LinkedIn,
  Lock,
  Mail,
  Person,
  Twitter,
} from "@material-ui/icons";

import log from "../img/log.svg";
import register from "../img/register.svg";
import { useAuth } from "../context/authContext";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const SignInSignUp = () => {
  const { resetPassword, signUp, login } = useAuth();

  const signUpEmailRef = useRef();
  const signUpPassRef = useRef();

  const signInEmailRef = useRef();
  const signInPassRef = useRef();

  const resetPassRef = useRef();

  const signUpUser = async (e) => {
    e.preventDefault();

    await signUp(signUpEmailRef.current.value, signUpPassRef.current.value);

    //   alert("Failed to create an account");
  };

  const signInUser = async (e) => {
    e.preventDefault();

    await login(signInEmailRef.current.value, signInPassRef.current.value);
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, []);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(resetPassRef.current.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Rest Password</h2>
      <p id="simple-modal-description">
        Duis mollis, est non fdsgdf luctus, nisi erat porttitor ligula.
      </p>
      <div className="input-field">
        <Person />
        <input
          type="email"
          placeholder="Enter your email"
          ref={resetPassRef}
        ></input>
      </div>

      <input
        type="submit"
        onClick={handleResetPassword}
        value="Reset Password"
        className="btn solid"
      />
    </div>
  );
  // console.log(signUpBtnName);
  return (
    <div className="container">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <Person />
              <input
                type="text"
                placeholder="Username"
                ref={signInEmailRef}
              ></input>
            </div>
            <div className="input-field">
              <Lock />
              <input
                type="password"
                placeholder="Password"
                ref={signInPassRef}
              ></input>
            </div>
            <p onClick={handleOpen}> Forgot your password?</p>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={signInUser}
            />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <div className="social-icon">
                <Facebook />
              </div>

              <div className="social-icon">
                <Twitter />
              </div>

              <div className="social-icon">
                <LinkedIn />
              </div>

              {/* <div className="social-icon"></div> */}
            </div>{" "}
          </form>
          <form action="" className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <Mail />
              <input
                type="text"
                placeholder="Email"
                ref={signUpEmailRef}
                required
              ></input>
            </div>
            <div className="input-field">
              <Lock />
              <input
                type="password"
                placeholder="Password"
                ref={signUpPassRef}
                required
              ></input>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn solid"
              onClick={signUpUser}
            />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <div className="social-icon">
                <Facebook />
              </div>

              <div className="social-icon">
                <Twitter />
              </div>

              <div className="social-icon">
                <LinkedIn />
              </div>

              {/* <div className="social-icon"></div> */}
            </div>{" "}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
