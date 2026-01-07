import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { fetchProductById, updateProduct } from "../store/productSlice";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedProduct, detailLoading } = useAppSelector(
    (state) => state.products
  );

  const updateProductTest = async (data: any) => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("SUCCESS RESPONSE:", response.data);
    } catch (error: any) {
      console.error("ERROR RESPONSE:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  //   useEffect(() => {
  //     updateProductTest();
  //   }, []);

  //   const handleUpdate = async (data: any) => {
  //     if (!id) return;

  //     console.log("type", typeof id);
  //     console.log("type", typeof Number(id));

  //     try {
  //       const updatedProduct = await dispatch(
  //         updateProduct({
  //           id: Number(id),
  //           data,
  //         })
  //       ).unwrap();

  //       console.log("UPDATED PRODUCT:", updatedProduct);

  //       // navigate(`/product/${id}`);
  //     } catch (error) {
  //       console.error("UPDATE FAILED:", error);
  //     }
  //   };

  if (detailLoading || !selectedProduct) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Product</h3>

      <ProductForm
        initialValues={selectedProduct}
        onSubmit={updateProductTest}
        isSubmitting={detailLoading}
      />
    </div>
  );
};

export default ProductEdit;
