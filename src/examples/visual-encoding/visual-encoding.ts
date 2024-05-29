import { signal } from "@preact/signals-core";
import { PixiManager } from "../../pixi-manager";
// Import Tracks
import { GoslingTrack } from "../../plots/gosling";
import { AxisTrack } from "../../axis";
import { CircularBrushTrack } from "../../plots/brush-circular";
import { BrushLinearTrack } from "../../plots/brush-linear";
// Import interactors
import { cursor } from "../../interactors/cursor";
import { panZoom } from "../../interactors/panZoom";
// Import DataFetchers
import { DataFetcher } from "@higlass/datafetcher";
import { fakePubSub } from "@higlass/utils";
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
    dataFetcher,
    pixiManager.makeContainer(pos0)
  ).addInteractor((plot) => panZoom(plot, circularDomain));
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
    dataFetcher,
    pixiManager.makeContainer(posLinear)
  )
    .addInteractor((plot) => panZoom(plot, overviewDomain))
    .addInteractor((plot) => cursor(plot, cursorPosition));
  new BrushLinearTrack(
    linearBrushTrackOptions,
    detailedDomain,
    pixiManager.makeContainer(posLinear).overlayDiv
  ).addInteractor((plot) => panZoom(plot, overviewDomain));

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
    dataFetcher,
    pixiManager.makeContainer(posBottom)
  )
    .addInteractor((plot) => panZoom(plot, detailedDomain))
    .addInteractor((plot) => cursor(plot, cursorPosition));
}
