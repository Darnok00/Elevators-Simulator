import ElevatorsController from "../logic/ElevatorsController";

describe("Elevator Controller tests", () => {
  test("Add Pickup", () => {
    const elevatorsController = new ElevatorsController(4, 20, 1);
    elevatorsController.addPickup({ startFloor: 2, destinationFloor: 10 });
    const result = elevatorsController.getElevatorPickups();
    expect(result).toEqual([{ startFloor: 2, destinationFloor: 10 }]);
  });

  test("Assign pickups to elevators and get elevators status", () => {
    const elevatorsController = new ElevatorsController(2, 20, 1);
    elevatorsController.addPickup({ startFloor: 2, destinationFloor: 19 });
    elevatorsController.addPickup({ startFloor: 2, destinationFloor: 8 });
    elevatorsController.addPickup({ startFloor: 9, destinationFloor: 3 });
    elevatorsController.addPickup({ startFloor: 5, destinationFloor: 7 });
    elevatorsController.updateElevators();
    const result = elevatorsController.getElevatorsStatus();
    expect(result).toEqual([
      { actualFloor: 0, upcomingStop: 2, nextStops: [19] },
      { actualFloor: 0, upcomingStop: 2, nextStops: [5, 7, 8, 9, 3] },
    ]);
  });

  test("Update few time elvators and get elevators status", () => {
    const elevatorsController = new ElevatorsController(2, 20, 1);
    elevatorsController.addPickup({ startFloor: 2, destinationFloor: 19 });
    elevatorsController.addPickup({ startFloor: 2, destinationFloor: 8 });
    elevatorsController.addPickup({ startFloor: 9, destinationFloor: 3 });
    elevatorsController.addPickup({ startFloor: 5, destinationFloor: 7 });
    elevatorsController.updateElevators();
    elevatorsController.updateElevators();
    elevatorsController.updateElevators();
    elevatorsController.updateElevators();
    const result = elevatorsController.getElevatorsStatus();
    expect(result).toEqual([
      { actualFloor: 2, upcomingStop: 19, nextStops: [] },
      { actualFloor: 2, upcomingStop: 5, nextStops: [7, 8, 9, 3] },
    ]);
  });
});

export {};
