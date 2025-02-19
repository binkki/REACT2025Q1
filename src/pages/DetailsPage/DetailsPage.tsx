import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import {
  API_EPISODE,
  DETAILS_PAGE_ERROR,
  PAGE_NUMBER_ERROR,
} from '../../utils/constants';
import Loader from '../../components/Loader/Loader';
import './DetailsPage.css';
import { useGetDetailsQuery } from '../../store/api/rickApi';
import { getNumberFromString } from '../../utils/utils';
import { setData, setError, setParams } from '../../store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const DetailsPage = () => {
  const { pageId, detailsId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.app.params.details);
  const { data, isLoading, error } = useGetDetailsQuery({ id });

  useEffect(() => {
    const handlePageChange = async () => {
      const currentPageId = getNumberFromString(pageId);
      const currentDetailsId = getNumberFromString(detailsId);
      if (!currentPageId || !currentDetailsId) {
        dispatch(
          setError({
            pageError: !currentPageId ? PAGE_NUMBER_ERROR : undefined,
            detailsError: !currentDetailsId ? DETAILS_PAGE_ERROR : undefined,
          })
        );
        return navigate('/error404');
      } else {
        dispatch(setParams({ details: detailsId }));
      }
    };
    handlePageChange();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(
        setError({
          detailsError: DETAILS_PAGE_ERROR,
        })
      );
    }
  }, [error]);

  useEffect(() => {
    dispatch(
      setData({
        currentDetails: data,
      })
    );
  }, [data]);

  const closeDetails = () => {
    navigate(`/${pageId}`);
  };

  if (error) return <Navigate to="/error404" />;

  if (isLoading || !data) return <Loader />;

  return (
    <div className="details-wrapper">
      <div className="flex-column item-details-wrapper" data-testid={`details`}>
        <img
          src={data.image}
          className="item-image"
          data-testid={`details-image`}
        />
        <span className="item-text">Name: {data.name}</span>
        <span className="item-text">Gender: {data.gender}</span>
        <span className="item-text">Species: {data.species}</span>
        <span className="item-text">Status: {data.status}</span>
        {data.type && <span className="item-text">Type: {data.type}</span>}
        <span className="item-text">Origin: {data.origin.name}</span>
        <span className="item-text">
          Last known location: {data.location.name}
        </span>
        <span className="item-text">
          First seen in {data.episode[0].replace(API_EPISODE, '')} episode
        </span>
        <button data-testid={`details-close`} onClick={() => closeDetails()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
