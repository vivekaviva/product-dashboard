import { useForm } from "react-hook-form";
import type { Product } from "../store/productTypes";

interface ProductFormProps {
  initialValues?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  isSubmitting?: boolean;
}

const ProductForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm">
      <h4 className="mb-3">Product Details</h4>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          {...register("title", {
            required: "Title is required",
          })}
        />
        <div className="invalid-feedback">{errors.title?.message}</div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          rows={3}
          {...register("description", {
            required: "Description is required",
          })}
        />
        <div className="invalid-feedback">{errors.description?.message}</div>
      </div>

      {/* Price */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className={`form-control ${errors.price ? "is-invalid" : ""}`}
          {...register("price", {
            required: "Price is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
        />
        <div className="invalid-feedback">{errors.price?.message}</div>
      </div>

      {/* Discount */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Discount %</label>
        <input
          type="number"
          className={`form-control ${
            errors.discountPercentage ? "is-invalid" : ""
          }`}
          {...register("discountPercentage", {
            required: "Discount is required",
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
            max: {
              value: 100,
              message: "Discount cannot exceed 100%",
            },
          })}
        />
        <div className="invalid-feedback">
          {errors.discountPercentage?.message}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mb-3">
        <label className="form-label">Thumbnail URL</label>
        <input
          className={`form-control ${errors.thumbnail ? "is-invalid" : ""}`}
          {...register("thumbnail", {
            required: "Thumbnail URL is required",
          })}
        />
        <div className="invalid-feedback">{errors.thumbnail?.message}</div>
      </div>

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
