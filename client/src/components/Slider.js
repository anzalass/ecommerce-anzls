import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import "./component.css";

function Slider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: false }}
        onSlideChange={() => console.log("slide CHANGE")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img className="slider" src={b1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slider" src={b1} alt="" />{" "}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
