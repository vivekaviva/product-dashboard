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

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <small className="text-danger">{errors.title.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          {...register("description", { required: "Description is required" })}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, min: 1 })}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Discount %</label>
          <input
            type="number"
            className="form-control"
            {...register("discountPercentage", {
              required: true,
              min: 0,
              max: 100,
            })}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Thumbnail URL</label>
        <input
          className="form-control"
          {...register("thumbnail", { required: true })}
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
