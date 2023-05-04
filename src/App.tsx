import "./styles/App.css";
import InitializePopup from "./components/InitializeWindow";
import PickupPanel from "./components/PickupPanel";
import { SimulatorConstants, ElevatorPickup } from "./utils/types";
import { useState } from "react";
import ElevatorsController from "./logic/ElevatorsController";
import StatusPanel from "./components/SimulatorPanel";
import {defaultElevatorNumber, defaultFloorsNumber, defaultTimestep } from "./utils/constants";

function App() {
  const defaultElevatorsController: ElevatorsController =  new ElevatorsController(
    defaultFloorsNumber,
    defaultElevatorNumber,
    defaultTimestep
  );
  const [simulatorConstants, setSimulatorConstants] = useState<SimulatorConstants>();
  const [isStarted, setIsStarted] = useState<Boolean>(false);
  const [elevatorsController, setElevatorsController] =
    useState<ElevatorsController>(defaultElevatorsController);

  const handleSubmitSimulatorConstants = (data: SimulatorConstants) => {
    setSimulatorConstants({...data});
    setIsStarted(true);
    setElevatorsController(
      new ElevatorsController(
        data.elevatorsNumber,
        data.floorsNumber,
        data.timestep
      )
    );
  };

  const handleSubmitElevatorPickup = (data: ElevatorPickup) => {
    setElevatorsController(elevatorsController.addPickup(data));
  };

  return (
    <>
      <div className="AppContainer">
        {!isStarted && (
          <InitializePopup
            simulatorConstants={handleSubmitSimulatorConstants}
          />
        )}
        {isStarted && (
          <PickupPanel
          //@ts-ignore
            floorsNumberScope={[0, simulatorConstants.floorsNumber - 1]}
            elevatorPickup={handleSubmitElevatorPickup}
          />
        )}

        {isStarted && (
          <StatusPanel
            controller={elevatorsController}
          />
        )}
      </div>
    </>
  );
}

export default App;
