import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export type detailResultItem = {
        id: number,
        name: string,
        aliases: [],
        uuid: string,
        exercise_base_id: number,
        description:string,
        creation_date: string,
        category: {
            id: number,
            name: string
        },
        muscles: [],
        muscles_secondary: [],
        equipment: [
            {
                id: number,
                name:string
            }
        ],
        language: {
            id: number,
            short_name: string,
            full_name: string
        },
        license: {
            id: number,
            full_name: string,
            short_name:string,
            url: string
        },
        license_author: string,
        images: [],
        videos: [],
        comments: [],
        variations: [],

}



type modalProps={
    detail:{
        open:boolean,
        details:detailResultItem
    },
    handleClose: () => void;
}

export default function ExerciseDetailModal({detail, handleClose}:modalProps){
    console.log(detail.details)
    return(
        <Modal
        open={detail.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {detail.details.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {detail.details.description}
          </Typography>
          {detail.details.images ? <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {detail.details.images.length}
          </Typography>: 
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            flase
          </Typography>
          }
        </Box>
      </Modal>
    )
}