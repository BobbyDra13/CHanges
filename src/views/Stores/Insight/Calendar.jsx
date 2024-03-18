import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useMediaQuery, useTheme } from '@mui/material';
import { Badge, Button } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { PickersDay } from '@mui/x-date-pickers';

// import { previousDay } from 'date-fns';

const events = [new Date('2024-01-01'), new Date('2024-01-02')];

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

function DatePickerStore({ SetSelectedDate }) {
  const initialDate = new Date(2024, 0, 1); // February 11, 2024
  const [calender, setCalender] = useState(initialDate);
  const [openTimeDropdown, setOpenTimeDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState('6:00 to 6:15 PM');
  // const [selectedDate, setSelectedDate] = useState(formatDate(initialDate));
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [timeData, setTimeData] = useState('18:00');

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    // eslint-disable-next-line
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
    // const formattedDate = formatDate(date);
    // console.log(Selected Date: ${formattedDate});

    // setOpenTimeDropdown(true);
    // setSelectedDate(formattedDate);
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date, time) {
    //2024-01-01T00:00:00.000Z
    // console.log([date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-')+ "T" + time +":00.000Z");
    // console.log(time);
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') + 'T' + time + ':00.000Z';
  }

  const timeIntervals = [
    {
      time: '6:00 to 6:15 PM',
      value: '18:00'
    },
    {
      time: '6:15 to 6:30 PM',
      value: '18:15'
    },
    {
      time: '6:30 to 6:45 PM',
      value: '18:30'
    },
    {
      time: '6:45 to 7:00 PM',
      value: '18:45'
    },
    {
      time: '7:00 to 7:15 PM',
      value: '19:00'
    },
    {
      time: '7:15 to 7:30 PM',
      value: '19:15'
    },
    {
      time: '7:30 to 7:45 PM',
      value: '19:30'
    },
    {
      time: '7:45 to 8:00 PM',
      value: '19:45'
    },
    {
      time: '8:00 to 8:15 PM',
      value: '20:00'
    },
    {
      time: '8:15 to 8:30 PM',
      value: '20:15'
    },
    {
      time: '8:30 to 8:45 PM',
      value: '20:30'
    },
    {
      time: '8:45 to 9:00 PM',
      value: '20:45'
    },
    {
      time: '9:00 to 9:15 PM',
      value: '21:00'
    },
    {
      time: '9:15 to 9:30 PM',
      value: '21:15'
    },
    {
      time: '9:30 to 9:45 PM',
      value: '21:30'
    },
    {
      time: '9:45 to 10:00 PM',
      value: '21:45'
    }
  ];

  const shouldDisableDate = (day) => {
    // Enable January 1, January 2, and February 11, disable all other dates
    const month = day.getMonth();
    const date = day.getDate();
    return !(month === 0 && (date === 1 || date === 2));
  };

  const onClickTime = (i) => {
    // console.log(`Selected Date: ${calender}, Selected Time: ${i}`);
    setOpenTimeDropdown(false);
    setSelectedTime(i.time);
    setTimeData(i.value);
  };

  useEffect(() => {
    SetSelectedDate(formatDate(calender, timeData));
    // eslint-disable-next-line
  }, [calender, timeData]);

  return (
    <div>
      <div className="flex gap-3 items-center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className="cursor-pointer"
            sx={{
              bgcolor: 'white',
              paddingTop: 0,
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
            value={calender}
            onChange={handlechange}
            onMonthChange={handleMonthChange}
            shouldDisableDate={shouldDisableDate}
          />
        </LocalizationProvider>
        <div className="flex justify-center  w-full">
          <Button
            className="w-full bg-white text-black font-thin border-[#C4C4C4] "
            variant="outlined"
            color="primary"
            onClick={() => setOpenTimeDropdown((prev) => !prev)}
            sx={{ textTransform: 'none' }}
          >
            <p className="flex justify-between gap-2 w-full items-center">
              {selectedTime}
              {openTimeDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </Button>
        </div>
      </div>
      {openTimeDropdown && (
        <div className="p-3 z-50 w-[255px] h-[200px] overflow-y-scroll scrollbar absolute right-10 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {timeIntervals.map((i, index) => (
            <div
              key={index}
              className={`text-center p-1 hover:bg-green-100 duration-200 rounded-lg cursor-pointer ${
                i.time === selectedTime ? 'bg-green-100' : ''
              } `}
              onClick={() => onClickTime(i)}
            >
              {i.time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DatePickerStore;
