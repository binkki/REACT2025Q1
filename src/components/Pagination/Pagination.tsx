import { useNavigate } from 'react-router';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../../store/slices/appSlice';
import { RootState } from '../../store/store';

const Pagination = () => {
  const currentPage = useSelector((state: RootState) => state.app.params.page);
  const totalPage = useSelector(
    (state: RootState) => state.app.data.currentPageCards?.info?.pages
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePage = (newPage: number) => {
    dispatch(
      setParams({
        page: newPage,
      })
    );
    navigate(`/${newPage}`);
  };

  return (
    <div className="flex-row pagination" data-testid="pagination-container">
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
