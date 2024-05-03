import { useState, useEffect, useRef } from "react";
import "./App.css";
import { PixiManager } from "./pixi-manager";
import { generateRandomData } from "./utils";
import { signal } from "@preact/signals-core";
import { ScaleLinear, scaleLinear } from "d3-scale";
import { Scatterplot } from "./scatterplot";
import { HeatmapClient } from "./heatmap";
import { GoslingTrack } from "./gosling";
import { fakePubSub } from "./higlass/utils";
import { DataFetcher } from "./higlass";

const xSignal = signal<ScaleLinear<number, number>>(scaleLinear());
const ySignal = signal<ScaleLinear<number, number>>(scaleLinear());

function avg(arr: number[]) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

const gosOptions = {
  siblingIds: [],
  spec: {
    assembly: "hg38",
    layout: "linear",
    orientation: "horizontal",
    static: false,
    zoomLimits: [1, null],
    centerRadius: 0.3,
    spacing: 10,
    xOffset: 0,
    yOffset: 0,
    width: 800,
    height: 210,
    data: {
      url: "https://resgen.io/api/v1/tileset_info/?d=UvVPeLHuRDiYA3qwFlm7xQ",
      type: "multivec",
      row: "sample",
      column: "position",
      value: "peak",
      categories: ["sample 1"],
    },
    mark: "point",
    x: {
      field: "position",
      type: "genomic",
      axis: "bottom",
    },
    y: {
      field: "peak",
      type: "quantitative",
      axis: "right",
    },
    id: "6225512f-c647-4218-90c4-f6ea4ade1079",
    style: {},
    overlayOnPreviousTrack: false,
  },
  theme: {
    base: "light",
    root: {
      background: "white",
      titleColor: "black",
      titleBackgroundColor: "transparent",
      titleFontSize: 18,
      titleFontFamily: "Arial",
      titleAlign: "left",
      titleFontWeight: "bold",
      subtitleColor: "gray",
      subtitleBackgroundColor: "transparent",
      subtitleFontSize: 16,
      subtitleFontFamily: "Arial",
      subtitleFontWeight: "normal",
      subtitleAlign: "left",
      showMousePosition: true,
      mousePositionColor: "#000000",
    },
    track: {
      background: "transparent",
      alternatingBackground: "transparent",
      titleColor: "black",
      titleBackground: "white",
      titleFontSize: 24,
      titleAlign: "left",
      outline: "black",
      outlineWidth: 1,
    },
    legend: {
      position: "top",
      background: "white",
      backgroundOpacity: 0.7,
      labelColor: "black",
      labelFontSize: 12,
      labelFontWeight: "normal",
      labelFontFamily: "Arial",
      backgroundStroke: "#DBDBDB",
      tickColor: "black",
    },
    axis: {
      tickColor: "black",
      labelColor: "black",
      labelMargin: 5,
      labelExcludeChrPrefix: false,
      labelFontSize: 12,
      labelFontWeight: "normal",
      labelFontFamily: "Arial",
      baselineColor: "black",
      gridColor: "#E3E3E3",
      gridStrokeWidth: 1,
      gridStrokeType: "solid",
      gridStrokeDash: [4, 4],
    },
    markCommon: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    point: {
      color: "#E79F00",
      size: 3,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    rect: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    triangle: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    area: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    line: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    bar: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    rule: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 1,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    link: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 1,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
    text: {
      color: "#E79F00",
      size: 1,
      stroke: "black",
      strokeWidth: 0,
      opacity: 1,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
      textAnchor: "middle",
      textFontWeight: "normal",
    },
    brush: {
      color: "gray",
      size: 1,
      stroke: "black",
      strokeWidth: 1,
      opacity: 0.3,
      nominalColorRange: [
        "#E79F00",
        "#029F73",
        "#0072B2",
        "#CB7AA7",
        "#D45E00",
        "#57B4E9",
        "#EFE441",
      ],
      quantitativeSizeRange: [2, 6],
    },
  },
};

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

    // Let's make a scatterplot
    // const position = { x: 10, y: 10, width: 300, height: 300 };
    // const { pixiContainer, overlayDiv } = pixiManager.makeContainer(position);
    // new Scatterplot(
    //   data,
    //   pixiContainer,
    //   overlayDiv,
    //   pixiManager.app.renderer,
    //   xSignal,
    //   ySignal
    // );

    // Let's add a heatmap
    // const heatmapPosition = { x: 350, y: 30, width: 400, height: 400 };
    // const { pixiContainer: heatmapContainer, overlayDiv: heatmapOverlayDiv } = pixiManager.makeContainer(heatmapPosition);
    // new HeatmapClient(heatmapContainer, heatmapOverlayDiv, {
    //   trackBorderWidth: 1,
    //   trackBorderColor: "black",
    //   colorbarPosition: "topRight",
    // });

    const genomeScale = scaleLinear().domain([0, 3088269832]).range([0, 800]);
    const xScaleSignal = signal<ScaleLinear<number, number>>(genomeScale);

    const dataconfig = {
      server: "https://resgen.io/api/v1",
      tilesetUid: "UvVPeLHuRDiYA3qwFlm7xQ",
      cacheTiles: true, // New option
    };
    const dataFetcher = new DataFetcher(dataconfig, fakePubSub);

    const pos = { x: 10, y: 500, width: 800, height: 50 };
    new GoslingTrack(
      gosOptions,
      xScaleSignal,
      dataFetcher,
      pixiManager.makeContainer(pos)
    );

    const pos2 = {...pos,  y: pos.y + 50};
    new GoslingTrack(gosOptions, xScaleSignal, dataFetcher, pixiManager.makeContainer(pos2));

    const pos3 = {...pos,  y: pos.y + 100};
    new GoslingTrack(gosOptions, xScaleSignal, dataFetcher, pixiManager.makeContainer(pos3));

    const pos4 = {...pos,  y: pos.y + 150};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher,  pixiManager.makeContainer(pos4));

    const pos5 = {...pos,  y: pos.y + 200};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos5));

    const pos6 = {...pos,  y: pos.y + 250};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos6));

    const pos7 = {...pos,  y: pos.y + 300};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos7));

    const pos8 = {...pos,  y: pos.y + 350};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos8));

    const pos9 = {...pos,  y: pos.y + 400};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos9));

    const pos10 = {...pos,  y: pos.y + 450};
    new GoslingTrack(gosOptions, xScaleSignal,dataFetcher, pixiManager.makeContainer(pos10));

    // const { pixiContainer: gc2, overlayDiv: gd2 } =
    //   pixiManager.makeContainer({ x: 10, y: 720, width: 800, height: 200 });
    // new GoslingTrack(gc2, gd2, gosOptions);
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
