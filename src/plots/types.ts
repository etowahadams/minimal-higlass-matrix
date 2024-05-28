import { type Signal } from "@preact/signals-core";
import { Interactor } from "../interactors/types";

/**
 * This is the interface that plots must implement for Interactors to work
 */
export interface Plot {
  setAttribute(name: Attribute, value: unknown): void;
  addInteractor(interactor: Interactor): Plot;
  domOverlay: HTMLElement;
  xDomain: Signal<[number, number]>;
}

export enum Attribute {
  xDomain = "xDomain",
}
