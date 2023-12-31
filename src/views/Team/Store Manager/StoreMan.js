import { Link } from "react-router-dom";
import NavigationBar from "../NavBar";

import { Delete as DeleteIcon, Add as AddIcon} from '@mui/icons-material';
const { Button, Paper, Stack, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Typography, TextField, InputAdornment, TableContainer, TableHead, TableCell, TableBody, TablePagination, IconButton, styled, Table, TableRow, Grid } = require("@mui/material");
// const { CSVLink } = require("react-csv");
const { BsApp } = require("react-icons/bs");
const { IoIosSearch } = require("react-icons/io");

const StyledTable = styled(Table)`
  width: 100%;
  table-layout: auto;
  aria-label: 'simple table';
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 18px;
    background: #000000;
    color: #ffffff;
  }
`;

// const TRow = styled(TableRow)`
//   &:hover {
//     background-color: #f4f6f8;
//   }

//   & > td {
//     font-size: 16;
//   }
// `;
const HeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  '& svg': {
    verticalAlign: 'middle'
  }
});

const status = ['All', 'Verified', 'Pending Verification', 'Rejected'];


const StoreMan = () => {
    const HeaderCellWithSortIcon = ({ label, onClick, 
        // sortedKey
     }) => {
        // const isAscending = sortConfig.key === sortedKey && sortConfig.direction === 'ascending';
        // const isDescending = sortConfig.key === sortedKey && sortConfig.direction === 'descending';
    
        return (
          <HeaderCell align="left" onClick={onClick}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {label}
              {/* {isAscending && <ArrowUpwardRounded />}
              {isDescending && <ArrowDownwardRounded />} */}
            </div>
          </HeaderCell>
        );
      };

    return (
        <>
        <NavigationBar/>
        <Grid container style={{ marginLeft: '220px' }}>
        <Grid item xs={10.5}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '30px'
          }}
        >
          <Button
            color="primary"
            component={Link}
            variant="contained"
            to={`/team/add`}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#1a1a1a'
              },
              '&:active': {
                backgroundColor: '#000000'
              }
            }}
          >
            Add Agent
          </Button>
        </div>
        <Paper elevation={4} style={{ padding: '20px', margin: '20px' }} sx={{ borderRadius: '15px' }}>
          <Stack className="p-2 border-0 border-red-500" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ paddingRight: '16px' }}>
              <div>
                <FormControl
                  sx={{
                    m: 1,
                    width: 250
                  }}
                  color="success"
                >
                  <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    // value={personName}
                    // onChange={handleChange}
                    input={
                      <OutlinedInput
                        label="Verification Filter"
                        sx={{
                          borderRadius: '10px',
                        //   borderColor: theme.palette.grey[200]
                        }}
                      />
                    }
                    renderValue={(selected) => selected.join(', ')}
                    // MenuProps={MenuProps}
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
                        //   checked={personName.indexOf(name) > -1}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              borderRadius: 10,
                              fontSize: '1.25rem',
                              color: '#00a76f'
                            },
                            borderRadius: '10px',
                            borderWidth: '1px',
                            outlineWidth: '1px'
                          }}
                          icon={<BsApp />}
                        />
                        <ListItemText primary={<Typography variant="body2">{name}</Typography>} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <TextField
                id="outlined-disabled" //add the differences
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-notchedOutline': { borderRadius: '10px' }
                }}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoIosSearch style={{ fontSize: 24 }} className="text-gray-400" />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* {selectedRows.length > 0 && ( */}
                <IconButton
                  className="btn btn-primary"
                  variant="contained"
                //   onClick={handleDeleteSelectedRows}
                  sx={{
                    color: '#212b36',
                    fontSize: '14px',
                    lineHeight: '17px',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#f4f6f8'
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              {/* )} */}
              {/* <CSVLink
                // data={prepareExportData()}
                filename={'stores.csv'}
                target="_blank"
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  sx={{
                    color: '#212b36',
                    fontSize: '14px',
                    lineHeight: '17px',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#f4f6f8'
                    }
                  }}
                  startIcon={<CiExport className="text-[#212b36]" />}
                >
                  Export
                </Button>
              </CSVLink> */}
            </div>
          </Stack>
  
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <StyledTable>
                <TableHead>
                  <THead
                    sx={{
                      '& .MuiTableCell-root': {
                        borderBottom: '1px dotted #B9B9B9',
                        bgcolor: '#f4f6f8',
                        color: '#637381',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_id')} sortedKey="user_id" label="ID" />
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_name')} sortedKey="user_name" label="Name" />
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('status')} sortedKey="status" label="Status" />
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_role')} sortedKey="user_role" label="User Role" />
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('number')} sortedKey="number" label="Phone" />
                    <HeaderCellWithSortIcon align="left" onClick={() => requestSort('createdAt')} sortedKey="createdAt" label="Created on" />
                    <HeaderCellWithSortIcon
                      align="left"
                    //   onClick={() => requestSort('apk_version')}
                      sortedKey="apk_version"
                      label="Apk Version"
                    />
                    <TableCell align="left">Actions</TableCell>
                  </THead>
                </TableHead>
                <TableBody>
                  {/* {filteredAndSortedRows.slice(page, rowsPerPage).map((row) => ( */}
                    {/* <TRow
                      key={row.user_id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '& .MuiTableCell-root': {
                          borderBottom: '1px dotted #B9B9B9'
                        }
                      }}
                      className="hover:bg-gray-100"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected(row.id)} onChange={() => handleRowSelect(row.id)} />
                      </TableCell>
                      <TableCell component={'th'} scope="row">
                        {row.user_id}
                      </TableCell>
                      <TableCell align="left">{row.user_name}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{row.user_role}</TableCell>
                      <TableCell align="left">{row.number}</TableCell>
                      <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
                      <TableCell align="left">{row.apk_version}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          color="primary"
                          component={Link}
                          to={`/team/edit/${row.id}`}
                          aria-label="edit"
                          sx={{
                            color: '#212b36',
                            fontSize: '14px',
                            lineHeight: '17px',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: '#f4f6f8'
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                        //   onClick={() => deleteUserData(row.id)}
                          sx={{
                            color: '#212b36',
                            fontSize: '14px',
                            lineHeight: '17px',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: '#f4f6f8'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TRow> */}
                  {/* ))} */}
                </TableBody>
              </StyledTable>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
            //   rowsPerPage={rowsPerPage}
            //   page={page}
            //   count={rows.length}
            //   component="div"
            //   onPageChange={handleChangePage}
            //   onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
        </Grid>
        </Grid>
      </>
    );
};

export default StoreMan;