'use client';
import { Search } from '../Search/Search';
import { CardList } from '../CardList/CardList';
import { Pagination } from '../Pagination/Pagination';
import { Flyout } from '../Flyout/Flyout';
import { useDispatch } from 'react-redux';
import { ThemeButton } from '../ThemeButton/ThemeButton';
import { ApiResponse, CardInfo } from '../../types';
import { useEffect, useState } from 'react';
import { setData, setParams } from '../../store/slices/appSlice';
import { EMPTY_SEARCH } from '../../utils/constants';
import { Loader } from '../Loader';

type MainPageProps = {
  cardsData: ApiResponse | undefined;
  detailsData: CardInfo | undefined;
  page: string | undefined;
  detailsId: string | undefined;
  searchTerm: string | undefined;
};

export const MainPage = (props: MainPageProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      setData({
        currentDetails: props.detailsData,
        currentPageCards: props.cardsData,
      })
    );
    dispatch(
      setParams({
        page: props.page ?? 1,
        search: props.searchTerm ?? EMPTY_SEARCH,
        details: props.detailsId,
      })
    );
    setLoading(false);
  }, [props.page, props.searchTerm, props.detailsId]);

  if (loading) return <Loader />;

  return (
    <div className="flex-column main-wrapper">
      <div className="flex-row">
        <Search />
        <ThemeButton />
      </div>
      <div>
        <CardList />
      </div>
      {props.cardsData?.results?.length && props.cardsData.info && (
        <Pagination />
      )}
      <Flyout />
    </div>
  );
};
