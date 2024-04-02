import React from 'react';
import AnnouncementIcon from '@mui/icons-material/Announcement';
//import { Button } from '@mui/material';
//import CloudSyncIcon from '@mui/icons-material/CloudSync';

function ThirdCard() {
  return (
    <div className="p-2 flex flex-col justify-between h-full items-start ">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Rules</h1>
          <div>
            <AnnouncementIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdCard;
