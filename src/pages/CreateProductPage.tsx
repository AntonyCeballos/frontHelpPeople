import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createProduct } from "../redux/slice/productSlice";

const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.products);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convertir `category` y `price` a números
    const numericCategory = Number(category);
    const numericPrice = Number(price);

    // Verificar si las conversiones fueron exitosas
    if (!isNaN(numericCategory) && !isNaN(numericPrice)) {
        dispatch(createProduct({  name, description,  price: numericPrice, category_id: numericCategory, }));
    } else {
        console.error("Category and price must be valid numbers");
    }
    
  };

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Crear Nuevo Producto</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <input className="border border-gray-400 mr-5 py-2 rounded-md"
          type="number"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input className="border border-gray-400 mr-5 py-2 rounded-md"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input className="border border-gray-400 mr-5 py-2 rounded-md"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input className="border border-gray-400 mr-5 py-2 rounded-md"
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={status === "loading"}
          className={
            status == 'loading'
              ? "bg-sky-300 rounded-lg text-white py-3 px-5"
              : "bg-sky-500 rounded-lg text-white py-3 px-5"
          }>
          Crear Producto
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateProductPage;
