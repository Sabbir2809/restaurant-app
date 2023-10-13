import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";

const Recommends = () => {
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/menu-details").then(({ data }) => {
      const popular = data?.data?.filter((item) => item?.category === "popular");
      setRecommends(popular);
    });
  }, []);

  return (
    <section>
      <SectionTitle heading={"CHEF RECOMMENDS"} subHeading={"Should Try"} />
      <div className="grid md:grid-cols-3 gap-10 justify-center">
        {recommends.map((items) => (
          <Card key={items._id} items={items} />
        ))}
      </div>
    </section>
  );
};

export default Recommends;
