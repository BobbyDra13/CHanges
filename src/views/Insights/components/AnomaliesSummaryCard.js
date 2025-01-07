import React from 'react';
import { Card, Skeleton } from '@mui/material';

const AnomaliesSummaryCard = ({ anomaliesLoading, anoCount }) => {
  return (
    <Card
      className="border border-gray-300 bg-[#ff413a] h-1/3"
      style={{
        padding: '10px'
      }}
    >
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full flex flex-col">
          <span className="text-center text-white text-sm font-semibold">Missing Tester</span>
          {!anomaliesLoading ? (
            <span className="text-center text-white flex-grow flex flex-col justify-center text-3xl font-semibold">
              {anoCount ? anoCount.Total_missing_tester_count : '0'}
            </span>
          ) : (
            <Skeleton variant="rectangular" height={42} className="rounded-md" />
          )}
        </div>
        <div className="w-1/2 h-full flex flex-col border-l-2 border-t-0 border-b-0 border-l-white">
          <span className="text-center text-white text-sm font-semibold">Empty Shelf</span>
          {!anomaliesLoading ? (
            <span className="text-center text-white flex-grow flex flex-col justify-center text-3xl font-semibold">
              {anoCount ? anoCount.Total_empty_tray_count : '0'}
            </span>
          ) : (
            <Skeleton variant="rectangular" height={42} className="rounded-md" />
          )}
        </div>
      </div>
    </Card>
  );
};

export default AnomaliesSummaryCard;
