import { useState, useEffect, useMemo } from 'react';

import {
  Button,
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
  useTheme,
  Dialog
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getStores, deleteStore } from './API/api';
import { Link } from 'react-router-dom';
import { BsApp } from 'react-icons/bs';
import { CiExport } from 'react-icons/ci';
import { CSVLink } from 'react-csv';
import SearchBar from './SearchBar';
import StoresTable from './StoresTable';
import AddStore from './addStore';
import NavigationBar from './NavBar';

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
  const [selectedRows, setSelectedRows] = useState([]);

  const isSelected = (userId) => selectedRows.indexOf(userId) !== -1;
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
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const [roleFilter, setRoleFilter] = useState('');
  const handleNavigationClick = (role) => {
    if (role === 'All Stores') {
      setRoleFilter('');
      return;
    }
    setRoleFilter(role);
    setSortConfig({ key: null, direction: 'ascending' });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteSelectedRows = async () => {
    const remainingRows = rows.filter((row) => !selectedRows.includes(row.id));
    for (const selectedRowId of selectedRows) {
      await deleteUserData(selectedRowId);
    }
    rowchange(remainingRows);
    setSelectedRows([]);
  };
  const filteredAndSortedRows = useMemo(() => {
    let filteredData = rows.filter((row) => {
      if (roleFilter !== '' && row.user_role !== roleFilter) {
        return false;
      }

      const searchQueryLowerCase = searchQuery.toLowerCase();
      return (
        row.user_role.toLowerCase().includes(searchQueryLowerCase) ||
        row.user_id.toLowerCase().includes(searchQueryLowerCase) ||
        row.user_name.toLowerCase().includes(searchQueryLowerCase) ||
        row.store_id.toLowerCase().includes(searchQueryLowerCase) ||
        row.number.toLowerCase().includes(searchQueryLowerCase)
      );
    });

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
  }, [rows, roleFilter, searchQuery, sortConfig]);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  const handleAddUserDialogOpen = () => {
    setShowAddUserDialog(true);
  };

  const handleAddUserDialogClose = () => {
    setShowAddUserDialog(false);
    getAllUsers();
  };

  return (
    <>
      <NavigationBar handleNavigationClick={handleNavigationClick} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '30px'
        }}
      >
        <Button
          onClick={handleAddUserDialogOpen}
          color="primary"
          component={Link}
          variant="contained"
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
        <Dialog
          open={showAddUserDialog}
          onClose={handleAddUserDialogClose}
          PaperProps={{
            style: {
              maxWidth: '100%',
              maxHeight: '100%'
            }
          }}
        >
          <AddStore handleAddUserDialogClose={handleAddUserDialogClose} />
        </Dialog>
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
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
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
          <StoresTable
            rows={filteredAndSortedRows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            isSelected={isSelected}
            handleRowSelect={handleRowSelect}
            deleteUserData={deleteUserData}
            formatDate={formatDate}
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
        </div>
      </Paper>
    </>
  );
};

export default AllStores;
