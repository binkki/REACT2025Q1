import Search from '../Search/Search';
import CardList from '../CardList/CardList';
import Pagination from '../Pagination/Pagination';
import Flyout from '../Flyout/Flyout';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import ThemeButton from '../ThemeButton/ThemeButton';

const MainPage = () => {
  const data = useSelector(
    (state: RootState) => state.app.data.currentPageCards
  );

  return (
    <div className="flex-column main-wrapper">
      <div className="flex-row">
        <Search />
        <ThemeButton />
      </div>
      <div>
        <CardList />
      </div>
      {data?.results?.length && data.info && <Pagination />}
      <Flyout />
    </div>
  );
};

export default MainPage;
