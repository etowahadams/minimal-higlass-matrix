import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import type { AsyncDuckDB } from "@duckdb/duckdb-wasm";
import { TabularDataFetcher } from "./gosling/data-abstraction";
import { TilesetInfo } from "@higlass/types";

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker,
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: eh_worker,
  },
};

let db: AsyncDuckDB | null = null;

export const initDB = async () => {
  if (db) {
    return db; // Return existing database, if any
  }
  const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

  // Instantiate the asynchronus version of DuckDB-wasm
  const worker = new Worker(bundle.mainWorker!);
  const logger = new duckdb.ConsoleLogger();

  db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  return db;
};

interface DuckTile {
  [field: string]: string | number | number[] | undefined;
}

export interface EmptyTile {
  tilePositionId: string;
}

export class DuckDBFetcher implements TabularDataFetcher<DuckTile> {
  #db: AsyncDuckDB;
  dataConfig: any;

  constructor() {
    // this.#db = db;
    this.dataConfig = {};
  }

  fetchTilesDebounced(
    receivedTiles: (tiles: Record<string, EmptyTile>) => void,
    tileIds: string[]
  ) {
    console.warn("fetchTilesDebounced", tileIds);
    const tiles: Record<string, EmptyTile> = {};
    tileIds.forEach((tileId) => {
      tiles[tileId] = { tilePositionId: tileId };
    });
    return receivedTiles(tiles);
  }

  async tilesetInfo(callback: (info: TilesetInfo) => void) {
    const info = {
      tile_size: 1024,
      bins_per_dimension: 1024,
      max_zoom: 13,
      max_width: 3088269832,
      min_pos: [0],
      max_pos: [3088269832],
    };
    // This is called in a constructor so we need to wait a bit
    setTimeout(() => {
      callback(info);
    }, 10);
  }

  async getTabularData(tileIds: string[]) {
    // console.warn("getTabularData", tileIds);
    return [
      { position: 500000000, peak: 10 },
      { position: 0, peak: 3 },
      { position: 1000000, peak: 5 },
    ];
  }
}
