import {getDiffrenceFloors, getDirection, canBeAdditionalStop, insertNewStop, numberStopsForScope} from "../logic/helpers";

describe("Elevator tests", () => {
  test("Get direction", () => {
    const result = getDirection(4, 2)
    expect(result).toEqual("DOWN");
  });

  test("Get diffrence between floors", () => {
    const result = getDiffrenceFloors(9, 22)
    expect(result).toEqual(13);
  });

  test("insert new stop", () => {
    const result = insertNewStop([9, 11, 12, 17, 22], 16);
    expect(result).toEqual([9, 11, 12, 16, 17, 22]);
  });

  test("insert new stop - repeat", () => {
    const result = insertNewStop([9, 11, 12, 17, 22], 17);
    expect(result).toEqual([9, 11, 12, 17, 22]);
  });

  test("Number stops for scope", () => {
    const result = numberStopsForScope(2, 9, [3,4,9], "UP");
    expect(result).toEqual(2);
  });

  test("Can be additional stops", () => {
    const result = canBeAdditionalStop(2,9,3,8,"UP", "UP");
    expect(result).toEqual(true);
  }); 


});

export {};
