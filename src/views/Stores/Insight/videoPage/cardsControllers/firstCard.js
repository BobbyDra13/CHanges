import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import { Button } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import UploadButton from '../UploadButton';

function firstCard({ vdoSource }) {
  return (
    <div className="p-2 flex flex-col justify-between h-full items-start ">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Camera {vdoSource ? vdoSource : '1'}</h1>
          <div>
            <BuildIcon />
          </div>
        </div>
        <p className="mt-3 ">Connection URL:</p>
      </div>
      <div>
        <Button
          variant="contained"
          endIcon={<CloudSyncIcon className="sync-button" />}
          sx={{
            backgroundColor: '#F5F5F5!important',
            borderRadius: '0.2rem',
            fontSize: '0.7rem',
            padding: '0.5rem',
            margin: '0 8px', // Assuming you want some margin on both sides
            alignSelf: 'center' // Aligns the button vertically in the center
          }}
        >
          <UploadButton />
        </Button>
      </div>
    </div>
  );
}

export default firstCard;
