import React, { useEffect, useState } from "react";
import "./App.css";

interface ColorState {
  lastClicked: "red" | "blue" | "green";
}

type ButtonColor = "red" | "blue" | "green";

const App: React.FC = () => {
  const getInitialColor = (): ButtonColor => {
    const storedColor = localStorage.getItem('buttonColor');
    return storedColor === "red" || storedColor === "blue" || storedColor === "green" ? storedColor : "red";
  }

  const [time, setTime] = useState<Date | null>(null);
  const [colorState, setColorState] = useState<ColorState>({lastClicked: getInitialColor()});

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = (time: Date | null, timeZone: string) => {
    return time ? new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
      timeZone,
    }).format(time)
    : "Loading time...";
  }

  const toggleButtonColor = () => {
    setColorState((prevState) => {
      let newColor: ButtonColor;
      switch (prevState.lastClicked) {
        case "red":
          newColor = "blue";
          break;
        case "blue": 
          newColor = "green";
          break;
        case "green": 
          newColor = "red";
          break;                
        default:
          newColor = "red";
      }
      localStorage.setItem('buttonColor', newColor);
      return {lastClicked: newColor};
    })
    setTime(new Date());
  }

  return (
    <div className="App">
      <button className={`ToggleButton ${colorState.lastClicked}`} onClick={toggleButtonColor}>
        Toggle Time
      </button>
      <div className="TimeContainer">
        <div className="TimeItem">Local Time : {formattedTime(time, Intl.DateTimeFormat().resolvedOptions().timeZone)}</div>

        <div className="TimeItem">GMT Time : {formattedTime(time, 'GMT')}</div>

        <div className="TimeItem">ACT Time : {formattedTime(time, 'ACT')}</div>
      </div>
    </div>
  )
}

export default App;
