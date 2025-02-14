import { useEffect, useState } from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API, API_PAGE, API_SEARCH } from '../../utils/constants';
import { ApiResponse } from '../../types';
import Loader from '../../components/Loader/Loader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Pagination from '../../components/Pagination/Pagination';
import { Navigate, Outlet, useParams } from 'react-router';
import { getNumberFromString } from '../../utils/utils';
import Flyout from '../../components/Flyout/Flyout';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/slices/appSlice';

const MainPage = () => {
  const [response, setResponse] = useState<ApiResponse>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const { setSearchValue } = useLocalStorage();
  const { pageId } = useParams();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.app.page);
  const searchTerm = useSelector((state: RootState) => state.app.searchTerm);

  useEffect(() => {
    const currentPage = getNumberFromString(pageId);
    if (currentPage) {
      dispatch(setPage(currentPage));
      update();
    } else setError(true);
  }, []);

  useEffect(() => {
    search();
  }, [isUpdate]);

  const update = () => {
    setUpdate(!isUpdate);
  };

  const search = async () => {
    setLoading(true);
    const url = `${API}${API_PAGE}${page}&${API_SEARCH}${searchTerm}`;
    fetch(url)
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        if (value.error) {
          setError(true);
        } else {
          setResponse(value);
          setSearchValue(searchTerm);
        }
        setLoading(false);
      });
  };

  return error ? (
    <Navigate to="/error404" />
  ) : (
    <div className="main-wrapper">
      <Search update={update} />
      {loading || !response ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="items-wrapper">
              <CardList cards={response?.results ?? []} />
              <Outlet />
            </div>
          </div>
          {response?.results?.length && response?.info && (
            <Pagination
              currentPage={page}
              totalPage={response.info.pages}
              update={update}
            />
          )}
        </>
      )}
      <Flyout />
    </div>
  );
};

export default MainPage;
