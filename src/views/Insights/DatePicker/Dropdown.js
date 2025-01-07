import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { NativeSelect } from '@mui/material';
import { useDispatch } from 'react-redux';
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

const names = ['Current Day', 'Last Week', 'Last 30 Days',"Custom Range"];

export default function MultipleSelectCheckmarks({ isVisible, graphToSelect }) {
  const [personName, setPersonName] = useState('Current Day');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    
    setPersonName(value);
    graphToSelect(value);
    
    // Dispatch the selected range to Redux
    dispatch({
      type: 'SET_SELECTED_RANGE',
      payload: value
    });
    
    setOpen(false);
  };

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
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
