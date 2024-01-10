import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Box,
  useTheme,
  Tooltip,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import settings from '../../configs/react-slick-config';
import storesData from 'data/stores-data';
// import Map from './map';
// assets
// import MapImg from '../../assets/images/mapImg.png';
// import OrionImg from '../../assets/images/MapImages/orion.png';

// const location = {
//   address: '1600 Amphitheatre Parkway, Mountain View, california.',
//   lat: 37.42216,
//   lng: -122.08427
// };

// ==============================|| CUSTOMERS PAGE ||============================== //

const Customers = () => {
  const theme = useTheme();
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const navigate = useNavigate();
  const options = [
    { label: 'View', icon: <VisibilityIcon />, onClick: () => navigate('/main/stores/layout') },
    { label: 'Edit', icon: <EditIcon />, disabled: true },
    { label: 'Delete', icon: <DeleteIcon />, color: 'red', disabled: true }
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ITEM_HEIGHT = 48;

  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClick = (event) => {
    // const selectedOption = options.find((option) => option.label === 'Edit');

    // if (selectedOption) {
    //   // Handle the "Edit" logic directly
    //   handleEditClick(event, storeData.id);
    // } else {
    // Show the menu for other options
    setAnchorEl(event.currentTarget);
    // }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Breadcrumb title="Stores New">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Stores New
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        {storesData &&
          storesData.map((item, index) => (
            <Grid key={index} xs={12} item>
              <Card className="shadow-xl" sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                  <Grid item lg={4} md={5} sm={9} xs={12}>
                    <Grid container spacing={0}>
                      <Grid sx={{ paddingRight: 1 }} item>
                        <Tooltip title={item.mapData.address}>
                          <img
                            style={{ display: 'block', objectFit: 'cover' }}
                            className="rounded-md border border-gray-300 w-20 h-[105px] drop-shadow-md hover:cursor-pointer"
                            src={item.mapData.imgUrl}
                            alt="noImg"
                          />
                        </Tooltip>
                        {/* <div className="rounded-md border border-gray-300 w-20 h-[105px] drop-shadow-md">
                      <Map location={location} zoomLevel={3} />
                    </div> */}
                      </Grid>
                      <Grid item sx={{ display: 'flex', flex: 1 }}>
                        <Stack sx={{ width: '100%' }} direction={'column'} spacing={1}>
                          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Stack direction={'row'} spacing={1}>
                              <div className="h-full flex flex-col justify-center">
                                <Tooltip title={item.active ? 'Active' : 'Inactive'}>
                                  <div
                                    className={`shadow-md mb-0.5 rounded-full hover:cursor-pointer w-3 h-3 ${
                                      item.active ? 'bg-emerald-500' : 'bg-gray-400'
                                    }`}
                                  ></div>
                                </Tooltip>
                              </div>
                              <Typography className="drop-shadow-md self-center" variant="h5">
                                {item.storeId}
                              </Typography>
                            </Stack>
                            <IconButton
                              size="small"
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
                                  disabled={option.disabled} // Apply the disabled attribute conditionally
                                  onClick={() => {
                                    if (option.disabled != true) {
                                      option.onClick();
                                      handleClose();
                                    }
                                  }}
                                >
                                  {option.icon && <span style={{ marginRight: '8px', color: option.color }}>{option.icon}</span>}
                                  <span style={{ color: option.color }}>{option.label}</span>
                                </MenuItem>
                              ))}
                            </Menu>
                          </Box>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 90 }} variant="subtitle1">
                              Capture %
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#06b6d4'
                                  }
                                }}
                                variant="determinate"
                                value={item.kpiValues.capture}
                                color="secondary"
                              />
                              <div className="absolute w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {item.kpiValues.capture} %
                                </Typography>
                              </div>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 90 }} variant="subtitle1">
                              Up-Keep Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: item.kpiValues.upKeep >= 80 ? success : item.kpiValues.upKeep < 50 ? error : warning
                                  }
                                }}
                                variant="determinate"
                                value={item.kpiValues.upKeep}
                                color="secondary"
                              />
                              <div className="absolute w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {item.kpiValues.upKeep} %
                                </Typography>
                              </div>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 90 }} variant="subtitle1">
                              VM Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: item.kpiValues.vm >= 80 ? success : item.kpiValues.vm < 50 ? error : warning
                                  }
                                }}
                                variant="determinate"
                                value={item.kpiValues.vm}
                                color="secondary"
                              />
                              <div className="absolute w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {item.kpiValues.vm} %
                                </Typography>
                              </div>
                            </Box>
                          </Stack>
                          <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ width: 90 }} variant="subtitle1">
                              PoP Score
                            </Typography>
                            <Box className="relative" sx={{ marginLeft: 2, display: 'flex', flex: 1, alignItems: 'center' }}>
                              <LinearProgress
                                sx={{
                                  width: '100%',
                                  borderRadius: 3,
                                  height: 20,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: item.kpiValues.pop >= 80 ? success : item.kpiValues.pop < 50 ? error : warning
                                  }
                                }}
                                variant="determinate"
                                value={item.kpiValues.pop}
                                color="secondary"
                              />
                              <div className="absolute w-full h-full flex justify-center place-items-center">
                                <Typography sx={{ color: 'white' }} variant="subtitle2">
                                  {item.kpiValues.pop} %
                                </Typography>
                              </div>
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={1.5} md={2} sm={3} xs={4}>
                    <div className="w-full flex flex-col justify-center place-items-center min-[600px]:border-l border-r border-gray-300 h-full">
                      <Stack direction={'column'}>
                        <Typography className="drop-shadow-md" align="center" variant="h2">
                          {item.anomalies.resolved}/{item.anomalies.total}
                        </Typography>
                        <Typography className="drop-shadow-md" align="center" variant="h6">
                          Anomalies solved
                        </Typography>
                        <div className="w-full mt-2 flex justify-center">
                          <AvatarGroup
                            sx={{
                              '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 }
                            }}
                            max={2}
                          >
                            {item.agents.map((agent, index) => (
                              <Tooltip
                                key={index}
                                title={
                                  <div className="w-[200px] p-2 flex flex-col space-y-2">
                                    <Typography sx={{ width: '100%', color: 'white' }} variant="h6">
                                      Agent Details
                                    </Typography>
                                    <Typography variant="subtitle2">Name: {agent.name}</Typography>
                                    <Typography variant="subtitle2">Number: {agent.number}</Typography>
                                  </div>
                                }
                              >
                                <Avatar className="hover:cursor-pointer" sx={{ bgcolor: success }} alt={agent.name} src="/example.jpg" />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </div>
                      </Stack>
                    </div>
                  </Grid>
                  <Grid item lg={6.5} md={5} sm={12} xs={8}>
                    <div className="w-full px-4 flex flex-col justify-center h-full">
                      <Slider {...settings}>
                        {item.anomalies.images.map((anomaly) => (
                          <div key={anomaly.url} className="rounded-md border shadow-md h-[147px]">
                            <img
                              style={{ width: '100%', objectFit: 'cover' }}
                              className="rounded-md shadow-md h-full"
                              src={anomaly.url}
                              alt="no Img"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Customers;
