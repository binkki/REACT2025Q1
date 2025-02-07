import './Pagination.css';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  update: (newSearch: string | undefined, newPage: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPage, update } = props;

  const changePage = (newPage: number) => {
    update(undefined, newPage);
  };

  return (
    <div className="pagination">
      {[...Array(totalPage).keys()].map((x: number) => {
        return (
          <span
            onClick={() => changePage(x + 1)}
            className={x + 1 === currentPage ? 'page current' : 'page'}
            key={x}
          >
            {x + 1}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
