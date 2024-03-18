import React, { useEffect, useState } from 'react';
import { Paper, Card } from '@mui/material';
// import { RiTeamFill } from 'react-icons/ri';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DatePickerStore from './Calendar';
import { getRatio } from 'api/sentinelAPI';

function Rightbar({ date }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [empCount, setEmpCount] = useState('');
  const [costcnt, setCostcnt] = useState('');
  const [ratio, setRatio] = useState('');

  // console.log(selectedDate);
  date(selectedDate);

  useEffect(() => {
    async function getData() {
      const body = {
        start_date: selectedDate,
        storeId: '65c5e26a0b5be5dc7af327dc'
      };
      try {
        const {
          'Customer count': customerCount,
          'Employee count': employeeCount,
          'Employee to customer ratio': ratio
        } = await getRatio(body);
        setEmpCount(employeeCount);
        setCostcnt(customerCount);
        setRatio(ratio);
        // const u = await data.length
        // setUniquejourneys(u);
        // setJourneyData([...data]);
        // console.log(journeyData.length)
        // console.log(dta);
        // return ;
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [date]);

  function getGCD(a, b) {
    if (b === 0) {
      return a;
    }
    return getGCD(b, a % b);
  }

  function decimalToFraction(decimal) {
    // Check if the input is a valid number
    if (typeof decimal !== 'number' || isNaN(decimal)) {
      return 'Invalid input. Please provide a valid number.';
    }

    // Handle the case when the decimal is an integer
    if (Number.isInteger(decimal)) {
      return `${decimal}/1`;
    }

    // Find the power of 10 needed to convert the decimal to an integer
    const precision = 1e14;
    const wholeNumber = Math.round(decimal * precision);
    const gcd = getGCD(wholeNumber, precision);

    // Simplify the fraction
    const numerator = wholeNumber / gcd;
    const denominator = precision / gcd;

    return `${numerator}/${denominator}`;
  }

  const asc = decimalToFraction(+ratio);
  console.log(asc);

  return (
    <>
      <div style={{ margin: '0 0 10px  0' }}>
        <DatePickerStore SetSelectedDate={setSelectedDate} sx style={{ borderRadius: '15px' }} />
      </div>
      <Card className="opacity-30">
        <Paper
          elevation={3}
          style={{
            padding: '10px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Diversity3Icon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
          <div className="flex flex-col items-start pt-1">
            <h3 className="text-4xl">{empCount}</h3>
            <p>Total employee count</p>
          </div>
        </Paper>
      </Card>
      <Card
        className="opacity-20"
        sx={{
          marginTop: '0.5rem'
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: '10px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Diversity3Icon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
          <div className="flex flex-col items-start pt-1">
            <h3 className="text-4xl">
              {empCount}:{costcnt}
            </h3>
            <p>Assoc.-Cust. ratio</p>
          </div>
        </Paper>
      </Card>
      <div className="opacity-30">
        <Card
          sx={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <div
            style={{
              padding: '10px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <QuestionAnswerIcon className="bg-[#444444] text-white rounded-full p-2 text-5xl" />
            <div className="flex flex-col items-start pt-1">
              <h3 className="text-4xl">12</h3>
              <p>Message Logs</p>
            </div>
          </div>
        </Card>
        <Card sx={{ marginTop: '2px', padding: '0.5rem', borderRadius: '2px' }}>
          <div className="flex gap-3 mb-1">
            <AccountCircleIcon className="bg-[#444444] text-white rounded-full p-1 text-3xl" />
            <div className="flex flex-col gap-2">
              <div>has not interacted with a customer over 15 mins.</div>
              <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'right'
            }}
          >
            08:02:53 30-01-2024
          </div>
        </Card>
        <Card sx={{ marginTop: '2px', padding: '0.5rem', borderRadius: '2px' }}>
          <div className="flex gap-3 mb-1">
            <AccountCircleIcon className="bg-[#444444] text-white rounded-full p-1 text-3xl" />
            <div className="flex flex-col gap-2">
              <div>
                Heavy customer traffic detected at Phone zone. Please re-assign <span className="font-bold">Ritesh Kumar</span> to Phones
                zone for optimal customer - employee ratio.
              </div>
              <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'right'
            }}
          >
            08:02:53 30-01-2024
          </div>
        </Card>
        <Card sx={{ marginTop: '2px', padding: '0.5rem', borderRadius: '0 0 12px 12px' }}>
          <div className="flex gap-3 mb-1 ">
            <AccountCircleIcon className="bg-[#444444] text-white rounded-full p-1 text-3xl" />
            <div className="flex flex-col gap-2">
              <div>Loyal customer 3330123 detected at entry gate.</div>
              <div className="text-blue-500 cursor-pointer font-bold">View {'->'}</div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'right'
            }}
          >
            <p>08:02:53 30-01-2024</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Rightbar;
