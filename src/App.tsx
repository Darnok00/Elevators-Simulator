import "./styles/App.css";
import InitializePopup from "./components/InitializePopup";
import PickupPanel from "./components/PickupPanel";
import { SimulatorConstants, ElevatorPickup } from "./utils/types";
import { useState } from "react";
import ElevatorsController from "./logic/ElevatorsController";
import StatusPanel from "./components/StatusPanel";

function App() {
  const [simulatorConstants, setSimulatorConstants] =
    useState<SimulatorConstants>();
  const [isStarted, setIsStarted] = useState<Boolean>(false);
  const [elevatorsController, setElevatorsController] =
    useState<ElevatorsController>();

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
    //@ts-ignore
    setElevatorsController(elevatorsController.addPickup(data));
    console.log("bla");
  };

  return (
    <>
      <div>
        {!isStarted && (
          <InitializePopup
            simulatorConstants={handleSubmitSimulatorConstants}
          />
        )}
        {isStarted && (
          <PickupPanel
            //@ts-ignore;
            floorsNumberScope={[0, simulatorConstants.floorsNumber - 1]}
            elevatorPickup={handleSubmitElevatorPickup}
          />
        )}

        {isStarted && (
          <StatusPanel
            //@ts-ignore
            controller={elevatorsController}
          />
        )}
      </div>
    </>
  );
}

export default App;
