import { useState, useEffect } from "react";
import "./App.css";

import { PixiManager } from "./pixi-manager";
import { FpsPanel } from "./FpsPanel";

import { addCorces } from "./examples/corces/corces";
import { addGoslingTracks } from "./examples/ten-gosling-tracks";
// import { addScatterplots } from "./examples/coordinated-scatterplots";
import { addHeatmap } from "./examples/heatmap";
import { addViewEncoding } from "./examples/visual-encoding/visual-encoding";
import { addDummyTrack } from "./examples/dummy";
import { addTextTracks } from "./examples/text-tracks";

function App() {
  const [fps, setFps] = useState(120);

  useEffect(() => {
    // Create the new plot
    const plotElement = document.getElementById("plot") as HTMLDivElement;
    plotElement.innerHTML = "";

    // Initialize the PixiManager. This will be used to get containers and overlay divs for the plots
    const pixiManager = new PixiManager(1000, 600, plotElement, setFps);

    // addHeatmap(pixiManager);
    // addGoslingTracks(pixiManager);
    // addScatterplots(pixiManager);
    addCorces(pixiManager);
    // addViewEncoding(pixiManager);
    // addDummyTrack(pixiManager);
    // addTextTracks(pixiManager);
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
