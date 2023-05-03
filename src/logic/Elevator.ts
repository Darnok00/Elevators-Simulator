import { ElevatorRide } from "../types/types";

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

  public isGoing() {
    return this.actualFloor != this.destinationFloor;
  }

  public hasPlannedRide() {
    return this.elevatorRidesQueue.length > 0;
  }

  public getDirection(startFloor: number, destinationFloor: number) {
    return destinationFloor > startFloor ? "UP" : "DOWN";
  }

  private getDiffrenceFloors(startFloor: number, destinationFloor: number) {
    return Math.abs(startFloor - destinationFloor);
  }

  private canBeAdditionalStop(
    actualFloor: number,
    destinationFloor: number,
    startFloorAdditionalStop: number,
    destinationFloorAdditionalStop: number,
    directionActualRide: string,
    directionPlannedRide: string
  ) {
    if (directionActualRide == directionPlannedRide) {
      if (directionActualRide === "DOWN") {
        if (
          startFloorAdditionalStop <= actualFloor &&
          destinationFloorAdditionalStop >= destinationFloor
        ) {
          return true;
        }
      } else {
        if (
          startFloorAdditionalStop >= actualFloor &&
          destinationFloor <= this.destinationFloor
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private numberStopsForScope(
    startFloor: number,
    destinationFloor: number,
    stops: Array<number>,
    direction: string
  ) {
    return stops.filter(function (stop) {
      if (direction === "DOWN") {
        if (startFloor > stop && destinationFloor < stop) {
          return stop;
        }
      } else {
        if (startFloor < stop && destinationFloor > stop) {
          return stop;
        }
      }
    }).length;
  }

  public getExpectedTimeArrival(startFloor: number, destinationFloor: number) {
    let totalTime = 0;

    if (!this.isGoing && !this.hasPlannedRide) {
      return this.getDiffrenceFloors(this.actualFloor, destinationFloor) + 2;
    }

    if (this.isGoing()) {
      const directionActualRide = this.getDirection(
        this.actualFloor,
        this.destinationFloor
      );
      const directionPlannedRide = this.getDirection(
        startFloor,
        destinationFloor
      );

      if (
        this.canBeAdditionalStop(
          this.actualFloor,
          this.destinationFloor,
          startFloor,
          destinationFloor,
          directionActualRide,
          directionPlannedRide
        )
      ) {
        return (
          this.getDiffrenceFloors(this.actualFloor, destinationFloor) +
          this.numberStopsForScope(
            this.actualFloor,
            destinationFloor,
            this.stops,
            directionActualRide
          ) +
          2
        );
      }
      totalTime +=
        this.getDiffrenceFloors(this.actualFloor, this.destinationFloor) +
        this.numberStopsForScope(
          this.actualFloor,
          this.destinationFloor,
          this.stops,
          directionActualRide
        ) +
        1;
    }

    if (this.hasPlannedRide()) {
      this.elevatorRidesQueue.forEach((ride) => {
        const directionActualRide = this.getDirection(
          ride.startFloor,
          ride.destinationFloor
        );
        const directionAdditionalRide = this.getDirection(
          startFloor,
          destinationFloor
        );
        if (
          this.canBeAdditionalStop(
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
            this.getDiffrenceFloors(ride.startFloor, destinationFloor) +
            this.numberStopsForScope(
              ride.startFloor,
              ride.destinationFloor,
              ride.stops,
              directionActualRide
            ) +
            2
          );
        }
        totalTime +=
          this.getDiffrenceFloors(ride.startFloor, ride.destinationFloor) +
          this.numberStopsForScope(
            ride.startFloor,
            ride.destinationFloor,
            ride.stops,
            directionActualRide
          ) +
          1;
      });
    }
    totalTime +=
      this.getDiffrenceFloors(
        this.elevatorRidesQueue[-1].destinationFloor,
        startFloor
      ) + this.getDiffrenceFloors(startFloor, destinationFloor);

    return totalTime;
  }

  private insertNewStop(stops: Array<number>, stop: number) {
    let left = 0;
    let right = stops.length - 1;

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      if (stop < stops[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }

    if (stops[left] != stop) {
      stops.splice(left, 0, stop);
    }

    return stops;
  }

  public addRide(startFloor: number, destinationFloor: number) {
    const directionActualRide = this.getDirection(
      this.actualFloor,
      this.destinationFloor
    );
    const directionPlannedRide = this.getDirection(
      startFloor,
      destinationFloor
    );

    if (
      this.canBeAdditionalStop(
        this.actualFloor,
        this.destinationFloor,
        startFloor,
        destinationFloor,
        directionActualRide,
        directionPlannedRide
      )
    ) {
      this.stops = this.insertNewStop(this.stops, startFloor);
      this.stops = this.insertNewStop(this.stops, destinationFloor);
    } else {
      let addedToStops = false;
      this.elevatorRidesQueue.forEach((ride) => {
        if (!addedToStops) {
          const directionActualRide = this.getDirection(
            ride.startFloor,
            ride.destinationFloor
          );

          if (
            this.canBeAdditionalStop(
              ride.startFloor,
              ride.destinationFloor,
              startFloor,
              destinationFloor,
              directionActualRide,
              directionPlannedRide
            )
          ) {
            ride.stops = this.insertNewStop(ride.stops, startFloor);
            ride.stops = this.insertNewStop(ride.stops, destinationFloor);
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
        this.getDirection(this.actualFloor, this.destinationFloor) === "UP"
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
