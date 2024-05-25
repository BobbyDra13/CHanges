import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Fade, Button, ClickAwayListener, Paper, Popper, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

// assets
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
// import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
// import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
// import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
// import { Email } from '@mui/icons-material';

// ==============================|| PROFILE SECTION ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const userData = localStorage.getItem('userData');
  const users = JSON.parse(userData);

  const navigateTo = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // console.log("Sign-out successful");
        localStorage.removeItem('userData');
        navigateTo('/');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  // const [selectedIndex, setSelectedIndex] = React.useState();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (!auth) {
    return null; // or render a loading/error message
  }

  const name = users.data.name;
  const number = users.data.number;
  const email = users.data.email;
  // console.log(name, number, email);

  return (
    <>
      <Button
        sx={{ minWidth: { sm: 50, xs: 35 }, color: 'black' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Profile"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleTwoToneIcon sx={{ fontSize: '1.7rem' }} />
      </Button>
      {users ? (
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 10]
              }
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true
              }
            }
          ]}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 350,
                      minWidth: 250,
                      bgcolor: theme.palette.background.paper,
                      pb: 0,
                      borderRadius: '10px'
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonTwoToneIcon />
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocalPhoneIcon />{' '}
                      </ListItemIcon>
                      <ListItemText primary={number} />
                    </ListItemButton>
                    {email ? (
                      <ListItemButton>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                      </ListItemButton>
                    ) : (
                      <></>
                    )}
                    {/* <ListItemButton disabled selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                      <ListItemIcon>
                        <SettingsTwoToneIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItemButton> */}
                    {/* <ListItemButton disabled selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                      <ListItemIcon>
                        <PersonTwoToneIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItemButton> */}

                    {/* <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                      <DraftsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Messages" />
                  </ListItemButton> */}
                    {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                      <LockOpenTwoTone />
                    </ListItemIcon>
                    <ListItemText primary="Lock Screen" />
                  </ListItemButton> */}
                    {/* <Link to={'/login'}> */}
                    <ListItemButton
                      // selected={selectedIndex === 4}
                      onClick={handleLogout}
                    >
                      <ListItemIcon>
                        <MeetingRoomTwoToneIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                    {/* </Link> */}
                  </List>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      ) : (
        <>No users found</>
      )}
    </>
  );
};

export default ProfileSection;
