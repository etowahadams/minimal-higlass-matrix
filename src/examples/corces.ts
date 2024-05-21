import { PixiManager } from "../pixi-manager";
import { GoslingTrack } from "../gosling";
import { signal } from "@preact/signals-core";
import { BigWigDataFetcher } from "@gosling-lang/datafetchers";
import { DataFetcher } from "@higlass/datafetchers";
import { fakePubSub } from "../higlass/tracks/utils";
import { gene_annotation, bigwigTracks, placTracks, ideogram } from "./corces-tracks";

export function addCorces(pixiManager: PixiManager) {
  const xDomGenomic = signal([543317951, 544039951]);
  bigwigTracks.forEach((bigwigTrackOptions, i) => {
    const dataFetcher = new BigWigDataFetcher(bigwigTrackOptions.spec.data);
    // dataFetcher.config.cache = true; // turn on caching 
    const pos = { x: 10, y: 10 + i * 40, width: 400, height: 40 };
    new GoslingTrack(
      bigwigTrackOptions,
      xDomGenomic,
      dataFetcher,
      pixiManager.makeContainer(pos)
    );
  });

  // Gene annotation track
  const geneDataFetcher = new DataFetcher({
    server: "https://server.gosling-lang.org/api/v1",
    tilesetUid: "gene-annotation",
    cacheTiles: true, // New option
  }, fakePubSub);

  const pos2 = { x: 10, y: 10 + bigwigTracks.length * 40, width: 400, height: 110 };
  new GoslingTrack(
    gene_annotation,
    xDomGenomic,
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
      xDomGenomic,
      platDatafetcher,
      pixiManager.makeContainer(pos3)
    );
  });
}
