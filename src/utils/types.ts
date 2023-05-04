export type ElevatorRide = {
  startFloor: number;
  destinationFloor: number;
  stops: Array<number>;
};

export type ElevatorPickup = {
  startFloor: number;
  destinationFloor: number;
};

export type ElevatorExpectedTime = {
  elevatorId: number;
  expectedTime: number;
};

export type SimulatorConstants = {
  floorsNumber: number;
  elevatorsNumber: number;
  timestep: number;
};
