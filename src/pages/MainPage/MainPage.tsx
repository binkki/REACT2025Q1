import { useEffect, useState } from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API, API_PAGE, API_SEARCH } from '../../utils/constants';
import { ApiResponse } from '../../types';
import Loader from '../../components/Loader/Loader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Pagination from '../../components/Pagination/Pagination';
import { useNavigate, useParams } from 'react-router';
import { getNumberFromString } from '../../utils/utils';

const MainPage = () => {
  const [response, setResponse] = useState<ApiResponse>();
  const [loading, setLoading] = useState(false);
  const { setSearchValue, getSearchValue } = useLocalStorage();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>(getSearchValue());
  const [isUpdate, setUpdate] = useState(false);
  const navigate = useNavigate();
  const { pageId } = useParams();

  useEffect(() => {
    const currentPage = getNumberFromString(pageId);
    if (currentPage) update(undefined, currentPage);
  }, []);

  useEffect(() => {
    search();
    navigate(`/${page}`);
  }, [isUpdate]);

  const update = (newSearch: string | undefined, newPage: number) => {
    if (newSearch !== undefined) setSearchTerm(newSearch);
    setPage(newPage);
    setUpdate(!isUpdate);
  };

  const search = async () => {
    setLoading(true);
    const url = `${API}${API_PAGE}${page}&${API_SEARCH}${searchTerm}`;
    fetch(url)
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        setResponse(value);
        setSearchValue(searchTerm);
        setLoading(false);
      });
  };

  return (
    <div className="main-wrapper">
      <Search update={update} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <CardList cards={response?.results ?? []} />
          {response?.results?.length && response?.info && (
            <Pagination
              currentPage={page}
              totalPage={response.info.pages}
              update={update}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MainPage;
