import { useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { noop } from './helpers';

function getX(el) {
  return el.getBoundingClientRect().left;
}

export function usePager({
  current = 0,
  pagesCount = 0,
  pageWidth = window.innerWidth,
  onChange = noop,
  onPrevious = noop,
  onNext = noop,
  scrollable = false,
  transitionless = false
}) {
  const ref = useRef();
  const controls = useAnimation();
  const [dragging, setDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(current);
  const width = pageWidth;
  const dragConstraints = {
    left: -width * (pagesCount - 1),
    right: 0
  };

  useEffect(() => {
    setCurrentIndex(current);
  }, [current]);

  const handleDragStart = () => setDragging(true);

  const handleDrag = (event, info) => {
    const slidesX = getX(ref.current);
    const nextIndex = Math.round(Math.abs(slidesX) / width);
    if (currentIndex !== nextIndex) {
      setCurrentIndex(nextIndex);
      onChange(nextIndex);

      if (info.delta.x < 0) {
        onNext(nextIndex);
      } else {
        onPrevious(nextIndex);
      }
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    // Transitions to the current index in case it has changed.
    if (!scrollable) {
      controls.start({ x: -width * currentIndex });
    }
  };

  useEffect(() => {
    if (!dragging) {
      if (transitionless) {
        controls.set({ x: -width * currentIndex });
      } else {
        controls.start({ x: -width * currentIndex });
      }
    }
  }, [controls, currentIndex, dragging, transitionless, width]);

  return {
    controls,
    dragConstraints,
    ref,
    handleDrag,
    handleDragEnd,
    handleDragStart
  };
}
