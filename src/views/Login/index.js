import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './FirebaseLogin';
// import Background from '../../assets/images/backgroundcolor.jpeg';

// assets
// import Logo from 'assets/images/logo-dark.svg';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const theme = useTheme();

  return (
    <div style={{ height: '100%', minHeight: '100vh', overflow:'auto' }}>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        // backgroundImage: `url(${Background})`,
        // background: 'rgb(2, 0, 36)',
        // backgroundImage: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 172, 105, 1) 29%, rgba(0, 212, 255, 1) 100%)',
        height: '100%',
        minHeight: '100vh',
        backgroundSize: 'cover', // Set the background size to cover,
        backgroundPosition: 'center' // Center the background image
      }}
    >
      {/* <Grid item xs={11} sm={7} md={6} lg={4}> */}
        <Card
          // className='shadow-xl drop-shadow-md'
          sx={{
            overflow: 'visible',
            display: 'flex',
            position: 'relative',
            '& .MuiCardContent-root': {
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%'
            },
            maxWidth: '475px',
            margin: '24px auto'
          }}
        >
          <CardContent sx={{ p: theme.spacing(5, 4, 3, 4) }}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Sign in
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      To keep connected with us.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/main/insights">
                      {/* <img alt="Auth method" src={Logo} /> */}
                      <Typography sx={{ paddingTop: 1 }} color="textPrimary" gutterBottom variant="h3">
                        Disha
                      </Typography>
                    </RouterLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              {/* <Grid container justifyContent="flex-start" sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }}>
                <Grid item>
                  <RouterLink to={'/register'}>
                    <Typography variant="subtitle2" color="secondary" sx={{ textDecoration: 'none', pl: 2 }}>
                      Create new account
                    </Typography>
                  </RouterLink>
                </Grid>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    {/* </Grid> */}
    <Typography sx={{position: "absolute", left: 3, bottom: 2}} color="black" variant='subtitle'>Version: 0.02</Typography>
    </div>
  );
};

export default Login;
