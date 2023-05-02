import { ElevatorRide } from "../types/types";

class Elevator {
    private totalFloorsNumber: Number;
    private actualFloorNumber: Number;
    private destinationFloor: Number;
    private stops: Array<Number>;
    private elevatorRidesQueue: Array<ElevatorRide>;


    constructor(totalFloorsNumber: Number) {
        this.totalFloorsNumber = totalFloorsNumber;
        this.actualFloorNumber = 0;
        this.destinationFloor = 0;
        this.stops = []
        this.elevatorRidesQueue = []
    };

    public getActualFloorNumber ()  {
        return this.actualFloorNumber
    }

    public getDestinationFloor () {
        return this.destinationFloor
    }

    public isGoing () {
        return this.actualFloorNumber != this.destinationFloor
    }

    public hasPlannedRide () {
        return this.elevatorRidesQueue.length > 0
    }


}

export default Elevator;