import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { NativeSelect } from '@mui/material';
import React from 'react';
import "./calendar.css"

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = ['Current Day', 'Last Week', 'Last 30 Days'," Custome Range"];

export default function MultipleSelectCheckmarks({ isVisible,  graphToSelect }) {
  const [personName, setPersonName] = useState('Select Range');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
//     const currentDate = new Date();
//     const thirtyDaysAgo = new Date(currentDate);
// thirtyDaysAgo.setDate(currentDate.getDate() - 30);
// const sevenDaysAgo = new Date(currentDate);
//         sevenDaysAgo.setDate(currentDate.getDate() - 7);
        
//     if((strtTime != thirtyDaysAgo || strtTime!= sevenDaysAgo || strtTime != currentDate) && endTime!= currentDate ){
//       setPersonName("Select Range")
//     }
//     else{
//       alert("hello")
      
//     }
    setPersonName(value);
    graphToSelect(value);
    setOpen(false);
  };
  // const handelClickbtn = ()=>{
  //   graphToSelect(personName);
  //   setOpen(false);
  // }

  return (
    <div className={`multiple-select ${isVisible ? 'visible' : ''}`}>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          input={<NativeSelect />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          {/* <Box sx={{width:"100%", display:"flex", justifyContent:"flex-end", overflow:"hidden"}}>
           <Button sx={{margin:"10px"}} onClick={ handelClickbtn} variant="contained">Done</Button>
           </Box> */}
        </Select>
      </FormControl>
    </div>
  );
}
