import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import MultipleSelectCheckmarks from './Dropdown';
import './calendar.css';
import { GetInsightsDates } from 'api';
import { useLocation } from 'react-router';

// Custom Day Component to render badges
const CustomDay = ({ date, events, dayClassName }) => {
  const hasEvent = events.some(
    (eventDate) =>
      eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()
  );

  return (
    <div
      className={`custom-day ${hasEvent ? 'has-event' : ''} ${dayClassName ? dayClassName(date) : ''}`}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {date.getDate()}
      {hasEvent && (
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#1976d2'
          }}
        />
      )}
    </div>
  );
};

const DatePickerComp = () => {
  const location = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const storeId = JSON.parse(localStorage.getItem('analysisStoreId'));
  const userId = JSON.parse(localStorage.getItem('userData')).data[0]._id;
  console.log('Store ID', storeId);
  console.log('User', userId);

  // Fetch events (similar to first component's GetInsightsDates)
  useEffect(() => {
    async function getEventsdata() {
      const body = {
        store_ids: [`${storeId}`],
        page: location.pathname === '/main/insights' || location.pathname === '/main/stores' ? true : false,
        user_id: userId
      };
      console.log('API BODY', body);
      // const body = {
      //   store_ids: storeId
      // };
      try {
        const Edata = await GetInsightsDates(body);
        const dateArray = Edata.data[0].dates;

        const daysOnly = dateArray.map((item) => {
          const eventdate = new Date(item);
          return eventdate;
        });
        setEvents(daysOnly);
        // setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    getEventsdata();
    // eslint-disable-next-line
  }, [storeId, userId, location]);

  const handleStartDateChange = (date) => {
    // date && setStartDate(date);
    if (date) {
      setStartDate(date);
      // Disable dates before the selected start date in the end date picker
      setEndDate((prevEndDate) => (prevEndDate < date ? date : prevEndDate));
    }
  };

  const handleEndDateChange = (date) => {
    // setEndDate(date);
    if (date) {
      setEndDate(date);
      // Disable dates after the selected end date in the start date picker
      setStartDate((prevStartDate) => (prevStartDate > date ? date : prevStartDate));
      dispatch({
        type: 'selectedSingleDate',
        payload: date
      });
    }
  };
  

  function graphToSelect(ChartData) {
    const currentDate = new Date();
    if (ChartData === 'Last 30 Days') {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      setStartDate(thirtyDaysAgo);
      setFlag(false);
    } else if (ChartData === 'Last Week') {
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      setStartDate(sevenDaysAgo);
      setFlag(false);
    } else if (ChartData === 'Current Day') {
      setStartDate(currentDate);
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'selectedDate',
      payload: { start_date: startDate, end_date: endDate }
    });
  }, [startDate, dispatch, endDate]);

  // Add custom styles for the badge
  const customStyles = `
    .custom-day {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .has-event {
      font-weight: bold;
    }
    .react-datepicker__day--selected {
      background-color: #1976d2 !important;
      color: white !important;
    }
    .react-datepicker__day--in-range {
      background-color: rgba(25, 118, 210, 0.2) !important;
      color: #1976d2 !important;
    }
  `;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
      <style>{customStyles}</style>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {flag && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                margin: '0 15px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
                // border: "1px solid #007FFF",
              }}
              className="gap-2"
            >
              <div
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0px'
                }}
              >
                <DatePicker
                  className="custom-date-picker"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  showIcon
                  closeOnScroll={true}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select start date"
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={endDate || new Date()}
                  renderDayContents={(day, date) => <CustomDay date={date} events={events} />}
                />
              </div>
              <div
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0'
                }}
              >
                <DatePicker
                  className="custom-date-picker"
                  id="end-date"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  showIcon
                  closeOnScroll={true}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select end date"
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={new Date()}
                  renderDayContents={(day, date) => <CustomDay date={date} events={events} />}
                />
              </div>
            </motion.div>
          </>
        )}
        <MultipleSelectCheckmarks isVisible={flag} graphToSelect={graphToSelect} />
      </Paper>
    </div>
  );
};

export default DatePickerComp;
