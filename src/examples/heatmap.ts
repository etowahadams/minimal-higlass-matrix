import { type PixiManager } from "../pixi-manager";
import { HeatmapTrack } from "../heatmap";

export function addHeatmap(pixiManager: PixiManager) {
    // Let's add a heatmap
    const heatmapPosition = { x: 350, y: 30, width: 400, height: 400 };
    const { pixiContainer: heatmapContainer, overlayDiv: heatmapOverlayDiv } =
      pixiManager.makeContainer(heatmapPosition);
    new HeatmapTrack(heatmapContainer, heatmapOverlayDiv, {
      trackBorderWidth: 1,
      trackBorderColor: "black",
      colorbarPosition: "topRight",
    });
  }