import { Graphics } from "pixi.js";
import { PixiManager } from "../pixi-manager";
import { TextTrack } from "../plots/text";

export const titleOptions = {
  backgroundColor: "transparent",
  textColor: "black",
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: "Arial",
  offsetY: 0,
  align: "left",
  text: "Single-cell Epigenomic Analysis",
};

export const subtitleOptions = {
  backgroundColor: "transparent",
  textColor: "gray",
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: "Arial",
  offsetY: 0,
  align: "left",
  text: "Corces et al. 2020",
};

export function addTextTracks(pixiManager: PixiManager) {
  const posTitle = { x: 10, y: 10, width: 400, height: 50 };
  const { overlayDiv, pixiContainer } = pixiManager.makeContainer(posTitle);
  new TextTrack(titleOptions, { overlayDiv, pixiContainer });

  const posSubtitle = { x: 10, y: 60, width: 400, height: 50 };
  new TextTrack(subtitleOptions, pixiManager.makeContainer(posSubtitle));
}
