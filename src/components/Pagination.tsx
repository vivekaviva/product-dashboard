interface PaginationProps {
  skip: number;
  limit: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({
  skip,
  limit,
  total,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={onPrev}
        disabled={skip === 0}
      >
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        {skip + 1} - {Math.min(skip + limit, total)} of {total}
      </span>

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={skip + limit >= total}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
