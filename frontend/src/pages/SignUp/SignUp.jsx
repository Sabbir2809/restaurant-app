import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle submit
  const onSubmit = (data) => {
    createUser(data.email, data.password).then(() => {
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const info = { name: data.name, email: data.email };
          fetch("http://localhost:8000/api/user-profile", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === true) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User Registration Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Restaurant || Sign Up</title>
      </Helmet>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Sign Up Page</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                id="name"
              />
              {errors.name && <span className="text-red-600">Name is Required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="photoURL" className="block text-gray-600">
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Enter Photo URL"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                id="photoURL"
              />
              {errors.photoURL && <span className="text-red-600">Photo URL is Required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                })}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                id="email"
              />
              {errors.email && <span className="text-red-600">Email is Required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Enter Password"
                id="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is Required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">Password Length 6 Character</span>
              )}
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            />
          </form>
          <div className="mt-6 text-blue-500 text-center">
            Already Account? <Link to={"/login"}>Please Login</Link>
          </div>
          <SocialLogin></SocialLogin>
        </div>
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="./../../../public/login.svg" alt="Logo" className="object-cover w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
