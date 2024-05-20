import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { COUNTRYCODE } from './countryCode';
import { Box, Button, FormHelperText, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// import { useTheme } from '@mui/material';
import { auth } from '../../firebase-config';
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

import { GetVerifiedUsers } from 'api';
// import FadeLoader from "react-spinners/FadeLoader";
// import { css } from '@emotion/react';

import * as Yup from 'yup';
import { Formik } from 'formik';

import useDebounce from 'hooks/useDebounce';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FirebaseLogin = () => {
  // const theme = useTheme();

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  // const [phone, setPhone] = useState('');
  const [phoneInput, handlePhoneInputChange] = useDebounce('');
  const [countryCode, setCountryCode] = useState('+91');
  const [buttonLabel, setButtonLabel] = useState('Send OTP');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [otpEntered, setOtpEntered] = useState(false);
  // const [fullPageLoading, setFullPageLoading] = useState(true);
  const [verifyData, setVerifyData] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {}
    });
  };

  let phoneNumber = false;
  if (phoneInput.length === 10) {
    phoneNumber = phoneInput;
  }

  const getPhoneNumber = countryCode + phoneInput;

  // THIS WILL FIRST CHECK THAT THE USER IS AUTHENTICATED OR NOT
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/main/insights');
    }
    // if (fullPageLoading) setFullPageLoading(false);
  });

  // THIS WILL CHECK THE USER IS AUTHORIZED OR NOT

  const checkUsers = async () => {
    setLoading(true);
    try {
      const response = await GetVerifiedUsers(phoneNumber);
      console.log('data', response.data.data.number);
      setVerifyData(response.data);
      if (response.data.data.number === phoneNumber) {
        console.log('entered if');
        onSignup();
      } else {
        console.log('entered else');
        setLoading(false);
        toast.error('You are not authorized to access');
      }
    } catch (error) {
      console.log('Error Calling userss API: ', error);
    }
  };
  console.log('verify', verifyData);

  // console.log(verifyData);
  function onSignup() {
    console.log('works');
    onCaptchVerify();
    console.log('still works');
    let appVerifier = window.recaptchaVerifier;
    setLoading(true);

    try {
      signInWithPhoneNumber(auth, getPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          if (confirmationResult) {
            setSnackbarOpen(true);
            setButtonLabel('Submit');
            setShowOTPInput(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log('Error in signInWithPhoneNumber:', error);
      toast.error('Error sending OTP. Please try again. ');
      setLoading(false);
    }
  }
  function onOTPVerify() {
    let confirmationResult = window.confirmationResult;
    setLoading(true);

    if (!confirmationResult) {
      console.error('Confirmation result is not available.');
      setLoading(false);
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userData', JSON.stringify(verifyData));
        navigate('/main/insights');
        setAccessToken(user.accessToken);
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        toast.error('Wrong OTP. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    localStorage.setItem('Token', JSON.stringify(accessToken));
  }, [accessToken]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setButtonLabel('Submit');
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpEntered(value.length === 6);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (buttonLabel === 'Send OTP') {
        checkUsers();
      } else if (buttonLabel === 'Submit') {
        onOTPVerify();
      }
    }
  };
  // const handlePhoneChange = (event) => {
  //   setPhone(event.target.value);
  // };
  return (
    <>
      {/* {fullPageLoading && (
        <div className="flex justify-center items-center fixed top-0 left-0 z-10 text-5xl overflow-x-hidden bg-white w-screen h-screen">
          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        </div>
      )} */}
      <Formik
        initialValues={{
          phoneInput: '',
          otp: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          phoneInput: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number')
            .required('Phone number is required'),
          otp: Yup.string().when('phoneInput', {
            is: (val) => !!val,
            then: Yup.string().max(255).required('OTP is required')
          })
        })}
      >
        {({ errors }) => (
          <form noValidate onKeyDown={handleKeyPress} autoComplete="on">
            <div id="rubikFont" className="flex flex-row space-x-2">
              <div id="recaptcha-container"></div>

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={`px-2 py-2 transition duration-300 border border-gray-300 rounded bg-gray-100 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300`}
              >
                {COUNTRYCODE.map((e, i) => (
                  <option key={i} value={e.dial_code}>
                    {e.dial_code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                maxLength={10}
                label="Number"
                name="phoneInput"
                // value={phoneInput}
                onChange={handlePhoneInputChange}
                placeholder="Mobile number"
                // autoFocus
                className="px-4 py-2 w-full transition duration-300 border border-gray-300 rounded bg-gray-100 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300"
              />
            </div>
            {showOTPInput && (
              <div className="flex flex-col justify-center items-center">
                <p className="mt-2 py-2 px-2">Enter OTP</p>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  inputStyle="m-[0.75rem] text-lg rounded-md border border-solid border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-emerald-300"
                  numInputs={6}
                  shouldAutoFocus
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      type="number"
                      inputMode="numeric"
                      style={{
                        padding: '0.5rem',
                        width: '2rem',
                        height: '2rem'
                      }}
                      disabled={!phoneInput || buttonLabel !== 'Submit'}
                    />
                  )}
                />
              </div>
            )}

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box mt={2}>
              {buttonLabel === 'Send OTP' && (
                <>
                  <Button
                    // color="primary"
                    disabled={!phoneInput || phoneInput.length !== 10 || otpEntered || loading}
                    fullWidth
                    size="large"
                    type="button"
                    variant="outlined"
                    onClick={checkUsers}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
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
                  {loading ? 'Verifying...' : 'Submit'}
                </Button>
              )}
            </Box>
            <Toaster />
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
