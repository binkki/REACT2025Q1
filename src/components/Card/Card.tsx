import { useNavigate, useParams } from 'react-router';
import { CardInfo } from '../../types';
import './Card.css';

const Card = (props: { cardInfo: CardInfo }) => {
  const { cardInfo } = props;
  const { pageId, detailsId } = useParams();
  const navigate = useNavigate();

  const openDetails = () => {
    const characterId = cardInfo.id;
    if (detailsId) navigate(`/${pageId}`);
    else navigate(`/${pageId}/${characterId}`);
  };

  return (
    <div className="item-wrapper" onClick={() => openDetails()}>
      <img src={cardInfo.image} className="item-image" />
      <div className="item-title">{cardInfo.name}</div>
    </div>
  );
};

export default Card;
