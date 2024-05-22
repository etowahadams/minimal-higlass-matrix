import * as PIXI from "pixi.js";

/**
 * A wrapper class for PIXI.Application
 */
export class PixiManager {
  app: PIXI.Application<HTMLCanvasElement>;
  containerElement: HTMLDivElement;

  constructor(
    width: number,
    height: number,
    container: HTMLDivElement,
    fps: (fps: number) => void
  ) {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width,
      height,
      antialias: false, // When this is true, rendering is slower
      view: document.createElement("canvas"),
      backgroundColor: 0xffffff,
      eventMode: "static",
      eventFeatures: {
        move: false,
        globalMove: false,
        click: false,
        wheel: false,
      },
    });

    this.containerElement = container;
    container.appendChild(this.app.view);
    // Add FPS counter
    this.app.ticker.add(() => {
      fps(this.app.ticker.FPS);
    });
  }

  /**
   * Returns a PIXI container and an overlay div for a given position
   * @param position 
   * @returns 
   */
  makeContainer(position: {
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

  destroy(): void {
    this.app.destroy();
  }
}

/**
 * Creates an absolute positioned div element
 * @param position 
 * @returns 
 */
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
