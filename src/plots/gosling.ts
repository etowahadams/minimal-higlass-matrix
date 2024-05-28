import {
  GoslingTrackClass,
  GoslingTrackOptions,
  GoslingTrackContext,
} from "@gosling-lang/tracks/gosling-track";
import * as PIXI from "pixi.js";
import { fakePubSub } from "@higlass/utils";
import { scaleLinear } from "d3-scale";
import { type Signal } from "@preact/signals-core";
import { DataFetcher } from "@higlass/datafetcher";

import { Interactor } from "../interactors/types";
import { Plot, Attribute } from "./types";

export class GoslingTrack extends GoslingTrackClass implements Plot {
  xDomain: Signal<[number, number]>;
  zoomStartScale = scaleLinear();
  domOverlay: HTMLElement;

  constructor(
    options: GoslingTrackOptions,
    xDomain: Signal<[number, number]>,
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
      isShowGlobalMousePosition: () => false,
    };

    super(context, options);

    this.xDomain = xDomain;
    this.domOverlay = overlayDiv;
    // Now we need to initialize all of the properties that would normally be set by HiGlassComponent
    this.setDimensions([width, height]);
    this.setPosition([0, 0]);
    // Create some scales which span the whole genome
    const refXScale = scaleLinear().domain(xDomain.value).range([0, width]);
    const refYScale = scaleLinear(); // This doesn't get used anywhere but we need to pass it in
    // Set the scales
    this.zoomed(refXScale, refYScale);
    this.refScalesChanged(refXScale, refYScale);
  }

  addInteractor(interactor: Interactor) {
    interactor.init(this);
    return this; // For chaining
  }

  setAttribute(name: Attribute, value: unknown) {
    if (name === Attribute.xDomain) {
      const newScale = this._refXScale.domain(value);
      this.zoomed(newScale, this._refYScale);
    } else {
      console.warn(`Attribute ${name} is not supported`);
    }
  }
}
