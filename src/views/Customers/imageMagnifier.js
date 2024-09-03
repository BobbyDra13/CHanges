import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
const ZoomOnHover = ({ smallImageSrc, largeImageSrc, alt = 'image', magnification = 2 }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const smallImageRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const smallImage = smallImageRef.current;

    if (!smallImage) return;

    const updatePopupBackground = (e) => {
      const { left, top, width, height } = smallImage.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setCursorPosition({ x, y });

      // Calculate popup position
      const popupLeft = left + width + 20; // 20px offset from the image
      const popupTop = top;
      setPopupPosition({ left: popupLeft, top: popupTop });
    };

    const handleMouseEnter = () => setIsPopupOpen(true);
    const handleMouseLeave = () => setIsPopupOpen(false);

    smallImage.addEventListener('mouseenter', handleMouseEnter);
    smallImage.addEventListener('mouseleave', handleMouseLeave);
    smallImage.addEventListener('mousemove', updatePopupBackground);

    return () => {
      smallImage.removeEventListener('mouseenter', handleMouseEnter);
      smallImage.removeEventListener('mouseleave', handleMouseLeave);
      smallImage.removeEventListener('mousemove', updatePopupBackground);
    };
  }, []);

  // Popup component
  const Popup = () => (
    <div
      ref={popupRef}
      className="fixed w-96 h-96 border-2 border-gray-300 shadow-lg bg-no-repeat z-50"
      style={{
        backgroundImage: `url(${largeImageSrc})`,
        backgroundSize: `${magnification * 100}%`,
        backgroundPosition: `${cursorPosition.x * 100}% ${cursorPosition.y * 100}%`,
        left: `${popupPosition.left}px`,
        top: `${popupPosition.top}px`
      }}
    />
  );

  return (
    <>
      <div className="relative inline-block">
        <img ref={smallImageRef} src={smallImageSrc} alt={alt} className="max-w-full h-auto border border-gray-300" />
      </div>

      {isPopupOpen && ReactDOM.createPortal(<Popup />, document.body)}
    </>
  );
};

export default ZoomOnHover;
