const Card = ({ items }) => {
  const { image, price, name, recipe } = items;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt={name} className="rounded-xl" />
      </figure>
      <p className="absolute right-0 mr-10 mt-10 bg-slate-700 text-white px-2">${price}</p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button className="btn btn-outline bg-slate-200 border-0 border-b-4 border-orange-500 mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
