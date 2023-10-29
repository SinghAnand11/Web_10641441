import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    // e.stopPropogation();
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  const handleDelete = (id) => {
    console.log({id},"HERE");
    const itemIdToDelete = {id};

    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product/:${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to delete item');
        }
      })
      .then((data) => {
        console.log(data);
        // Handle success (e.g., show a confirmation message)
      })
      .catch((error) => {
        console.error(error);
        // Handle error (e.g., show an error message)
      });
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg  py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">£</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 w-full"
            onClick={handleAddCartProduct}
          >
            {" "}
            Add Cart
          </button>
          <button
            className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 w-full"
            onClick={()=>{handleDelete(id)}}
          > Delete Item
            </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
