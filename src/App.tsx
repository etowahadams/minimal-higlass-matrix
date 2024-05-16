import { useState, useEffect } from "react";
import "./App.css";
import { PixiManager } from "./pixi-manager";
import { generateRandomData } from "./utils";
import { FpsPanel } from "./FpsPanel";
import { signal } from "@preact/signals-core";
import { Scatterplot } from "./scatterplot";
import { HeatmapClient } from "./heatmap";

function App() {
  const [fps, setFps] = useState(120);

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

  return (
    <>
      <h1>HiGlass/Gosling tracks with new renderer</h1>

      <div className="card">
        <FpsPanel fps={fps} />
        <div className="card" id="plot"></div>
      </div>
    </>
  );
}

export default App;
