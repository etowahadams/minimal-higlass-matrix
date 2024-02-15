import { PixiTrack } from "./higlass/PixiTrack";
import * as PIXI from "pixi.js";

export interface PixiTrackContext {
  pubSub?: any;
  scene: PIXI.Container;
  id: string;
}

export interface PixiTrackOptions {
  labelPosition?: string;
  labelText?: string;
  trackBorderWidth?: number;
  trackBorderColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  lineStrokeColor?: string;
  barFillColor?: string;
  name?: string;
  labelTextOpacity?: number;
  labelBackgroundColor?: string;
  labelLeftMargin?: number;
  labelRightMargin?: number;
  labelTopMargin?: number;
  labelBottomMargin?: number;
  labelBackgroundOpacity?: number;
  labelShowAssembly?: boolean;
  labelShowResolution?: boolean;
  dataTransform?: string;
}

export class PixiClient extends PixiTrack {
  constructor(
    scene: PIXI.Container,
    size: { width: number; height: number; x: number; y: number },
    options: PixiTrackOptions
  ) {
    const context: PixiTrackContext = {
      scene,
      id: "test",
    };

    super(context, options);

    this.setDimensions([size.width, size.height]);
    this.setPosition([size.x, size.y]);
  }
}
