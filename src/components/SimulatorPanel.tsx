import React, { useState } from "react";
import { useEffect } from "react";
import ElevatorsController from "../logic/ElevatorsController";

type ElevatorTableProps = {
  controller: ElevatorsController;
};

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
  const [numberSteps, setNumberSteps] = useState<number>(0);

  useEffect(() => {

    const intervalId = setInterval(() => {
      setElevatorsStatus([...controllerElevators.getElevatorsStatus()]);
      setControllerElevators(controllerElevators.updateElevators());
      setNumberSteps(numberSteps+1);
    }, controllerElevators.getTimestep() * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="SimulatorContianer">
      <p className="steps"
      > Number steps: {numberSteps}</p>
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