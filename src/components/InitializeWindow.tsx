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
    formState: {},
  } = useForm<SimulatorConstants>();

  return (
    <div className="InitializeContainer">
      <form onSubmit={handleSubmit(simulatorConstants)}>
        <label>
          <p>Number of floors (5 - 31)</p>
          <input
            className="elementInitialize"
            type="number"
            {...register("floorsNumber", {
              required: true,
              min: floorsNumberScope[0],
              max: floorsNumberScope[1],
            })}
          />
        </label>
        <br />
        <label>
          <p>Number of elevators( 1 - 16)</p>
          <input
            className="elementInitialize"
            type="number"
            {...register("elevatorsNumber", {
              required: true,
              min: elevatorsNumberScope[0],
              max: elevatorsNumberScope[1],
            })}
          />
        </label>
        <br />
        <label>
          <p>Timestep (1 - 10)</p>
          <input
            className="elementInitialize"
            type="number"
            {...register("timestep", {
              required: true,
              min: timestepScope[0],
              max: timestepScope[1],
            })}
          />
        </label>
        <br />
        <button className="elementInitialize" type="submit">
          Start Simulation
        </button>
      </form>
    </div>
  );
};

export default InitializeWindow;
