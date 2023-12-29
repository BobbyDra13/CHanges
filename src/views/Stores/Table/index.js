import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Button,
  Stack
} from '@mui/material';
import { IosShareRounded, SearchRounded, CheckBoxOutlineBlankRounded } from '@mui/icons-material';

const status = ['All', 'Verified', 'Pending Verification', 'Rejected'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: '10px',
      padding: '0px 6px'
    }
  }
};
export default function TableComponent({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Paper sx={{ borderRadius: '15px' }}>
      <Stack p={1} direction={{ lg: 'row', xs: 'column' }} justifyContent={'space-between'} alignItems={{ lg: 'center', xs: 'end' }}>
        <Stack direction={{ lg: 'row', xs: 'column' }} alignItems={'center'} width={{ lg: '50%', xs: '100%' }} order={{ lg: 1, xs: 2 }}>
          <FormControl
            sx={{
              m: 1,
              width: '100%'
            }}
            color="success"
          >
            <InputLabel id="demo-multiple-checkbox-label">Verification Fillter</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={
                <OutlinedInput
                  label="Verification Fillter"
                  sx={{
                    borderRadius: '10px',
                    borderColor: theme.palette.grey[200]
                  }}
                />
              }
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {status.map((name) => (
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
                  <Checkbox
                    checked={personName.indexOf(name) > -1}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        borderRadius: 10, // Adjust the border radius as needed
                        fontSize: '1.25rem',
                        color: '#00a76f'
                      },
                      borderRadius: '10px',
                      borderWidth: '1px',
                      outlineWidth: '1px'
                    }}
                    icon={<CheckBoxOutlineBlankRounded />}
                  />
                  <ListItemText primary={<Typography variant="body2">{name}</Typography>} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-disabled"
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': { borderRadius: '10px' }
            }}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded style={{ fontSize: 24 }} className="text-gray-400" />
                </InputAdornment>
              )
            }}
          />
        </Stack>

        <Button
          variant="text"
          sx={{
            color: '#212b36',
            fontSize: { lg: '18px', xs: '14px' },
            lineHeight: { lg: '21px', xs: '17px' },
            textTransform: 'none',
            margin: { lg: '0 0 0 10px', xs: '10px 0 0 0' },
            '&:hover': {
              bgcolor: '#f4f6f8'
            },
            order: { lg: 2, xs: 1 }
          }}
          startIcon={<IosShareRounded className="text-[#212b36] w-6 h-4" />}
        >
          Export
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: { xl: '50vh', xs: '60vh' } }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  borderBottom: '1px dotted #B9B9B9',
                  bgcolor: '#f4f6f8',
                  color: '#637381',
                  fontWeight: 'bold'
                }
              }}
            >
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Shelf Verification</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page, rowsPerPage).map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& .MuiTableCell-root': {
                    borderBottom: '1px dotted #B9B9B9'
                  }
                }}
                className="hover:bg-gray-100"
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="left">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
TableComponent.propTypes = {
  rows: PropTypes.array
};
