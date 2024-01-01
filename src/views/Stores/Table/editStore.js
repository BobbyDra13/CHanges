import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import stateCities from './stateCitiesData.json';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// import axios from "axios";
// import { Alert, Snackbar } from "@mui/material";

// CREATING THE ARRAY OF THE ALL THE STATES IN INDIA
const states = Object.keys(stateCities);

// const storeType = ["Trends", "Smart", "Beauty"];

// const lambUrl = "https://gu44ge6xhk.execute-api.ap-south-1.amazonaws.com/dev";

export default function EditStore() {
  // const [brand, setBrand] = useState(false);
  // const [shelf, setShelf] = useState(false);
  // const [toast, setToast] = useState({ isToast: false, message: "", type: "" });
  // const [shelvesValue, setShelvesValue] = useState([]);
  // const [brandValue, setBrandValue] = useState([]);
  const [storeInfo, setStoreInfo] = useState({ id: 0, name: '', type: '' });
  const [location, setLocation] = useState({
    area: '',
    region: '',
    state: '',
    city: ''
  });

  // const shelfCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log("brand", shelf);

  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    // console.log(counter);
  };

  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('md');

  const handleClose = () => {
    setOpen(false);
  };
  // const handleToastClose = () => {
  //   setToast({ isToast: false, message: "", type: "" });
  // };
  // const handleSubmit = async () => {
  //   const storeDetails = {
  //     store_id: storeInfo.id,
  //     name: storeInfo.name,
  //     type: storeInfo.type,
  //     location: location.area,
  //     region: location.region,
  //     state: location.state,
  //     dist: location.city,
  //     brands: brandValue,
  //     shelves: shelvesValue,
  //   };
  //   try {
  //     // https://gu44ge6xhk.execute-api.ap-south-1.amazonaws.com/dev/stores/create
  //     const data = await axios.post(`${lambUrl}/stores/create`, storeDetails, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: await token(),
  //       },
  //     });
  //     // console.log(data);
  //     if (data) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     setToast({
  //       isToast: true,
  //       message: error.response.data,
  //       type: "warning",
  //     });
  //     console.log(error.response.data);
  //   }
  //   // console.log(storeDetails);
  // };
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            fontSize: '20px'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            '&.MuiInputLabel-shrink': {
              fontSize: '20px'
            }
          }
        }
      }
    }
  });

  return (
    <>

      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogContent className="overflow-y-auto scrollbar">
          <div className="w-full">
            <div className="w-full flex justify-between text-xl mb-5 text-gray-600 font-bold">
              <span className="self-center">Edit Store</span>
              <IconButton edge="end" onClick={handleClose} aria-label="close" className="self-center">
                <CloseIcon />
              </IconButton>
            </div>
            <div className="w-full space-y-6">
              <div className="flex justify-start items-center gap-2">
                <p className="rounded-full flex justify-center items-center w-6 h-6 bg-[#10b981] text-white p-2">1</p>
                <h1 className="text-lg">Store Info</h1>
              </div>
              <div className="w-full flex bprder sm:space-x-2 flex-wrap sm:flex-nowrap">
                <div className="sm:w-1/2 w-full sm:mb-0 mb-2">
                  <ThemeProvider theme={theme}>
                    <TextField
                      className="w-full"
                      type="text"
                      label="Store ID"
                      variant="outlined"
                      name="number"
                      onChange={(e) => setStoreInfo({ ...storeInfo, id: e.target.value })}
                    />
                  </ThemeProvider>
                </div>
                <div className="w-full sm:mb-0 mb-2">
                  <ThemeProvider theme={theme}>
                    <TextField
                      type="text"
                      className="w-full"
                      label="Store Name"
                      variant="outlined"
                      name="name"
                      onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                    />
                  </ThemeProvider>
                </div>
                <div className="sm:w-1/2 w-full">
                  <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                      <InputLabel>Store Type</InputLabel>
                      <Select
                        label="Store Type"
                        name="type"
                        value={storeInfo.type}
                        onChange={(e) => {
                          setStoreInfo({ ...storeInfo, type: e.target.value });
                          console.log(e.target.value);
                        }}
                      >
                        <MenuItem value={'trends'}>Trends</MenuItem>
                        <MenuItem value={'smart'}>Smart</MenuItem>
                        <MenuItem value={'beauty'}>Beauty</MenuItem>
                      </Select>
                    </FormControl>
                  </ThemeProvider>
                </div>
              </div>
              <hr />
              <div className="flex justify-start items-center gap-2">
                <p className="rounded-full flex justify-center items-center w-6 h-6 bg-[#10b981] text-white p-2">2</p>
                <h1 className="text-lg">Store Location</h1>
              </div>
              <div className="w-full flex bprder gap-2 flex-wrap">
                <div className="flex w-full gap-2 sm:flex-nowrap flex-wrap">
                  <div className="w-full mb-0.5 sm:mb-0">
                    <ThemeProvider theme={theme}>
                      <TextField
                        type="text"
                        className="w-full"
                        label="Area"
                        variant="outlined"
                        name="area"
                        onChange={(e) => setLocation({ ...location, area: e.target.value })}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="w-full mb-0.5 sm:mb-0">
                    <ThemeProvider theme={theme}>
                      <TextField
                        type="text"
                        className="w-full"
                        label="Region"
                        variant="outlined"
                        name="region"
                        onChange={(e) => setLocation({ ...location, region: e.target.value })}
                      />
                    </ThemeProvider>
                  </div>
                </div>
                <div className="w-full flex gap-0.5 sm:gap-2 flex-wrap sm:flex-nowrap">
                  <div className="w-full mb-2 sm:mb-0">
                    <ThemeProvider theme={theme}>
                      <Autocomplete
                        options={states}
                        renderInput={(params) => <TextField {...params} label="Select Your State" variant="outlined" />}
                        onChange={(event, value) => {
                          setLocation({ ...location, state: value });
                        }}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="w-full mb-2 sm:mb-0">
                    <ThemeProvider theme={theme}>
                      <Autocomplete
                        options={stateCities[location.state]}
                        noOptionsText="No locations"
                        disableListWrap
                        renderInput={(params) => <TextField {...params} label="Select Your City" variant="outlined" />}
                        onChange={(event, value) => {
                          setLocation({ ...location, city: value });
                        }}
                      />
                    </ThemeProvider>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-start items-center gap-2">
                <p className="rounded-full flex justify-center items-center w-6 h-6 bg-[#10b981] text-white p-2">3</p>
                <h1 className="text-lg">Brand & Shelves</h1>
              </div>
              <div className="w-full flex space-x-4">
                <div className=" w-full flex space-x-2">
                  <div className="w-full">
                    <ThemeProvider theme={theme}>
                      <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                          label="Brands"
                          name="brands"
                          // onChange={(e) => setBrandValue(e.target.value)}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setBrandValue((prevSelectedBrands) => {
                              if (prevSelectedBrands.includes(selectedValue)) {
                                return prevSelectedBrands.filter((value) => value !== selectedValue);
                              } else {
                                return [...prevSelectedBrands, selectedValue];
                              }
                            });
                          }}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </div>
                </div>
                <div className="w-full flex space-x-2">
                  <div className="w-full">
                    <ThemeProvider theme={theme}>
                      <FormControl fullWidth>
                        <InputLabel>Shelves</InputLabel>
                        <Select
                          label="Shelves"
                          name="shelves"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setShelvesValue((prevSelectedBrands) => {
                              if (prevSelectedBrands.includes(selectedValue)) {
                                return prevSelectedBrands.filter((value) => value !== selectedValue);
                              } else {
                                return [...prevSelectedBrands, selectedValue];
                              }
                            });
                          }}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </div>

                  <div className="m-auto">
                    <Button
                      sx={{
                        backgroundColor: '#059669'
                      }}
                      onClick={handleClick}
                      variant="contained"
                    >
                      <ControlPointIcon />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <button
                  onClick={handleClose}
                  className="rounded-md shadow-md text-sm font-bold bg-red-500 active:bg-red-400 hover:bg-red-700 text-white w-20 h-8"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className=" rounded-md shadow-md text-sm font-bold bg-emerald-500 active:bg-emerald-400 hover:bg-emerald-700 text-white w-20 h-8"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
