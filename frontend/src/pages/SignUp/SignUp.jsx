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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up</h1>
            <p className="py-6">Restaurant Registration Page</p>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter Name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">Name is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Enter Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && <span className="text-red-600">Photo URL is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                  })}
                  placeholder="Enter Email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">Email is Required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Enter Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is Required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">Password Length 6 Character</span>
                )}
              </div>

              <div className="form-control mt-6">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
            <p className="text-center m-4">
              <small>
                Already Account? <Link to={"/login"}>Please Login</Link>
              </small>
            </p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
