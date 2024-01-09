import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { COUNTRYCODE } from './countryCode';
import { Box, Button, FormHelperText, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// import { useTheme } from '@mui/material';
import { auth } from 'firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import FadeLoader from "react-spinners/FadeLoader";
// import { css } from '@emotion/react';


import * as Yup from 'yup';
import { Formik } from 'formik';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FirebaseLogin = () => {
  // const theme = useTheme();

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [buttonLabel, setButtonLabel] = useState('Send OTP');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [otpEntered, setOtpEntered] = useState(false);
  // const [loading, setLoading] = useState(true);
//   const [color] = useState("black");
//   const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;


  const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {}
    });
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
            // setLoading(false);
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
      .then((userCredential) => {
        // Verification successful
        const user = userCredential.user;

        if (user) {
          navigate('/insights');
          // OTP is correct, you can redirect to the '/insights' page
          console.log('OTP is correct. Redirect to /insights.');
          // Add the logic to navigate to '/insights'
        } else {
          // OTP is incorrect, show a snackbar or error message
          console.log('Incorrect OTP. Show error message.');
          // Add logic to display an error message (e.g., setSnackbarOpen(true, 'Incorrect OTP'))
        }
      })
      .catch((error) => {
        // OTP verification failed, show a snackbar or error message
        console.error('Error verifying OTP:', error);
        // Add logic to display an error message (e.g., setSnackbarOpen(true, 'OTP verification failed'))
      });
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setButtonLabel('Submit');
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpEntered(value.length === 6);
  };

  return (
    <>
      <Formik
        initialValues={{
          phone: '',
          otp: '',
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
                className={`px-2 py-2 transition duration-300 border border-gray-300 rounded bg-gray-100 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300`}
              >
                {COUNTRYCODE.map((e) => (
                  <option key={e} value={e.dial_code}>
                    {e.dial_code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                maxLength={10}
                label="Number"
                name="phone"
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Mobile number"
                autoFocus
                className="px-4 py-2 w-full transition duration-300 border border-gray-300 rounded bg-gray-100 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="mt-2 py-2 px-2">Enter OTP</p>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                inputStyle="m-[0.75rem] text-lg rounded-md border border-solid border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300"
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      padding: '0.5rem', 
                      width: '2rem', 
                      height: '2rem' 
                    }}
                    disabled={!phone || buttonLabel !== 'Submit'}
                  />
                )}
              />
            </div>

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box
              mt={2}
              // sx={{
              //   backgroundColor: theme.palette.success.main,
              //   color: 'black',
              //   '&:hover': {
              //     backgroundColor: theme.palette.success.dark // Change the hover color if needed
              //   },
              //   cursor: 'pointer'
              // }}
            >
              {buttonLabel === 'Send OTP' &&(
              <>
                  <Button
                    // color="primary"
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
            </Box>

            <Snackbar
              open={snackbarOpen}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              key={'bottom' + 'right'}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} className="text-white" severity="success" sx={{ width: '100%' }}>
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
