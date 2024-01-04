import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';
import Progress_bar from './progressBar';
import { Tooltip, Dialog, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import AddStore from './addStore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import stateCities from './stateCitiesData.json';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { GetAllStores } from 'api';

// ==============================|| BRANDS PAGE ||============================== //
const states = Object.keys(stateCities);

const StoreContent = () => {
  const [clickedBar, setClickedBar] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [editDialogOpenMap, setEditDialogOpenMap] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const [storeInfo, setStoreInfo] = useState({ id: 0, name: '', type: '' });
  const [location, setLocation] = useState({
    area: '',
    region: '',
    state: '',
    city: ''
  });

  const [storesData, setStoresData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllStores();
        setStoresData(response.data.data);
      } catch (error) {
        console.error('Error fetching stores data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('StoresData', storesData);
  // const shelfCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log("brand", shelf);

  const [counter, setCounter] = useState(0);

  const handleEditsClick = () => {
    setCounter(counter + 1);
    // console.log(counter);
  };

  const handleEditClick = (event, storeId) => {
    setAnchorEl(event.currentTarget);
    setEditDialogOpenMap((prev) => ({ ...prev, [storeId]: true }));
  };

  const handleEditClose = () => {
    setAnchorEl(null);
    setEditDialogOpenMap({});
  };

  const [fullWidth] = useState(true);
  const [maxWidth] = useState('md');

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

  const options = [
    { label: 'View', icon: <VisibilityIcon />, onClick: () => navigate('/stores/analysis/layout') },
    // { label: 'Edit', icon: <EditIcon /> },
    { label: 'Delete', icon: <DeleteIcon />, color: 'red' }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const ITEM_HEIGHT = 48;

  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClick = (event) => {
    const selectedOption = options.find((option) => option.label === 'Edit');

    if (selectedOption) {
      // Handle the "Edit" logic directly
      handleEditClick(event, storeData.id);
    } else {
      // Show the menu for other options
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProgressBarClick = (storeId, columnName) => {
    const matchingImage = imageData.find((data) => data.id === storeId);
    setClickedBar({
      storeId,
      columnName,
      imageUrls: matchingImage ? matchingImage.url : undefined
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };
  const storeData = [
    {
      id: 'TX1234-Seawoods',
      upKeep: '90%',
      vm: '60%',
      promo: '80%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="60"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Seawoods', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Bandra',
      upKeep: '85%',
      vm: '76%',
      promo: '30%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="20"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Bandra', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Pune',
      upKeep: '60%',
      vm: '50%',
      promo: '78%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="40"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Pune', 'anomalies')}
        />
      )
    },
    {
      id: 'TX1234-Raurkela',
      upKeep: '30%',
      vm: '90%',
      promo: '59%',
      anomalies: (
        <Progress_bar
          bgcolor="rgb(134 239 172)"
          progress="90"
          height={20}
          handleProgressBarClick={() => handleProgressBarClick('TX1234-Raurkela', 'anomalies')}
        />
      )
    }
  ];

  const imageData = [
    {
      id: 'TX1234-Seawoods',
      url: [
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg'
      ]
    },
    {
      id: 'TX1234-Bandra',
      url: [
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg',
        'https://simplyorganized.me/wp-content/uploads/2016/12/IMG_9029-768x1027.jpg'
      ]
    }
  ];

  return (
    <>
      <Breadcrumb title="Stores">
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Stores
        </Typography>
      </Breadcrumb>
      <Grid item spacing={gridSpacing}>
        <AddStore />
      </Grid>
      <Grid container spacing={gridSpacing}>
        <table className="border-collapse mt-5 ml-5 w-full">
          <thead>
            <tr className="">
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '8%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Store ID</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Up Keep</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">VM</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Promo</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '20%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Anomalies</div>
              </th>
              <th className="flex-1 p-0.5 cursor-pointer" style={{ width: '5%' }}>
                <div className="bg-gray-200 p-0.5 rounded">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {storesData.map((store) => (
              <tr key={store.id} className="text-center">
                <td className="p-0.5 w-5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.store_id}  {store.name}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.upKeep}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.vm}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    {store.promo}
                  </div>
                </td>
                <td className="p-0.5 w-20 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center flex-col justify-center hover:bg-gray-200 hover:text-black transition">
                    {clickedBar && clickedBar.storeId === store.id && clickedBar.columnName === 'anomalies' ? (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          {clickedBar.imageUrls &&
                            clickedBar.imageUrls.map((imageUrl, index) => (
                              <Tooltip
                                key={index}
                                title={
                                  <div>
                                    <img
                                      key={index}
                                      className="w-fit h-fit max-h-[200px] "
                                      src={imageUrl}
                                      alt={`Image_no. ${index + 1} for ${store.id}`}
                                    />
                                  </div>
                                }
                              >
                                <div
                                  className="w-15 h-12 m-1 cursor-pointer"
                                  key={index}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => handleImageClick(imageUrl)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleImageClick(imageUrl);
                                    }
                                  }}
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`Image_no. ${index + 1} for ${store.id}`}
                                    style={{ width: '100%', height: '100%' }}
                                  />
                                </div>
                              </Tooltip>
                            ))}
                        </div>
                        {store.anomalies}
                      </>
                    ) : (
                      store.anomalies
                    )}
                  </div>
                </td>
                <td className="p-0.5 cursor-pointer">
                  <div className="bg-gray-100 p-0.5 rounded h-[100px] flex items-center justify-center hover:bg-gray-200 hover:text-black transition">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch'
                        }
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option.label}
                          selected={option.label === 'View'}
                          onClick={() => {
                            option.onClick();
                            handleClose();
                          }}
                        >
                          {option.icon && <span style={{ marginRight: '8px', color: option.color }}>{option.icon}</span>}
                          <span style={{ color: option.color }}>{option.label}</span>
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </td>
                <Dialog
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                  open={editDialogOpenMap[store.id] || false}
                  onClose={() => setEditDialogOpenMap((prev) => ({ ...prev, [store.id]: false }))}
                >
                  <DialogContent className="overflow-y-auto scrollbar">
                    <div className="w-full">
                      <div className="w-full flex justify-between text-xl mb-5 text-gray-600 font-bold">
                        <span className="self-center">Edit Store</span>
                        <IconButton edge="end" onClick={handleEditClose} aria-label="close" className="self-center">
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
                                onClick={handleEditsClick}
                                variant="contained"
                              >
                                <ControlPointIcon />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end w-full gap-2">
                          <button
                            onClick={handleEditClose}
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
                <Dialog open={isImageDialogOpen} onClose={handleCloseImageDialog} maxWidth="lg">
                  <DialogContent>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleCloseImageDialog}
                      aria-label="close"
                      sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <img src={selectedImage} alt="Full-screen" style={{ width: '100%', height: 'auto' }} />
                  </DialogContent>
                </Dialog>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export default StoreContent;
