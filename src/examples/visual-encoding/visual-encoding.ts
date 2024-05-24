import { signal } from "@preact/signals-core";
import { PixiManager } from "../../pixi-manager";
// Import Tracks
import { GoslingTrack } from "../../gosling";
import { AxisTrack } from "../../axis";
import { CircularBrushTrack } from "../../circular-brush";
import { ViewportTrackerHorizontalTrack } from "../../viewport-tracker-horizontal";
// Import DataFetchers
import {
  BigWigDataFetcher,
  CsvDataFetcherClass,
} from "@gosling-lang/datafetchers";
import { DataFetcher } from "@higlass/datafetchers";
import { fakePubSub } from "../../higlass/tracks/utils";
// Import Track specs
import {
  circularTrackOptions,
  circularAxisTrackOptions,
  circularBrushTrackOptions,
  axisTrackOptions1,
  linearTrackOptions,
  linearBrushTrackOptions,
  bottomAxisTrackOptions,
  bottomTrackOptions,
} from "./track-options";

export function addViewEncoding(pixiManager: PixiManager) {
  // Set up the domain signals
  const circularDomain = signal<[number, number]>([0, 248956422]);
  const overviewDomain = signal<[number, number]>([0, 248956422]);
  const detailedDomain = signal<[number, number]>([160000000, 200000000]);
  const cursorPosition = signal<number>(0);

  // All tracks use this datafetcher
  const dataFetcher = new DataFetcher(
    {
      server: "https://server.gosling-lang.org/api/v1",
      tilesetUid: "cistrome-multivec",
      cacheTiles: true, // New option
    },
    fakePubSub
  );

  // Circular track
  const pos0 = { x: 10, y: 10, width: 250, height: 250 };
  new GoslingTrack(
    circularTrackOptions,
    circularDomain,
    dataFetcher,
    pixiManager.makeContainer(pos0)
  );
  new AxisTrack(
    circularAxisTrackOptions,
    circularDomain,
    pixiManager.makeContainer(pos0)
  );
  new CircularBrushTrack(
    circularBrushTrackOptions,
    circularDomain,
    detailedDomain,
    pixiManager.makeContainer(pos0).overlayDiv
  );

  // Linear track
  const posAxis = {
    x: pos0.x + pos0.width + 50,
    y: 10,
    width: 400,
    height: 30,
  };
  new AxisTrack(
    axisTrackOptions1,
    overviewDomain,
    pixiManager.makeContainer(posAxis)
  );
  const posLinear = {
    x: posAxis.x,
    y: posAxis.y + posAxis.height,
    width: 400,
    height: 230,
  };
  new GoslingTrack(
    linearTrackOptions,
    overviewDomain,
    dataFetcher,
    pixiManager.makeContainer(posLinear),
    cursorPosition
  );
  new ViewportTrackerHorizontalTrack(
    linearBrushTrackOptions,
    overviewDomain,
    detailedDomain,
    pixiManager.makeContainer(posLinear).overlayDiv
  );

  // Bottom track
  const posBottomAxis = {
    x: pos0.x + 10,
    y: pos0.y + pos0.height + 50,
    width: 690,
    height: 30,
  };

  new AxisTrack(
    bottomAxisTrackOptions,
    detailedDomain,
    pixiManager.makeContainer(posBottomAxis)
  );

  const posBottom = {
    x: posBottomAxis.x,
    y: posBottomAxis.y + posBottomAxis.height,
    width: 690,
    height: 230,
  };
  new GoslingTrack(
    bottomTrackOptions,
    detailedDomain,
    dataFetcher,
    pixiManager.makeContainer(posBottom),
    cursorPosition
  );

  //   // Axis track
  //   const posAxis = {
  //     x: 10,
  //     y: pos0.y + pos0.height,
  //     width: 400,
  //     height: 30,
  //   };
  //   new AxisTrack(axisTrack, view1Domain, pixiManager.makeContainer(posAxis));

  //   // Brush track
  //   const options = {
  //     projectionFillColor: "red",
  //     projectionStrokeColor: "red",
  //     projectionFillOpacity: 0.3,
  //     projectionStrokeOpacity: 0.3,
  //     strokeWidth: 1,
  //   };
  //   new ViewportTrackerHorizontalTrack(
  //     options,
  //     ideogramDomain,
  //     view1Domain,
  //     pixiManager.makeContainer(pos0).overlayDiv
  //   );

  //   // BigWig tracks
  //   bigwigTracks.forEach((bigwigTrackOptions, i) => {
  //     const dataFetcher = new BigWigDataFetcher(bigwigTrackOptions.spec.data);
  //     // dataFetcher.config.cache = true; // turn on caching
  //     const pos1 = {
  //       x: 10,
  //       y: posAxis.y + posAxis.height + i * 40,
  //       width: 400,
  //       height: 40,
  //     };
  //     new GoslingTrack(
  //       bigwigTrackOptions,
  //       view1Domain,
  //       dataFetcher,
  //       pixiManager.makeContainer(pos1),
  //       cursorPosition
  //     );
  //   });

  //   // Gene annotation track
  //   const geneDataFetcher = new DataFetcher(
  //     {
  //       server: "https://server.gosling-lang.org/api/v1",
  //       tilesetUid: "gene-annotation",
  //       cacheTiles: true, // New option
  //     },
  //     fakePubSub
  //   );
  //   const pos2 = {
  //     x: 10,
  //     y: posAxis.y + posAxis.height + bigwigTracks.length * 40,
  //     width: 400,
  //     height: 110,
  //   };
  //   new GoslingTrack(
  //     gene_annotation,
  //     view1Domain,
  //     geneDataFetcher,
  //     pixiManager.makeContainer(pos2),
  //     cursorPosition
  //   );

  //   // PLAC-seq track
  //   const platDatafetcher = new DataFetcher(
  //     {
  //       server: "https://server.gosling-lang.org/api/v1",
  //       tilesetUid: "neuron-plac-seq-bedpe",
  //       cacheTiles: true, // New option
  //     },
  //     fakePubSub
  //   );
  //   const pos3 = {
  //     x: 10,
  //     y: pos2.y + pos2.height,
  //     width: 400,
  //     height: 90,
  //   };
  //   placTracks.forEach((placTrackOptions) => {
  //     new GoslingTrack(
  //       placTrackOptions,
  //       view1Domain,
  //       platDatafetcher,
  //       pixiManager.makeContainer(pos3),
  //       cursorPosition
  //     );
  //   });
}
