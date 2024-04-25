import * as PIXI from "pixi-v8";
import { PlotClient } from "./plot-client-v8";
import { zoom, D3ZoomEvent } from "d3-zoom";
import { select } from "d3-selection";
import { Data } from "./utils";
// import { PixiClient } from "./pixi-client";
// import { TiledPixiClient } from "./tiled-pixi-client";
// import { HeatmapClient } from "./heatmap-client";
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
  private app: PIXI.Application;
  private plots: PlotClient[] = [];
  private containerElement: HTMLDivElement;
  hasInitialized: Promise<boolean>;

  constructor(
    width: number,
    height: number,
    container: HTMLDivElement,
    fps: (fps: number) => void
  ) {
    this.app = new PIXI.Application();
    this.containerElement = container;
    this.hasInitialized = this.initPixi(width, height, fps);
  }

  async initPixi(width: number, height: number, fps: (fps: number) => void) {
    await this.app.init({
      width,
      height,
      antialias: true,
      view: document.createElement("canvas"),
      backgroundColor: 0xffffff,
    });

    this.containerElement.innerHTML = "";
    this.containerElement.appendChild(this.app.canvas);

    // Add a ticker to display the current FPS
    this.app.ticker.add(() => {
      fps(this.app.ticker.FPS);
    });
    return true
  }

  public addPlot(
    data: Data[],
    position: { x: number; y: number; width: number; height: number },
    xSignal: Signal<ScaleLinear<number, number>>,
    ySignal: Signal<ScaleLinear<number, number>>
  ): void {
    const { width, height } = position;
    // Create the div overlay for the chart 
    const plotDiv = createOverlayElement(position);
    this.containerElement.appendChild(plotDiv);
    
    // Create a graphics element for the new plot to draw things to
    const plotGraphics = new PIXI.Graphics();
    plotGraphics.position.set(position.x, position.y);
    // Add the plot graphics to the main container
    this.app.stage.addChild(plotGraphics);

    this.plots.push(
      new PlotClient(
        data,
        { width, height },
        plotGraphics,
        plotDiv,
        this.app.renderer,
        xSignal,
        ySignal
      )
    );
  }

  // public addPixiPlot(position: {
  //   x: number;
  //   y: number;
  //   width: number;
  //   height: number;
  // }): void {
  //   const pContainer = new PIXI.Container();
  //   this.app.stage.addChild(pContainer);

  //   new HeatmapClient(pContainer, this.containerElement, position, {
  //     trackBorderWidth: 1,
  //     trackBorderColor: "black",
  //     colorbarPosition: "topRight",
  //   });
  // }

  // public zoomed(event: D3ZoomEvent<HTMLElement, unknown>) {
  //   this.plots.forEach((plot) => plot.zoomed(event));
  // }

  // public scaleTo(scale: number, duration?: number): Promise<void> {
  //   const zoomTime = duration || 1500;
  //   const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
  //     .wheelDelta(wheelDelta)
  //     .on("zoom", this.zoomed.bind(this));

  //   const canvasElement = this.app.view;

  //   select<HTMLCanvasElement, unknown>(canvasElement)
  //     .transition()
  //     .duration(zoomTime)
  //     .call(zoomBehavior.scaleTo, scale);

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, zoomTime);
  //   });
  // }

  // public destroy(): void {
  //   // this.app.destroy();
  // }
}