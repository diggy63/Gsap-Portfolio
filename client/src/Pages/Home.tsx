import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchOptionsBar from "../Molecules/SearchOptionsBar";

import wgerServices from "../Api/WgerServices";

export default function Home() {
  const [exerciseList, setExerciseList] = React.useState([]);

  return (
    <>
    
      <Box>
        <h1>Home</h1>
        <hr />
        <SearchOptionsBar exerciseList={exerciseList} setList={setExerciseList}/>
      </Box>
    </>
  );
}
