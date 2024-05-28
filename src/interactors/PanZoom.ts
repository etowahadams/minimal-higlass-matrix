import { type Signal, effect } from "@preact/signals-core";
import { Interactor } from "./types";
import { Plot, Attribute } from "../plots/types";
import { scaleLinear } from "d3-scale";
import { ZoomTransform, D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";
import { zoomWheelBehavior } from "../utils";

/**
 * This interactor allows the user to pan and zoom the plot
 */
export class PanZoom implements Interactor {
  xDomain: Signal<[number, number]>;

  constructor(xDomain: Signal<[number, number]>) {
    this.xDomain = xDomain;
  }
  init(plot: Plot) {
    // This will store the xDomain when the user starts zooming
    const zoomStartScale = scaleLinear();
    // This function will be called every time the user zooms
    const zoomed = (event: D3ZoomEvent<HTMLElement, unknown>) => {
      const newXDomain = event.transform.rescaleX(zoomStartScale).domain();
      this.xDomain.value = newXDomain as [number, number];
    };
    // Create the zoom behavior
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(zoomWheelBehavior)
      // @ts-expect-error We need to reset the transform when the user stops zooming
      .on("end", () => (plot.domOverlay.__zoom = new ZoomTransform(1, 0, 0)))
      .on("start", () => {
        zoomStartScale
          .domain(this.xDomain.value)
          .range([0, plot.domOverlay.clientWidth]);
      })
      .on("zoom", zoomed.bind(this));

    // Apply the zoom behavior to the overlay div
    select<HTMLElement, unknown>(plot.domOverlay).call(zoomBehavior);

    // Every time the domain gets changed we want to update the zoom
    effect(() => {
      plot.setAttribute(Attribute.xDomain, this.xDomain.value);
    });
  }
}
