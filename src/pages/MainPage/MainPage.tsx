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
import { setData, setError, setParams } from '../../store/slices/appSlice';
import { useGetCardsQuery } from '../../store/api/rickApi';
import ThemeButton from '../../components/ThemeButton/ThemeButton';

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
        dispatch(
          setError({
            pageError: 'Wrong page',
            detailsError: undefined,
          })
        );
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

  useEffect(() => {
    if (error) {
      dispatch(
        setError({
          pageError: 'Wrong search term',
          detailsError: undefined,
        })
      );
    }
  }, [error]);

  useEffect(() => {
    dispatch(
      setData({
        currentPageCards: data,
        currentDetails: undefined,
      })
    );
  }, [data]);

  return error ? (
    <Navigate to="/error404" />
  ) : (
    <div className="flex-column main-wrapper">
      <div className="flex-row">
        <Search />
        <ThemeButton />
      </div>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="flex-row items-wrapper">
              <CardList />
              <Outlet />
            </div>
          </div>
          {data.results?.length && data.info && <Pagination />}
        </>
      )}
      <Flyout />
    </div>
  );
};

export default MainPage;
