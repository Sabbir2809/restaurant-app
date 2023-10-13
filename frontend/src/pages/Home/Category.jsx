import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../components/SectionTitle";
import slider1 from "./../../assets/home/slide1.jpg";
import slider2 from "./../../assets/home/slide2.jpg";
import slider3 from "./../../assets/home/slide3.jpg";
import slider4 from "./../../assets/home/slide4.jpg";

const Category = () => {
  return (
    <>
      <SectionTitle heading={"Order Online"} subHeading={"From 11.00 AM to 10.00 PM"} />
      {/* Package Name: swiper */}
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24">
        <SwiperSlide>
          <img src={slider1} alt="slider1" />
          <h3 className="text-2xl uppercase text-center -mt-12 mb-12 text-white">Salads</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="slider2" />
          <h3 className="text-2xl uppercase text-center -mt-12 mb-12 text-white">Pizzas</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="slider3" />
          <h3 className="text-2xl uppercase text-center -mt-12 mb-12 text-white">Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="slider4" />
          <h3 className="text-2xl uppercase text-center -mt-12 mb-12 text-white">Desserts</h3>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Category;
