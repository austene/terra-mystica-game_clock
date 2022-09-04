import React from 'react';

const DisplayTime = ({
  timeInSecs
}) => {



  const hours = Math.floor(timeInSecs / (60 * 60));
  const minutes = Math.floor((timeInSecs % (60 * 60)) / 60);
  const seconds = Math.floor(timeInSecs % 60);

  const twoDigits = (number) => 
    (number).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  

  const display = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`

  return(
    <div className='display-time'>
      <span>{display}</span>
    </div>
  )
}

export default DisplayTime;
