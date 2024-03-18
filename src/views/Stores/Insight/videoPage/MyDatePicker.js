import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      excludeTimes={[
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 30), 18),
        setHours(setMinutes(new Date(), 0), 19), // Corrected time
        setHours(setMinutes(new Date(), 30), 17)
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default MyDatePicker;
