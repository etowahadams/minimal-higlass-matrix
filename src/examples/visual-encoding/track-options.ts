export const circularTrackOptions = {
  id: "8a003683-9a57-4202-bf00-1c4d9b11f13d",
  siblingIds: ["8a003683-9a57-4202-bf00-1c4d9b11f13d"],
  showMousePosition: false,
  mousePositionColor: "#000000",
  name: " ",
  labelPosition: "none",
  labelShowResolution: false,
  labelColor: "black",
  labelBackgroundColor: "white",
  labelBackgroundOpacity: 0.5,
  labelTextOpacity: 1,
  labelLeftMargin: 1,
  labelTopMargin: 1,
  labelRightMargin: 0,
  labelBottomMargin: 0,
  backgroundColor: "transparent",
  spec: {
    spacing: 5,
    static: true,
    layout: "circular",
    xDomain: { chromosome: "chr1" },
    data: {
      url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
      type: "multivec",
      row: "sample",
      column: "position",
      value: "peak",
      categories: ["sample 1", "sample 2", "sample 3", "sample 4"],
    },
    x: {
      field: "start",
      type: "genomic",
      domain: { chromosome: "chr1" },
      axis: "top",
    },
    xe: { field: "end", type: "genomic" },
    y: { field: "peak", type: "quantitative" },
    row: { field: "sample", type: "nominal" },
    color: { field: "sample", type: "nominal" },
    width: 250,
    height: 250,
    assembly: "hg38",
    orientation: "horizontal",
    zoomLimits: [1, null],
    centerRadius: 0.4,
    xOffset: 0,
    yOffset: 0,
    style: {},
    id: "8a003683-9a57-4202-bf00-1c4d9b11f13d",
    _overlay: [
      { mark: "bar", style: {} },
      { mark: "brush", x: {}, style: {} },
    ],
    overlayOnPreviousTrack: false,
    outerRadius: 125,
    innerRadius: 50,
    startAngle: 7.2,
    endAngle: 352.8,
    _renderingId: "085fb2cf-83dd-4d47-b7da-7fc96bbde6a1",
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

export const circularAxisTrackOptions = {
  id: "48abd48d-fbcf-462f-b152-53324f49e89a-top-axis",
  layout: "circular",
  innerRadius: 95,
  outerRadius: 125,
  width: 250,
  height: 250,
  startAngle: 7.2,
  endAngle: 352.8,
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
  assembly: "hg38",
  stroke: "transparent",
  color: "black",
  labelMargin: 5,
  excludeChrPrefix: false,
  fontSize: 12,
  fontFamily: "Arial",
  fontWeight: "normal",
  tickColor: "black",
  tickFormat: "plain",
  tickPositions: "ends",
  reverseOrientation: false,
  labelPosition: "none",
  labelColor: "black",
  labelTextOpacity: 0.4,
  trackBorderWidth: 0,
  trackBorderColor: "black",
  backgroundColor: "transparent",
  showMousePosition: false,
};

export const circularBrushTrackOptions = {
  projectionFillColor: "gray",
  projectionStrokeColor: "black",
  projectionFillOpacity: 0.3,
  projectionStrokeOpacity: 0.3,
  strokeWidth: 1,
  startAngle: 7.2,
  endAngle: 352.8,
  innerRadius: 50,
  outerRadius: 125,
  axisPositionHorizontal: "left",
};

export const axisTrackOptions1 = {
  id: "6ece72c0-b771-49d6-948b-ded205bae606-top-axis",
  layout: "linear",
  innerRadius: null,
  outerRadius: 310,
  width: 400,
  height: 230,
  startAngle: 0,
  endAngle: 360,
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
  assembly: "hg38",
  stroke: "transparent",
  color: "black",
  labelMargin: 5,
  excludeChrPrefix: false,
  fontSize: 12,
  fontFamily: "Arial",
  fontWeight: "normal",
  tickColor: "black",
  tickFormat: "plain",
  tickPositions: "ends",
  reverseOrientation: false,
  labelPosition: "none",
  labelColor: "black",
  labelTextOpacity: 0.4,
  trackBorderWidth: 0,
  trackBorderColor: "black",
  backgroundColor: "transparent",
  showMousePosition: false,
};

export const linearTrackOptions = {
  id: "6ece72c0-b771-49d6-948b-ded205bae606",
  siblingIds: ["6ece72c0-b771-49d6-948b-ded205bae606"],
  showMousePosition: true,
  mousePositionColor: "#000000",
  name: "my_file_genome_wide.multires.mv5",
  labelPosition: "none",
  labelShowResolution: false,
  labelColor: "black",
  labelBackgroundColor: "white",
  labelBackgroundOpacity: 0.5,
  labelTextOpacity: 1,
  labelLeftMargin: 1,
  labelTopMargin: 1,
  labelRightMargin: 0,
  labelBottomMargin: 0,
  backgroundColor: "transparent",
  spec: {
    layout: "linear",
    xDomain: { chromosome: "chr1" },
    data: {
      url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
      type: "multivec",
      row: "sample",
      column: "position",
      value: "peak",
      categories: ["sample 1", "sample 2", "sample 3", "sample 4"],
    },
    x: {
      field: "start",
      type: "genomic",
      domain: { chromosome: "chr1" },
      axis: "top",
    },
    xe: { field: "end", type: "genomic" },
    y: { field: "peak", type: "quantitative" },
    row: { field: "sample", type: "nominal" },
    color: { field: "sample", type: "nominal" },
    width: 400,
    height: 230,
    assembly: "hg38",
    orientation: "horizontal",
    static: false,
    zoomLimits: [1, null],
    centerRadius: 0.4,
    xOffset: 0,
    yOffset: 0,
    style: {},
    id: "6ece72c0-b771-49d6-948b-ded205bae606",
    _overlay: [
      { mark: "bar", style: {} },
      { mark: "brush", x: {}, style: {} },
    ],
    overlayOnPreviousTrack: false,
    _renderingId: "b3a67fa8-9451-45c2-9ce4-fb50c658088f",
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
export const linearBrushTrackOptions = {
  projectionFillColor: "gray",
  projectionStrokeColor: "black",
  projectionFillOpacity: 0.3,
  projectionStrokeOpacity: 0.3,
  strokeWidth: 1,
};

export const bottomAxisTrackOptions = {
  id: "95e72b2a-5332-4622-bd1c-e41b260f0aa4-top-axis",
  layout: "linear",
  innerRadius: null,
  outerRadius: 310,
  width: 690,
  height: 230,
  startAngle: 0,
  endAngle: 360,
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
  assembly: "hg38",
  stroke: "transparent",
  color: "black",
  labelMargin: 5,
  excludeChrPrefix: false,
  fontSize: 12,
  fontFamily: "Arial",
  fontWeight: "normal",
  tickColor: "black",
  tickFormat: "plain",
  tickPositions: "even",
  reverseOrientation: false,
  labelPosition: "none",
  labelColor: "black",
  labelTextOpacity: 0.4,
  trackBorderWidth: 0,
  trackBorderColor: "black",
  backgroundColor: "transparent",
  showMousePosition: false,
};

export const bottomTrackOptions = {
  id: "95e72b2a-5332-4622-bd1c-e41b260f0aa4",
  siblingIds: ["95e72b2a-5332-4622-bd1c-e41b260f0aa4"],
  showMousePosition: true,
  mousePositionColor: "#000000",
  name: "my_file_genome_wide.multires.mv5",
  labelPosition: "none",
  labelShowResolution: false,
  labelColor: "black",
  labelBackgroundColor: "white",
  labelBackgroundOpacity: 0.5,
  labelTextOpacity: 1,
  labelLeftMargin: 1,
  labelTopMargin: 1,
  labelRightMargin: 0,
  labelBottomMargin: 0,
  backgroundColor: "transparent",
  spec: {
    layout: "linear",
    xDomain: {
      chromosome: "chr1",
      interval: [160000000, 200000000],
    },
    linkingId: "detail",
    assembly: "hg38",
    orientation: "horizontal",
    static: false,
    zoomLimits: [1, null],
    centerRadius: 0.4,
    xOffset: 0,
    yOffset: 0,
    style: {},
    data: {
      url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
      type: "multivec",
      row: "sample",
      column: "position",
      value: "peak",
      categories: ["sample 1", "sample 2", "sample 3", "sample 4"],
    },
    mark: "bar",
    x: {
      field: "position",
      type: "genomic",
      axis: "top",
      domain: {
        chromosome: "chr1",
        interval: [160000000, 200000000],
      },
    },
    y: { field: "peak", type: "quantitative" },
    row: { field: "sample", type: "nominal" },
    color: { field: "sample", type: "nominal" },
    width: 690,
    height: 230,
    id: "95e72b2a-5332-4622-bd1c-e41b260f0aa4",
    overlayOnPreviousTrack: false,
    _renderingId: "dcc96e4e-5197-433e-96bd-871aacb5b79c",
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