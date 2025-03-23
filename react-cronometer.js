import React, { useState, useRef } from "react";

function useWatch() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 59) {
          setMinutes((prev) => prev + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setMinutes(0);
    setSeconds(0);
  };

  return { seconds, minutes, start, stop, reset };
}

function WatchComponent() {
  const { seconds, minutes, start, stop, reset } = useWatch();

  return (
    <>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export function App(props) {
  return (
    <div className="App">
      <WatchComponent />
    </div>
  );
}

// Log to console
console.log("Hello console");
