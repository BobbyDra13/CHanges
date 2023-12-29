import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import TableComponent from 'views/Stores/Table';

// ==============================|| STORES PAGE ||============================== //

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 4.3),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 4.3),
  createData('Gingerbread', 356, 49, 3.9)
];
const Stores = () => {
  return (
    <>
      <Breadcrumb title="Stores">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Insights
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Stores
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item width={'100%'}>
          <TableComponent rows={rows} />
        </Grid>
      </Grid>
    </>
  );
};

export default Stores;
