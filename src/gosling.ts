import {
  GoslingTrackClass,
  GoslingTrackOptions,
  GoslingTrackContext,
} from "@gosling-lang/tracks/gosling-track";
import * as PIXI from "pixi.js";
import { fakePubSub } from "./higlass/tracks/utils";
import { scaleLinear } from "d3-scale";
import { ZoomTransform } from "d3-zoom";

import { D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";
import { type Signal, effect, signal, computed } from "@preact/signals-core";
import { DataFetcher } from "@higlass/datafetchers";
import { zoomWheelBehavior } from "./utils";

export class GoslingTrack extends GoslingTrackClass {
  xDomain: Signal<number[]>;
  zoomStartScale = scaleLinear();
  #element: HTMLElement;

  constructor(
    options: GoslingTrackOptions,
    xDomain: Signal<number[]>,
    dataFetcher: DataFetcher,
    containers: {
      pixiContainer: PIXI.Container;
      overlayDiv: HTMLElement;
    },
    cursorPos?: Signal<number>
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
      isShowGlobalMousePosition: () => false,
    };

    super(context, options);

    this.xDomain = xDomain;
    this.#element = overlayDiv;
    // Now we need to initialize all of the properties that would normally be set by HiGlassComponent
    this.setDimensions([width, height]);
    this.setPosition([0, 0]);
    // Create some scales which span the whole genome
    const refXScale = scaleLinear().domain(xDomain.value).range([0, width]);
    const refYScale = scaleLinear(); // This doesn't get used anywhere but we need to pass it in
    // Set the scales
    this.zoomed(refXScale, refYScale);
    this.refScalesChanged(refXScale, refYScale);

    // Add the zoom
    this.#addZoom();
    // Add the cursor. Note we are currently ignoring the showMousePosition option
    if (cursorPos) this.#addCursor(cursorPos);
  }

  #addCursor(cursorPos: Signal<number>): void {
    const cursor = new PIXI.Graphics();
    cursor.lineStyle(1, "black", 1);
    cursor.moveTo(0, 0);
    cursor.lineTo(0, this.#element.clientHeight);
    this.pMain.addChild(cursor);

    // This function will be called every time the user moves the mouse
    function moveCursor(event: MouseEvent) {
      // Move the cursor to the mouse position
      cursor.position.x = event.offsetX;
      // Calculate the genomic position of the cursor
      const newScale = this._refXScale.domain(this.xDomain.value);
      const genomicPos = newScale.invert(event.offsetX);
      cursorPos.value = genomicPos;
    }
    this.#element.addEventListener("mousemove", moveCursor.bind(this));
    this.#element.addEventListener("mouseleave", () => {
      cursorPos.value = 0;
    });

    // Every time the domain gets changed we want to update the cursor
    effect(() => {
      const newScale = this._refXScale.domain(this.xDomain.value);
      cursor.position.x = newScale(cursorPos.value);
    });
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
      .wheelDelta(zoomWheelBehavior)
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
      const newScale = this._refXScale.domain(this.xDomain.value);
      this.zoomed(newScale, this._refYScale);
    });
  }
}
