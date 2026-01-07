import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { addProduct } from "../store/productSlice";
import ProductForm from "../components/ProductForm";

const ProductAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.products);

  const handleAdd = async (data: any) => {
    await dispatch(addProduct(data));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Add Product</h3>

      <ProductForm onSubmit={handleAdd} isSubmitting={loading} />
    </div>
  );
};

export default ProductAdd;
