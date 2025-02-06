import { useEffect, useState } from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API } from '../../utils/constants';
import { ApiResponse, CardInfo } from '../../types';
import Loader from '../../components/Loader/Loader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const MainPage = () => {
  const [items, setItems] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { setSearchValue, getSearchValue } = useLocalStorage();

  useEffect(() => {
    search();
  }, []);

  const search = async (searchTerm?: string) => {
    setLoading(true);
    const lastSearch = searchTerm ?? getSearchValue();
    fetch(API + lastSearch)
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        setItems(value.results ?? []);
        setSearchValue(lastSearch);
        setLoading(false);
      });
  };

  return (
    <div className="main-wrapper">
      <Search search={search} />
      {loading ? <Loader /> : <CardList cards={items} />}
    </div>
  );
};

export default MainPage;
