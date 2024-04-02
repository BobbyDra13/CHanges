import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Box,
  ListItemText,
  Divider,
  CircularProgress,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormHelperText
} from '@mui/material';
import { allStoresId, checkId, createUser } from 'api';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const initialValue = {
  user_dept: '',
  user_role: '',
  user_id: '',
  user_name: '',
  store_id: '',
  email: '',
  stores: '',
  number: ''
};

const roles = ['Agent', 'Department Manager', 'Store Manager', 'Cluster Manager', 'NHK Super User'];
const depts = ['Operations', 'VM', 'Marketing', 'Analysis'];

const AddStore = ({ handleAddUserDialogClose, handleSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();
  const [user, setUser] = useState(initialValue);
  const { user_dept, user_role, user_id, user_name, store_id, number } = user;
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [email, setEmail] = useState('');
  const [storesList, updateStores] = useState([]);
  const [apiResponded, setApiResponded] = useState(true);
  const [whatsapp, setWhatsapp] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const [errors, setErrors] = useState({});

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
      if (response != null) {
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
    if (whatsapp == null) {
      formErrors = { ...formErrors, email: 'This is required' };
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
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

  const onValueChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'store_id') {
      const selectedStore = storesList.find((store) => store.store_id === value);
      setUser({ ...user, store_id: value, stores: selectedStore.id });
    } else {
      setUser({ ...user, [name]: value });
    }
    if (name === 'user_role') {
      setIsEmailEditable(value != 'Agent');
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
          if (response != null) {
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

      case 'whatsapp':
        fieldError = value == null ? 'This is required' : '';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: fieldError });
  };

  const addUserDetails = async () => {
    try {
      const isFormValid = await validateForm();
      if (isFormValid) {
        setApiResponded(false);
        await createUser(user);
        handleSnackbarOpen();
        setSnackbarMessage('User added successfully !');
        handleAddUserDialogClose();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      handleSnackbarOpen();
      setSnackbarMessage('Failed to add user.');
    } finally {
      setApiResponded(true);
    }
  };

  return (
    <Paper elevation={6} sx={{ padding: '20px', borderRadius: '12px' }}>
      <Typography variant="h3" gutterBottom>
        Add User
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
              onChange={(e) => {
                onValueChange(e);
              }}
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
              onChange={(e) => {
                onValueChange(e);
                // console.log(e.target.value);
              }}
              name="store_id"
              value={user.store_id}
              id="my-input"
              variant="outlined"
              fullWidth
              select
              required
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
            <FormControl error={!!errors.whatsapp}>
              <FormLabel id="demo-controlled-radio-buttons-group">Is this number on WhatsApp?</FormLabel>
              <RadioGroup
                name="whatsapp"
                onChange={(e) => onValueChange(e)}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                value={whatsapp}
                required="true"
              >
                <FormControlLabel
                  value={true}
                  name="controlled-radio-buttons-group"
                  control={<Radio />}
                  label="Yes"
                  onClick={() => setWhatsapp(true)}
                />
                <FormControlLabel
                  value={false}
                  name="controlled-radio-buttons-group"
                  control={<Radio />}
                  label="No"
                  onClick={() => setWhatsapp(false)}
                />
              </RadioGroup>
              <FormHelperText>{errors.whatsapp}</FormHelperText>
            </FormControl>
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
              helperText={isEmailEditable && !email ? 'Email is required' : ''}
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
              onClick={() => addUserDetails()}
              sx={{
                bgcolor: theme.palette.success.main,
                color: '#FFFFFF',
                borderRadius: '8px ',
                padding: '6px 24px ',
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
              Create User
            </Button>
            <Button
              variant="outlined"
              onClick={handleAddUserDialogClose}
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
          </>
        )}
      </Box>
    </Paper>
  );
};

export default AddStore;
