import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  fetchProducts,
  searchProducts,
  deleteProduct,
} from "../store/productSlice";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products, total, limit, skip, listLoading } = useAppSelector(
    (state) => state.products
  );

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  // Initial fetch & pagination
  useEffect(() => {
    if (products.length === 0 && !debouncedSearch) {
      dispatch(fetchProducts({ limit, skip: 0 }));
    }
  }, [dispatch, products.length, debouncedSearch, limit]);

  // Debounced search
  useEffect(() => {
    if (debouncedSearch) {
      dispatch(searchProducts(debouncedSearch));
    }
  }, [dispatch, debouncedSearch]);

  const handleNext = () => {
    dispatch(fetchProducts({ limit, skip: skip + limit }));
  };

  const handlePrev = () => {
    dispatch(fetchProducts({ limit, skip: Math.max(skip - limit, 0) }));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {listLoading && <Loader />}

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard
              variant="list"
              product={product}
              onView={() => navigate(`/product/${product.id}`)}
              onEdit={() => navigate(`/product/${product.id}/edit`)}
              onDelete={() => handleDelete(product.id)}
            />
          </div>
        ))}
      </div>

      {!listLoading && products.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onPrev={() =>
              dispatch(
                fetchProducts({ limit, skip: Math.max(skip - limit, 0) })
              )
            }
            onNext={() =>
              dispatch(fetchProducts({ limit, skip: skip + limit }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
