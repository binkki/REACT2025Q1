'use client';
import { API_EPISODE, EMPTY_SEARCH } from '../../utils/constants';
import { setData, setParams } from '../../store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRouter } from 'next/navigation';

export const DetailsPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.app.data.currentDetails);
  const params = useSelector((state: RootState) => state.app.params);
  const router = useRouter();

  const closeDetails = () => {
    dispatch(
      setData({
        currentDetails: undefined,
      })
    );
    dispatch(
      setParams({
        details: undefined,
      })
    );
    const currentPage = params.page;
    const currentSearch = params.searchTerm.length
      ? `&search=${params.searchTerm}`
      : EMPTY_SEARCH;
    router.push(`/?page=${currentPage}${currentSearch}`);
  };

  return (
    <div className="details-wrapper">
      <div className="flex-column item-details-wrapper" data-testid={`details`}>
        <img
          src={data?.image}
          className="item-image"
          data-testid={`details-image`}
        />
        <span className="item-text">Name: {data?.name}</span>
        <span className="item-text">Gender: {data?.gender}</span>
        <span className="item-text">Species: {data?.species}</span>
        <span className="item-text">Status: {data?.status}</span>
        {data?.type && <span className="item-text">Type: {data?.type}</span>}
        <span className="item-text">Origin: {data?.origin.name}</span>
        <span className="item-text">
          Last known location: {data?.location.name}
        </span>
        <span className="item-text">
          First seen in {data?.episode[0].replace(API_EPISODE, '')} episode
        </span>
        <button data-testid={`details-close`} onClick={() => closeDetails()}>
          Close
        </button>
      </div>
    </div>
  );
};
