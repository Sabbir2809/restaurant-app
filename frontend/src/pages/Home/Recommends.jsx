import { useEffect, useState } from "react";
import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";

const Recommends = () => {
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const recommendItem = data.filter((item) => item.category === "popular");
        setRecommends(recommendItem);
      });
  }, []);
  return (
    <section>
      <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"Should Try"} />
      <div className="md:flex gap-4 justify-center items-center">
        {recommends.map((recommend) => (
          <Card key={recommend._id} recommend={recommend} />
        ))}
      </div>
    </section>
  );
};

export default Recommends;
