import React from 'react';
import ElevatorsController from "../logic/ElevatorsController";

type ElevatorTableProps = {
  controller: ElevatorsController;
};

const StatusPanel: React.FC<ElevatorTableProps> = ({ controller }) => {
  const elevatorsStatus = controller.getElevatorsStatus();

  return (
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
            <td>{status.nextStops.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatusPanel;