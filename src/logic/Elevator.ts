import { ElevatorRide } from "../types/types";
import { getDirection, getDiffrenceFloors, canBeAdditionalStop, numberStopsForScope, insertNewStop} from "./helpers";

class Elevator {
  private actualFloor: number;
  private destinationFloor: number;
  private stops: Array<number>;
  private elevatorRidesQueue: Array<ElevatorRide>;
  private canMove: boolean;
  private id: number;

  constructor(id: number) {
    this.actualFloor = 0;
    this.destinationFloor = 0;
    this.stops = [];
    this.elevatorRidesQueue = [];
    this.canMove = true;
    this.id = id;
  }

  public getActualFloor() {
    return this.actualFloor;
  }

  public getDestinationFloor() {
    return this.destinationFloor;
  }

  public getStops() {
    return this.stops;
  }

  public getElevatorRidesQueue() {
    return this.elevatorRidesQueue;
  }

  public getId() {
    return this.id;
  }

  public isGoing() {
    return this.actualFloor != this.destinationFloor;
  }

  public hasPlannedRide() {
    return this.elevatorRidesQueue.length > 0;
  }

  public getExpectedTimeArrival(startFloor: number, destinationFloor: number) {
    let totalTime = 0;

    if (!this.isGoing && !this.hasPlannedRide) {
      return getDiffrenceFloors(this.actualFloor, destinationFloor) + 2;
    }

    if (this.isGoing()) {
      const directionActualRide = getDirection(
        this.actualFloor,
        this.destinationFloor
      );
      const directionPlannedRide = getDirection(
        startFloor,
        destinationFloor
      );

      if (
        canBeAdditionalStop(
          this.actualFloor,
          this.destinationFloor,
          startFloor,
          destinationFloor,
          directionActualRide,
          directionPlannedRide
        )
      ) {
        return (
          getDiffrenceFloors(this.actualFloor, destinationFloor) +
          numberStopsForScope(
            this.actualFloor,
            destinationFloor,
            this.stops,
            directionActualRide
          ) +
          2
        );
      }
      totalTime +=
        getDiffrenceFloors(this.actualFloor, this.destinationFloor) +
        numberStopsForScope(
          this.actualFloor,
          this.destinationFloor,
          this.stops,
          directionActualRide
        ) +
        1;
    }

    if (this.hasPlannedRide()) {
      this.elevatorRidesQueue.forEach((ride) => {
        const directionActualRide = getDirection(
          ride.startFloor,
          ride.destinationFloor
        );
        const directionAdditionalRide = getDirection(
          startFloor,
          destinationFloor
        );
        if (
          canBeAdditionalStop(
            ride.startFloor,
            ride.destinationFloor,
            startFloor,
            destinationFloor,
            directionActualRide,
            directionAdditionalRide
          )
        ) {
          return (
            totalTime +
            getDiffrenceFloors(ride.startFloor, destinationFloor) +
            numberStopsForScope(
              ride.startFloor,
              ride.destinationFloor,
              ride.stops,
              directionActualRide
            ) +
            2
          );
        }
        totalTime +=
          getDiffrenceFloors(ride.startFloor, ride.destinationFloor) +
          numberStopsForScope(
            ride.startFloor,
            ride.destinationFloor,
            ride.stops,
            directionActualRide
          ) +
          1;
      });
    }
    totalTime +=
      getDiffrenceFloors(
        this.elevatorRidesQueue[-1].destinationFloor,
        startFloor
      ) + getDiffrenceFloors(startFloor, destinationFloor);

    return totalTime;
  }

  public addRide(startFloor: number, destinationFloor: number) {
    const directionActualRide = getDirection(
      this.actualFloor,
      this.destinationFloor
    );
    const directionPlannedRide = getDirection(
      startFloor,
      destinationFloor
    );

    if (
      canBeAdditionalStop(
        this.actualFloor,
        this.destinationFloor,
        startFloor,
        destinationFloor,
        directionActualRide,
        directionPlannedRide
      )
    ) {
      this.stops = insertNewStop(this.stops, startFloor);
      this.stops = insertNewStop(this.stops, destinationFloor);
    } else {
      let addedToStops = false;
      this.elevatorRidesQueue.forEach((ride) => {
        if (!addedToStops) {
          const directionActualRide = getDirection(
            ride.startFloor,
            ride.destinationFloor
          );

          if (
            canBeAdditionalStop(
              ride.startFloor,
              ride.destinationFloor,
              startFloor,
              destinationFloor,
              directionActualRide,
              directionPlannedRide
            )
          ) {
            ride.stops = insertNewStop(ride.stops, startFloor);
            ride.stops = insertNewStop(ride.stops, destinationFloor);
            addedToStops = true;
          }
        }
      });
      if (!addedToStops) {
        const ElevatorRidePickup: ElevatorRide = {
          startFloor: this.hasPlannedRide()
            ? this.elevatorRidesQueue[-1].destinationFloor
            : this.destinationFloor,
          destinationFloor: startFloor,
          stops: [],
        };
        const ElevatorRideDelivery: ElevatorRide = {
          startFloor: startFloor,
          destinationFloor: destinationFloor,
          stops: [],
        };
        this.elevatorRidesQueue.push(ElevatorRidePickup);
        this.elevatorRidesQueue.push(ElevatorRideDelivery);
      }
    }
  }

  public startRide() {
    if (this.elevatorRidesQueue.length > 0) {
      //@ts-ignore
      const newRide: ElevatorRide = this.elevatorRidesQueue.shift();
      this.destinationFloor = newRide.destinationFloor;
      this.stops = newRide.stops;
    }
  }

  public move() {
    if (!this.canMove) {
      this.canMove = this.canMove;
    } else {
      this.actualFloor =
        getDirection(this.actualFloor, this.destinationFloor) === "UP"
          ? this.actualFloor + 1
          : this.actualFloor - 1;
      if (this.stops[0] == this.actualFloor) {
        this.stops.shift();
        this.canMove = false;
      }
    }
  }

  public getNextStops() {
    let nextStops: Array<number> = [];

    this.stops.forEach((stop) => {
      nextStops.push(stop);
    });

    nextStops.push(this.destinationFloor);

    this.elevatorRidesQueue.forEach((ride) => {
      ride.stops.forEach((stop) => {
        nextStops.push(stop);
      });
    });

    if (nextStops.length > 0) {
      nextStops.shift();
    }

    return nextStops;
  };
}

export default Elevator;
