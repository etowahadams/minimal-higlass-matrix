import { signal } from "@preact/signals-core";
import { PixiManager } from "../../pixi-manager";
// Import Tracks
import { GoslingTrack } from "../../plots/gosling";
import { AxisTrack } from "../../axis";
import { ViewportTrackerHorizontalTrack } from "../../plots/brush-linear";
import { TextTrack } from "../../plots/text";
// Import interactors
import { cursor } from "../../interactors/cursor";
import { panZoom } from "../../interactors/panZoom";
// Import DataFetchers
import {
  BigWigDataFetcher,
  CsvDataFetcherClass,
} from "@gosling-lang/datafetchers";
import { DataFetcher } from "@higlass/datafetcher";
import { fakePubSub } from "@higlass/utils";
// Import Track specs
import {
  titleOptions,
  subtitleOptions,
  gene_annotation,
  bigwigTracks,
  placTracks,
  ideogram,
  axisTrack,
} from "./corces-tracks";

export function addCorces(pixiManager: PixiManager) {
  const top = 10;
  const left = 10;
  // Set up the domain signals
  const ideogramDomain = signal<[number, number]>([491149952, 689445510]);
  const view1Domain = signal<[number, number]>([543317951, 544039951]);
  const cursorPosition = signal<number>(0);

  // Add title and subtitle
  const titlePos = { x: left, y: top, width: 400, height: 24 };
  new TextTrack(titleOptions, pixiManager.makeContainer(titlePos));
  const subtitlePos = {
    x: left,
    y: titlePos.y + titlePos.height,
    width: 400,
    height: 22,
  };
  new TextTrack(subtitleOptions, pixiManager.makeContainer(subtitlePos));

  // Ideogram track
  const CsvDataFetcher = new CsvDataFetcherClass(ideogram.spec.data);
  const pos0 = {
    x: left,
    y: subtitlePos.y + subtitlePos.height + 10,
    width: 400,
    height: 55,
  };
  new GoslingTrack(
    ideogram,
    CsvDataFetcher,
    pixiManager.makeContainer(pos0)
  )
    .addInteractor((plot) => panZoom(plot, ideogramDomain))
    .addInteractor((plot) => cursor(plot, cursorPosition));
  // Brush track
  const options = {
    projectionFillColor: "red",
    projectionStrokeColor: "red",
    projectionFillOpacity: 0.3,
    projectionStrokeOpacity: 0.3,
    strokeWidth: 1,
  };
  new ViewportTrackerHorizontalTrack(
    options,
    ideogramDomain,
    view1Domain,
    pixiManager.makeContainer(pos0).overlayDiv
  );

  // Axis track
  const posAxis = {
    x: left,
    y: pos0.y + pos0.height,
    width: 400,
    height: 30,
  };
  new AxisTrack(axisTrack, view1Domain, pixiManager.makeContainer(posAxis));
  // BigWig tracks
  bigwigTracks.forEach((bigwigTrackOptions, i) => {
    const dataFetcher = new BigWigDataFetcher(bigwigTrackOptions.spec.data);
    // dataFetcher.config.cache = true; // turn on caching
    const pos1 = {
      x: left,
      y: posAxis.y + posAxis.height + i * 40,
      width: 400,
      height: 40,
    };
    new GoslingTrack(
      bigwigTrackOptions,
      dataFetcher,
      pixiManager.makeContainer(pos1)
    )
      .addInteractor((plot) => panZoom(plot, view1Domain))
      .addInteractor((plot) => cursor(plot, cursorPosition));
  });

  // Gene annotation track
  const geneDataFetcher = new DataFetcher(
    {
      server: "https://server.gosling-lang.org/api/v1",
      tilesetUid: "gene-annotation",
      cacheTiles: true, // New option
    },
    fakePubSub
  );
  const pos2 = {
    x: left,
    y: posAxis.y + posAxis.height + bigwigTracks.length * 40,
    width: 400,
    height: 110,
  };
  new GoslingTrack(
    gene_annotation,
    geneDataFetcher,
    pixiManager.makeContainer(pos2)
  )
    .addInteractor((plot) => panZoom(plot, view1Domain))
    .addInteractor((plot) => cursor(plot, cursorPosition));

  // PLAC-seq track
  const platDatafetcher = new DataFetcher(
    {
      server: "https://server.gosling-lang.org/api/v1",
      tilesetUid: "neuron-plac-seq-bedpe",
      cacheTiles: true, // New option
    },
    fakePubSub
  );
  const pos3 = {
    x: left,
    y: pos2.y + pos2.height,
    width: 400,
    height: 90,
  };
  placTracks.forEach((placTrackOptions) => {
    new GoslingTrack(
      placTrackOptions,
      platDatafetcher,
      pixiManager.makeContainer(pos3)
    )
      .addInteractor((plot) => panZoom(plot, view1Domain))
      .addInteractor((plot) => cursor(plot, cursorPosition));
  });
}
