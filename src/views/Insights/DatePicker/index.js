import { Box, Paper, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "./calendar.css";
import MultipleSelectCheckmarks from "./Dropdown";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
// import './custom-datepicker.css';

const DatePickerComp = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const handleStartDateChange = (date) => {
    console.log(date);
    date && setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Custom function to check if the time is within the allowed range
  const isTimeWithinRange = (date) => {
    console.log(date);
    const hours = date.getHours();
    return hours >= 18 && hours <= 22;
  };

  function graphToSelect(ChartData) {
    // setChartValue(ChartData);
    console.log(ChartData);
    const currentDate = new Date();
    if (ChartData == "Last 30 Days") {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      setStartDate(thirtyDaysAgo);
      setFlag(false);
    } else if (ChartData == "Last Week") {
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      setStartDate(sevenDaysAgo);
      setFlag(false);
    } else if (ChartData == "Current Day") {
      setStartDate(currentDate);
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  function handleApply() {
    console.log("Date range selected", startDate, endDate);
  }


  useEffect(() => {
    dispatch({
      type: 'selectedDate',
      payload: startDate
    });
    // eslint-disable-next-line
  }, [startDate]);

  // const [events, setEvents] = useState([]);
  // const [highlightedDays, setHighlightedDays] = useState([]);

  // useEffect(() => {
  //   // Fetch and set events
  //   const fetchedEvents = [
  //     new Date(2024, 9, 15), // Example events for the demo
  //     new Date(2024, 9, 18),
  //     new Date(2024, 9, 20)
  //   ];
  //   setEvents(fetchedEvents);

  //   const daysToHighlight = fetchedEvents.map((event) => event.getDate());
  //   setHighlightedDays(daysToHighlight);
  // }, []);


  // const dayClassName = (date) => {
  //   return highlightedDays.includes(date.getDate()) && date.getMonth() === startDate.getMonth()
  //     ? 'highlight-day'
  //     : undefined;
  // };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          // width: "60%",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        {flag && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 10 }} // Initial animation properties
              animate={{ opacity: 1, x: 0 }} // Animation properties when flag becomes true
              transition={{ duration: 0.8, delay: 0.5 }} // Animation duration
              style={{
                margin: "0 15px 0 0",
                display: "flex",
                // width: "55%",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                border: "1px solid #007FFF",
              }}
              className="gap-2"
              // className="border border-red-500"
            >
              <div
                style={{
                  // width: "250px",
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  margin: "0px",
                }}
                
              >
                
                <DatePicker
                  className="custom-date-picker"
                  // dayClassName={dayClassName} ////
                  selected={startDate}
                  closeOnScroll={true}
                  onChange={handleStartDateChange}
                  showIcon
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  // dateFormat="  dd-MM-yyyy hh:mm aa"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select start date and time"
                  // icon="fa fa-calendar"
                  // selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date()}
                  // minTime={startDate && isTimeWithinRange(startDate) ? new Date(0, 0, 0, 18, 0) : new Date(0, 0, 0, 18, 0)}
                  // maxTime={endDate && isTimeWithinRange(endDate) ? endDate : new Date(0, 0, 0, 22, 0)}
                />
              </div>
              {/* </LocalizationProvider> */}
              {/* <h4 style={{fontWeight:"700"}}>TO</h4> */}
              <div
                style={{
                  // width: "230px",
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  margin: "0 ",
                }}
              >
                
                <DatePicker
                  className="custom-date-picker"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  closeOnScroll={true}
                  showIcon
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  // dateFormat="  dd-MM-yyyy hh:mm aa"
                  dateFormat="  dd-MM-yyyy "
                  placeholderText="Select end date and time"
                  // minTime={ isTimeWithinRange(startDate) ? startDate : new Date(0, 0, 0, 18, 0)}
                  // maxTime={endDate && isTimeWithinRange(endDate) ?  new Date(0, 0, 0, 22, 0) : new Date(0, 0, 0, 22, 0)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date()}
                  // icon="fa fa-calendar"
                  // minDate={startDate}
                />
              </div>
            </motion.div>
            <Button
              // sx={{ marginLeft: "30px" }}
              onClick={handleApply}
              variant="contained"
              color="success"
            >
              Apply
            </Button>
          </>
        )}
        <MultipleSelectCheckmarks
          isVisible={flag}
          graphToSelect={graphToSelect}
        />
      </Paper>
    </div>
  );
};

export default DatePickerComp;
