import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import FilterAlt from '@mui/icons-material/FilterAlt';
import { useTheme } from '@emotion/react';
import './FilterMenu.css';

const FilterMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState('All'); // Set 'All' as the default value
  const [selectedZones, setSelectedZones] = useState('All');
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'All') {
      // Toggle 'All' option
      setSelectedProfile((prev) => (prev === 'All' ? '' : 'All'));
    } else {
      // If any other option is selected, toggle its selection
      setSelectedProfile(checked ? name : '');
    }
  };

  const handleZoneChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedZones(name);
    } else {
      setSelectedZones('');
    }
  };

  const handleDone = () => {
    console.log('Selected Profile:', selectedProfile);
    console.log('Selected Zones:', selectedZones);
    handleClose();
  };

  const profileOptions = ['Age', 'Gender', 'Group']; // Add 'All' as an option
  const zoneOptions = ['Phones', 'Accessories', 'Dolby', 'Play', 'Sales'];

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterAlt fontSize="large" className="filter-icon" />
      </IconButton>
      <Menu id="filter-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <FormGroup>
          <MenuItem
            disabled
            sx={{
              fontWeight: 'bold',
              '&.Mui-disabled': {
                color: 'black !important' // Use !important to override default styles
              }
            }}
          >
            Profile Filter
          </MenuItem>
          <MenuItem
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <FormControlLabel control={<Checkbox checked={true} onChange={handleProfileChange} name="All" />} label="All" />
          </MenuItem>
          {profileOptions.map((option) => (
            <MenuItem
              disabled
              key={option}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={selectedProfile === option} onChange={handleProfileChange} name={option} />}
                label={option}
              />
            </MenuItem>
          ))}
          <MenuItem disabled style={{ fontWeight: 'bold' }}>
            Zone Filter
          </MenuItem>
          <MenuItem
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <FormControlLabel control={<Checkbox checked={true} onChange={handleProfileChange} name="All" />} label="All" />
          </MenuItem>
          {zoneOptions.map((option) => (
            <MenuItem
              disabled
              key={option}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={selectedZones === option} onChange={handleZoneChange} name={option} />}
                label={option}
              />
            </MenuItem>
          ))}
        </FormGroup>
        <MenuItem>
          <div className="done-button-container">
            <Button style={{ background: `${theme.palette.success.light}` }} variant="contained" onClick={handleDone}>
              Apply
            </Button>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterMenu;
