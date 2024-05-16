import { useState, useEffect, useRef } from "react";
import "./App.css";
import { PixiManager } from "./pixi-manager";
import { generateRandomData } from "./utils";
import { signal } from "@preact/signals-core";
import { ScaleLinear, scaleLinear } from "d3-scale";
import { Scatterplot } from "./scatterplot";
import { HeatmapClient } from "./heatmap";

function avg(arr: number[]) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

function App() {
  const [fps, setFps] = useState(120);
  const [minFps, setMinFps] = useState<number>();
  const lastFiveFps = useRef<number[]>([]);

  useEffect(() => {
    const data = generateRandomData({
      count: 4000,
      maxX: 4000,
      maxY: 4000,
      startX: -2000,
      startY: -2000,
      style: "different",
    });
    // Create the new plot
    const plotElement = document.getElementById("plot") as HTMLDivElement;
    plotElement.innerHTML = "";

    // Initialize the PixiManager. This will be used to get containers and overlay divs for the plots
    const pixiManager = new PixiManager(1000, 1000, plotElement, setFps);

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

    chartInfo.forEach((info) => {
      const { pixiContainer, overlayDiv } = pixiManager.getContainer(
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
  }, []);

  useEffect(() => {
    lastFiveFps.current.push(fps);
    // Look at a window of the last 5 fps values
    if (lastFiveFps.current.length > 5) {
      lastFiveFps.current.shift();
    }
    const avgFps = avg(lastFiveFps.current);
    if (minFps === undefined || avgFps < minFps) {
      setMinFps(avgFps);
    }
    // This dependency array is not ideal since fps will get added to recordedFps.current a few extra times
    // Minimal impact on accuracy though
  }, [fps, minFps]);

  return (
    <>
      <h1>HiGlass tracks using new renderer</h1>
      <div className="card">
        <div className="desc">
          Current FPS:
          {lastFiveFps.current.length > 0 &&
            Math.min(...lastFiveFps.current).toFixed(0)}
        </div>
        <div className="card" id="plot"></div>
      </div>
    </>
  );
}

export default App;
