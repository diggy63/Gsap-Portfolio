import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import authServices from "../Api/AuthServices.js";
import tokenServices from "../Util/TokenServices.js";

type loginModal = {
  open: boolean;
  handleClose: () => void;
  handleSignupModal: () => void;
  getUser: () => void;
};

export default function LoginModal({getUser, open, handleSignupModal, handleClose}: loginModal) {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  async function handleLogin() {
    const ans  = await authServices.login(userInfo);
    tokenServices.setToken(ans.token)
    handleClose()
    getUser()
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleSignupOpen(){
    handleSignupModal()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter Information To LogIn
        </Typography>
        <TextField
          onChange={handleChange}
          value={userInfo.email}
          name="email"
          id="standard-basic"
          label="Email"
          variant="standard"
        />
        <br />
        <TextField
          onChange={handleChange}
          name="password"
          value={userInfo.password}
          id="standard-basic"
          type="password"
          label="Password"
          variant="standard"
        />
        <br />
        <Button onClick={handleLogin}>Login</Button>
        <Typography>
            If you dont have a login you can <div className="text-link" onClick={handleSignupOpen}>Sign Up Here</div>
        </Typography>
      </Box>
    </Modal>
  );
}
