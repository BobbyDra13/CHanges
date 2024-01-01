import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
<<<<<<< HEAD
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
=======
import { Grid, Typography } from '@mui/material';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
<<<<<<< HEAD

=======
import AllStores from './stores';
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
// ==============================|| TEAM PAGE ||============================== //

const Team = () => {
  return (
    <>
      <Breadcrumb title="Team">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
<<<<<<< HEAD
        Team
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Heading
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollitanim id est laborum.
              </Typography>
            </CardContent>
          </Card>
=======
          Team
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item width="99%">
        <AllStores />
>>>>>>> 2a90240c57e011d4a69c4ed616d203686d2904b6
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
