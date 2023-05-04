import React from "react";
import { useForm } from "react-hook-form";
import { SimulatorConstants } from "../utils/types";
import {
  floorsNumberScope,
  elevatorsNumberScope,
  timestepScope,
} from "../utils/constants";

type Props = {
  simulatorConstants: (data: SimulatorConstants) => void;
};

const InitializeWindow: React.FC<Props> = ({ simulatorConstants }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulatorConstants>();

  return (
    <div className="InitializeContainer">
      <form onSubmit={handleSubmit(simulatorConstants)}>
        <label>
        <p>Number of floors:</p>
          <input
            className = "element"
            type="number"
            {...register("floorsNumber", {
              required: true,
              min: floorsNumberScope[0],
              max: floorsNumberScope[1],
            })}
          />
          {errors.floorsNumber && <p>Invalid number of floors.</p>}
        </label>
        <br/>
        <label>
          <p>Number of elevators:</p>
          <input
            className = "element"
            type="number"
            {...register("elevatorsNumber", {
              required: true,
              min: elevatorsNumberScope[0],
              max: elevatorsNumberScope[1],
            })}
          />
          {errors.elevatorsNumber && <p>Invalid number of elevators.</p>}
        </label>
        <br/>
        <label>
        <p>Timestep:</p>
          <input
            className = "element"
            type="number"
            {...register("timestep", {
              required: true,
              min: timestepScope[0],
              max: timestepScope[1],
            })}
          />
          {errors.timestep && <p>Invalid timestep.</p>}
        </label>
        <br/>
        <button className="element" type="submit">Start Simulation</button>
      </form>
    </div>
  );
};

export default InitializeWindow;
