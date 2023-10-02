import { Helmet } from "react-helmet-async";

const HelmetSEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetSEO;
