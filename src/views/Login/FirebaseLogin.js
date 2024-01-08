import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { COUNTRYCODE } from './countryCode';
import { Box, Button, FormHelperText, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { auth } from 'firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import * as Yup from 'yup';
import { Formik } from 'formik';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FirebaseLogin = () => {
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [buttonLabel, setButtonLabel] = useState('Send OTP');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [otpEntered, setOtpEntered] = useState(false);

  const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {}
      },
    );
  };


  const getPhoneNumber = `+${countryCode}${phone}`;

  function onSignup() {
    onCaptchVerify();
    let appVerifier = window.recaptchaVerifier;

    try {
      signInWithPhoneNumber(auth, getPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          if (confirmationResult) {
            setSnackbarOpen(true);
            setButtonLabel('Submit');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log('Error in signInWithPhoneNumber:', error);
    }
  }

  function onOTPVerify() {
    let confirmationResult = window.confirmationResult;
    
    if (!confirmationResult) {
      console.error('Confirmation result is not available.');
      return;
    }
  
    confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setButtonLabel('Submit');
  };

  const handleChange = (event) => {
    const val = event.target.value;

    if (val.match(/[^0-9]/)) {
      return event.preventDefault();
    }

    setPhone(val);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpEntered(value.length === 6);
  };

  return (
    <>
      <Formik
        initialValues={{
          phone: '7735299084',
          otp: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number')
            .required('Phone number is required'),
          otp: Yup.string().when('phone', {
            is: (val) => !!val,
            then: Yup.string().max(255).required('OTP is required')
          })
        })}
      >
        {({ errors }) => (
          <form noValidate>
            <div id="rubikFont" className="flex flex-row space-x-2">
              <div id="recaptcha-container"></div>

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-2 py-2 transition duration-300 border border-gray-300 rounded bg-gray-100 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                {COUNTRYCODE.map((e) => (
                  <option key={e} value={e.dial_code}>
                    {e.dial_code}
                  </option>
                ))}
              </select>
              <TextField
                fullWidth
                label="Enter your phone number"
                name="phone"
                onChange={handleChange}
                type="tel" 
                value={phone}
                variant="outlined"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="py-2 px-2">Enter OTP</p>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                inputStyle="m-[0.25rem] w-12  text-3xl rounded-md border border-solid border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-emerald-300"
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} disabled={!phone || otpEntered} />}
              />
            </div>

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box mt={2}>
              <Link to={buttonLabel === 'Submit' && otpEntered ? '/insights' : '#'}>
                {buttonLabel === 'Send OTP' && (
                  <>
                  <Button
                    color="primary"
                    // sx={{ backgroundColor: 'primary', color: 'white' }}  
                    disabled={!phone || phone.length !== 10 || otpEntered}
                    fullWidth
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={onSignup}
                  >
                    Send OTP
                  </Button>
                  </>
                )}

                {buttonLabel === 'Submit' && (
                  <Button
                    // color="primary"
                    // sx={{ backgroundColor: 'primary', color: 'white' }}  
                    disabled={!otpEntered || otp.length !== 6}
                    fullWidth
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={onOTPVerify}
                  >
                    Submit
                  </Button>
                )}
              </Link>
            </Box>

            <Snackbar
              open={snackbarOpen}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              key={'top' + 'center'}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                OTP sent successfully!
              </Alert>
            </Snackbar>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
