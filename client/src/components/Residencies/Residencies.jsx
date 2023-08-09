import "swiper/css";
import React from "react";
import "./Residencies.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import PropertyCard from "../PropertyCard/PropertyCard";

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}> &lt; </button>
      <button onClick={() => swiper.slideNext()}> &gt; </button>
    </div>
  );
};

const Residencies = () => {
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;
