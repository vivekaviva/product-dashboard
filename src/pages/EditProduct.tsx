import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { fetchProductById, updateProduct } from "../store/productSlice";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import type { Product } from "../store/productTypes";

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedProduct, detailLoading } = useAppSelector(
    (state) => state.products
  );

  const handleUpdate = async (data: Partial<Product>) => {
    if (!id) return;

    try {
      const updatedProduct = await dispatch(
        updateProduct({ id: Number(id), data })
      ).unwrap();

      console.log("UPDATED PRODUCT:", updatedProduct);

      navigate(`/product/${id}`);
    } catch (error) {
      console.error("UPDATE FAILED:", error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  if (detailLoading || !selectedProduct) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Product</h3>

      <ProductForm
        initialValues={selectedProduct}
        onSubmit={handleUpdate}
        isSubmitting={detailLoading}
      />
    </div>
  );
};

export default ProductEdit;
