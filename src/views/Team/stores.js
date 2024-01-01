import { useState, useEffect, useMemo } from 'react';

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  TablePagination,
  Paper,
  Typography,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  TextField,
  InputAdornment,
  useTheme,
  TableContainer
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, ArrowUpwardRounded, ArrowDownwardRounded } from '@mui/icons-material';
import { getStores, deleteStore } from './API/api';
import { Link } from 'react-router-dom';
import { BsApp } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { CiExport } from 'react-icons/ci';
import { CSVLink } from 'react-csv';

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

const TRow = styled(TableRow)`
  &:hover {
    background-color: #f4f6f8;
  }

  & > td {
    font-size: 16;
  }
`;
const HeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  '& svg': {
    verticalAlign: 'middle'
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: '10px',
      padding: '0px 6px'
    }
  }
};
const status = ['All', 'Verified', 'Pending Verification', 'Rejected'];

const AllStores = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, rowchange] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const deleteUserData = async (id) => {
    await deleteStore(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getStores();
    rowchange(response?.data);
  };

  const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const prepareExportData = () => {
    const dataForExport = rows.map((row) => ({
      Id: row.user_id,
      Name: row.user_name,
      Status: row.status,
      Phone: row.number
    }));

    return dataForExport;
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  const filteredAndSortedRows = useMemo(() => {
    let filteredData = rows.filter(
      (row) =>
        row.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.user_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.apk_version.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig && sortConfig.key) {
      const key = sortConfig.key;
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      filteredData = filteredData.sort((a, b) => {
        if (a[key] < b[key]) return -1 * direction;
        if (a[key] > b[key]) return 1 * direction;
        return 0;
      });
    }

    return filteredData;
  }, [rows, searchQuery, sortConfig]);

  const HeaderCellWithSortIcon = ({ label, onClick, sortedKey }) => {
    const isAscending = sortConfig.key === sortedKey && sortConfig.direction === 'ascending';
    const isDescending = sortConfig.key === sortedKey && sortConfig.direction === 'descending';

    return (
      <HeaderCell align="left" onClick={onClick}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {label}
          {isAscending && <ArrowUpwardRounded />}
          {isDescending && <ArrowDownwardRounded />}
        </div>
      </HeaderCell>
    );
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelect = (userId) => {
    const selectedIndex = selectedRows.indexOf(userId);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, userId);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (userId) => selectedRows.indexOf(userId) !== -1;

  const handleDeleteSelectedRows = async () => {
    const remainingRows = rows.filter((row) => !selectedRows.includes(row.id));
    for (const selectedRowId of selectedRows) {
      await deleteUserData(selectedRowId);
    }
    rowchange(remainingRows);
    setSelectedRows([]);
  };

  return (
    <>
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
            bgcolor: '#000000',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#1a1a1a'
            },
            '&:active': {
              bgcolor: '#000000'
            }
          }}
        >
          Add User
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
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      label="Verification Filter"
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
                        icon={<BsApp />}
                      />
                      <ListItemText primary={<Typography variant="body2">{name}</Typography>} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              id="outlined-disabled"
              value={searchQuery}
              onChange={handleSearchChange}
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
            {selectedRows.length > 0 && (
              <IconButton
                className="btn btn-primary"
                variant="contained"
                onClick={handleDeleteSelectedRows}
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
            )}
            <CSVLink
              data={prepareExportData()}
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
            </CSVLink>
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
                    onClick={() => requestSort('apk_version')}
                    sortedKey="apk_version"
                    label="Apk Version"
                  />
                  <TableCell align="left">Actions</TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {filteredAndSortedRows.slice(page, rowsPerPage).map((row) => (
                  <TRow
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
                        onClick={() => deleteUserData(row.id)}
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
                  </TRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            page={page}
            count={rows.length}
            component="div"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </>
  );
};

export default AllStores;
