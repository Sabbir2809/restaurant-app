import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import PopularMenu from "./PopularMenu";
import Recommends from "./Recommends";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Restaurant || Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <ContactUs></ContactUs>
      <Recommends></Recommends>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
