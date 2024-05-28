import { Plot } from "../plots/types";

export interface Interactor {
  init(plot: Plot): void;
}
