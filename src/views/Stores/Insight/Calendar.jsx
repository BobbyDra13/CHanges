import { React, useState, useEffect } from 'react';

// materia-ui imports
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import dates from 'views/Stores/Table/dateSelect';
import { GetDates } from 'api';
// import dayjs from 'dayjs';

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

function DatePickerComp({ SetSelectedDate }) {
  const [calender, setCalender] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);

  useEffect(() => {
    async function getEventsdata() {
      // setIsLoading(true);
      const storeDetails = JSON.parse(localStorage.getItem('analysisStoreDetails'));
      try {
        const body = {
          store_id: [`${storeDetails.store}`]
        };
        const Edata = await GetDates(body);

        const daysOnly = Edata.data.map((item) => {
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
  }, []);

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
    console.log('def cat', date.getDate());
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
  }
  useEffect(() => {
    SetSelectedDate(formatDate(calender));
    // eslint-disable-next-line
  }, [calender]);
  // console.log('Calender', calender.toLocaleDateString('en-GB'));
  // console.log("date", new Date(2023, 11, 26))
  function handleCalOpen() {
    const daysToHighlight = events.map((event) => {
      if (event.getMonth() === calender.getMonth()) {
        return event.getDate();
      }
      return;
    });

    setHighlightedDays([]);
    setHighlightedDays(daysToHighlight);
  }
  return (
    <div className="mt-5 md:mt-0">
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
          value={calender}
          onChange={handlechange}
          onMonthChange={handleMonthChange}
          minDate={new Date(2023, 11, 26)}
          maxDate={new Date()}
          closeOnSelect={false}
          onOpen={handleCalOpen}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerComp;
