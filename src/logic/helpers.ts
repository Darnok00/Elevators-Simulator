export function getDirection(startFloor: number, destinationFloor: number) {
  return destinationFloor > startFloor ? "UP" : "DOWN";
}

export function getDiffrenceFloors(
  startFloor: number,
  destinationFloor: number
) {
  return Math.abs(startFloor - destinationFloor);
}

export function canBeAdditionalStop(
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
        destinationFloorAdditionalStop <= destinationFloor
      ) {
        return true;
      }
    }
  }
  return false;
}

export function numberStopsForScope(
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

export function insertNewStop(stops: Array<number>, stop: number) {
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

  if (stops[left-1] != stop) {
    stops.splice(left, 0, stop);
  }

  return stops;
}
