import * as PIXI from "pixi.js";
import { scaleLinear, type ScaleLinear } from "d3-scale";
import { D3ZoomEvent, zoom, ZoomTransform } from "d3-zoom";
import { select } from "d3-selection";
import { signal, effect, type Signal } from "@preact/signals-core";

// temporary fix https://stackoverflow.com/a/54020925
// @types/d3-select does not have the right version of d3-transition
import { transition as d3Transition } from "d3-transition";
import { Data } from "./utils";
select.prototype.transition = d3Transition;

const generateCircleTexture = (
  renderer: PIXI.IRenderer<HTMLCanvasElement>,
  radius: number,
  color: string
) => {
  const tileSize = radius * 3;
  const renderTexture = PIXI.RenderTexture.create({
    height: tileSize,
    width: tileSize,
  });

  const circle = new PIXI.Graphics();
  const pixiColor = new PIXI.Color(color);
  circle.lineStyle(1, 0x000000);
  circle.beginFill(pixiColor); // Change color to blue (0x0000ff)
  circle.drawCircle(tileSize / 2, tileSize / 2, radius);
  circle.endFill();

  renderer.render(circle, { renderTexture });

  return renderTexture;
};

// Default d3 zoom feels slow so we use this instead
// https://d3js.org/d3-zoom#zoom_wheelDelta
function wheelDelta(event: WheelEvent) {
  const defaultMultiplier = 4;
  return (
    -event.deltaY *
    (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) *
    (event.ctrlKey ? 10 : defaultMultiplier)
  );
}

/**
 * Helper function to create a masked container
 */
function createMaskedContainer(width: number, height: number) {
  // Create a graphics object to define our mask
  const mask = new PIXI.Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(0, 0, width, height);
  mask.endFill();
  // Add container that will hold our masked content
  const maskContainer = new PIXI.Container();
  maskContainer.mask = mask;
  maskContainer.addChild(mask);
  return maskContainer;
}

export class Scatterplot {
  #pMain: PIXI.Graphics;
  #pBorder: PIXI.Graphics;
  #data: Data[] = [];
  #xScale: ScaleLinear<number, number> = scaleLinear();
  #yScale: ScaleLinear<number, number> = scaleLinear();
  circles: PIXI.Sprite[] = [];
  renderer: PIXI.IRenderer<HTMLCanvasElement>;
  width: number;
  height: number;
  #xDomain: Signal<number[]>;
  #yDomain: Signal<number[]>;
  #element: HTMLElement;

  constructor(
    data: Data[],
    pContainer: PIXI.Container,
    overlayDiv: HTMLElement,
    renderer: PIXI.IRenderer<HTMLCanvasElement>,
    xDomain: Signal<number[]> = signal([0, 1]),
    yDomain: Signal<number[]> = signal([0, 1])
  ) {
    this.#element = overlayDiv;
    this.width = overlayDiv.clientWidth;
    this.height = overlayDiv.clientHeight;
    this.#xDomain = xDomain;
    this.#yDomain = yDomain;
    this.renderer = renderer;
    this.#data = data;

    // Create a graphics object to define our mask
    const maskedContainer = createMaskedContainer(this.width, this.height);

    this.#pMain = new PIXI.Graphics();
    this.#pBorder = new PIXI.Graphics();
    maskedContainer.addChild(this.#pMain);
    maskedContainer.addChild(this.#pBorder);
    pContainer.addChild(maskedContainer);

    this.drawBorder();
    this.createCircles();
    this.drawData();

    this.#addZoom();
  }

  private createCircles(): void {
    const multiplier = 2;
    this.circles = this.#data.map((point) => {
      const circleTexture = generateCircleTexture(
        this.renderer,
        point.size * multiplier,
        point.color
      );
      const circle = new PIXI.Sprite(circleTexture);
      // const color = new PIXI.Color(point.color);
      // circle.tint = color; // change the color
      circle.anchor.set(0.5);
      circle.scale.set(1 / multiplier);
      circle.position.x = point.x;
      circle.position.y = point.y;
      this.#pMain.addChild(circle);
      return circle;
    });
  }

  private drawData(): void {
    // Draw the points again
    effect(() => {
      const xScale = scaleLinear().domain(this.#xDomain.value);
      const yScale = scaleLinear().domain(this.#yDomain.value);

      this.#data.forEach((point, i) => {
        const scaledX = xScale(point.x);
        const scaledY = yScale(point.y);
        if (!this.isPointVisisble(scaledX, scaledY)) {
          this.circles[i].visible = false;
          return;
        }
        this.circles[i].visible = true;
        this.circles[i].position.set(scaledX, scaledY);
      });
    });
  }

  #addZoom(): void {
    const zoomed = (event: D3ZoomEvent<HTMLElement, unknown>) => {
      const transform = event.transform;

      const xdom = transform.rescaleX(this.#xScale).domain();
      const ydom = transform.rescaleY(this.#yScale).domain();

      this.#xDomain.value = xdom;
      this.#yDomain.value = ydom;
    };

    // Attach zoom behavior to the canvas.
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      // @ts-expect-error We need to reset the transform when the user stops zooming
      .on("end", () => (this.#element.__zoom = new ZoomTransform(1, 0, 0)))
      .on("start", () => {
        this.#xScale.domain(this.#xDomain.value);
        this.#yScale.domain(this.#yDomain.value);
      })
      .on("zoom", zoomed.bind(this));

    select<HTMLElement, unknown>(this.#element).call(zoomBehavior);
  }

  private drawBorder(): void {
    this.#pBorder.clear();
    this.#pBorder.lineStyle(1, 0x000000); // Change the color to black
    this.#pBorder.drawRect(0, 0, this.width, this.height);
  }

  private isPointVisisble(x: number, y: number): boolean {
    return x >= -10 && x <= this.width && y >= -10 && y <= this.height + 10;
  }
}