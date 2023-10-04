import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import useMenu from "../../hooks/useMenu";
import Cover from "../Common/Cover";
import bannerImg from "./../../assets/menu/banner3.jpg";
import dessertImg from "./../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "./../../assets/menu/pizza-bg.jpg";
import saladImg from "./../../assets/menu/salad-bg.jpg";
import soupImg from "./../../assets/menu/soup-bg.jpg";
import MenuCategory from "./MenuCategory";

const Menu = () => {
  const [menu] = useMenu();

  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  return (
    <div>
      <Helmet>
        <title>Restaurant || Our Menu</title>
      </Helmet>
      <Cover bgImage={bannerImg} title={"Our Menu"} />
      <SectionTitle heading={"Today's Offer"} subHeading={"Don't Miss"} />
      <MenuCategory items={offered} title={"offered"} img={dessertImg} />
      <MenuCategory items={dessert} title={"dessert"} img={dessertImg} />
      <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} />
      <MenuCategory items={salad} title={"salad"} img={saladImg} />
      <MenuCategory items={soup} title={"soup"} img={soupImg} />
    </div>
  );
};

export default Menu;
