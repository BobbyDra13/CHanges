import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { Toaster, toast } from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { UploadBayGrouping, UploadCSV, UploadUserSheet } from 'api';
// import Snackbar from '@mui/material/Snackbar';

function CsvModal({ onUploadComplete, type }) {
  const { store } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [updatedData, setUpdateddata] = useState(false);
  const [keyError, setKeyError] = useState([]);
  const [userJsonKey, setUserJsonKey] = useState([]);
  const [error, setError] = useState(false);
  const correctKeys = {
    popScore: [
      'printtype',
      'store_id',
      'Article Description',
      'MRP',
      'Article Code',
      'class code',
      'Bay Id',
      'print status',
      'promo id',
      'promo name',
      'format',
      'message on pop',
      'message on sel',
      'variantdesc',
      'Promo Message',
      'sbu',
      'POS price or RRP',
      'start date',
      'end date'
    ],
    associateStore: ['UserName', 'EmpCode', 'Contact', 'BayCode']
  };
  const [uploadError, setUploadError] = useState(false);
  // const [url, setUrl] = useState('');
  const [bayLoading, setBayLoading] = useState(false);
  const [baySuccess, setBaySuccess] = useState(false);
  const [bayError, setBayError] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [sheetLoader, setSheetLoader] = useState(false);
  const [sheetLoaded, setSheetLoaded] = useState(false);
  const fileInputRef = useRef();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'text/csv',
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      setUploadError(false);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async () => {
        setError(false);
        const base64EncodedString = reader.result.split(',')[1];
        setUpdateddata(file);
        const store_id = store;
        console.log('store_id:', store_id);
        const workbook = XLSX.read(base64EncodedString, { type: 'base64' });
        const sheetName = type === 'popScore' ? workbook.SheetNames[1] : workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // console.log('json data:', jsonData);
        setUserJsonKey(Object.keys(jsonData[0]));
        Object.keys(jsonData[0]).forEach((key) => {
          if (!correctKeys[type].includes(key)) {
            setError(true);
            setKeyError([...keyError, key]);
          }
        });

        try {
          const res = await UploadCSV({ base64EncodedString, fileName, store_id });
          // console.log(res.json());
          if (res.status === 200) {
            // console.log(res);
            setUploadSuccess(true);
            setLoading(false);
            setBayLoading(true);
            // setUrl(res.data);
            const res_next = await UploadBayGrouping({ base64EncodedString, fileName, store_id });
            try {
              if (res_next.status == 200) {
                console.log(res_next);

                setBaySuccess(true);
              } else {
                setBayError(true);
              }
            } catch (error) {
              setBayError(true);
            }
            setBayLoading(false);
            setConfirmationVisible(true);
          } else {
            setUploadError(true);
          }
        } catch (error) {
          setUploadError(true);
        }
        setLoading(false);
      };

      reader.onerror = () => {
        setLoading(false);
        setUploadError(true);
      };

      reader.readAsDataURL(file);
    }
  });
  // console.log('keyError:', keyError);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setKeyError([]);
      setUserJsonKey([]);
    }, 4000);
    return () => clearTimeout(timeoutID);
  }, [keyError]);
  if (keyError.length > 0) {
    let rows = userJsonKey.map((key) => {
      return {
        yourKey: key
      };
    });
    rows = rows.map((row, index) => {
      return {
        ...row,
        correctKey: correctKeys[type].find((key, i) => i === index)
      };
    });

    toast.error((t) => (
      <div className="flex items-center justify-between w-full">
        <Tooltip
          title={
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100, minHeight: 100 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Your Keys</TableCell>
                      <TableCell align="right">Correct Keys</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .filter((row) => row.yourKey !== row.correctKey)
                      .map((row) => (
                        <TableRow key={row.correctKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.yourKey}
                          </TableCell>
                          <TableCell align="right">{row.correctKey}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          }
        >
          <span className="ml-2">The following keys are not found in the CSV file: {keyError.join(', ')}</span>
        </Tooltip>
        <button onClick={() => toast.dismiss(t.id)}>Close</button>
      </div>
    ));
  }
  const handleUpload = async () => {
    try {
      setLoading(true);
      // Pass keys as a single object to the UploadCSV API
      // const res = await UploadCSV({ base64EncodedString, fileName, store_id });
      // console.log('Response from API:', res);
      // console.log('uploaded');
      onUploadComplete(true);
      setUploadSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log('Error Uploading CSV', error);
      setLoading(false);
      onUploadComplete(false);
    }
  };
  // useEffect(() => {
  //   const input = { url: `${url}` };
  //   const postUrl = async () => {
  //     if (uploadSuccess && url) {
  //       setBayLoading(true);
  //       setBayError(false);
  //       try {
  //         const response = await fetch('https://nifno3du90.execute-api.eu-west-2.amazonaws.com/test/web-app/store-view/bay_group_mapping', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify(input)
  //         });
  //         console.log(response);
  //         if (response.ok) {
  //           setBaySuccess(true);
  //         } else {
  //           setBayError(true);
  //         }
  //       } catch (error) {
  //         setBayError(true);
  //       }
  //       setBayLoading(false);
  //       setConfirmationVisible(true);
  //     }
  //   };

  //   postUrl();
  // }, [uploadSuccess, url]);

  const handleConfirmation = (decision) => {
    if (decision === 'upload') {
      fileInputRef.current.click();
    } else {
      setConfirmationVisible(false);
      onUploadComplete(true);
    }
  };

  const handleUserSheetUpload = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    setUploadError(false);
    const reader = new FileReader();

    reader.onload = async () => {
      const base64EncodedString = reader.result.split(',')[1];
      const fileName = file.name;
      const store_id = store;

      try {
        const res = await UploadCSV({ base64EncodedString, fileName, store_id });
        // console.log(res.json());

        if (res.status === 200) {
          console.log(res);
          setUploadSuccess(true);
          setLoading(false);
          setBayLoading(true);
          // setUrl(res.data);

          const res_next = await UploadBayGrouping({ base64EncodedString, fileName, store_id });

          try {
            if (res_next.status === 200) {
              // console.log(res_next);
              setBaySuccess(true);
            } else {
              setBayError(true);
            }
          } catch (error) {
            setBayError(true);
          }

          setConfirmationVisible(false);
          onUploadComplete(true);
        } else {
          setUploadError(true);
        }
      } catch (error) {
        setUploadError(true);
      }
      setLoading(false);
    };

    reader.onerror = () => {
      setLoading(false);
      setUploadError(true);
    };

    reader.readAsDataURL(file);
  };

  const handleUserSheet = async (event) => {
    setSheetLoader(true);

    const file = event.target.files[0];
    // setLoading(true);
    // setUploadError(false);
    const reader = new FileReader();

    reader.onload = async () => {
      const base64EncodedString = reader.result.split(',')[1];
      const fileName = file.name;
      const store_id = store;
      // console.log(fileName, store_id);

      try {
        const res = await UploadUserSheet({ base64EncodedString, fileName, store_id });

        // console.log(res.json());

        if (res.status === 200) {
          // console.log(res);
          // setLoading(false);
          // setBayLoading(true);
          setSheetLoader(false);
          setSheetLoaded(true);

          // setUploadSuccess(true);
          // setUrl(res.data);

          // const res_next = await UploadBayGrouping({ base64EncodedString, fileName, store_id });
          // console.log(res_next);
          // try {
          //   if (res_next.status === 200) {
          //     setBaySuccess(true);
          //   } else {
          //     setBayError(true);
          //   }
          // } catch (error) {
          //   setBayError(true);
          // }

          // setConfirmationVisible(false);
          setTimeout(() => onUploadComplete(true), 2000);
        } else {
          setSheetLoader(false);
          // setUploadError(true);
        }
      } catch (error) {
        // setUploadError(true);
      }
      // setLoading(false);
    };

    reader.onerror = () => {
      // setLoading(false);
      // setUploadError(true);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className=" flex flex-col items-center gap-3 h-5/6">
      <Toaster />
      <div
        className="cursor-pointer w-full"
        style={{
          border: 'dashed',
          borderColor: '#4B5563',
          borderWidth: '2px',
          borderImage: 'none',
          borderRadius: '0.5rem',
          borderImageSlice: 1,
          borderImageWidth: '1em'
        }}
      >
        <div {...getRootProps()}>
          <div
            className="h-72 bg-blue-100 rounded-lg "
            style={{
              backgroundColor: isDragActive ? '#c1d4fb' : '#f3f4f6'
            }}
          >
            {isDragActive ? (
              <div className="flex flex-col gap-3 items-center justify-center h-72">
                <p className="text-xl font-semibold text-slate-500">Dropping files ...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center h-72">
                <p className="text-xl font-semibold text-slate-500">Drag and Drop files here</p>
                <FaCloudUploadAlt className="text-7xl" />
              </div>
            )}
          </div>
        </div>
      </div>
      {updatedData && (
        <span className="w-full py-2 px-4 rounded-md bg-gray-300  flex justify-between items-center">
          {updatedData && updatedData.name}
          <ClearIcon onClick={() => setUpdateddata(false)} className="ml-4 text-sm" />
        </span>
      )}
      <div className="flex gap-2">
        <Button variant="contained" component="label" disabled={loading || error || !updatedData} onClick={handleUpload || uploadSuccess}>
          <input {...getInputProps()} style={{ display: 'none' }} />
          {loading ? (
            <CircularProgress size={24} />
          ) : uploadSuccess ? (
            <CheckCircleIcon />
          ) : uploadError ? (
            <ErrorIcon />
          ) : (
            'Upload Excel/CSV'
          )}
        </Button>

        <Button variant="contained" disabled={!uploadSuccess || bayLoading || baySuccess}>
          {bayLoading ? (
            <CircularProgress size={24} />
          ) : baySuccess ? (
            <CheckCircleIcon />
          ) : bayError ? (
            <ErrorIcon />
          ) : (
            'Start Bay Group Mapping'
          )}
        </Button>
      </div>

      {confirmationVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-center items-center rounded-lg">
          <p className="mr-4">Do you want to upload user sheet?</p>
          {/* {sheetLoader ? (
            <CircularProgress size={24} />
          ) : ( */}
          <Button variant="contained" onClick={() => handleConfirmation('upload')}>
            {sheetLoaded ? <CheckCircleIcon /> : sheetLoader ? <CircularProgress size={24} /> : <>UPLOAD</>}
          </Button>
          {/* )} */}

          <Button variant="contained" onClick={() => handleConfirmation('skip')}>
            SKIP
          </Button>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept=".csv, .xlsx" style={{ display: 'none' }} onChange={handleUserSheetUpload} />
      <input ref={fileInputRef} type="file" accept=".csv, .xlsx" style={{ display: 'none' }} onChange={handleUserSheet} />

      {/* {sheetLoaded && (
        <Snackbar
          open={uploadSuccess}
          autoHideDuration={2000}
          onClose={() => onUploadComplete(true)}
          message="Upload successful!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            sx: {
              backgroundColor: 'green'
            }
          }}
        >
          {/* <CheckCircleIcon style={{ marginRight: 8 }} /> */}
      {/* </Snackbar> */}
      {/* )} */}
    </div>
  );
}

export default CsvModal;
