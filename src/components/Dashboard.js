import { makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import image from "../img/dash.svg";
import { useAuth } from "../context/authContext";

import Modal from "@material-ui/core/Modal";
import { Person } from "@material-ui/icons";

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
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#090909",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "70vw",
    height: "70vh",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  restEmailAndPassPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Dashboard = () => {
  const classes = useStyles();

  const { currentUser, logout, updateEmail, updatePassword } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = () => {
    if (emailRef.current.value) {
      // Call our function to update emai;
      updateEmail(emailRef.current.value);
      handleClose();
    }
    if (passRef.current.value) {
      // Call our function to update email
      updatePassword(passRef.current.value);
      handleClose();
    }
  };
  const body = (
    <div style={modalStyle} className={classes.restEmailAndPassPaper}>
      <h2 id="simple-modal-title">Update Account</h2>
      <p id="simple-modal-description">
        Duis mollis, est non fdsgdf luctus, nisi erat porttitor ligula.
      </p>
      <div className="input-field">
        <Person />
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email (optional)"
        ></input>
      </div>
      <div className="input-field">
        <Person />
        <input
          ref={passRef}
          type="email"
          placeholder="Enter your password (optional)"
        ></input>
      </div>

      <input
        type="submit"
        value="Update"
        className="btn solid"
        onClick={handleSubmit}
      />
    </div>
  );
  return (
    <div className={classes.root}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {/* <h1>Hello my friend</h1> */}
          {/* <h1>dgos;hfsd</h1>
           */}
          {body}
        </Modal>
      </div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h4">Your Account</Typography>
                <Typography gutterBottom variant="subtitle1">
                  Welcome {currentUser.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Last signed in at {currentUser.metadata.lastSignInTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {currentUser.uid}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  onClick={handleOpen}
                  variant="body2"
                  style={{ cursor: "pointer" }}
                >
                  Update User
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
                variant="subtitle1"
              >
                Logout
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Dashboard;
