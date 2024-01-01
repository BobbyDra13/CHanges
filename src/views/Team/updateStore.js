import { useState, useEffect } from "react";

import {
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import {  useNavigate, useParams } from "react-router-dom";
import {editStore, getStores } from "./API/api";
import Breadcrumb from "component/Breadcrumb";
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from "react-router-dom";

const initialValue = {
  user_id: "",
  user_name: "",
  status: "",
  user_role: "",
  number: "",
  apk_version: "",
};

const EditStore = () => {
  const [user, setUser] = useState(initialValue);
  const { user_id, user_name, status, user_role, number, apk_version } = user;
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getStores(id);
    setUser(response.data);
  };
  const editUserDetails = async () => {
    await editStore(id, user);
    navigate('/team');
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Breadcrumb title="Team">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography component={Link} to="/team" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Team
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Edit User
        </Typography>
      </Breadcrumb>
      <Grid container spacing={3}>
        <Grid item md={5}>
            <Paper elevation={2} style={{ padding: '20px', margin: '20px' }} sx={{ borderRadius: '15px' }}>
              <Box sx={{ mb: 5 }}>{/* implementation for the image upload */}</Box>
            </Paper>
        </Grid>
        <Grid item md={6}>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }} sx={{ borderRadius: '15px' }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)'
                }}
              >
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
                  label="Name"
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
                  label="Status"
                  onChange={(e) => onValueChange(e)}
                  name="status"
                  value={status}
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
                <TextField
                  label="APK Version"
                  onChange={(e) => onValueChange(e)}
                  name="apk_version"
                  value={apk_version}
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
