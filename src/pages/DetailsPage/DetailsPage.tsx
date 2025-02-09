import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { CardInfo } from '../../types';
import { API, API_EPISODE } from '../../utils/constants';
import Loader from '../../components/Loader/Loader';
import './DetailsPage.css';

const DetailsPage = () => {
  const [details, setDetails] = useState<CardInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { pageId, detailsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setLoading(true);
    const url = `${API}/${detailsId}`;
    fetch(url)
      .then((response) => response.json())
      .then((value: CardInfo) => {
        if (value?.error) {
          setError(true);
        } else {
          setDetails(value);
        }
        setLoading(false);
      });
  };

  const closeDetails = () => {
    navigate(`/${pageId}`);
  };

  return error ? (
    <Navigate to="/error404" />
  ) : (
    <div className="details-wrapper">
      {loading || !details ? (
        <Loader />
      ) : (
        <div className="item-details-wrapper">
          <img src={details.image} className="item-image" />
          <span className="item-text">Name: {details.name}</span>
          <span className="item-text">Gender: {details.gender}</span>
          <span className="item-text">Species: {details.species}</span>
          <span className="item-text">Status: {details.status}</span>
          <span className="item-text">Type: {details.type}</span>
          <span className="item-text">Origin: {details.origin.name}</span>
          <span className="item-text">Location: {details.location.name}</span>
          <span className="item-text">
            Episode: {details.episode[0].replace(API_EPISODE, '')}
          </span>
          <button onClick={() => closeDetails()}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
