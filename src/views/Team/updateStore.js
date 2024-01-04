import { useState, useEffect } from 'react';

import { Button, Grid, Box, TextField, Stack, Typography, MenuItem, ListItemText, Paper } from '@mui/material';
import { editStore } from './API/api';
import { Add as AddIcon } from '@mui/icons-material';
import { getUsers } from 'api';

const initialValue = {
  user_role: '',
  user_id: '',
  user_name: '',
  store_id: '',
  email: '',
  number: ''
};
const roles = ['Agents', 'Department Manager', 'Store Manager', 'Cluster Manager', 'NHK Super User'];
const stores = ['Lakme', 'Adidas', 'Trends', 'Loreal', 'Heads and Shoulders'];


const EditStore = ({rowId, handleEditUserDialogClose}) => {
  console.log(rowId);
  const [user, setUser] = useState(initialValue);
  const { user_role, user_id, user_name, store_id, email, number } = user;

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
  try {
    console.log(rowId);
    const response = await getUsers(rowId);
    setUser(response.data);
  } catch(error){
    console.error('Error Fetching user details:',error);
  }
  };
  const editUserDetails = async () => {
    try{
    await editStore(rowId, user);
    handleEditUserDialogClose();
    }catch(error) {
      console.error('Error Updating user details:',error);
    }
  };

  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Box p={4}>
    <Paper elevation={6} sx={{ padding: '24px', borderRadius: '12px' }}>

      <Grid container spacing={4}>
      <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Edit User
            </Typography>
          </Grid>
        <Grid item xs={12}>
          <Stack spacing={3}>
            <Box
              rowGap={4}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)'
              }}
            >
              <TextField
                label="User Role"
                onChange={(e) => onValueChange(e)}
                name="user_role"
                value={user_role}
                id="my-input"
                variant="outlined"
                fullWidth
                select
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.4)',
                    '&.Mui-focused': {
                      color: 'black'
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'black'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black'
                    }
                  }
                }}
              >
                {roles.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{
                        padding: '6px 8px',
                        lineHeight: '1.57143',
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        borderRadius: '6px',
                        display: 'flex',
                        marginBottom: '4px',
                        height: '40px',
                        '&:focus, &:hover': {
                          bgcolor: '#f4f6f8'
                        }
                      }}
                    >
                      <ListItemText primary={<Typography variant="body2">{name}</Typography>} />
                    </MenuItem>
                  ))}
                  </TextField>
              <TextField
                label="User ID"
                onChange={(e) => onValueChange(e)}
                name="user_id"
                value={user_id}
                id="my-input"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.4)',
                    '&.Mui-focused': {
                      color: 'black'
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'black'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black'
                    }
                  }
                }}
              />

                <TextField
                  label="User Name"
                  onChange={(e) => onValueChange(e)}
                  name="user_name"
                  value={user_name}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.4)',
                      '&.Mui-focused': {
                        color: 'black'
                      }
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'black'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black'
                      }
                    }
                  }}
                />
                <TextField
                  label="Store"
                  onChange={(e) => onValueChange(e)}
                  name="store_id"
                  value={store_id}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  select
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.4)',
                      '&.Mui-focused': {
                        color: 'black'
                      }
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'black'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black'
                      }
                    }
                  }}
                >
                  {stores.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{
                        padding: '6px 8px',
                        lineHeight: '1.57143',
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        borderRadius: '6px',
                        display: 'flex',
                        marginBottom: '4px',
                        height: '40px',
                        '&:focus, &:hover': {
                          bgcolor: '#f4f6f8'
                        }
                      }}
                    >
                      <ListItemText primary={<Typography variant="body2">{name}</Typography>} />
                    </MenuItem>
                  ))}
                  </TextField>
                <TextField
                  label="Email Address"
                  onChange={(e) => onValueChange(e)}
                  name="email"
                  value={email}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.4)',
                      '&.Mui-focused': {
                        color: 'black'
                      }
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'black'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black'
                      }
                    }
                  }}
                />
                <TextField
                  label="Phone Number"
                  onChange={(e) => onValueChange(e)}
                  name="number"
                  value={number}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.4)',
                      '&.Mui-focused': {
                        color: 'black'
                      }
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'black'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black'
                      }
                    }
                  }}
                />
              </Box>
              </Stack>
              </Grid>
              <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => editUserDetails()}
                  sx={{
                    bgcolor: '#000000 !important',
                    color: '#FFFFFF !important',
                    borderRadius: '8px !important',
                    padding: '6px 24px !important',
                    '&:hover': {
                      bgcolor: '#1a1a1a !important'
                    },
                    '&:active': {
                      bgcolor: '#000000 !important'
                    }
                  }}
                >
                  Update User
                </Button>
                <Button variant="outlined" onClick={handleEditUserDialogClose}>
                Cancel
               </Button>
              </Stack>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  );
};

export default EditStore;
