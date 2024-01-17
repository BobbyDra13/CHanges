import { useState, useEffect } from 'react';

import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  MenuItem,
  ListItemText,
  Paper,
  Divider,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { allStoresId, checkId, getOneUser, updateUser } from 'api';
import { Link } from 'react-router-dom';
import { bouncy } from 'ldrs';
bouncy.register();

const initialValue = {
  user_dept: '',
  user_role: '',
  user_id: '',
  user_name: '',
  store_id: '',
  email: '',
  number: ''
};
const roles = ['Agent', 'Department Manager', 'Store Manager', 'Cluster Manager', 'NHK Super User'];
const depts = ['Operations', 'VM', 'Marketing', 'Analysis'];

const EditStore = ({ rowId, handleEditUserDialogClose }) => {
  const theme = useTheme();
  const [user, setUser] = useState(initialValue);
  const { user_dept, user_role, user_id, user_name, store_id, number } = user;
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [storesList, updateStores] = useState([]);
  const [apiResponded, setApiResponded] = useState(true);
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = async () => {
    let formErrors = {};

    if (!user_dept) {
      formErrors = { ...formErrors, user_dept: 'User Department is required' };
    }

    if (!user_role) {
      formErrors = { ...formErrors, user_role: 'User Role is required' };
    }

    if (!user_id) {
      formErrors = { ...formErrors, user_id: 'User ID is required' };
    } else if (user_id.length < 4) {
      formErrors = { ...formErrors, user_id: 'User ID must be at least 4 characters' };
    } else {
      const response = await checkId(user_id);
      console.log(response.user_id);
      if (response != null && response.user_id !== currentUserId) {
        formErrors = { ...formErrors, user_id: 'This ID is already taken. User ID must be unique.' };
      }
    }

    if (!user_name) {
      formErrors = { ...formErrors, user_name: 'User Name is required' };
    }

    if (!store_id) {
      formErrors = { ...formErrors, store_id: 'Store is required' };
    }

    if (isEmailEditable && !validateEmail(email)) {
      formErrors = { ...formErrors, email: 'Please enter a valid email address' };
    }

    if (!number) {
      formErrors = { ...formErrors, number: 'Phone Number is required' };
    } else {
      if (!validatePhoneNumber(number)) {
        formErrors = { ...formErrors, number: 'Please enter a valid phone number' };
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await getOneUser(rowId);
        setUser(response.data);
        setLoading(false);
        setCurrentUserId(response.data.user_id);
      } catch (error) {
        console.error('Error Fetching user details:', error);
        setLoading(false);
      }
    };
    loadUserDetails();
  }, [rowId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStoreIDs = await allStoresId();
        const storesData = fetchedStoreIDs.map((store) => ({
          store_id: store.store_id,
          id: store.id
        }));
        updateStores(storesData);
      } catch (error) {
        console.error('Error fetching store IDs:', error);
      }
    };

    fetchData();
  }, []);

  const editUserDetails = async () => {
    try {
      const isFormValid = await validateForm();
      if (isFormValid) {
        setApiResponded(false);
        await updateUser(rowId, user);
        handleSnackbarOpen();
        setSnackbarMessage('User updated successfully !');
        handleEditUserDialogClose();
      }
    } catch (error) {
      console.error('Error Updating user details:', error);
      handleSnackbarOpen();
      setSnackbarMessage('Failed to add user.');
    } finally {
      setApiResponded(true);
    }
  };

  const onValueChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'store_id') {
      const selectedStore = storesList.find((store) => store.store_id === value);
      setUser({ ...user, store_id: value, stores: selectedStore });
    } else {
      setUser({ ...user, [name]: value });
    }

    if (name === 'user_role') {
      setIsEmailEditable(value === 'Cluster Manager' || value === 'NHK Super User');
      if (!(value === 'Cluster Manager' || value === 'NHK Super User')) {
        setEmail('');
      }
    }
    let fieldError = '';
    switch (name) {
      case 'user_role':
        fieldError = !value ? 'User Role is required' : '';
        break;

      case 'user_id':
        fieldError = !value ? 'User ID is required' : value.length < 4 ? 'User ID must be at least 4 characters' : '';
        if (!fieldError) {
          const response = await checkId(value);
          if (response != null && response.user_id !== currentUserId) {
            fieldError = 'This ID is already taken. User ID must be unique.';
          }
        }
        break;

      case 'user_name':
        fieldError = !value ? 'User Name is required' : '';
        break;

      case 'store_id':
        fieldError = !value ? 'Store ID is required' : '';
        break;

      case 'email':
        fieldError = isEmailEditable && !validateEmail(value) ? 'Please enter a valid email address' : '';
        break;

      case 'number':
        fieldError = !value ? 'Phone Number is required' : !validatePhoneNumber(value) ? 'Please enter a valid phone number' : '';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: fieldError });
  };

  return (
    <Paper elevation={6} sx={{ padding: '20px', borderRadius: '12px' }}>
      {loading ? (
        <Box>
          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        </Box>
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            Edit User
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User Department"
                  onChange={(e) => onValueChange(e)}
                  name="user_dept"
                  value={user_dept}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  select
                  required="true"
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
                  error={!!errors.user_dept}
                  helperText={errors.user_dept}
                >
                  {depts.map((name) => (
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User Role"
                  onChange={(e) => onValueChange(e)}
                  name="user_role"
                  value={user_role}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  select
                  required="true"
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
                  error={!!errors.user_role}
                  helperText={errors.user_role}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  onChange={(e) => onValueChange(e)}
                  name="user_id"
                  value={user_id}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  required="true"
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
                  error={!!errors.user_id}
                  helperText={errors.user_id}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User Name"
                  onChange={(e) => onValueChange(e)}
                  name="user_name"
                  value={user_name}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  required="true"
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
                  error={!!errors.user_name}
                  helperText={errors.user_name}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Store"
                  onChange={(e) => onValueChange(e)}
                  name="store_id"
                  value={store_id}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  select
                  required="true"
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
                  error={!!errors.store_id}
                  helperText={errors.store_id}
                >
                  {storesList.map((store) => (
                    <MenuItem
                      key={store.store_id}
                      value={store.store_id}
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
                      <ListItemText primary={<Typography variant="body2">{store.store_id}</Typography>} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  helperText={isEmailEditable ? 'Email is required' : ''}
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
                  error={!!errors.email && isEmailEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  onChange={(e) => onValueChange(e)}
                  name="number"
                  value={number}
                  id="my-input"
                  variant="outlined"
                  fullWidth
                  required="true"
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
                  error={!!errors.number}
                  helperText={errors.number}
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            {!apiResponded ? (
              <CircularProgress />
            ) : (
              <>
                <Button
                  component={Link}
                  variant="contained"
                  onClick={() => editUserDetails()}
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    padding: '6px 24px',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.success.dark
                    },
                    '&:active': {
                      backgroundColor: theme.palette.success.light
                    },
                    '&:focus': {
                      outline: 'none'
                    },
                    mr: 1
                  }}
                >
                  Update User
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleEditUserDialogClose}
                  sx={{
                    borderColor: theme.palette.error.main,
                    bgcolor: theme.palette.error.light,
                    color: theme.palette.error.main,
                    borderRadius: '8px !important',
                    padding: '6px 24px !important',
                    '&:hover': {
                      backgroundColor: theme.palette.error.light,
                      color: theme.palette.text.secondary
                    }
                  }}
                >
                  Cancel
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes('successfully') ? 'success' : snackbarMessage.includes('Failed') ? 'error' : 'info'}
                    sx={{ width: '100%' }}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default EditStore;
