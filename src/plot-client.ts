import * as PIXI from "pixi.js";
import { scaleLinear, type ScaleLinear } from "d3-scale";
import { D3ZoomEvent, zoom } from "d3-zoom";
import { select } from "d3-selection";

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
  const defaultMultiplier = 5;
  return (
    -event.deltaY *
    (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) *
    (event.ctrlKey ? 10 : defaultMultiplier)
  );
}

export class PlotClient {
  private pMain: PIXI.Graphics;
  private pBorder: PIXI.Graphics;
  private data: Data[] = [];
  private xScale: ScaleLinear<number, number> = scaleLinear();
  private yScale: ScaleLinear<number, number> = scaleLinear();
  private circles: PIXI.Sprite[] = [];
  private renderer: PIXI.IRenderer<HTMLCanvasElement>;
  private width: number;
  private height: number;

  constructor(
    data: Data[],
    size: { width: number; height: number },
    pGraphics: PIXI.Graphics,
    element: HTMLElement,
    renderer: PIXI.IRenderer<HTMLCanvasElement>
  ) {
    this.width = size.width;
    this.height = size.height;

    // Create a graphics object to define our mask
    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this.width, this.height);
    mask.endFill();
    // Add container that will hold our masked content
    const maskContainer = new PIXI.Container();
    maskContainer.mask = mask;
    maskContainer.addChild(mask);

    this.pMain = new PIXI.Graphics();
    this.pBorder = new PIXI.Graphics();
    maskContainer.addChild(this.pMain);
    maskContainer.addChild(this.pBorder);
    pGraphics.addChild(maskContainer);


    this.drawBorder();

    this.renderer = renderer;

    // Attach zoom behavior to the canvas.
    const zoomBehavior = zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      .on("zoom", this.zoomed.bind(this));
    select<HTMLElement, unknown>(element).call(zoomBehavior);

    this.data = data; // You can specify the number of points you want
    this.createCircles();
    this.drawData();
  }

  private createCircles(): void {
    const multiplier = 2;
    this.circles = this.data.map((point) => {
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
      this.pMain.addChild(circle);
      return circle;
    });
  }

  private drawData(): void {
    // Draw the points again
    this.data.forEach((point, i) => {
      const scaledX = this.xScale(point.x);
      const scaledY = this.yScale(point.y);
      if (!this.isPointVisisble(scaledX, scaledY)) {
        this.circles[i].visible = false;
        return;
      }
      this.circles[i].visible = true;
      this.circles[i].position.set(scaledX, scaledY);
    });
  }

  private drawBorder(): void {
    this.pBorder.clear();
    this.pBorder.lineStyle(1, 0x000000); // Change the color to black
    this.pBorder.drawRect(0, 0, this.width, this.height);
  }

  private isPointVisisble(x: number, y: number): boolean {
    return x >= -10 && x <= this.width && y >= -10 && y <= this.height + 10;
  }

  public zoomed(event: D3ZoomEvent<HTMLElement, unknown>): void {
    const transform = event.transform;
    this.xScale = transform.rescaleX(scaleLinear());
    this.yScale = transform.rescaleY(scaleLinear());
    // Redraw the data using the updated scales
    this.drawData();
  }
}
