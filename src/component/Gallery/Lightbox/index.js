// import { useState } from 'react';
import { Pager } from '../Pager';
// import { noop } from '../Pager/helpers';
// import { noop } from '../Pager/helpers';
import '../styles.css';

export default function Lightbox({ img = '' }) {
  //   const [currentIndex, setCurrentIndex] = useState(current);
  //   const handleChange = (index) => {
  //     setCurrentIndex(index);
  //     onChange(index);
  //   };

  return (
    <div className="Lightbox">
      <div className="pages">
        <Pager zoomable transitionless>
          {/* {images.map((image, i) => ( */}
          <img src={img} />
          {/* ))} */}
        </Pager>
      </div>

      {/* <div className="thumbnails">
        <Pager current={currentIndex} pageWidth={140} scrollable>
          {images.map((image, i) => (
            <button key={i} onClick={() => handleChange(i)}>
              <img key={i} alt={i} src={image.url} />
            </button>
          ))}
        </Pager>
      </div> */}
    </div>
  );
}
