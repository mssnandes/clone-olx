import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselProps } from "../../../types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel: React.FC<CarouselProps> = ({ adInfo }) => {
  const { images } = adInfo;

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={className}
        style={{ display: "block", color: 'black'}}
        onClick={onClick}
      >
        Next
      </ArrowForwardIosIcon>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <ArrowBackIosIcon
        className={className}
        style={{ display: "block", color: 'black' }}
        onClick={onClick}
      >
        Prev
      </ArrowBackIosIcon>
    );
  };

  const settings = {
    dots: false,
    infinite: images!.length > 1,
    speed: 500,
    slidesToShow: Math.min(images?.length || 1, 1),
    slidesToScroll: 1,
    nextArrow: images!.length > 1 ? <NextArrow /> : undefined,
    prevArrow: images!.length > 1 ? <PrevArrow /> : undefined,
  };

  return (
    <Slider {...settings}>
      {images!.map((img, k) => (
        <img key={k} src={img} alt="" />
      ))}
    </Slider>
  );
};

export default ImageCarousel;
