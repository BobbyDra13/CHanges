import React from 'react';
import './NotFound.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import Login from 'views/Login';
// import Insights from 'views/Insights';
// import { NavLink } from 'react-router-dom';
import notfound from "../../assets/images/404 Error-bro.svg"
// import { useTheme } from '@emotion/react';



const NotFound = ({btn, flag}) => {

  // const theme= useTheme();
  // console.log(flag);
  // function handelClick(){
  //   // console.log("hello")
  //   btn == 'Go back'? <Link to="/main/insights" /> : <Link to="/" />
  // }
  return (
    <div className="notfound">
      <img src={notfound} alt='notfound' />
      {/* <div id="error-page">
        <div className="error-img">
          <img src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1470175715831-NUJOMI6VW13ZNT1MI0VB/image-asset.jpeg?format=750w" alt="error_img" />
        </div>
        <div className="error-content">
          <h1>AWWW...DON’T CRY.</h1>
          <p>It’s just a 404 Error!</p>
          <p>What you’re looking for may have been misplaced in Long Term Memory.</p> */}
          {flag ==='1' ?  
          <Link to="/main/insights">
          <Button variant="contained"
          sx={{
            backgroundColor: '#00ac69!important',
            color: '#FFFFFF',
            borderRadius: '8px ',
            padding: '6px 24px ',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#16a34a!important'
            },
            '&:active': {
              backgroundColor: '#4ade80!important'
            },
            '&:focus': {
              outline: 'none'
            },
            mr: 1
          }}
          
          >{btn}</Button>
          </Link> 
         :
         <Link to="/">
         <Button variant="contained" 
         sx={{
          backgroundColor: "#00ac69!important",
          color: '#FFFFFF',
          borderRadius: '8px ',
          padding: '6px 24px ',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#16a34a!important'
          },
          '&:active': {
            backgroundColor: '#4ade80!important'
          },
          '&:focus': {
            outline: 'none'
          },
          mr: 1
        }}
         
         >{btn}</Button>
         </Link> }
        {/* </div>
      </div> */}
    </div>
  );
};

export default NotFound;
