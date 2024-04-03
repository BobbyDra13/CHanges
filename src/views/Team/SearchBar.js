import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <TextField
      className="hidden"
      id="outlined-disabled"
      value={searchQuery}
      onChange={handleSearchChange}
      sx={{
        width: 150,
        '& .MuiOutlinedInput-notchedOutline': { borderRadius: '10px' }
      }}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IoIosSearch style={{ fontSize: 24 }} className="text-gray-400" />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;
