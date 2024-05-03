import {
  GoslingTrackClass,
  GoslingTrackOptions,
  GoslingTrackContext,
} from "./gosling/gosling-track";
import * as PIXI from "pixi.js";
import { fakePubSub } from "./higlass/utils";
import { scaleLinear } from "d3-scale";

import { D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";
import { type ScaleLinear } from "d3-scale";
import { type Signal, effect } from "@preact/signals-core";
import { DataFetcher } from './higlass'

// type HeatmapTrackContext = TiledPixiTrackContext & {
//   svgElement: HTMLElement;
//   onTrackOptionsChanged: () => void;
//   onMouseMoveZoom?: (event: any) => void;
//   isShowGlobalMousePosition?: () => boolean; // only used when options.showMousePosition is true
//   isValueScaleLocked: () => boolean;
// };

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

export class GoslingTrack extends GoslingTrackClass {
  xSignal: Signal<ScaleLinear<number, number>>;

  constructor(
    options: GoslingTrackOptions,
    xSignal: Signal<ScaleLinear<number, number>>,
    dataFetcher: DataFetcher,
    containers: {
      pixiContainer: PIXI.Container;
      overlayDiv: HTMLElement;
    }
  ) {
    const { pixiContainer, overlayDiv } = containers;
    const height = overlayDiv.clientHeight;
    const width = overlayDiv.clientWidth;
    // The colorbar svg element isn't quite working yet
    const colorbarDiv = document.createElement("svg");
    overlayDiv.appendChild(colorbarDiv);

    // Setup the context object
    const context: GoslingTrackContext = {
      scene: pixiContainer,
      id: "test",
      dataFetcher,
      dataConfig: {
        server: "https://resgen.io/api/v1",
        tilesetUid: "UvVPeLHuRDiYA3qwFlm7xQ",
        // coordSystem: "hg19",
      },
      animate: () => {},
      onValueScaleChanged: () => {},
      handleTilesetInfoReceived: (tilesetInfo: any) => {},
      onTrackOptionsChanged: () => {},
      pubSub: fakePubSub,
      isValueScaleLocked: () => false,
      svgElement: colorbarDiv,
    };

    super(context, options);

    this.xSignal = xSignal;
    // Now we need to initialize all of the properties that would normally be set by HiGlassComponent
    this.setDimensions([width, height]);
    this.setPosition([0, 0]);
    // Create some scales which span the whole genome
    const refXScale = scaleLinear().domain([0, 3088269832]).range([0, width]);
    const refYScale = scaleLinear().domain([0, 3088269832]).range([0, height]);
    // Set the scales
    this.zoomed(refXScale, refYScale, 1, 0, 0);
    this.refScalesChanged(refXScale, refYScale);

    // Attach zoom behavior to the canvas.
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      .on("zoom", this.handleZoom.bind(this));
    select<HTMLElement, unknown>(overlayDiv).call(zoomBehavior);

    effect(() => {
      this.zoomed(this.xSignal.value, this._refYScale);
    });
  }

  /**
   * This function is called when the user zooms in or out.
   */
  handleZoom(event: D3ZoomEvent<HTMLElement, unknown>): void {
    const transform = event.transform;
    const newXScale = transform.rescaleX(this._refXScale);
    this.xSignal.value = newXScale;
  }
}
