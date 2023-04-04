import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import authServices from "../Api/AuthServices.js";
import tokenServices from "../Util/TokenServices.js";

interface SignupModal {
    open:boolean,
    handleClose: () => void;
    getUser:() => void;
}

export default function SignupModal({getUser,open,handleClose}:SignupModal){
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:"",
        username:""
    })


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


    function handleChange(e: React.ChangeEvent<any>){
        setUserInfo({...userInfo,[e.target.name]:e.target.value})

    }

    async function handleSignup(){
        const ans = await authServices.signup(userInfo)
        await tokenServices.setToken(ans.token)
        handleClose()
        getUser()
    }
    return(
        <>
        <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter Signup Information
        </Typography>
        <TextField
          onChange={handleChange}
          value={userInfo.username}
          name="username"
          id="standard-basic"
          label="Username"
          variant="standard"
        />
        <br />
        <TextField
          onChange={handleChange}
          value={userInfo.email}
          type="email"
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
        <Button onClick={handleSignup}>Sign Up</Button>
      </Box>
    </Modal>
        </>
    )
}