import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { noop } from './helpers';

import '../styles.css';

export function Pages({ children, onZoom = noop, zoomable = false, zooming = false }) {
  const handlePinchingStop = (e) => {
    const isZooming = e.state.scale > 1;
    onZoom(isZooming);
  };

  return (
    <TransformWrapper
      disabled={!zoomable}
      doubleClick={{ mode: 'reset' }}
      initialScale={1}
      panning={{ disabled: !zooming }}
      onPinchingStop={handlePinchingStop}
    >
      <div className="Page" onDoubleClick={() => onZoom(false)}>
        <TransformComponent>{children}</TransformComponent>
      </div>
    </TransformWrapper>
  );
}
