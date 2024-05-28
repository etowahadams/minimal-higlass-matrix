import { type PixiManager } from "../pixi-manager";
import { Scatterplot } from "../plots/scatterplot";
import { signal } from "@preact/signals-core";
import { generateRandomData } from "../utils";

export function addScatterplots(pixiManager: PixiManager) {
    const xDom1 = signal([0, 1]);
    const yDom1 = signal([0, 1]);
    const xDom2 = signal([0, 1]);
    const yDom2 = signal([0, 1]);
  
    // Let's make a scatterplot
    const chartInfo = [
      {
        position: { x: 0, y: 10, width: 300, height: 300 },
        xDom: xDom1,
        yDom: yDom1,
      },
      {
        position: { x: 300, y: 10, width: 300, height: 300 },
        xDom: xDom1,
        yDom: yDom2,
      },
      {
        position: { x: 600, y: 10, width: 300, height: 300 },
        xDom: xDom2,
        yDom: yDom1,
      },
    ];
    const data = generateRandomData({
      count: 4000,
      maxX: 4000,
      maxY: 4000,
      startX: -2000,
      startY: -2000,
      style: "different",
    });
  
    chartInfo.forEach((info) => {
      const { pixiContainer, overlayDiv } = pixiManager.makeContainer(
        info.position
      );
      new Scatterplot(
        data,
        pixiContainer,
        overlayDiv,
        pixiManager.app.renderer,
        info.xDom,
        info.yDom
      );
    });
  }