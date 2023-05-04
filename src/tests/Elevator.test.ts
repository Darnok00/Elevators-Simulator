import Elevator from "../logic/Elevator";

describe("Elevator tests", () => {
  test("Add First Ride", () => {
    const elevator = new Elevator(1,20);
    elevator.addRide(3, 8);
    const result = elevator.getElevatorRidesQueue();
    expect(result).toEqual([
      {
        startFloor: 0,
        destinationFloor: 3,
        stops: [],
      },
      {
        startFloor: 3,
        destinationFloor: 8,
        stops: [],
      },
    ]);
  });

  test("Add Ride that should be added to  ride (in queue) stops", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.addRide(5, 7);
    const result = elevator.getElevatorRidesQueue();
    expect(result).toEqual([
      {
        startFloor: 0,
        destinationFloor: 3,
        stops: [],
      },
      {
        startFloor: 3,
        destinationFloor: 8,
        stops: [5, 7],
      },
    ]);
  });

  test("Start ride", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.addRide(5, 7);
    elevator.startRide();
    const destination = elevator.getDestinationFloor();
    const stops = elevator.getStops();
    const result = [destination, stops];
    expect(result).toEqual([3, []]);
  });

  test("Add Ride that should be added to actual stops", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.startRide();
    elevator.addRide(1, 2);
    const result = elevator.getStops();
    expect(result).toEqual([1, 2]);
  });

  test("Is Going", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.startRide();
    const result = elevator.isGoing();
    expect(result).toEqual(true);
  });

  test("Has Planned Ride", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.startRide();
    const result = elevator.hasPlannedRide();
    expect(result).toEqual(true);
  });

  test("Move without stop break", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 8);
    elevator.startRide();
    elevator.move();
    const result = elevator.getActualFloor();
    expect(result).toEqual(1);
  });

  test("Move with stop break", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 5);
    elevator.addRide(1, 2);
    elevator.startRide();
    elevator.move();
    elevator.move();
    const result = elevator.getActualFloor();
    expect(result).toEqual(1);
  });

  test("List next stops (without upcoming step)", () => {
    const elevator = new Elevator(1, 30);
    elevator.addRide(3, 5);
    elevator.addRide(1, 2);
    elevator.startRide();
    const result = elevator.getNextStops();
    expect(result).toEqual([2, 3, 5]);
  });

  test("Expected Time Arrival", () => {
    const elevator = new Elevator(1, 20);
    elevator.addRide(3, 5);
    elevator.addRide(7, 2);
    elevator.startRide();
    const result = elevator.getExpectedTimeArrival(6, 4);
    expect(result).toEqual(elevator.getExpectedTimeArrival(6, 4));
  });
});

export {};
