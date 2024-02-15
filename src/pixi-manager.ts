import * as PIXI from "pixi.js";
import { PlotClient } from "./plot-client";
import { zoom, D3ZoomEvent } from "d3-zoom";
import { select } from "d3-selection";
import { Data } from "./utils";
import { PixiClient } from "./pixi-client";
import { TiledPixiClient } from "./tiled-pixi-client";
import { HeatmapClient } from "./heatmap-client";
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

function createOverlayElement(position: {
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

export class Coordinator {
  private app: PIXI.Application<HTMLCanvasElement>;
  private plots: PlotClient[] = [];
  private container: HTMLDivElement;

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
    });
    this.container = container;
    container.appendChild(this.app.view);

    this.app.ticker.add(() => {
      fps(this.app.ticker.FPS);
    });
  }

  public addPlot(
    data: Data[],
    position: { x: number; y: number; width: number; height: number }
  ): void {
    const plotDiv = createOverlayElement(position);
    this.container.appendChild(plotDiv);
    const { width, height } = position;

    const plotGraphics = new PIXI.Graphics();
    plotGraphics.position.set(position.x, position.y);
    this.app.stage.addChild(plotGraphics);

    this.plots.push(
      new PlotClient(
        data,
        { width, height },
        plotGraphics,
        plotDiv,
        this.app.renderer
      )
    );
  }

  public addPixiPlot(position: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void {

    const plotDiv = createOverlayElement(position);
    this.container.appendChild(plotDiv);

    const container = new PIXI.Container();
    this.app.stage.addChild(container);

    new HeatmapClient(container, plotDiv, position, {trackBorderWidth: 1, trackBorderColor: "blue"});
  }

  public zoomed(event: D3ZoomEvent<HTMLElement, unknown>) {
    this.plots.forEach((plot) => plot.zoomed(event));
  }

  public scaleTo(scale: number, duration?: number): Promise<void> {
    const zoomTime = duration || 1500;
    const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
      .wheelDelta(wheelDelta)
      .on("zoom", this.zoomed.bind(this));

    const canvasElement = this.app.view;

    select<HTMLCanvasElement, unknown>(canvasElement)
      .transition()
      .duration(zoomTime)
      .call(zoomBehavior.scaleTo, scale);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, zoomTime);
    });
  }

  public destroy(): void {
    this.app.destroy();
  }
}
