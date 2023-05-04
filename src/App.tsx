import "./styles/App.css";
import InitializePopup from "./components/InitializePopup";
import { SimulatorConstants } from "./types/types";
import { useState } from "react";

const defaultValues = { floorsNumber: 5, elevatorsNumber: 2, timestep: 1 };

function App() {
  const [SimulatorConstants, setSimulatorConstants] =
    useState<SimulatorConstants>(defaultValues);

  const [isStarted, setIsStarted] = useState<Boolean>(false);

  const handleSubmit = (data: SimulatorConstants) => {
    setSimulatorConstants(data);
    setIsStarted(true);
  };

  return (
    <>
      <div>
        <p>START</p>
        {!isStarted && <InitializePopup simulatorConstants={handleSubmit} />}
      </div>
    </>
  );
}

export default App;
