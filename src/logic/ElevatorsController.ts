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

  public addPickup(pickup: ElevatorPickup) {
    this.elevatorPickups.push(pickup);
  }

  public assignPickupsToElevators() {
    this.elevatorPickups.forEach((pickup) => {
      const expectedTimesArrivalList: Array<ElevatorExpectedTime> =
        this.elevators.map((elevator) => {
          return {
            elevatorId: elevator.getId(),
            expectedTime: elevator.getExpectedTimeArrival(
              pickup.startFloor,
              pickup.destinationFloor
            ),
          };
        });
      const elevatorWithLowestTime = expectedTimesArrivalList.reduce(
        (min, elevator) => {
          return elevator.expectedTime < min.expectedTime ? elevator : min;
        },
        expectedTimesArrivalList[0]
      );
      this.elevators[elevatorWithLowestTime.elevatorId].addRide(
        pickup.startFloor,
        pickup.destinationFloor
      );
    });
  }
}

export default ElevatorsController;

