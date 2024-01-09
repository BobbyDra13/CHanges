function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-[11px] shadow-md ml-1`}
      style={{ ...style, display: 'block', background: '#d1d5db' }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-[11px] shadow-md mr-1`}
      style={{ ...style, display: 'block', background: '#d1d5db' }}
      onClick={onClick}
    />
  );
}

export const settings = {
  dots: false,
  // focusOnSelect: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  // initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1526,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1040,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default settings;
