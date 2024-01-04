import React, { useState } from 'react';
import { Typography, FormControl, Select, MenuItem } from '@mui/material';

const FilterationButton = ({ handleNavigationClick }) => {
  const [selectedItem, setSelectedItem] = useState('All Users');

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
    handleNavigationClick(event.target.value);
  };

  const navLinks = [
    { label: 'All Users', value: 'All Users'},
    { label: 'Agents', value: 'Agents'},
    { label: 'Department Manager', value: 'Department Manager' },
    { label: 'Store Manager', value: 'Store Manager' },
    { label: 'Cluster Manager', value: 'Cluster Manager' },
    { label: 'NHK Super User', value: 'NHK Super User' }
  ];

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <Select
          
          value={selectedItem}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Option' }}
          sx={{
            borderRadius: '10px',
            borderWidth: '1px',
            outlineWidth: '6px',
            borderColor: 'white',
            '& .MuiSelect-outlined': {
              padding: '15px 14px',
            },  
          }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          {navLinks.map((link, index) => (
            <MenuItem key={index} value={link.value}>
              <Typography>{link.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterationButton;
