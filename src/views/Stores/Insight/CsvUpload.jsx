import { Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { Toaster, toast } from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
// import { UploadCSV } from 'api';

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'text/csv',
    onDrop: async (acceptedFiles) => {
      setLoading(true);
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
        console.log('json data:', jsonData);
        setUserJsonKey(Object.keys(jsonData[0]));
        Object.keys(jsonData[0]).forEach((key) => {
          if (!correctKeys[type].includes(key)) {
            setError(true);
            setKeyError([...keyError, key]);
          }
        });
        setLoading(false);
      };

      reader.onerror = () => {
        console.error('An error occurred while reading the file');
        setLoading(false);
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
      console.log('uploaded');
      onUploadComplete(true);
      setUploadSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log('Error Uploading CSV', error);
      setLoading(false);
      onUploadComplete(false);
    }
  };
  // console.log('dataaasss',updatedData);
  return (
    <div className=" flex flex-col items-center gap-3 h-5/6">
      <Toaster />
      <div
        className=" cursor-pointer w-full"
        style={{
          border: 'dashed',
          borderColor: '#4B5563', // This is the color for border-blue-400 in Tailwind CSS
          borderWidth: '2px',
          borderImage: 'none',
          borderRadius: '0.5rem',
          borderImageSlice: 1,
          borderImageWidth: '1em' // Increase this value to increase the length of the dashes
        }}
      >
        <div {...getRootProps()}>
          <div
            className="h-72 bg-blue-100 rounded-lg "
            style={{
              backgroundColor: isDragActive ? '	#c1d4fb' : '#f3f4f6'
            }}
          >
            {isDragActive ? (
              <div className=" flex flex-col gap-3 items-center justify-center h-72">
                <p className="text-xl font-semibold text-slate-500">droping files ...</p>
              </div>
            ) : (
              <div className=" flex flex-col gap-3 items-center justify-center h-72">
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
      <Button variant="contained" component="label" disabled={loading || error || !updatedData} onClick={handleUpload}>
        Upload File
        <input {...getInputProps()} />
      </Button>
      {uploadSuccess ? <p>File uploaded successfully!</p> : loading && <LinearProgress />}
    </div>
  );
}

export default CsvModal;
