import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
  return (
    <div>
      <div className="divider">OR</div>
      <div className="w-full text-center my-4">
        <button className="btn">
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
