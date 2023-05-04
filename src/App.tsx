import "./styles/App.css";
import InitializePopup from "./components/InitializePopup";
import PickupPanel from "./components/PickupPanel";
import { SimulatorConstants, ElevatorPickup } from "./utils/types";
import { useState } from "react";
import ElevatorsController from "./logic/ElevatorsController";

const defaultValues = { floorsNumber: 5, elevatorsNumber: 2, timestep: 1 };
let elevatorsController: ElevatorsController;

function App() {
  const [SimulatorConstants, setSimulatorConstants] =
    useState<SimulatorConstants>(defaultValues);

  const [isStarted, setIsStarted] = useState<Boolean>(false);

  const handleSubmitSimulatorConstants = (data: SimulatorConstants) => {
    setSimulatorConstants(data);
    setIsStarted(true);
    elevatorsController = new ElevatorsController(
      SimulatorConstants.elevatorsNumber,
      SimulatorConstants.floorsNumber,
      SimulatorConstants.timestep
    );
  };

  const handleSubmitElevatorPickup = (data: ElevatorPickup) => {
    elevatorsController.addPickup(data);
    console.log(elevatorsController.getElevatorPickups());
  };

  return (
    <>
      <div>
        <p>START</p>
        {!isStarted && (
          <InitializePopup
            simulatorConstants={handleSubmitSimulatorConstants}
          />
        )}
        <PickupPanel
          floorsNumberScope={[0, SimulatorConstants.floorsNumber - 1]}
          elevatorPickup={handleSubmitElevatorPickup}
        />
      </div>
    </>
  );
}

export default App;
