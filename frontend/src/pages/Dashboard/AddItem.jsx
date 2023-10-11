import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_API_TOKEN;
const IMAGE_HOSTING_URL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("access-token");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(IMAGE_HOSTING_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL };

          axios
            .post("http://localhost:8000/api/add-new-item", newItem, {
              headers: { token: token },
            })
            .then((data) => {
              if (data.data.status) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item Added Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <Helmet>
        <title>Restaurant || Add Item</title>
      </Helmet>
      <SectionTitle heading={"Add An Item"} subHeading={"What's New"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold">Recipe Name*</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Recipe Name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex my-4">
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered w-full">
              <option>Pick One</option>
              <option>pizza</option>
              <option>soup</option>
              <option>salad</option>
              <option>dessert</option>
              <option>drinks</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe Details*</span>
          </label>
          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Recipe Details"></textarea>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Item Image*</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <input type="submit" value="Add Item" className="btn btn-primary my-2" />
      </form>
    </div>
  );
};

export default AddItem;
