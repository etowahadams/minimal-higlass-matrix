import * as React from "react";
import stats from "stats.js";

export function FpsPanel({ fps, style }: { fps: number, style?: React.CSSProperties }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<InstanceType<typeof stats.Panel>>();
  React.useEffect(() => {
    panelRef.current = new stats.Panel("FPS", "#0ff", "#002");
    ref.current!.innerHTML = "";
    ref.current!.appendChild(panelRef.current!.dom);
  }, []);
  React.useEffect(() => {
    if (!panelRef.current) return;
    panelRef.current.update(fps, 100);
  }, [fps]);
  return <div style={style} ref={ref}></div>;
}
