/// <reference types="vite/client" />

declare module 'stats.js' {
  class Panel {
    constructor(name: string, fg: string, bg: string);
    dom: HTMLElement;
    update(fps: number, maxValue: number): void;
  }
  export default { Panel };
}
