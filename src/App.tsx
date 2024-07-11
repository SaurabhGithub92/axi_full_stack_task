import React from "react";
import "./App.css";

interface State {
  lastClicked?: Date;
  buttonColor: "red" | "blue" | "green";
}

class App extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      lastClicked: undefined,
      buttonColor: "red",
    };
  }

  public render() {
    const { lastClicked, buttonColor } = this.state;

    return (
      <>
        <div>
          <button
            onClick={this.onClick}
            style={{ backgroundColor: buttonColor }}
          >
            Click
          </button>
        </div>
        <div className="TimeContainer">
          <div className="TimeItem">
            Local time:{" "}
            {lastClicked !== undefined ? lastClicked.toString() : "Never"}
          </div>
          <div className="TimeItem">
            GMT Time:{" "}
            {lastClicked !== undefined ? lastClicked.toString() : "Never"}
          </div>
          <div className="TimeItem">
            ACT Time:{" "}
            {lastClicked !== undefined ? lastClicked.toString() : "Never"}
          </div>
        </div>
      </>
    );
  }

  private onClick = () => {
    this.setState({
      lastClicked: new Date(),
      buttonColor: this.getNextButtonColor(),
    });
  };

  private getNextButtonColor = (): "red" | "blue" | "green" => {
    switch (this.state.buttonColor) {
      case "red":
        return "blue";
      case "blue":
        return "green";
      case "green":
        return "red";
      default:
        throw new Error("Invalid color");
    }
  };
}

export default App;
