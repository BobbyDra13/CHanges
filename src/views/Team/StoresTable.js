import React, { useState } from 'react';
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
  Dialog
} from '@mui/material';
import { ArrowDownwardRounded, ArrowUpwardRounded, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// import EditStore from './updateStore';

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
  rows,
  getAllUsers,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isSelected,
  handleRowSelect,
  // deleteUserData,
  sortConfig,
  requestSort
}) => {


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

  const [editRowId, setEditRowId] = useState(null);

  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const handleEditUserDialogOpen = (rowId) => {
    setEditRowId(rowId);
    setShowEditUserDialog(true);
  };

  const handleEditUserDialogClose = () => {
    setEditRowId(null);
    setShowEditUserDialog(false);
    getAllUsers();
  };


  return (
    <>
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
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_role')} sortedKey="user_role" label="User Role" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_id')} sortedKey="user_id" label="User ID" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('user_name')} sortedKey="user_name" label="User Name" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('store_id')} sortedKey="store_id" label="Store" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('email')} sortedKey="email" label="Email" />
              <HeaderCellWithSortIcon align="left" onClick={() => requestSort('number')} sortedKey="number" label="Phone Number" />
              <TableCell align="left">Actions</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {rows.slice(page, rowsPerPage).map((row) => (
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
                  {row.user_role}
                </TableCell>
                <TableCell align="left">{row.user_id}</TableCell>
                <TableCell align="left">{row.user_name}</TableCell>
                <TableCell align="left">{row.store_id}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.number}</TableCell>
                <TableCell align="left">
                  
                  <IconButton
                    onClick={() => handleEditUserDialogOpen(row.id)}
                    color="primary"
                    component={Link}
                    // to={`/team/edit/${row.id}`}
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
                 
                  <Dialog
                    key={row.id}
                    open={editRowId === row.id && showEditUserDialog}
                    onClose={()=>handleEditUserDialogClose()}
                    PaperProps={{
                      style: {
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }
                    }}
                  >
                   {/* <EditStore rowId={row.id} handleEditUserDialogClose={handleEditUserDialogClose}/> */}
                   This feature is under maintainance.
                  </Dialog>

                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    // onClick={() => deleteUserData(row.id)}
                    
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
    </>
  );
};

export default StoresTable;
