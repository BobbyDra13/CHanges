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
      <Grid container style={{ marginLeft: '220px' }}>
        <Grid item xs={10.5}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
