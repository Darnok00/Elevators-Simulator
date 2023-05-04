import React from "react";
import { useForm } from "react-hook-form";
import { SimulatorConstants } from "../utils/types";
import {floorsNumberScope, elevatorsNumberScope, timestepScope } from "../utils/constants"

type Props = {
  simulatorConstants: (data: SimulatorConstants) => void;
};

const InitializePopup: React.FC<Props> = (({simulatorConstants}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulatorConstants>();

  return (
    <form onSubmit={handleSubmit(simulatorConstants)}>
      <label>
        Number of floors:
        <input
          type="number"
          {...register("floorsNumber", {
            required: true,
            min: floorsNumberScope[0],
            max: floorsNumberScope[1],
          })}
        />
        {errors.floorsNumber && <p>Invalid number of floors.</p>}
      </label>
      <br />
      <label>
        Number of elevators:
        <input
          type="number"
          {...register("elevatorsNumber", {
            required: true,
            min: elevatorsNumberScope[0],
            max: elevatorsNumberScope[1],
          })}
        />
        {errors.elevatorsNumber && <p>Invalid number of elevators.</p>}
      </label>
      <br />
      <label>
        Timestep:
        <input
          type="number"
          {...register("timestep", {
            required: true,
            min: timestepScope[0],
            max: timestepScope[1],
          })}
        />
        {errors.timestep && <p>Invalid timestep.</p>}
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
});

export default InitializePopup;
