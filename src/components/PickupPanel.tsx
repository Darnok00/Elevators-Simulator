import React from "react";
import { useForm } from "react-hook-form";
import { ElevatorPickup } from "../utils/types";

type Props = {
  floorsNumberScope: Array<number>;
  elevatorPickup: (data: ElevatorPickup) => void;
};

const InitializePopup: React.FC<Props> = ({
  floorsNumberScope,
  elevatorPickup,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ElevatorPickup>();

  return (
    <>
      <div className="PickupContainer">
        <form onSubmit={handleSubmit(elevatorPickup)}>
          <label>
            <p>Start floor ({floorsNumberScope[0]} - {floorsNumberScope[1]}) </p>
            <input
              className="elemenetPickup"
              type="number"
              {...register("startFloor", {
                required: true,
                min: floorsNumberScope[0],
                max: floorsNumberScope[1],
              })}
            />
          </label>
          <br />
          <label>
            <p>Destination floor ({floorsNumberScope[0]} - {floorsNumberScope[1]}) </p>
            <input
              className="elemenetPickup"
              type="number"
              {...register("destinationFloor", {
                required: true,
                min: floorsNumberScope[0],
                max: floorsNumberScope[1],
              })}
            />
          </label>
          <br />
          <button className="elemenetPickup" type="submit">
            Pickup elevator
          </button>
        </form>
        {/* * <label>NUMBER ELEVATOR: {numberElevator}</label>
      <label>NUMBER Expected Time: {expectedTime}</label>  */}
      </div>
    </>
  );
};

export default InitializePopup;
