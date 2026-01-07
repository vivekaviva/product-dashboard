import type { Product } from "../store/productTypes";
import { calculateDiscountPrice } from "../helpers/calculateDiscountedPrice";

interface ProductCardProps {
  product: Product;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: "list" | "detail";
}

const ProductCard = ({
  product,
  onView,
  onEdit,
  onDelete,
  variant = "list",
}: ProductCardProps) => {
  const discountPrice = calculateDiscountPrice(
    product.price,
    product.discountPercentage
  );

  const isDetail = variant === "detail";

  return (
    <div className={`card shadow-sm ${isDetail ? "p-4" : "h-100"}`}>
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{
          height: isDetail ? "300px" : "180px",
          objectFit: isDetail ? "contain" : "cover",
        }}
      />

      <div className="card-body">
        <h3 className={isDetail ? "card-title" : "h5"}>{product.title}</h3>

        <p className="text-muted">
          {isDetail
            ? product.description
            : `${product.description.slice(0, 80)}...`}
        </p>

        <p>
          <span className="text-decoration-line-through text-muted">
            ₹{product.price}
          </span>{" "}
          <span className="fw-bold text-success">₹{discountPrice}</span>
        </p>

        <p>⭐ {product.rating}</p>

        <div className="d-flex gap-2">
          {onView && !isDetail && (
            <button className="btn btn-primary" onClick={onView}>
              View
            </button>
          )}

          {onEdit && (
            <button className="btn btn-warning" onClick={onEdit}>
              Edit
            </button>
          )}

          {onDelete && !isDetail && (
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
