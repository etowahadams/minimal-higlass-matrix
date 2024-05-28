import * as PIXI from "pixi.js";
import { scaleLinear } from "d3-scale";
import { effect, Signal } from "@preact/signals-core";
import { Plot } from "src/plots/types";
import { Interactor } from "./types";

/**
 * This interactor shows a cursor that follows the mouse
 */
export class Cursor implements Interactor {
  cursorPos: Signal<number>;
  constructor(cursorPos: Signal<number>) {
    this.cursorPos = cursorPos;
  }
  init(plot: Plot & { pMain: PIXI.Container }) {
    const baseScale = scaleLinear()
      .domain(plot.xDomain.value)
      .range([0, plot.domOverlay.clientWidth]);

    const cursor = new PIXI.Graphics();
    cursor.lineStyle(1, "black", 1);
    cursor.moveTo(0, 0);
    cursor.lineTo(0, plot.domOverlay.clientHeight);
    plot.pMain.addChild(cursor);

    // This function will be called every time the user moves the mouse
    const moveCursor = (event: MouseEvent) => {
      // Move the cursor to the mouse position
      cursor.position.x = event.offsetX;
      // Calculate the genomic position of the cursor
      const newScale = baseScale.domain(plot.xDomain.value);
      const genomicPos = newScale.invert(event.offsetX);
      this.cursorPos.value = genomicPos;
    }
    plot.domOverlay.addEventListener("mousemove", moveCursor.bind(this));
    plot.domOverlay.addEventListener("mouseleave", () => {
      this.cursorPos.value = -10; // TODO: set cursor visibility to false instead
    });

    // Every time the domain gets changed we want to update the cursor
    effect(() => {
      const newScale = baseScale.domain(plot.xDomain.value);
      cursor.position.x = newScale(this.cursorPos.value);
    });
  }
}
