
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
const drawerWidth = 250;

const NavigationBar = () => {
  const navLinks = [
    { label: 'All Users', path: '/team' },
    { label: 'Agents', path: '/team/agents/' },
    { label: 'Department Manger', path: '/team/DeptMan' },
    { label: 'Store Manager', path: '/team/StoreMan' },
    { label: 'Cluster Manager', path: '/team/ClusMan' },
    { label: 'NHQ Super User', path: '/team/SupUsers' },

  ];
  
  
  return (
    <Drawer variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        height: 'calc(100% - 100px)',
        top: '70px', 
      },
    }}
    anchor="left">
      <List>
        {navLinks.map((link, index) => (
          <ListItemButton key={index} component={Link} to={link.path}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationBar;
