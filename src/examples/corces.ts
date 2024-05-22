import { PixiManager } from "../pixi-manager";
import { GoslingTrack } from "../gosling";
import { signal } from "@preact/signals-core";
import { BigWigDataFetcher, CsvDataFetcherClass } from "@gosling-lang/datafetchers";
import { DataFetcher } from "@higlass/datafetchers";
import { fakePubSub } from "../higlass/tracks/utils";
import { gene_annotation, bigwigTracks, placTracks, ideogram } from "./corces-tracks";
import { ViewportTrackerHorizontalTrack } from "../viewport-tracker-horizontal";

export function addCorces(pixiManager: PixiManager) {
  // Set up the domain signals
  const ideogramDomain = signal<[number, number]>([491149952, 689445510])
  const view1Domain = signal<[number, number]>([543317951, 544039951]);

  // Ideogram track
  const CsvDataFetcher = new CsvDataFetcherClass(ideogram.spec.data);
  const pos0 = { x: 10, y: 10, width: 400, height: 55 };
  new GoslingTrack(
    ideogram,
    ideogramDomain,
    CsvDataFetcher,
    pixiManager.makeContainer(pos0)
  );
  // Brush track
  const options = {
    "projectionFillColor": "red",
    "projectionStrokeColor": "red",
    "projectionFillOpacity": 0.3,
    "projectionStrokeOpacity": 0.3,
    "strokeWidth": 1
  }
  new ViewportTrackerHorizontalTrack(options, ideogramDomain, view1Domain, pixiManager.makeContainer(pos0).overlayDiv);

  // BigWig tracks
  bigwigTracks.forEach((bigwigTrackOptions, i) => {
    const dataFetcher = new BigWigDataFetcher(bigwigTrackOptions.spec.data);
    // dataFetcher.config.cache = true; // turn on caching 
    const pos1 = { x: 10, y: pos0.y + pos0.height + i * 40, width: 400, height: 40 };
    new GoslingTrack(
      bigwigTrackOptions,
      view1Domain,
      dataFetcher,
      pixiManager.makeContainer(pos1)
    );
  });

  // Gene annotation track
  const geneDataFetcher = new DataFetcher({
    server: "https://server.gosling-lang.org/api/v1",
    tilesetUid: "gene-annotation",
    cacheTiles: true, // New option
  }, fakePubSub);

  const pos2 = { x: 10, y: pos0.y + pos0.height + bigwigTracks.length * 40, width: 400, height: 110 };
  new GoslingTrack(
    gene_annotation,
    view1Domain,
    geneDataFetcher,
    pixiManager.makeContainer(pos2)
  );

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
    x: 10,
    y: pos2.y + pos2.height,
    width: 400,
    height: 110,
  };
  
  placTracks.forEach((placTrackOptions) => {
    new GoslingTrack(
      placTrackOptions,
      view1Domain,
      platDatafetcher,
      pixiManager.makeContainer(pos3)
    );
  });
}
