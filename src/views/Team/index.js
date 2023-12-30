import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import AllStores from './stores';
// ==============================|| TEAM PAGE ||============================== //

const Team = () => {
  return (
    <>
      <Breadcrumb title="Team">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Team
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item width="99%">
          <AllStores />
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
