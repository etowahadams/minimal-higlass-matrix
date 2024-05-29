import {
  ViewportTrackerHorizontal,
  type ViewportTrackerHorizontalContext,
  type ViewportTrackerHorizontalOptions,
} from "@higlass/tracks";
import { scaleLinear } from "d3-scale";
import { type Signal, effect, signal } from "@preact/signals-core";

export class BrushLinearTrack extends ViewportTrackerHorizontal<ViewportTrackerHorizontalOptions> {
  xDomain: Signal<[number, number]>;
  xBrushDomain: Signal<[number, number]>;
  domOverlay: HTMLElement; 

  constructor(
    options: ViewportTrackerHorizontalOptions,
    xBrushDomain: Signal<[number, number]>,
    domOverlay: HTMLElement,
    xDomain = signal<[number, number]>([0, 3088269832]) // Default domain
  ) {
    const height = domOverlay.clientHeight;
    const width = domOverlay.clientWidth;
    // Create a new svg element. The brush will be drawn on this element
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.style.width = width + "px";
    svgElement.style.height = height + "px";
    // Add it to the overlay div
    domOverlay.appendChild(svgElement);

    // Setup the context object
    const context: ViewportTrackerHorizontalContext = {
      id: "test",
      svgElement: svgElement,
      getTheme: () => "light",
      registerViewportChanged: () => {},
      removeViewportChanged: () => {},
      setDomainsCallback: (xDomain: [number, number]) =>
        (xBrushDomain.value = xDomain),
      projectionXDomain: xBrushDomain.value,
    };

    super(context, options);

    this.xDomain = xDomain;
    this.xBrushDomain = xBrushDomain;
    this.domOverlay = domOverlay;
    // Now we need to initialize all of the properties that would normally be set by HiGlassComponent
    this.setDimensions([width, height]);
    this.setPosition([0, 0]);
    // Create some scales to pass in
    const refXScale = scaleLinear().domain(xDomain.value).range([0, width]);
    const refYScale = scaleLinear(); // This doesn't get used anywhere but we need to pass it in
    // Set the scales
    this.zoomed(refXScale, refYScale);
    this.refScalesChanged(refXScale, refYScale);
    // Draw and add the zoom behavior
    this.draw();

    // When the brush signal changes, we want to update the brush
    effect(() => {
      const newXDomain = scaleLinear().domain(this.xBrushDomain.value);
      this.viewportChanged(newXDomain, scaleLinear());
    });
  }

  addInteractor(interactor: (plot: BrushLinearTrack) => void) {
    interactor(this);
    return this; // For chaining
  }
}