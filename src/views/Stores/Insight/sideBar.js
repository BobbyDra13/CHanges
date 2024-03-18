import { Grid, Tooltip, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import OrionImg from '../../../assets/images/MapImages/seawoods.png';
import { ErrorOutlineOutlined, Inventory, PeopleAlt, StoreMallDirectory, Tune } from '@mui/icons-material';
import {
  Link
  // useNavigate
} from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/images/neophyte_logo.png';
import FaceIcon from '@mui/icons-material/Face';

const SideBar = ({ selField }) => {
  // const navigate = useNavigate();
  const theme = useTheme();
  const [selectedMenuItem, setSelectedMenuItem] = useState(selField);

  const isMediumScreen = !useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
  const isExtraSmallScreen = !useMediaQuery(theme.breakpoints.up('xs'));

  const generateMenuItemStyles = (menuItem) => {
    const baseStyles = {
      textDecoration: 'none',
      fontSize: '15px',
      padding: '8px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      marginTop: '10px',
      marginRight: '25px'
    };

    if (selectedMenuItem === menuItem) {
      return {
        ...baseStyles,
        backgroundColor: '#bababa',
        fontWeight: 'bold',
        color: '#000'
      };
    }

    return baseStyles;
  };

  const disabledItem = {
    textDecoration: 'none',
    fontSize: '15px',
    padding: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    marginTop: '10px',
    marginRight: '25px',
    color: '#9ca3af'
  };

  const handleMenuItemClick = (menuItem) => {
    // navigate(/main/stores/layout);
    setSelectedMenuItem(menuItem);
  };

  const sidebarStyle = {
    flex: '0 0 200px',
    width: '15vw',
    backgroundColor: '#f0f0f0',
    position: 'fixed',
    padding: '8px',
    paddingTop: '20px',
    overflowY: 'scroll',
    left: '0px',
    top: '65px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      top: '0',
      height: 'auto',
      width: '100%',
      zIndex: 1000,
      ...(isMediumScreen && {
        flexGrow: '1',
        maxWidth: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center'
      }),
      ...(isSmallScreen && {
        flexGrow: '1',
        maxWidth: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '0',
        padding: '0',
        alignItems: 'center',
        left: '0'
      }),
      ...(isExtraSmallScreen && { flexGrow: '1', maxWidth: '100%', display: 'flex', position: 'relative', flexDirection: 'column' })
    }
  };

  return (
    <Grid item xs={12} sm={3} className="scrollbar" sx={sidebarStyle}>
      <Typography variant="h3" sx={{ fontSize: '20px', marginBottom: '3px', flexGrow: '1' }}>
        {/* 0001 - Orion Mall-Panvel */}
        RD1234-Seawoods Nexus Mall
      </Typography>
      {!isExtraSmallScreen && (
        <Grid sx={{ paddingRight: 1, flex: '1', display: !isSmallScreen ? 'block' : 'none' }} item>
          <Tooltip title={'1, Seawoods Station Rd, Nerul East, Sector 40, Nerul, Navi Mumbai, Maharashtra 400706'}>
            <img
              style={{ display: 'block', objectFit: 'cover' }}
              className="rounded-md border border-gray-300 max-[500px]: w-48 h-[180px] drop-shadow-md hover:cursor-pointer"
              src={OrionImg}
              alt="noImg"
              // onClick={() => navigate('/main/stores/layout')}
            />
          </Tooltip>
        </Grid>
      )}
      <ul style={{ listStyle: 'none', padding: 0, flexWrap: 'nowrap', display: 'flex', flexDirection: isMediumScreen ? 'row' : 'column' }}>
        <li
          style={{
            ...generateMenuItemStyles('storeOverview'),
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
        >
          <Link to="/main/stores/storeinsight" onClick={() => handleMenuItemClick('storeOverview')}>
            <StoreMallDirectory
              sx={{
                marginRight: '4px'
              }}
            />
            {!isSmallScreen ? 'Store Overview' : ''}
          </Link>
        </li>
        <li
          style={{
            ...generateMenuItemStyles('videos'),
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
        >
          <Link to="/main/stores/storevideo" onClick={() => handleMenuItemClick('videos')}>
            <ErrorOutlineOutlined
              sx={{
                marginRight: '4px'
              }}
            />
            {!isSmallScreen ? 'Videos' : ''}
          </Link>
        </li>
        <li
          style={{
            ...disabledItem,
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
          // onClick={() => handleMenuItemClick('brands')}
        >
          {/* <a href="#services"> */}
          <Inventory
            sx={{
              marginRight: '4px'
            }}
          />
          {!isSmallScreen ? 'Brands' : ''}
          {/* </a> */}
        </li>
        <li
          style={{
            ...disabledItem,
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
          // onClick={() => handleMenuItemClick('customers')}
        >
          {/* <a href="#customers"> */}
          <FaceIcon
            sx={{
              marginRight: '4px'
            }}
          />
          {!isSmallScreen ? 'Customers' : ''}
          {/* </a> */}
        </li>
        <li
          style={{
            ...disabledItem,
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
          // onClick={() => handleMenuItemClick('team')}
        >
          {/* <a href="#team"> */}
          <PeopleAlt
            sx={{
              marginRight: '4px'
            }}
          />
          {!isSmallScreen ? 'Team' : ''}
          {/* </a> */}
        </li>
        <li
          style={{
            ...disabledItem,
            display: isSmallScreen || isExtraSmallScreen ? 'inline-block' : ''
          }}
          // onClick={() => handleMenuItemClick('preferences')}
        >
          {/* <a href="#preferences"> */}
          <Tune
            sx={{
              marginRight: '4px'
            }}
          />
          {!isSmallScreen ? 'Preferences' : ''}
          {/* </a> */}
        </li>
      </ul>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        }}
      >
        <Typography variant="h6">Powered by</Typography>
        <img src={logo} alt="logo" className=" w-[90%]" />
        <Typography variant="h6">Copyright © Neophyte 20204</Typography>
      </Box>
    </Grid>
  );
};

export default SideBar;
