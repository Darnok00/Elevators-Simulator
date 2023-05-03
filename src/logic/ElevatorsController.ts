import Elevator from "./Elevator";
import { ElevatorPickup, ElevatorExpectedTime } from "../types/types";

class ElevatorsController {
  private elevators: Array<Elevator>;
  private elevatorPickups: Array<ElevatorPickup>;
  constructor(numberElevators: number) {
    // index == id
    this.elevators = Array.from(
      { length: numberElevators },
      (_, id) => new Elevator(id)
    );
    this.elevatorPickups = [];
  }

}

export default ElevatorsController;

