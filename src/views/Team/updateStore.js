import { useState, useEffect } from 'react';

import { Button, Paper, Grid, Box, TextField, Stack } from '@mui/material';
import { editStore, getStores } from './API/api';
import { Add as AddIcon } from '@mui/icons-material';

const initialValue = {
  user_role: '',
  user_id: '',
  user_name: '',
  store_id: '',
  email: '',
  number: ''
};

const EditStore = ({rowId, handleUpdateUserDialogClose}) => {
  const [user, setUser] = useState(initialValue);
  const {  user_role,
  user_id,
  user_name,
  store_id ,email, number } = user;


  useEffect(() => {
    loadUserDetails();
  }, [rowId]);

  const loadUserDetails = async () => {
  try {
    const response = await getStores(rowId);
    setUser(response.data);
  } catch(error){
    console.error('Error Fetching user details:',error);
  }
  };
  const editUserDetails = async () => {
    try{
    await editStore(rowId, user);
    handleUpdateUserDialogClose();
    }catch(error) {
      console.error('Error Updating user details:',error);
    }
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={7}>
          <Paper elevation={3} style={{ padding: '20px', margin: '20px' }} sx={{ borderRadius: '15px' }}>
            <Box
              rowGap={4}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)'
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
                  label="Email"
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
              <Stack alignItems="flex-end !important" justifyContent="flex-end !important" sx={{ mt: 3 }}>
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
              </Stack>
            </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EditStore;
