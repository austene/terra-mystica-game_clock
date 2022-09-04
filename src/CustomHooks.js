import {useEffect, useRef} from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the last callback given to useInterval.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval (sets tick to run after interval of delay).
  useEffect(() => {
    if(true) {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let timerID = setInterval(tick, delay);
        return () => clearInterval(timerID);
      }
    }
  }, [delay]);

};

export default useInterval;