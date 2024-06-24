import React, {
  // useEffect,
  useState
} from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Checkbox,
  TablePagination,
  TableContainer,
  styled,
  Dialog,
  ButtonGroup,
  useTheme,
  Button,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { ArrowDownwardRounded, ArrowUpwardRounded, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import EditStore from './updateStore';
// import { getusers } from 'api';

const HeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  '& svg': {
    verticalAlign: 'middle'
  }
});

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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

const StoresTable = ({
  // allusers,
  rows,
  getAllUsers,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isSelected,
  handleRowSelect,
  deleteUserData,
  sortConfig,
  requestSort
}) => {
  const theme = useTheme();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(null);
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

  // const handleConfirmDialogOpen = (userId) => {
  //   setDeleteUserId(userId);
  //   setConfirmDialogOpen(true);
  // };

  const handleConfirmDialogClose = () => {
    setDeleteUserId(null);
    setConfirmDialogOpen(false);
  };
  const handleUserDeletion = async () => {
    setDeletionInProgress(true);
    try {
      await deleteUserData(deleteUserId);
      setDeletionSuccess(true);
    } catch (error) {
      setDeletionSuccess(false);
    } finally {
      setDeletionInProgress(false);
      handleConfirmDialogClose();
    }
  };

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
  const HeaderCellWithSortIcon1 = ({ label, onClick, sortedKey }) => {
    const isAscending = sortConfig.key === sortedKey && sortConfig.direction === 'ascending';
    const isDescending = sortConfig.key === sortedKey && sortConfig.direction === 'descending';

    return (
      <HeaderCell align="left" onClick={onClick}>
        <div style={{ display: 'flex', alignItems: 'center', width: '95px' }}>
          {label}
          {isAscending && <ArrowUpwardRounded />}
          {isDescending && <ArrowDownwardRounded />}
        </div>
      </HeaderCell>
    );
  };
  const HeaderCellWithSortIcon2 = ({ label, onClick, sortedKey }) => {
    const isAscending = sortConfig.key === sortedKey && sortConfig.direction === 'ascending';
    const isDescending = sortConfig.key === sortedKey && sortConfig.direction === 'descending';

    return (
      <HeaderCell align="left" onClick={onClick}>
        <div style={{ display: 'flex', alignItems: 'center', width: '75px' }}>
          {label}
          {isAscending && <ArrowUpwardRounded />}
          {isDescending && <ArrowDownwardRounded />}
        </div>
      </HeaderCell>
    );
  };
  // const HeaderCellWithSortIcon3 = ({ label, onClick, sortedKey }) => {
  //   const isAscending = sortConfig.key === sortedKey && sortConfig.direction === 'ascending';
  //   const isDescending = sortConfig.key === sortedKey && sortConfig.direction === 'descending';

  //   return (
  //     <HeaderCell align="left" onClick={onClick}>
  //       <div style={{ display: 'flex', alignItems: 'center', width: '80px' }}>
  //         {label}
  //         {isAscending && <ArrowUpwardRounded />}
  //         {isDescending && <ArrowDownwardRounded />}
  //       </div>
  //     </HeaderCell>
  //   );
  // };

  const [editRowId, setEditRowId] = useState(null);

  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  // const handleEditUserDialogOpen = (rowId) => {
  //   setEditRowId(rowId);
  //   setShowEditUserDialog(true);
  // };

  const handleEditUserDialogClose = () => {
    setEditRowId(null);
    setShowEditUserDialog(false);
    getAllUsers();
  };

  return (
    <>
      <TableContainer className="overflow-y-auto scrollbar" sx={{ maxHeight: 440, marginTop: 1 }}>
        <StyledTable>
          <TableHead>
            <THead
              sx={{
                '& .MuiTableCell-root': {
                  borderBottom: '1px dotted #B9B9B9',
                  bgcolor: '#f4f6f8',
                  color: '#637381',
                  fontWeight: 'bold'
                  // flexDirection: 'row',
                  // display: 'flex',
                  // alignItems: 'center',
                }
              }}
            >
              <TableCell padding="checkbox"></TableCell>
              <HeaderCellWithSortIcon2 align="left" onClick={() => requestSort('user_dept')} sortedKey="user_dept" label="Department" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_role')} sortedKey="user_role" label="Role" />
              {/* <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_id')} sortedKey="user_id" label="ID" /> */}
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_name')} sortedKey="user_name" label="Name" />
              <HeaderCellWithSortIcon1 align="left" onClick={() => requestSort('store_id')} sortedKey="store_id" label="Store" />

              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('email')} sortedKey="email" label="Email" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('number')} sortedKey="number" label="Phone Number" />
              <TableCell align="left">Last Login</TableCell>
              <TableCell align="left">Actions</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
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
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.role}</TableCell>
                {/* <TableCell align="left">{row._id}</TableCell> */}
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.store_name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.number}</TableCell>
                <TableCell align="left">
                  {row.logs && row.logs[0].last_login ? formatDate(row.logs[0].last_login) : 'Not Logged In'}
                </TableCell>
                <TableCell align="left">
                  <ButtonGroup variant="text" aria-label="user actions" sx={{ display: 'flex', gap: '8px' }}>
                    <IconButton
                      className="cursor-not-allowed"
                      // onClick={() => handleEditUserDialogOpen(row.id)}
                      // color="primary"
                      color="#6ee7b7"
                      component={Link}
                      // to={`/team/edit/${row.id}`}
                      aria-label="edit"
                      sx={{
                        // color: theme.palette.success.main,
                        color: '#6ee7b7',
                        fontSize: '14px',
                        lineHeight: '17px',
                        textTransform: 'none',
                        '&:hover': {
                          // color: theme.palette.success.light
                          color: '#6ee7b7'
                        },
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <Dialog key={row.id} open={editRowId === row.id && showEditUserDialog} onClose={() => handleEditUserDialogClose()}>
                      <EditStore rowId={row.id} handleEditUserDialogClose={handleEditUserDialogClose} />
                    </Dialog>

                    <IconButton
                      className="cursor-not-allowed"
                      color="secondary"
                      aria-label="delete"
                      // onClick={() => handleConfirmDialogOpen(row.id)}
                      sx={{
                        // color: theme.palette.error.main,
                        color: '#fca5a5',
                        fontSize: '14px',
                        lineHeight: '17px',
                        textTransform: 'none',
                        '&:hover': {
                          // color: theme.palette.error.light
                          color: '#fca5a5'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Dialog
                      open={confirmDialogOpen}
                      onClose={handleConfirmDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          borderRadius: '12px',
                          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                          padding: '20px'
                        }
                      }}
                    >
                      {deletionInProgress ? (
                        <DialogContent>
                          <CircularProgress />
                        </DialogContent>
                      ) : (
                        <>
                          <DialogTitle id="alert-dialog-title" style={{ paddingBottom: '10px', color: '#333', fontSize: '24px' }}>
                            Confirm Deletion{' '}
                          </DialogTitle>
                          <DialogContent style={{ color: '#555', fontSize: '18px' }}>
                            <DialogContentText id="alert-dialog-description">Are you sure you want to delete this user?</DialogContentText>
                          </DialogContent>
                          <DialogActions style={{ padding: '10px 20px' }}>
                            <Button
                              onClick={handleUserDeletion}
                              component={Link}
                              color="primary"
                              variant="contained"
                              sx={{
                                bgcolor: theme.palette.success.main,
                                color: '#FFFFFF',
                                borderRadius: '8px ',
                                padding: '6px 24px ',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                  backgroundColor: theme.palette.success.dark
                                },
                                '&:active': {
                                  backgroundColor: theme.palette.success.light
                                },
                                '&:focus': {
                                  outline: 'none'
                                },
                                mr: 1
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              onClick={handleConfirmDialogClose}
                              color="primary"
                              variant="outlined"
                              autoFocus
                              sx={{
                                borderColor: theme.palette.error.main,
                                bgcolor: theme.palette.error.light,
                                color: theme.palette.error.main,
                                borderRadius: '8px !important',
                                padding: '6px 24px !important',
                                '&:hover': {
                                  backgroundColor: theme.palette.error.light,
                                  color: theme.palette.text.secondary
                                }
                              }}
                            >
                              Cancel
                            </Button>
                          </DialogActions>
                        </>
                      )}
                    </Dialog>
                  </ButtonGroup>
                </TableCell>
              </TRow>
            ))}
            <Snackbar
              open={deletionSuccess !== null}
              autoHideDuration={6000}
              onClose={() => setDeletionSuccess(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Alert onClose={() => setDeletionSuccess(null)} severity={deletionSuccess ? 'success' : 'error'}>
                {deletionSuccess ? 'User deleted successfully!' : 'Failed to delete user.'}
              </Alert>
            </Snackbar>
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
    </>
  );
};

export default StoresTable;
