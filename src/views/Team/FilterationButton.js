import React, { useState } from 'react';
import { Typography, FormControl, Select, MenuItem } from '@mui/material';

const FilterationButton = ({ handleNavigationClick }) => {
  const [selectedItem, setSelectedItem] = useState('All Users');

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
    handleNavigationClick(event.target.value);
  };

  const navLinks = [
    { label: 'All Users', value: 'All Users' },
    { label: 'Agent', value: 'Agent' },
    { label: 'Department Manager', value: 'Department Manager' },
    { label: 'Store Manager', value: 'Store Manager' },
    { label: 'Cluster Manager', value: 'Cluster Manager' },
    { label: 'NHQ Super User', value: 'NHQ' }
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
            borderWidth: '2px',
            outlineWidth: '8px',
            borderColor: 'white',
            '& .MuiSelect-outlined': {
              padding: '15px 15px'
            }
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
