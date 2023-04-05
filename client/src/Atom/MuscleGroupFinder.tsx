import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ExerciseDetailModal, { detailResultItem } from "./ExerciseDetailModal";


import wgerServices from "../Api/WgerServices";

type musclePageQuery = {
  count: number;
  next: null | string;
  previous: null | string;
  results: [];
};



type resultItem = {
  id: number;
  uuid: string;
  name: string;
  exercise_base: number;
  description: string;
  creation_date: string;
  category: number;
  muscles: [];
  muscles_secondary: [];
  equipment: [];
  language: number;
  license: number;
  license_author: string;
  variations: [];
  author_history: [];
};

interface navState {
  next: string | null;
  prev: string | null;
}

interface detialForModal{
    open:boolean
    details:detailResultItem|{}
}

export default function MuscleGroupFinder() {
  const [detailModalShow, setDetailModalShow] = useState<detialForModal>({
    open: false,
    details: {},
  });
  const [list, setList] = useState([]);
  const [navValues, setNavValues] = useState<navState>({
    next: null,
    prev: null,
  });
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
  function handleDropdown(event: SelectChangeEvent) {
    setMuscleGroup(event.target.value);
  }
  async function findMuscleGroup() {
    const musclesQuery = await wgerServices.searchMuscleGroup(muscleGroup + 1);
    setListValues(musclesQuery);
  }

  async function getNextPage() {
    const musclesQuery = await wgerServices.basicGet(navValues.next);
    setListValues(musclesQuery);
  }

  async function getPrevPage() {
    const musclesQuery = await wgerServices.basicGet(navValues.prev);
    setListValues(musclesQuery);
  }

  function handleModalClose() {
    setDetailModalShow({
      ...detailModalShow,
      ["open"]: false,
      ["details"]: {},
    });
  }

  function setListValues(data: musclePageQuery) {
    setList(data.results);
    setNavValues({
      ...navValues,
      next: data.next,
      prev: data.previous,
    });
  }
  async function findOne(id: number) {
    const details = await wgerServices.basicGetDetails(id);
    setDetailModalShow({
      ...detailModalShow,
      ["open"]: true,
      ["details"]: details,
    });
    console.log(details);
  }
  const menuItems = musclesArray.map((item, idx) => {
    return (
      <MenuItem key={idx} value={idx}>
        {item}
      </MenuItem>
    );
  });
  const workoutList = list.map((item: resultItem, idx) => {
    return (
      <li key={idx}>
        {item.name}
        <Button onClick={() => findOne(item.id)} variant="contained">
          Details
        </Button>
      </li>
    );
  });

  return (
    <>
      <h1>finder</h1>
      <ExerciseDetailModal
        detail={detailModalShow}
        handleClose={handleModalClose}
      />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Muscle Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={muscleGroup}
            label="Age"
            onChange={handleDropdown}
          >
            {menuItems}
          </Select>
          <Button onClick={findMuscleGroup}>Search</Button>
        </FormControl>
        {navValues.prev ? (
          <NavigateBeforeIcon onClick={getPrevPage} />
        ) : (
          <NavigateBeforeIcon color="disabled" />
        )}
        {navValues.next ? (
          <NavigateNextIcon onClick={getNextPage} />
        ) : (
          <NavigateNextIcon color="disabled" />
        )}

        <ul>{workoutList}</ul>
      </Box>
    </>
  );
}
