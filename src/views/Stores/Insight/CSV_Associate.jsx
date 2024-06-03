import { Button, LinearProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UploadUserSheet } from 'api';
import ClearIcon from '@mui/icons-material/Clear';

function CsvModalAssociate({ onUploadComplete }) {
  const { store } = useParams();
  console.log('cmon man', store);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);
  // const [updatedData, setUpdateddata] = useState(false);

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    accept: 'text/csv',
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      const file = acceptedFiles[0];
      // setSelectedFile(file);
      const reader = new FileReader();

      reader.onload = async () => {
        // const base64EncodedString = reader.result.split(',')[1];
        setSelectedFile({ fileName: file.name, base64EncodedString: reader.result.split(',')[1], store_id: store });
        setLoading(false);
      };

      reader.onerror = () => {
        console.error('An error occurred while reading the file');
        setSelectedFile(false);
        setLoading(false);
      };

      reader.readAsDataURL(file);
    }
  });
  const handleUpload = async () => {
    try {
      // Pass keys as a single object to the UploadCSV API
      console.log('selectedFile', selectedFile);
      await UploadUserSheet(selectedFile);

      onUploadComplete(true);
      setSelectedFile(false);
      setUploadSuccess(true);
    } catch (error) {
      console.log('Error Uploading CSV', error);
      onUploadComplete(false);
    }
  };
  // console.log('dataaasss',updatedData);
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
                <input {...getInputProps()} />
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedFile && (
        <span className="w-full py-2 px-4 rounded-md bg-gray-300  flex justify-between items-center">
          {selectedFile && selectedFile.fileName}
          <ClearIcon onClick={() => setSelectedFile(false)} className="ml-4 text-sm" />
        </span>
      )}
      <Button variant="contained" component="label" disabled={loading} onClick={handleUpload}>
        Upload File
        {/* <input {...getInputProps()} /> */}
      </Button>
      {uploadSuccess ? <p>File uploaded successfully!</p> : loading && <LinearProgress />}
    </div>
  );
}

export default CsvModalAssociate;
