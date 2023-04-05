import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import wgerServices from "../Api/WgerServices";

export default function Home() {
  const [muscleGroup, setMuscleGroup] = React.useState("");
  const musclesArray = [
    "Biceps",
    "Shoulders",
    "Serratus anterior",
    "Chest",
    "Triceps",
    "Abs",
    "Calves",
    "Glutes",
    "Traps",
    "Quads",
    "Hamstrings",
    "Lats",
    "Brachialis",
    "Obliquus",
    "Soleus",
  ];

  const [apiQ, setApiQ] = useState("");
  //handles value of text imput
  function handleChange(e: React.ChangeEvent<any>) {
    setApiQ(e.target.value);
  }
  //handles the sumbit of text input api general search
  async function findQ(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const Q = await wgerServices.searchQ(apiQ);
    console.log(Q);
  }
  return (
    <>
      <Box>
        <h1>Home</h1>
        <hr />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <br />
          <TextField
            onChange={handleChange}
            id="standard-basic"
            value={apiQ}
            label="Standard"
            variant="standard"
          />
          <Button onClick={findQ}>Find</Button>
        </Box>
      </Box>
    </>
  );
}
