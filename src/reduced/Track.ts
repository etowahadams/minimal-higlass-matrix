import { ScaleLinear, scaleLinear } from "d3-scale";

/**
 * Check if a 2D or 1D point is within a rectangle or range
 * @param {number} x - The point's X coordinate.
 * @param {number} y - The point's Y coordinate.
 * @param {number} minX - The rectangle's start X coordinate.
 * @param {number} maxX - The rectangle's end X coordinate.
 * @param {number} minY - The rectangle's start Y coordinate.
 * @param {number} maxY - The rectangle's end Y coordinate.
 * @param {boolean} is1d - If `true`, the check is performed in 1D. Default is `false`.
 * @return {boolean} If `true`, the [x,y] point is in the rectangle.
 */
const isWithin = (
  x: number,
  y: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  is1d: boolean = false
): boolean =>
  is1d
    ? (x >= minX && x <= maxX) || (y >= minY && y <= maxY)
    : x >= minX && x <= maxX && y >= minY && y <= maxY;


export class Track {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  position: [number, number];
  dimensions: [number, number];
  constructor() {
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();

    this.position = [0, 0];
    this.dimensions = [1, 1];

  }

  /**
   * Check if a 2D point is within the bounds of this track.
   * @param {number} x - The point's X coordinate.
   * @param {number} y - The point's Y coordinate.
   * @return {boolean} If `true`, the [x,y] point is within the track.
   */
  isWithin(x: number, y: number): boolean {
    const xx = x;
    const yy = y;
    const left = this.position[0];
    const top = this.position[1];

    return isWithin(
      xx,
      yy,
      left,
      this.dimensions[0] + left,
      top,
      this.dimensions[1] + top
    );
  }


  /** @param {[number, number]} newDimensions */
  setDimensions(newDimensions: [number, number]) {
    this.dimensions = newDimensions;

    this.xScale.range([0, this.dimensions[0]]);
    this.yScale.range([0, this.dimensions[1]]);
  }


  zoomed(newXScale: ScaleLinear<number, number>, newYScale: ScaleLinear<number, number>) {
    this.xScale = (newXScale);
    this.yScale = (newYScale);
  }

  draw() {}

  rerender() {}

}

export default Track;
