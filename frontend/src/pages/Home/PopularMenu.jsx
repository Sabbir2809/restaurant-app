import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuItem from "../Common/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  return (
    <>
      <section className="mb-12">
        <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items"} />
        <div className="grid md:grid-cols-2 gap-10">
          {popular.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to={"/menu"}
            className="btn btn-outline bg-slate-200 border-0 border-b-4 border-orange-500  mt-4">
            View Full Menu
          </Link>
        </div>
      </section>
    </>
  );
};

export default PopularMenu;
