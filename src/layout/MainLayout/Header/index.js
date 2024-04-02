import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// third party
import {
  // useSelector,
  useDispatch
} from 'react-redux';

// project import
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';
import * as actionTypes from 'store/actions';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { TopNavItems } from 'top-nav-items';
// import topNavItems from 'top-nav-items';
// import logo from 'assets/images/logo.svg';
// import NeophyteLogo from "assets/images/neophyte_logo.png"

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();
  // const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  let location = useLocation();

  return (
    <>
      <Box width={drawerWidth}>
        <div className="flex">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <Typography
                  onClick={() => window.open('/main/insights', '_self')}
                  variant="h2"
                  align="left"
                  className="black cursor-pointer"
                  sx={{ width: '100%', paddingLeft: 1.6 }}
                >
                  Disha
                </Typography>
                {/* <img className='w-[80%]' src={NeophyteLogo} alt="Logo" /> */}
              </Box>
            </Grid>
          </Box>
          <Grid sx={{ display: { xs: 'block', md: 'none' } }} item>
            <IconButton
              className="text-black"
              edge="start"
              sx={{ mr: theme.spacing(1.25), color: 'white' }}
              // color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Grid>
        </div>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box className="space-x-8" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
          <Link
            to={'/main/insights'}
            onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'insights' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/main/insights' ? 'border-b-2 border-emerald-500 text-emerald-600' : ''
            }`}
          >
            Insights
          </Link>
          {/* <Link
            to={'/main/stores'}
            onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'stores' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/main/stores' || location.pathname === '/stores/analysis'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : ''
            }`}
          >
            Stores
          </Link>
          {/* <Link
            to={'/stores'}
            onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'stores' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/stores' || location.pathname === '/stores/analysis'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : ''
            }`}
          >
            Stores
          </Link> */}
          {/* <Link
            to={'/brands'}
            onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'brands' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/brands' ? 'border-b-2 border-emerald-500 text-emerald-600' : ''
            }`}
          >
            Brands
          </Link> */}
          <Link
            to={'/main/stores'}
            onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'customers' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/main/stores' ? 'border-b-2 border-emerald-500 text-emerald-600' : ''
            }`}
          >
            Stores
          </Link>
          <Link
            // to={'/main/team'}
            // onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: 'team' })}
            className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
              location.pathname === '/main/team' ? 'border-b-2 border-emerald-500 text-emerald-600' : ''
            }`}
            // className={`text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600 ${
            //   location.pathname === '/main/team' ? 'border-b-2 border-emerald-500 text-emerald-600' : ''
            // }`}
          >
            Teams
          </Link>
          <a
            href="https://neophyte.ai/contact"
            className="text-lg hover:border-b-2 hover:border-emerald-500 hover:text-emerald-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
          {/* {TopNavItems.map((item) => {
            <Link className='' key={item.title} to={item.url}>
              {item.title}
            </Link>;
          })} */}
        </Box>
      </Box>
      {/* <SearchSection theme="light" /> */}
      {/* <NotificationSection /> */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
