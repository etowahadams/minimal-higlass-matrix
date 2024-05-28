import { PixiManager } from "../pixi-manager";
import { GoslingTrack } from "../plots/gosling";
import { signal } from "@preact/signals-core";
import { DataFetcher } from "@higlass/datafetchers";
import { fakePubSub } from "../higlass/tracks/utils";

import { Cursor } from "../interactors/Cursor";
import { PanZoom } from "../interactors/PanZoom";

export function addGoslingTracks(pixiManager: PixiManager) {
  const dataconfig = {
    server: "https://resgen.io/api/v1",
    tilesetUid: "UvVPeLHuRDiYA3qwFlm7xQ",
    cacheTiles: true, // New option
  };
  const dataFetcher = new DataFetcher(dataconfig, fakePubSub);

  const xDomGenomic = signal<[number, number]>([0, 3088269832]);
  const cursorPos = signal<number>(0);

  const panzoom = new PanZoom(xDomGenomic);
  const cursor = new Cursor(cursorPos);

  trackColors.forEach((color, i) => {
    const pos = { x: 10, y: 10 + i * 60, width: 800, height: 50 };
    const gosTrack = new GoslingTrack(
      changeMarkColor(gosOptions, color),
      xDomGenomic,
      dataFetcher,
      pixiManager.makeContainer(pos)
    );
    gosTrack.addInteractor(panzoom).addInteractor(cursor);
  });
}

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
    mark: "bar",
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
