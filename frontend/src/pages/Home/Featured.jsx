import SectionTitle from "../../components/SectionTitle";
import featuredIMG from "./../../assets/home/featured.jpg";
import classes from "./../../styles/featured.module.css";

const Featured = () => {
  return (
    <div className={`${classes.featured__item} bg-fixed text-white pt-8 my-20`}>
      <SectionTitle heading={"Featured item"} subHeading={"Check it Out"} />
      <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-30 pb-20 pt-12 px-36">
        <div>
          <img src={featuredIMG} alt="" />
        </div>
        <div className="md:ml-10">
          <p>October 01, 2023</p>
          <p className="uppercase"> Where can I get some?</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus cumque mollitia harum
            totam! Corrupti mollitia nulla dolore quos nam dolorum corporis quo dicta quisquam. Laudantium ad,
            officia maiores ab temporibus ex sapiente tempore at earum expedita in, omnis sequi tempora!
          </p>
          <button className="btn btn-outline bg-slate-200 border-0 border-b-4 border-orange-500  mt-4">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
