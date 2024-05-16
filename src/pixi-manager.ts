import * as PIXI from "pixi.js";
import { Scatterplot } from "./scatterplot";
import { zoom, D3ZoomEvent } from "d3-zoom";
import { select } from "d3-selection";
import { Data } from "./utils";
// import { PixiClient } from "./pixi-client";
// import { TiledPixiClient } from "./tiled-pixi-client";
import { HeatmapClient } from "./heatmap";
import { type Signal } from "@preact/signals-core";
import { ScaleLinear } from "d3-scale";

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

export function createOverlayElement(position: {
  x: number;
  y: number;
  width: number;
  height: number;
}): HTMLDivElement {
  const overlay = document.createElement("div");

  overlay.style.position = "absolute";
  overlay.style.left = `${position.x}px`;
  overlay.style.top = `${position.y}px`;
  overlay.style.width = `${position.width}px`;
  overlay.style.height = `${position.height}px`;
  overlay.id = `overlay-${Math.random().toString(36).substring(7)}`; // Add random id

  return overlay;
}

export class PixiManager {
  app: PIXI.Application<HTMLCanvasElement>;
  private plots: Scatterplot[] = [];
  private containerElement: HTMLDivElement;

  constructor(
    width: number,
    height: number,
    container: HTMLDivElement,
    fps: (fps: number) => void
  ) {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width,
      height,
      antialias: true,
      view: document.createElement("canvas"),
      backgroundColor: 0xffffff,
      eventMode: "static",
      eventFeatures: {
        move: false,
        globalMove: false,
        click: true,
        wheel: false,
      },
    });
    this.containerElement = container;
    container.appendChild(this.app.view);

    this.app.ticker.add(() => {
      fps(this.app.ticker.FPS);
    });
  }

  getContainer(position: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): { pixiContainer: PIXI.Container; overlayDiv: HTMLDivElement } {
    const pContainer = new PIXI.Container();
    pContainer.position.set(position.x, position.y);
    this.app.stage.addChild(pContainer);

    const plotDiv = createOverlayElement(position);
    this.containerElement.appendChild(plotDiv);

    return { pixiContainer: pContainer, overlayDiv: plotDiv };
  }

  public addHeatmap(position: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void {
    const pContainer = new PIXI.Container();
    this.app.stage.addChild(pContainer);

    new HeatmapClient(pContainer, this.containerElement, position, {
      trackBorderWidth: 1,
      trackBorderColor: "black",
      colorbarPosition: "topRight",
    });
  }

  public destroy(): void {
    this.app.destroy();
  }
}
