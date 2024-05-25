import { Button, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { UploadBayGrouping, UploadCSV, UploadUserSheet } from 'api';
// import Snackbar from '@mui/material/Snackbar';

function CsvModal({ onUploadComplete }) {
  const { store } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
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
              console.log(res_next);
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
      console.log(fileName, store_id);

      try {
        const res = await UploadUserSheet({ base64EncodedString, fileName, store_id });

        // console.log(res.json());

        if (res.status === 200) {
          console.log(res);
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
    <div className="flex flex-col items-center gap-3 h-5/6 relative">
      <div
        className="cursor-pointer w-full"
        style={{
          border: 'dashed',
          borderColor: '#4B5563',
          borderWidth: '2px',
          borderImage: 'none',
          borderImageSlice: 1,
          borderImageWidth: '1em'
        }}
      >
        <div {...getRootProps()}>
          <div
            className="h-72 bg-blue-100"
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
      <div className="flex gap-2">
        <Button variant="contained" component="label" disabled={loading || uploadSuccess}>
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
