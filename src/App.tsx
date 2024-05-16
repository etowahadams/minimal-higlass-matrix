import { useState, useEffect } from "react";
import "./App.css";
import { PixiManager } from "./pixi-manager";
import { generateRandomData } from "./utils";
import { FpsPanel } from "./FpsPanel";
import { signal } from "@preact/signals-core";
import { Scatterplot } from "./scatterplot";
import { HeatmapClient } from "./heatmap";
import { GoslingTrack } from "./gosling";
import { fakePubSub } from "./higlass/tracks/utils";
import { DataFetcher } from "@higlass/datafetchers";
import { scaleLinear } from "d3-scale";

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

const trackColors = [
  "#E79F00",
  "#F29B67",
  "#565C8B",
  "#77C0FA",
  "#9B46E5",
  "#D73636",
  "#E38ADC",
  "#20102F",
  "#BB57C9",
  "green",
];

function changeMarkColor(gosOption: any, color?: string) {
  if (!color) {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  const newGosOption = structuredClone(gosOption);
  newGosOption.spec.color = { value: color };
  return newGosOption;
}

function App() {
  const [fps, setFps] = useState(120);

  useEffect(() => {
    // Create the new plot
    const plotElement = document.getElementById("plot") as HTMLDivElement;
    plotElement.innerHTML = "";

    // Initialize the PixiManager. This will be used to get containers and overlay divs for the plots
    const pixiManager = new PixiManager(1000, 1000, plotElement, setFps);

    // Let's add a heatmap
    // const heatmapPosition = { x: 350, y: 30, width: 400, height: 400 };
    // const { pixiContainer: heatmapContainer, overlayDiv: heatmapOverlayDiv } = pixiManager.makeContainer(heatmapPosition);
    // new HeatmapClient(heatmapContainer, heatmapOverlayDiv, {
    //   trackBorderWidth: 1,
    //   trackBorderColor: "black",
    //   colorbarPosition: "topRight",
    // });

    const dataconfig = {
      server: "https://resgen.io/api/v1",
      tilesetUid: "UvVPeLHuRDiYA3qwFlm7xQ",
      cacheTiles: true, // New option
    };
    const dataFetcher = new DataFetcher(dataconfig, fakePubSub);

    const genomeScale = scaleLinear().domain([0, 3088269832]).range([0, 800]);
    const xScaleSignal = signal(genomeScale);

    trackColors.forEach((color, i) => {
      const pos = { x: 10, y: 400 + i * 60, width: 800, height: 50 };
      new GoslingTrack(
        changeMarkColor(gosOptions, color),
        xScaleSignal,
        dataFetcher,
        pixiManager.makeContainer(pos)
      );
    });

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
