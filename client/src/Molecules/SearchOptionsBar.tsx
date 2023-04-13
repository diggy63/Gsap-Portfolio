import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import exerciseApiServices from "../Api/ExerciseApiServices";
import Grid from "@mui/material/Grid";

type propFunction = () => void;



export default function SearchOptionsBar({exerciseList, setList}) {
  const [bodyPartQ, setBodyPartQ] = React.useState("");
  const [muscleTargetQ, setMuscleTargetQ] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const bodyPartList = [
    "none",
    "back",
    "cardio",
    "chest",
    "lower-arms",
    "lower-legs",
    "neck",
    "shoulders",
    "upper-arms",
  ];
  const muscleTargetList = [
    "none",
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular-system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator-scapulae",
    "pectorals",
    "quads",
    "serratus-anterior",
    "spine",
    "traps",
    "triceps",
    "upper-back",
  ];

  const handleBodyPartChange = (event: SelectChangeEvent) => {
    setBodyPartQ(event.target.value as string);
  };
  const handleMuscleTargetChange = (event: SelectChangeEvent) => {
    setMuscleTargetQ(event.target.value as string);
  };
  const showExercises = exerciseList.map((item,idx) =>{
    console.log(item)
    return(
        <Box key={idx}>
            <h3>{item.name}</h3>
            <img src={item.image} />

        </Box>
        
    )
  })
  const bodyPartDropMenu = bodyPartList.map((item, idx) => {
    if (item === "none") {
      return (
        <MenuItem key={idx} value={""}>
          None
        </MenuItem>
      );
    }
    return (
      <MenuItem key={idx} value={item}>
        {item}
      </MenuItem>
    );
  });

  const muscleTargetDropMenu = muscleTargetList.map((item, idx) => {
    if (item === "none") {
      return (
        <MenuItem key={idx} value={""}>
          None
        </MenuItem>
      );
    }
    return (
      <MenuItem key={idx} value={item}>
        {item}
      </MenuItem>
    );
  });

  async function ApiCall() {
    let url = "";
    if (bodyPartQ) {
      url = url + bodyPartQ;
    }
    if (muscleTargetQ && url) {
      url = url + "&" + muscleTargetQ;
    } else if (muscleTargetQ) {
      url = url + muscleTargetQ;
    }
    const qResults = await exerciseApiServices.basicSearch(url);
    setList(qResults)
  }

  async function testCall(){
    exerciseApiServices.basictest()
  }
  async function fillDB(){
    exerciseApiServices.dbFill()

  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Body Part</InputLabel>
                <Select
                  value={bodyPartQ}
                  label="bodyPart"
                  onChange={handleBodyPartChange}
                >
                  {bodyPartDropMenu}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Muscle Target</InputLabel>
                <Select
                  value={muscleTargetQ}
                  label="muscleTarget"
                  onChange={handleMuscleTargetChange}
                >
                  {muscleTargetDropMenu}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Button onClick={ApiCall}>Search</Button>
        <Button onClick={testCall}>test</Button>
        <Button onClick={fillDB}>fill</Button>
      </Box>
      {showExercises}
    </>
  );
}
