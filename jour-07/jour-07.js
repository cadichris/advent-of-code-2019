import { ordinateur } from "../jour-05/jour-05";
import { inputValues } from "../jour-05/operations";

export function amplifier(phases, programme) {
  return phases.reduce((outputPrecedent, phase) => {
    const output = [];
    const recordOutput = o => output.push(o);

    ordinateur(programme).executer({
      inputs: inputValues([phase, outputPrecedent]),
      outputFn: recordOutput
    });

    return output.pop();
  }, 0);
}

export function signalMax(combinaisonsPhases, programme) {
  return combinaisonsPhases.reduce(
    (max, phases) => Math.max(amplifier(phases, programme), max),
    0
  );
}
