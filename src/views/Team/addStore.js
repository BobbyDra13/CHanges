import { useState } from 'react';
import { Button, Box, Paper, TextField, Grid, Stack, Typography, IconButton, styled, alpha } from '@mui/material';
import { addStore } from './API/api';
import { Link, useNavigate } from 'react-router-dom';
import { Add as AddIcon ,PhotoCamera} from '@mui/icons-material';
import Breadcrumb from 'component/Breadcrumb';
const initialValue = {
  user_id: '',
  user_name: '',
  status: '',
  user_role: '',
  number: '',
  apk_version: ''
};
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const AddStore = () => {
  const [user, setUser] = useState(initialValue);
  const { user_id, user_name, status, user_role, number, apk_version } = user;
  let navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await addStore(user);
    navigate('/team');
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
  const selectedImage = e.target.files[0];
  setImage(selectedImage);
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
          Add User
        </Typography>
      </Breadcrumb>

      <Grid container spacing={3}>
        <Grid item md={5}>
            <Paper elevation={2} style={{ padding: '20px', margin: '20px' }} sx={{ borderRadius: '15px' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              mb: 5,
            }}>
            <ButtonWrapper>
                <label htmlFor="image-upload">
                  <input
                    onChange={handleImageChange}
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    style={{ display: "none" }}
                  />
                  <UploadButton>
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 60, color: "black !important" }} />
                    </IconButton>
                  </UploadButton>
                </label>
              </ButtonWrapper>
              {image && <Typography>{image.name}</Typography>}
              <Box
              component="small"
              fontSize="16px"
              fontWeight="500"
              lineHeight={1.9}
              marginTop={2}
              maxWidth={200}
              display="block !important"
              textAlign="center !important"
              color="text.disabled !important"
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
            </Box>
              </Box>
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
                  onClick={() => addUserDetails()}
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
                  Create User
                </Button>
              </Stack>
            </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddStore;
