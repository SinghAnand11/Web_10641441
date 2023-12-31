import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { imagetoBase64 } from "../utility/imagetoBase64";
import { useDispatch } from "react-redux";
import { createProductAsync } from "../features/product/ProductSlice";
import { useNavigate } from "react-router-dom";


const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const navigate=useNavigate()

  const dispatch=useDispatch()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(createProductAsync(data))
    setData({
      name: "",
      category: "",
      image: "",
      price: "",
      description: "",
    })

    navigate("/")
  };
  return (
    <div className="p-4 ">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl cursor-pointer">
                <BsCloudUpload />
              </span>
            )}
            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"number"}
          className="bg-slate-200 p-1 my-3 "
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-3 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>
        <button disabled={!(data.name && data.category && data.description && data.image && data.price)} className="bg-red-500 hover:bg-red-600 text-lg font-md  drop-shadow my-2 ">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
