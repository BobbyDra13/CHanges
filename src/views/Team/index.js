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
      <Grid container>
        <Grid item xs={12}>
          <Breadcrumb title="Teams">
            <Typography component={Link} to="/main/insights" variant="subtitle2" color="inherit" className="link-breadcrumb">
              Insights
            </Typography>
            <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
              Teams
            </Typography>
          </Breadcrumb>
          <Grid container spacing={gridSpacing}>
            <Grid item width="99%">
              <AllStores />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
