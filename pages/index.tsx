import React, { useEffect } from 'react';
import MainPage from '../src/components/MainPage/MainPage';
import { useAppDispatch, wrapper } from '../src/store/store';
import { rickApi } from '../src/store/api/rickApi';
import { setData, setParams } from '../src/store/slices/appSlice';
import { ApiResponse, CardInfo } from '../src/types';
import { getNumberFromString } from '../src/utils/utils';
import { EMPTY_SEARCH } from '../src/utils/constants';
import { useRouter } from 'next/navigation';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.query.page
      ? getNumberFromString(context.query['page'])
      : 1;
    const details = context.query.page
      ? getNumberFromString(context.query['details'])
      : undefined;
    if (!page) {
      return {
        redirect: {
          permanent: false,
          destination: '404',
        },
        props: {
          searchTerm: EMPTY_SEARCH,
          page: 1,
          detailsResult: undefined,
          currentPageCards: undefined,
        },
      };
    }

    const searchTerm = (context.query['search'] as string) ?? EMPTY_SEARCH;
    const cardsResult = await store.dispatch(
      rickApi.endpoints.getCards.initiate({
        searchTerm,
        page: page ?? 1,
      })
    );

    const detailsResult = details
      ? await store.dispatch(
          rickApi.endpoints.getDetails.initiate({
            id: details.toString(),
          })
        )
      : undefined;

    await Promise.all(store.dispatch(rickApi.util.getRunningQueriesThunk()));

    return {
      props: {
        searchTerm,
        page,
        currentPageCards: cardsResult.data,
        detailsResult: detailsResult?.data,
      },
    };
  }
);

export default function Page(props: {
  searchTerm: string;
  page: number;
  currentPageCards: ApiResponse | undefined;
  detailsResult: CardInfo | undefined;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (props.currentPageCards) {
      dispatch(
        setParams({
          page: props.page,
          searchTerm: props.searchTerm,
        })
      );
      dispatch(
        setData({
          currentDetails: props.detailsResult,
          currentPageCards: props.currentPageCards,
        })
      );
    } else {
      dispatch(
        setParams({
          page: 1,
          searchTerm: EMPTY_SEARCH,
        })
      );
      dispatch(
        setData({
          currentPageCards: undefined,
        })
      );
      router.push(`404`);
    }
  });

  return <MainPage />;
}
