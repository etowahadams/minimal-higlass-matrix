import { type Signal } from "@preact/signals-core";
import { ScaleLinear } from "d3-scale";

/**
 * This is the interface that plots must implement for Interactors to work
 */
export interface Plot {
  addInteractor(interactor: (plot: Plot) => void): Plot;
  domOverlay: HTMLElement;
  xDomain: Signal<[number, number]>;
  zoomed(xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>): void;
}