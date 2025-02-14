import { useEffect } from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router';
import { getNumberFromString } from '../../utils/utils';
import Flyout from '../../components/Flyout/Flyout';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../../store/slices/appSlice';
import { useGetCardsQuery } from '../../store/api/rickApi';

const MainPage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.app.params.page);
  const searchTerm = useSelector(
    (state: RootState) => state.app.params.searchTerm
  );
  const { data, isLoading, error } = useGetCardsQuery({
    searchTerm,
    page,
  });

  useEffect(() => {
    const handlePageChange = async () => {
      const currentPage = getNumberFromString(pageId);
      if (!currentPage) {
        return navigate('/error404');
      } else
        dispatch(
          setParams({
            page: currentPage,
          })
        );
    };
    handlePageChange();
  }, []);

  return error ? (
    <Navigate to="/error404" />
  ) : (
    <div className="main-wrapper">
      <Search />
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="items-wrapper">
              <CardList cards={data.results ?? []} />
              <Outlet />
            </div>
          </div>
          {data.results?.length && data.info && (
            <Pagination currentPage={page} totalPage={data.info.pages} />
          )}
        </>
      )}
      <Flyout />
    </div>
  );
};

export default MainPage;
