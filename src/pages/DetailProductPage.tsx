import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProductById } from "../redux/slice/productSlice";
import { useParams } from "react-router";

const DetailProductPage: React.FC<{ id: number }> = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <div>
      <div className="container mt-32">
        <div className="sm:flex justify-between items-center">
          <h2 className="text-4xl font-medium">Detalle de producto</h2>
          <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0"></div>
        </div>
        {product ? (
          <div className="border border-gray-300 pl-5 mt-3">
            <h1>{product.name}</h1>
            <p>{id}</p>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
          </div>
        ) : (
          <div>Product not found</div>
        )}
      </div>
    </div>
  );
};

export default DetailProductPage;
