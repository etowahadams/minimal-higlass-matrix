import { HeatmapTiledPixiTrack } from "./higlass/HeatmapTiledPixiTrack";
import {
  TiledPixiTrackContext,
  TiledPixiTrackOptions,
} from "./tiled-pixi-client";
import * as PIXI from "pixi.js";
import { fakePubSub } from "./higlass/utils";
import { scaleLinear } from "d3-scale";
import { createOverlayElement } from "./pixi-manager";

import { D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";

type HeatmapTrackContext = TiledPixiTrackContext & {
  svgElement: HTMLElement;
  onTrackOptionsChanged: () => void;
  onMouseMoveZoom?: (event: any) => void;
  isShowGlobalMousePosition?: () => boolean; // only used when options.showMousePosition is true
  isValueScaleLocked: () => boolean;
};

type HeatmapTrackOptions = TiledPixiTrackOptions & {
  dataTransform?: unknown;
  extent?: string;
  reverseYAxis?: boolean;
  showTooltip?: boolean;
  heatmapValueScaling?: string;
  colorRange?: unknown;
  showMousePosition?: boolean;
  scaleStartPercent?: unknown;
  scaleEndPercent?: unknown;
  labelPosition?: unknown;
  colorbarPosition?: string;
  colorbarBackgroundColor?: string;
  colorbarBackgroundOpacity?: number;
  zeroValueColor?: string;
  selectRowsAggregationMode?: string;
  selectRowsAggregationWithRelativeHeight?: unknown;
  selectRowsAggregationMethod?: unknown;
};

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

export class HeatmapClient extends HeatmapTiledPixiTrack {
    containerElement: HTMLElement;
  constructor(
    scene: PIXI.Container,
    containerElement: HTMLElement,
    size: { width: number; height: number; x: number; y: number },
    options: HeatmapTrackOptions
  ) {
    const plotDiv = createOverlayElement(size);
    containerElement.appendChild(plotDiv);
    const colorbarDiv = document.createElement("svg");
    plotDiv.appendChild(colorbarDiv);
    
    const context: HeatmapTrackContext = {
      scene,
      id: "test",
      dataConfig: {
        server: "http://higlass.io/api/v1",
        tilesetUid: "CQMd6V_cRw6iCI_-Unl3PQ",
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

    this.setDimensions([size.width, size.height]);
    this.setPosition([size.x, size.y]);
    const refXScale = scaleLinear()
      .domain([0, 3088269832])
      .range([0, size.width]);
    const refYScale = scaleLinear()
      .domain([0, 3088269832])
      .range([0, size.height]);
    this.zoomed(refXScale, refYScale, 1, size.x, size.y);
    this.refScalesChanged(refXScale, refYScale);

    // Attach zoom behavior to the canvas.
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      .on("zoom", this.handleZoom.bind(this));
    select<HTMLElement, unknown>(plotDiv).call(zoomBehavior);
  }

  handleZoom(event: D3ZoomEvent<HTMLElement, unknown>): void {
    // const transform = event.transform;
    // this.zoomed(this._refXScale, this._refYScale, transform.k, transform.x + this.position[0], transform.y + this.position[1]);
    const transform = event.transform;
    const newXScale = transform.rescaleX(this._refXScale);
    const newYScale = transform.rescaleY(this._refYScale);
    this.zoomed(
      newXScale,
      newYScale,
      transform.k,
      transform.x + this.position[0],
      transform.y + this.position[1]
    );
  }
}
