import React, { useEffect, useState } from "react";
import "./App.css";

interface ColorState {
  lastClicked: "red" | "blue" | "green";
}

type ButtonColor = "red" | "blue" | "green";

interface TimeZoneMapping {
  color: ButtonColor;
  timeZone: string;
  formattedTime: string;
}

const App: React.FC = () => {
  const initialTimeZones: TimeZoneMapping[] = [
    {color: "red", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, formattedTime: "Loading time..."},
    {color: "blue", timeZone: "GMT", formattedTime: "Loading time..."},
    {color: "green", timeZone: "ACT", formattedTime: "Loading time..."}
  ];

  const getInitialColor = (): ButtonColor => {
    const storedColor = localStorage.getItem('buttonColor');
    return storedColor === "red" || storedColor === "blue" || storedColor === "green" ? storedColor : "red";
  }

  const [timeZones, setTimeZones] = useState(initialTimeZones);
  const [colorState, setColorState] = useState<ColorState>({lastClicked: getInitialColor()});

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimeZones();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateTimeZones = () => {
    const updatedTimeZones = timeZones.map(({color, timeZone}) => ({
      color, timeZone,
      formattedTime:   new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone,
      }).format(new Date())
    }));
    setTimeZones(updatedTimeZones);
  }

  const toggleButtonColor = (color: ButtonColor) => {
    setColorState({lastClicked: color});
    localStorage.setItem('buttonColor', color);
    updateTimeZones();
  }

  return (
    <div className="App">
      <div className="ButtonContainer">      
        <button className={`ToggleButton red ${colorState.lastClicked === "red" ? 'active' : ''}`} onClick={ () =>toggleButtonColor("red")}>Local Time</button>
        <button className={`ToggleButton blue ${colorState.lastClicked === "blue" ? 'active' : ''}`} onClick={ () =>toggleButtonColor("blue")}>GMT Time</button>
        <button className={`ToggleButton green ${colorState.lastClicked === "green" ? 'active' : ''}`} onClick={ () =>toggleButtonColor("green")}>ACT Time</button>
      </div>
      <div className="TimeContainer">
        {
          timeZones.map(({color, formattedTime}) => (
            <div key={color} className={`TimeItem ${color === colorState.lastClicked ? 'active' : ''}`}>{formattedTime}</div>
        ))}
      </div>
    </div>
  )
}

export default App;