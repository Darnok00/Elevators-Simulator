import { ElevatorRide } from "../types/types";

class Elevator {
    private actualFloorNumber: Number;
    private destinationFloor: Number;
    private stops: Array<Number>;
    private elevatorRidesQueue: Array<ElevatorRide>;


    constructor() {
        this.actualFloorNumber = 0;
        this.destinationFloor = 0;
        this.stops = []
        this.elevatorRidesQueue = []
    };

}

export default Elevator;