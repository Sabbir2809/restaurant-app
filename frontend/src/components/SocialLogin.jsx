import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // handle google login
  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      const info = { name: loggedInUser.displayName, email: loggedInUser.email };

      fetch("http://localhost:8000/api/user-profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="flex items-center mb-2 justify-center">
        <button
          onClick={handleGoogleLogin}
          className=" transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50">
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
