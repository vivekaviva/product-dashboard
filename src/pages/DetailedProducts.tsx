import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProductById, resetSelectedProduct } from "../store/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import Loader from "../components/Loader";
import { calculateDiscountPrice } from "../helpers/calculateDiscountedPrice";

const DetailedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, detailLoading } = useAppSelector(
    (state) => state.products
  );
  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchProductById(Number(id)));
  //   }
  //   return () => {
  //     dispatch(resetSelectedProduct());
  //   };
  // }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;

    // 🔥 Only fetch if product is NOT already in store
    if (!selectedProduct || selectedProduct.id !== Number(id)) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id, selectedProduct]);

  console.log(id);
  console.log(selectedProduct);
  if (detailLoading || !selectedProduct) {
    return <Loader />;
  }

  const discountPrice = calculateDiscountPrice(
    selectedProduct.price,
    selectedProduct.discountPercentage
  );
  console.log("discountPrice", discountPrice);
  return (
    <div className="container mt-4">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <ProductCard
            product={selectedProduct}
            variant="detail"
            onEdit={() => navigate(`/product/${selectedProduct.id}/edit`)}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
