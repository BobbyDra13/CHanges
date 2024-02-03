// IT IS A CUSTOM HOOK TO DEBOUNCE THE INPUT VALUE WHICH MEANS THAT IT WILL
// WAIT FOR A SPECIFIC TIME BEFORE IT UPDATES THE VALUE. THIS WILL RESOLVE THE
// PROBLEM OF UPDATING THE VALUE ON EVERY KEYSTROKE (ONCHANGE).
// IT WILL RETURN THE DEBOUNCED VALUE AND A FUNCTION TO UPDATE THE VALUE.

import { useState } from 'react';
const useDebounce = (initialValue = '', delay = 500) => {
  const [inputValue, setInputValue] = useState(initialValue);

  let timeoutId;

  const handleInputChange = (event) => {
    const value = event.target.value;

    // CLEAR THE PREVIOUS TIMEOUT
    clearTimeout(timeoutId);

    // SET A NEW TIMEOUT
    timeoutId = setTimeout(() => {
      setInputValue(value);
    }, delay);
  };

  return [inputValue, handleInputChange];
};

export default useDebounce;
