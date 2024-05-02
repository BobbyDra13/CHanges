import { Button, LinearProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UploadCSV } from 'api';

function CsvModal() {
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'text/csv',
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async() => {
        // reader.result contains the contents of the file
        // console.log("csv file:",reader.result);
        const base64EncodedString = reader.result.split(',')[1];
        const fileName = file.name;
        console.log("Base64 encoded string:", base64EncodedString);
        console.log('file name:',fileName);

      try {
        // Pass keys as a single object to the UploadCSV API
        const res = await UploadCSV({ base64EncodedString, fileName });
        console.log("Response from API:", res);
        setUploadSuccess(true);
      } catch(error) {
        console.log('Error Uploading CSV', error);
      }
        setLoading(false);
        // setUploadSuccess(true);
      };

      reader.onerror = () => {
        console.error('An error occurred while reading the file');
        setLoading(false);
      };

      reader.readAsDataURL(file);
      
      
    }
  });

  return (
    <div className=" flex flex-col items-center gap-3 h-5/6">
      <div
        className=" cursor-pointer w-full"
        style={{
          border: 'dashed',
          borderColor: '#4B5563', // This is the color for border-blue-400 in Tailwind CSS
          borderWidth: '2px',
          borderImage: 'none',
          borderImageSlice: 1,
          borderImageWidth: '1em' // Increase this value to increase the length of the dashes
        }}
      >
        <div {...getRootProps()}>
          <div
            className="h-72 bg-blue-100"
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
      <Button variant="contained" component="label" disabled={loading}>
        Upload File
        <input {...getInputProps()} />
      </Button>
      {uploadSuccess ? <p>File uploaded successfully!</p> : loading && <LinearProgress />}
    </div>
  );
}

export default CsvModal;
