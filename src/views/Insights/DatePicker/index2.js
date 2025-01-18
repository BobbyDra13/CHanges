import { React, useState, useEffect } from 'react';

// materia-ui imports
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { GetInsightsDates } from 'api'; //, GetDates
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EventIcon from '@mui/icons-material/Event';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  // console.log(props);
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.getDate()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      sx={isSelected ? { margin: '2px', borderRadius: '50%' } : undefined}
      badgeContent={isSelected ? '' : undefined}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      variant={'dot'}
      color={isSelected ? 'primary' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function DatePickerComp2() {
  const location = useLocation();
  const [calender, setCalender] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  // const storeId = useSelector((state) => state.customization.date);
  const singleSelectedDate = useSelector((state) => state.customization.singleSelectedDate);

  const storeId = JSON.parse(localStorage.getItem('analysisStoreId'));
  const userId = JSON.parse(localStorage.getItem('userData')).data[0]._id;
  console.log('Store ID', storeId);
  console.log('User', userId);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.customization.selectedDate);
  useEffect(() => {
    if (singleSelectedDate) {
      setCalender(singleSelectedDate);
    }
  }, [singleSelectedDate]);

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

  useEffect(() => {
    setHighlightedDays([]);
    const daysToHighlight = events.map((event) => {
      const today = new Date();
      if (event.getMonth() === today.getMonth()) {
        return event.getDate();
      }
      return;
    });
    setHighlightedDays(daysToHighlight);
  }, [events]);

  function handleCalOpen() {
    setOpenDatePicker(true);
    const daysToHighlight = events.map((event) => {
      if (event.getMonth() === calender.getMonth()) {
        return event.getDate();
      }
      return;
    });

    setHighlightedDays([]);
    setHighlightedDays(daysToHighlight);
  }

  const handleMonthChange = (date) => {
    // console.log(date.getMonth());
    const daysToHighlight = events.map((event) => {
      // console.log(event.getMonth());
      if (event.getMonth() === date.getMonth()) {
        return event.getDate();
      }
      return;
    });

    setHighlightedDays([]);
    setHighlightedDays(daysToHighlight);
  };

  const handlechange = (date) => {
    setCalender(date);
    // console.log(date.getDate())
  };
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  // eslint-disable-next-line
  function formatDate(date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
  }
  useEffect(() => {
    dispatch({
      type: 'selectedDate',
      // payload: calender
      payload: { start_date: calender, end_date: calender }
    });
    // eslint-disable-next-line
  }, [calender]);
  console.log('Calender', calender);
  // console.log("date", new Date(2023, 11, 26))

  return (
    <>
      <div className={`flex items-center ${isSmallScreen && 'hidden'}`}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="cursor-pointer"
            sx={{
              bgcolor: 'white',
              '& .MuiInputBase-root': {
                height: '40px' // Adjust the height as needed
              }
            }}
            slots={{
              day: ServerDay
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                bgcolor: 'white'
                // readOnly: true,
                // onClick: () => setOpen(true),
              },
              day: {
                highlightedDays
              }
            }}
            format="dd/MM/yyyy"
            id="date-picker-inline"
            label="Date Selected"
            value={selectedDate.start_date}
            onChange={handlechange}
            onMonthChange={handleMonthChange}
            minDate={new Date(2023, 11, 26)}
            maxDate={new Date()}
            closeOnSelect={false}
            onOpen={handleCalOpen}
            onClose={() => setOpenDatePicker(false)}
            open={openDatePicker}
          />
        </LocalizationProvider>
      </div>
      {isSmallScreen && (
        <IconButton
          sx={{ color: 'black' }}
          onClick={() => {
            setOpenDatePicker(!openDatePicker);
          }}
        >
          <EventIcon />
        </IconButton>
      )}
    </>
  );
}

export default DatePickerComp2;
