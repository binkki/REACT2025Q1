import { useEffect, useState } from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API, SEARCH_KEY } from '../../utils/constants';
import { ApiResponse, CardInfo } from '../../types';
import { getLsValue } from '../../utils/utils';
import Loader from '../../components/Loader/Loader';

const MainPage = () => {
  const [items, setItems] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    setLoading(true);
    fetch(API + getLsValue(SEARCH_KEY))
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        setItems(value.results ?? []);
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
