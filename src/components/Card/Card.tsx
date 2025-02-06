import { CardInfo } from '../../types';
import './Card.css';

const Card = (props: { cardInfo: CardInfo }) => {
  const { cardInfo } = props;

  return (
    <div className="item-wrapper">
      <div className="item-preview">
        <img src={cardInfo.image} className="item-image" />
        <div className="item-title">{cardInfo.name}</div>
      </div>
      <div>
        <p className="item-text">Species: {cardInfo.species}</p>
        <p className="item-text">Gender: {cardInfo.gender}</p>
        <p className="item-text">Status: {cardInfo.status}</p>
      </div>
    </div>
  );
};

export default Card;
