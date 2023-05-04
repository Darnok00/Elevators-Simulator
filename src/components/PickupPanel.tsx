import React from "react";
import { useForm } from "react-hook-form";
import { ElevatorPickup } from "../utils/types";

type Props = {
  floorsNumberScope: Array<number>,
  elevatorPickup: (data: ElevatorPickup) => void;
};

const InitializePopup: React.FC<Props> = ({ floorsNumberScope, elevatorPickup}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ElevatorPickup>();

  return (
    <>
      <form onSubmit={handleSubmit(elevatorPickup)}>
        <label>
          Start floor:
          <input
            type="number"
            {...register("startFloor", {
              required: true,
              min: floorsNumberScope[0],
              max: floorsNumberScope[1],
            })}
          />
          {errors.startFloor && <p>Invalid number of floors.</p>}
        </label>
        <br />
        <label>
          Destination floor:
          <input
            type="number"
            {...register("destinationFloor", {
              required: true,
              min: floorsNumberScope[0],
              max: floorsNumberScope[1],
            })}
          />
          {errors.destinationFloor && <p>Invalid number of elevators.</p>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* * <label>NUMBER ELEVATOR: {numberElevator}</label>
      <label>NUMBER Expected Time: {expectedTime}</label>  */}
    </>
  );
};

export default InitializePopup;
