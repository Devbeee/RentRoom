import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderCustom = ({ images }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((imgUrl, index) => (
            <div key={index} className="flex bg-black justify-center h-[320px]">
              <img
                src={imgUrl}
                alt="slider"
                className="w-full max-h-full object-contain m-auto h-full"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);
