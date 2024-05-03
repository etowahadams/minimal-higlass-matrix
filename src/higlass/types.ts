import * as PIXI from "pixi.js";

export type DataConfig = {
  server?: string;
  url?: string;
  filetype?: string;
  coordSystem?: string;
  children?: DataConfig[];
  options?: unknown;
  type?: string;
  slicePos?: number;
  cacheTiles?: boolean;
};

type ChromsizeRow = [string, number];

export type TilesetInfoShared = {
  name: string;
  min_pos: number[]; // should be [number, number] | [number]
  max_pos: number[]; // should be [number, number] | [number]
  max_zoom: number;
  coordSystem?: string;
  tile_size?: number;
  max_tile_width?: number;
  transforms?: { name: string; value: string }[];
  chromsizes?: ArrayLike<ChromsizeRow>;
  error?: string;
};

export type LegacyTilesetInfo = TilesetInfoShared & {
  max_width: number;
  bins_per_dimension?: number;
};

export type ResolutionsTilesetInfo = TilesetInfoShared & {
  resolutions: number[];
};

export type TilesetInfo = LegacyTilesetInfo | ResolutionsTilesetInfo;

export type HandleTilesetInfoFinished = {
  (info: TilesetInfo | null | { error: string }, tilesetUid?: string): void;
};

export interface AbstractDataFetcher<TileType, DataConfig> {
  tilesetInfo(
    callback?: HandleTilesetInfoFinished
  ): Promise<TilesetInfo | undefined>;
  fetchTilesDebounced(
    receivedTiles: (tiles: Record<string, TileType>) => void,
    tileIds: string[]
  ): Promise<Record<string, TileType>>;
  dataConfig: DataConfig;
}

interface Tile {
  min_value: number;
  max_value: number;
  denseDataExtrema: DenseDataExtrema1D | DenseDataExtrema2D;
  minNonZero: number;
  maxNonZero: number;
  dense: Array<number> | Float32Array;
  dtype: string;
  server: string;
  tilePos: number[];
  tilePositionId: string;
  tilesetUid: string;
  zoomLevel: number;
}

type DividedTileA = Pick<Tile, "zoomLevel" | "tilePos" | "tilePositionId">;
type DividedTileB = Pick<
  Tile,
  | "zoomLevel"
  | "tilePos"
  | "tilePositionId"
  | "dense"
  | "denseDataExtrema"
  | "minNonZero"
  | "maxNonZero"
>;
type DividedTile = DividedTileA | DividedTileB;

type ResolvedDataConfig = Omit<DataConfig, "children"> & {
  children?: DataFetcher[];
  tilesetUid?: string;
  tilesetInfo: TilesetInfo;
};

type DataFetcher = AbstractDataFetcher<Tile | DividedTile, ResolvedDataConfig>;

type MinimalDataConfig = {
  server: string;
  tilesetUid: string;
  // coordSystem: string;
};
export interface PixiTrackContext {
  pubSub?: any;
  scene: PIXI.Container;
  id: string;
}

export interface PixiTrackOptions {
  labelPosition?: string;
  labelText?: string;
  trackBorderWidth?: number;
  trackBorderColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  lineStrokeColor?: string;
  barFillColor?: string;
  name?: string;
  labelTextOpacity?: number;
  labelBackgroundColor?: string;
  labelLeftMargin?: number;
  labelRightMargin?: number;
  labelTopMargin?: number;
  labelBottomMargin?: number;
  labelBackgroundOpacity?: number;
  labelShowAssembly?: boolean;
  labelShowResolution?: boolean;
  dataTransform?: string;
}

export type TiledPixiTrackContext = PixiTrackContext & {
  dataFetcher?: DataFetcher;
  dataConfig: MinimalDataConfig;
  animate: () => void;
  onValueScaleChanged: () => void;
  handleTilesetInfoReceived: (tilesetInfo: any) => void;
};

export type TiledPixiTrackOptions = PixiTrackOptions & {
  maxZoom?: number;
};
