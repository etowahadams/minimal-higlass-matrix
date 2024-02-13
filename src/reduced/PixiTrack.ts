import * as PIXI from "pixi.js";
import { ScaleLinear, scaleLinear } from "d3-scale";

class PixiTrack {
  xScale = scaleLinear();
  yScale = scaleLinear();
  height: number;
  width: number;

  scene: PIXI.Container;
  pBase = new PIXI.Graphics();
  pMasked = new PIXI.Graphics();
  pMask = new PIXI.Graphics();
  pMain = new PIXI.Graphics();
  pBorder = new PIXI.Graphics();
  pBackground = new PIXI.Graphics();
  pForeground = new PIXI.Graphics();
  pLabel = new PIXI.Graphics();
  pMobile = new PIXI.Graphics();
  pAxis = new PIXI.Graphics();
  pMouseOver = new PIXI.Graphics();

  constructor(
    scene: PIXI.Container,
    dimensions: { width: number; height: number }
  ) {
    this.height = dimensions.height;
    this.width =  dimensions.width;
    this.xScale.range([0, this.width]);
    this.yScale.range([0, this.height]);

    // the PIXI drawing areas
    this.scene = scene;
    this.scene.addChild(this.pBase);
    this.pBase.addChild(this.pMasked);
    this.pMasked.addChild(this.pBackground);
    this.pMasked.addChild(this.pMain);
    this.pMasked.addChild(this.pMask);
    this.pMasked.addChild(this.pMobile);
    this.pMasked.addChild(this.pBorder);
    this.pMasked.addChild(this.pLabel);
    this.pMasked.addChild(this.pForeground);
    this.pMasked.addChild(this.pMouseOver);
    this.pBase.addChild(this.pAxis);
    this.pMasked.mask = this.pMask;

    this.setMask();
    this.drawBorder();
  }

  zoomed(
    newXScale: ScaleLinear<number, number>,
    newYScale: ScaleLinear<number, number>
  ) {
    this.xScale = newXScale;
    this.yScale = newYScale;
  }

  setMask() {
    this.pMask.clear();
    this.pMask.beginFill();

    this.pMask.drawRect(0, 0, this.width, this.height);
    this.pMask.endFill();
  }

  /**
   * Draw a border around each track.
   */
  drawBorder(): void {
    this.pBorder.clear();
    this.pBorder.lineStyle(1, 0x000000); // Change the color to black
    this.pBorder.drawRect(0, 0, this.width, this.height);
  }

  /**
   * Draw all the data associated with this track
   */
  draw() {}
}

export default PixiTrack;
