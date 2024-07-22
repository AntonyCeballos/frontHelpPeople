import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCategories } from "../redux/slice/categorySlice";

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { categories, status, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <ul className="p-5 m-5 text-sky-800 text-2xl border border-gray-300 rounded-md">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Categorías</h2>
        <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
        </div>
      </div>      
        {content}
      </div>
  );
};

export default CategoryPage;
