import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

// const dummyData = [
//   { store_id: 'S001', pop_score: 87, capture_status: true, _id: '65c74d4112465588b7a4984c' },
//   { store_id: 'S002', pop_score: 65, capture_status: false, _id: '6638b09feec970a8ee69e372' },
//   { store_id: 'S003', pop_score: 78, capture_status: true, _id: '65c74d4112465588b7a4984c' },
//   { store_id: 'S004', pop_score: 52, capture_status: false, _id: '6638b09feec970a8ee69e372' },
//   { store_id: 'S005', pop_score: 90, capture_status: true, _id: '65c74d4112465588b7a4984c' },
//   { store_id: 'S006', pop_score: 44, capture_status: false, _id: '65c74d4112465588b7a4984c' },
//   { store_id: 'S007', pop_score: 73, capture_status: true, _id: '6638b09feec970a8ee69e372' },
//   { store_id: 'S008', pop_score: 81, capture_status: true, _id: '6638b09feec970a8ee69e372' },
//   { store_id: 'S009', pop_score: 59, capture_status: false, _id: '6638b09feec970a8ee69e372' },
//   { store_id: 'S010', pop_score: 66, capture_status: true, _id: '6638b09feec970a8ee69e372' }
// ];

const PopUp = ({ open, onClose, value, selectedDate }) => {
  const toLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
    return localISOTime;
  };

  // const selectedDate = toLocalDateString(useSelector((state) => state.customization.selectedDate).start_date);
  const start_date = toLocalDateString(useSelector((state) => state.customization.selectedDate).start_date);
  const end_date = toLocalDateString(useSelector((state) => state.customization.selectedDate).end_date);
  // console.log('value is... ', value);

  const [dummyData, setDummyData] = useState([]);
  const data = localStorage.getItem('userData');
  // console.log('local storage data ', JSON.parse(data).data._id);
  const dataFinal = JSON.parse(data).data._id;

  useEffect(() => {
    // Function to make the API call
    const makeApiCall = async () => {
      const url = 'https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/dashboard/store-wise-pop-capture-score ';
      const data = {
        // date: `${selectedDate}`,
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        user_id: `${dataFinal}`,
        isSort: `${value}`
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API call result:', result);
        setDummyData(result);
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    // Call the function
    makeApiCall();
    // eslint-disable-next-line
  }, [selectedDate, value]);

  const navigate = (id, data, store_id) => {
    const params = new URLSearchParams(data).toString();
    const param1 = new URLSearchParams(store_id).toString();
    window.location.href = `/main/stores/storeinsight/overview/${id}?${params}?${param1}`;
  };

  // console.log("onclose   ....", onClose);
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>
        Store Page
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store ID</TableCell>
              <TableCell>Capture Percentage</TableCell>

              <TableCell>Pop Compliance Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row) => (
              <TableRow key={row.store_id}>
                <TableCell>
                  {' '}
                  <Button onClick={() => navigate(row.store, selectedDate, row.store_id)}>{row.store_id}</Button>
                </TableCell>
                <TableCell>{parseFloat(row.capture_percentage).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(row.pop_percentage).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default PopUp;
