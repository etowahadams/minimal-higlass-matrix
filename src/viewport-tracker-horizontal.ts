import {
  ViewportTrackerHorizontal,
  type ViewportTrackerHorizontalContext,
  type ViewportTrackerHorizontalOptions,
} from "@higlass/tracks";
import * as PIXI from "pixi.js";
import { ScaleLinear, scaleLinear } from "d3-scale";
import { ZoomTransform } from "d3-zoom";

import { D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";
import { type Signal, effect } from "@preact/signals-core";

// Default d3 zoom feels slow so we use this instead
// https://d3js.org/d3-zoom#zoom_wheelDelta
function wheelDelta(event: WheelEvent) {
  const defaultMultiplier = 5;
  return (
    -event.deltaY *
    (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) *
    (event.ctrlKey ? 10 : defaultMultiplier)
  );
}

export class ViewportTrackerHorizontalTrack extends ViewportTrackerHorizontal<ViewportTrackerHorizontalOptions> {
  xDomain: Signal<number[]>;
  zoomStartScale = scaleLinear();
  #element: HTMLElement;

  constructor(
    options: ViewportTrackerHorizontalOptions,
    xDomain: Signal<number[]>,
    containers: {
      pixiContainer: PIXI.Container;
      overlayDiv: HTMLElement;
    }
  ) {
    const { pixiContainer, overlayDiv } = containers;
    const height = overlayDiv.clientHeight;
    const width = overlayDiv.clientWidth;
    // The colorbar svg element isn't quite working yet
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.style.width = width + "px";
    svgElement.style.height = height + "px";
    overlayDiv.appendChild(svgElement);

    // Setup the context object
    const context: ViewportTrackerHorizontalContext = {
      id: "test",
      svgElement: svgElement,
      getTheme: () => "light",
      registerViewportChanged: (
        uid: string,
        callback: (
          viewportXScale: ScaleLinear<number, number>,
          viewportYScale: ScaleLinear<number, number>
        ) => void
      ) => {
        console.warn("registerViewportChanged not implemented");
      },
      removeViewportChanged: (uid: string) =>
        console.warn("removeViewportChanged not implemented"),
      setDomainsCallback: (
        xDomain: [number, number],
        yDomain: [number, number]
      ) => console.warn("setDomainsCallback not implemented", xDomain, yDomain),
      projectionXDomain: [543317951, 544039951],
    };

    super(context, options);

    this.xDomain = xDomain;
    this.#element = overlayDiv;
    // Now we need to initialize all of the properties that would normally be set by HiGlassComponent
    this.setDimensions([width, height]);
    this.setPosition([0, 0]);
    // Create some scales to pass in
    const refXScale = scaleLinear().domain(xDomain.value).range([0, width]);
    const refYScale = scaleLinear(); // This doesn't get used anywhere but we need to pass it in
    // Set the scales
    this.zoomed(refXScale, refYScale);
    this.refScalesChanged(refXScale, refYScale);
    this.draw();

    // Add the zoom
    this.#addZoom();
  }

  #addZoom(): void {
    const baseScale = scaleLinear()
      .domain(this.xDomain.value)
      .range([0, this.#element.clientWidth]);

    // This function will be called every time the user zooms
    const zoomed = (event: D3ZoomEvent<HTMLElement, unknown>) => {
      const newXDomain = event.transform.rescaleX(this.zoomStartScale).domain();
      this.xDomain.value = newXDomain;
    };

    // Create the zoom behavior
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      // @ts-expect-error We need to reset the transform when the user stops zooming
      .on("end", () => (this.#element.__zoom = new ZoomTransform(1, 0, 0)))
      .on("start", () => {
        this.zoomStartScale
          .domain(this.xDomain.value)
          .range([0, this.#element.clientWidth]);
      })
      .on("zoom", zoomed.bind(this));

    // Apply the zoom behavior to the overlay div
    select<HTMLElement, unknown>(this.#element).call(zoomBehavior);

    // Every time the domain gets changed we want to update the zoom
    effect(() => {
      const newScale = baseScale.domain(this.xDomain.value);
      this.zoomed(newScale, this._refYScale);
    });
  }
}
