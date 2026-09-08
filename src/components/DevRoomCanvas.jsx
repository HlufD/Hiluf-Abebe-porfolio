import { Component, lazy, Suspense } from "react";
import useTheme from "../lib/useTheme.jsx";

const DevRoom = lazy(() => import("./DevRoom.jsx"));

class GLBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function Placeholder({ label }) {
  return (
    <div className="flex size-full items-center justify-center">
      <span className="font-mono text-xs text-ink-faint">{label}</span>
    </div>
  );
}

export default function DevRoomCanvas({ className = "" }) {
  const { isDark } = useTheme();
  return (
    <div className={className}>
      <GLBoundary fallback={<Placeholder label="// 3D scene unavailable" />}>
        <Suspense fallback={<Placeholder label="// loading room…" />}>
          <DevRoom dark={isDark} className="size-full" />
        </Suspense>
      </GLBoundary>
    </div>
  );
}
