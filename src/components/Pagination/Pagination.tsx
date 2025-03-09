import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../../store/slices/appSlice';
import { RootState } from '../../store/store';
import { useRouter } from 'next/navigation';
import { EMPTY_SEARCH } from '../../utils/constants';

const Pagination = () => {
  const currentParams = useSelector((state: RootState) => state.app.params);
  const totalPage = useSelector(
    (state: RootState) => state.app.data.currentPageCards?.info?.pages
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const changePage = (newPage: number) => {
    dispatch(
      setParams({
        page: newPage,
        details: undefined,
      })
    );
    const currentSearch = currentParams.searchTerm.length
      ? `&search=${currentParams.searchTerm}`
      : EMPTY_SEARCH;
    router.push(`/?page=${newPage}${currentSearch}`);
  };

  return (
    <div className="flex-row pagination" data-testid="pagination-container">
      {[...Array(totalPage).keys()].map((x: number) => {
        return (
          <span
            onClick={() => changePage(x + 1)}
            className={x + 1 === currentParams.page ? 'page current' : 'page'}
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
