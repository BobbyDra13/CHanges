import { Children, useState } from 'react';
import { motion } from 'framer-motion';

import { Pages } from './Pages';
import { noop } from './helpers';
import { usePager } from './usePager';

import '../styles.css';

export function Pager({
  children,
  current = 0,
  onChange = noop,
  onPrevious = noop,
  onNext = noop,
  pageWidth,
  zoomable = false,
  scrollable = false,
  transitionless = false
}) {
  const pages = Children.toArray(children);
  const [zooming, setZooming] = useState(false);
  const { controls, dragConstraints, handleDrag, handleDragEnd, handleDragStart, ref } = usePager({
    current,
    pagesCount: pages.length,
    pageWidth,
    onChange,
    onPrevious,
    onNext,
    scrollable,
    transitionless
  });

  const handleZoom = (isZooming) => setZooming(isZooming);

  return (
    <motion.div
      animate={controls}
      className="Pager"
      drag={!zooming && 'x'}
      dragConstraints={dragConstraints}
      dragElastic={0.05}
      dragMomentum={scrollable}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onComplete={(e) => console.log('>>>> lolol', e)}
      ref={ref}
    >
      {pages.map((item, i) => (
        <Pages key={i} onZoom={handleZoom} zoomable={zoomable} zooming={zooming}>
          {item}
        </Pages>
      ))}
    </motion.div>
  );
}
