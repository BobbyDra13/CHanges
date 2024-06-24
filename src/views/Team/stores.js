import { useState, useEffect, useMemo } from 'react';

import { Button, Paper, IconButton, Dialog, useTheme, Snackbar, Alert, Box, useMediaQuery } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CiExport } from 'react-icons/ci';
import { CSVLink } from 'react-csv';
import SearchBar from './SearchBar';
import StoresTable from './StoresTable';
import AddStore from './addStore';
import FilterationButton from './FilterationButton';
import {
  deleteUser,
  // getUsers,f
  getusers
} from 'api';
import { bouncy } from 'ldrs';
bouncy.register();

const AllStores = () => {
  const theme = useTheme();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, rowchange] = useState([]);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [
    loading
    // , setLoading
  ] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await getusers();
      console.log('get all users', response);
      rowchange(response);
    } catch (e) {
      console.log('error in get all users', e);
    }
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleString();
  // };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  // const getAllUsers = async () => {
  //   try {
  //     setLoading(true);
  //     let response = await getUsers();
  //     console.log(response.data);
  //     rowchange(response?.data);
  //   } catch (error) {
  //     console.error('Error Fetching Users: ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad with leading zero
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const modifiedHours = hours % 12 || 12; // Convert to 12-hour format (12 for midnight/noon)

    return `${year}-${month}-${day}  ${modifiedHours}:${minutes} ${amPm}`;
  }
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const prepareExportData = () => {
    const dataForExport = rows.map((row) => ({
      Department: row.id,
      Role: row.role,
      ID: row._id,
      Name: row.name,
      Store: row.store_name,
      Email: row.email,
      Phone: row.number,
      Last_Login: row.logs && formatDate(row.logs[0].last_login)
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
    if (role === 'All Users') {
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

  // const handleDeleteSelectedRows = async () => {
  //   const remainingRows = rows.filter((row) => !selectedRows.includes(row.id));
  //   for (const selectedRowId of selectedRows) {
  //     await deleteUserData(selectedRowId);
  //   }
  //   rowchange(remainingRows);
  //   setSelectedRows([]);
  // };
  const filteredAndSortedRows = useMemo(() => {
    let filteredData = rows.filter((row) => {
      if (roleFilter !== '' && row.role !== roleFilter) {
        return false;
      }

      const searchQueryLowerCase = searchQuery.toLowerCase();
      return (
        // row.user_dept.toLowerCase().includes(searchQueryLowerCase) ||
        // row.role.toLowerCase().includes(searchQueryLowerCase) ||
        // row._id.toLowerCase().includes(searchQueryLowerCase) ||
        // row.number.toLowerCase().includes(searchQueryLowerCase) ||
        // row.store_id.toLowerCase().includes(searchQueryLowerCase) ||
        row.name.toLowerCase().includes(searchQueryLowerCase)
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

  // const handleAddUserDialogOpen = () => {
  //   setShowAddUserDialog(true);
  // };

  const handleAddUserDialogClose = () => {
    setShowAddUserDialog(false);
    getAllUsers();
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '30px',
          flexWrap: 'wrap'
        }}
      >
        <Button
          // onClick={handleAddUserDialogOpen}
          component={Link}
          variant="contained"
          startIcon={<AddIcon />}
          disabled
          className="cursor-not-allowed"
          sx={{
            // bgcolor: theme.palette.success.main,
            // bgcolor: '#6ee7b7',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 20px',
            marginBottom: !isSmallScreen ? '1%' : ''
            // transition: 'background-color 0.3s ease',
            // '&:hover': {
            //   bgcolor: theme.palette.success.dark
            // },
            // '&:active': {
            //   bgcolor: theme.palette.success.light,
            //   transform: 'scale(0.98)'
            // },
            // '&:focus': {
            //   outline: 'none'
            // }
          }}
        >
          Add User
        </Button>
        <Dialog open={showAddUserDialog} onClose={handleAddUserDialogClose}>
          <AddStore
            handleSnackbarOpen={handleSnackbarOpen}
            handleSnackbarClose={handleSnackbarClose}
            setSnackbarMessage={setSnackbarMessage}
            handleAddUserDialogClose={handleAddUserDialogClose}
          />
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.includes('successfully') ? 'success' : snackbarMessage.includes('Failed') ? 'error' : 'info'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Paper elevation={4} style={{ padding: '25px', margin: '1%', marginTop: '1%' }} sx={{ borderRadius: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FilterationButton handleNavigationClick={handleNavigationClick} />
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {selectedRows.length > 0 && (
              <IconButton
                className="btn btn-primary cursor-not-allowed"
                variant="contained"
                // onClick={handleDeleteSelectedRows}
                sx={{
                  // color: theme.palette.error.dark,
                  color: '#fca5a5',
                  fontSize: '14px',
                  lineHeight: '17px',
                  textTransform: 'none',
                  '&:hover': {
                    // bgcolor: theme.palette.error.light
                    bgcolor: '#fca5a5'
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
        </div>
        {loading ? (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
          </Box>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <StoresTable
              rows={filteredAndSortedRows}
              getAllUsers={getAllUsers}
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
        )}
      </Paper>
    </>
  );
};

export default AllStores;
