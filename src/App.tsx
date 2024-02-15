import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Coordinator } from "./pixi-manager";
import { generateRandomData } from "./utils";

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
      startX: 0,
      startY: 0,
      style: "different",
    });
    // Create the new plot
    const plotElement = document.getElementById("plot") as HTMLDivElement;
    plotElement.innerHTML = "";
    const newPlot = new Coordinator(500, 500, plotElement, setFps);

    newPlot.addPlot(data, { x: 10, y: 10, width: 480, height: 150 });
    // newPlot.addPlot(data, { x: 10, y: 170, width: 480, height: 150 });
    newPlot.addPixiPlot({ x: 10, y: 170, width: 200, height: 200 });

    newPlot.addPixiPlot({ x: 240, y: 170, width: 200, height: 200 });
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
      <h1>Minimal HiGlass Matrix</h1>
      <div className="card">
        <div className="desc">
          Current FPS:
          {lastFiveFps.current.length > 0 &&
            Math.min(...lastFiveFps.current).toFixed(0)}
        </div>
        <div className="card" id="plot"></div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
