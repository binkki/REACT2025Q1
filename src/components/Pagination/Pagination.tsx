import { useNavigate } from 'react-router';
import './Pagination.css';
import { useDispatch } from 'react-redux';
import { setPage } from '../../store/slices/appSlice';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  update: () => void;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPage, update } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
    update();
    navigate(`/${newPage}`);
  };

  return (
    <div className="pagination" data-testid="pagination-container">
      {[...Array(totalPage).keys()].map((x: number) => {
        return (
          <span
            onClick={() => changePage(x + 1)}
            className={x + 1 === currentPage ? 'page current' : 'page'}
            key={x}
            data-testid={`pagination-page-${x + 1}`}
          >
            {x + 1}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
