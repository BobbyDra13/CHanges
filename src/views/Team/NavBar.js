import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Typography, ListItemIcon } from '@mui/material';
import { Person, AccountCircle, Business, Store, SupervisorAccount, VerifiedUser } from '@mui/icons-material';

const drawerWidth = 250;

const NavigationBar = ({ handleNavigationClick }) => {
  const navLinks = [
    { label: 'All Stores', icon: <Person /> },
    { label: 'Agents', icon: <AccountCircle /> },
    { label: 'Department Manager', icon: <Business /> },
    { label: 'Store Manager', icon: <Store /> },
    { label: 'Cluster Manager', icon: <SupervisorAccount /> },
    { label: 'NHK Super User', icon: <VerifiedUser /> }
  ];

  const listItemTextStyle = {
    fontSize: '1rem'
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            height: 'calc(100% - 80px)',
            top: '70px',
            color: '#fff'
          }
        }}
        anchor="left"
      >
        <List>
          {navLinks.map((link, index) => (
            <ListItemButton key={index} onClick={() => handleNavigationClick(link.label)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={<Typography style={listItemTextStyle}>{link.label}</Typography>} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default NavigationBar;
