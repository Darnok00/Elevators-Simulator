import React, { useState } from "react";
import { useEffect } from "react";
import ElevatorsController from "../logic/ElevatorsController";

type ElevatorTableProps = {
  controller: ElevatorsController;
};
let numberSteps: number = 0;
const StatusPanel: React.FC<ElevatorTableProps> = ({ controller }) => {
  const [elevatorsStatus, setElevatorsStatus] = useState<
    Array<{
      actualFloor: number;
      upcomingStop: number;
      nextStops: Array<number>;
    }>
  >(controller.getElevatorsStatus());
  const [controllerElevators, setControllerElevators] =
    useState<ElevatorsController>(controller);
  useEffect(() => {

    const intervalId = setInterval(() => {
      setElevatorsStatus(controllerElevators.getElevatorsStatus());
      setControllerElevators(controllerElevators.updateElevators());
      numberSteps += 1
      console.log(numberSteps)
    }, controllerElevators.getTimestep() * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="SimulatorContianer">
      <p className="steps"
      > Number steps: {numberSteps} Timestep: {controller.getTimestep()}</p>
      <table>
        <thead>
          <tr>
            <th>Numer windy</th>
            <th>Aktualne piętro</th>
            <th>Następny przystanek</th>
            <th>Kolejne przystanki</th>
          </tr>
        </thead>
        <tbody>
          {elevatorsStatus.map((status, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{status.actualFloor}</td>
              <td>{status.upcomingStop}</td>
              <td>{status.nextStops.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusPanel;
