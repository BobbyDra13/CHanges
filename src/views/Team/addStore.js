import { useState } from 'react';
import { Button, Box, TextField, Grid, Stack, MenuItem, ListItemText, Typography, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { createUser } from 'api';

const initialValue = {
  user_role: '',
  user_id: '',
  user_name: '',
  store_id: '',
  number: ''
};

const roles = ['Agents', 'Department Manager', 'Store Manager', 'Cluster Manager', 'NHK Super User'];
const stores = ['Lakme', 'Adidas', 'Trends', 'Loreal', 'Heads and Shoulders'];

const AddStore = ({ handleAddUserDialogClose }) => {
  const [user, setUser] = useState(initialValue);
  const { user_role, user_id, user_name, store_id, number } = user;
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [email, setEmail] = useState('');
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });


    if (name === 'user_role') {
      setIsEmailEditable(value === 'Cluster Manager' || value === 'NHK Super User');
      if (!(value === 'Cluster Manager' || value === 'NHK Super User')) {
        setEmail('');
      }
    }
  };


  

  const addUserDetails = async () => {
    try {
      await createUser(user);
      handleAddUserDialogClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  return (
    <Box p={4}>
      <Paper elevation={6} sx={{ padding: '24px', borderRadius: '12px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Add User
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    onValueChange(e);
                  }}
                  name="email"
                  value={email}
                  id="my-input"
                  variant="outlined"
                  required={isEmailEditable}
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
                onClick={() => addUserDetails()}
                sx={{
                  backgroundColor: '#000000 !important',
                  color: '#FFFFFF !important',
                  borderRadius: '8px !important',
                  padding: '6px 24px !important',
                  '&:hover': {
                    backgroundColor: '#1a1a1a !important'
                  },
                  '&:active': {
                    backgroundColor: '#000000 !important'
                  }
                }}
              >
                Create User
              </Button>
              <Button variant="outlined" onClick={handleAddUserDialogClose}>
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AddStore;
