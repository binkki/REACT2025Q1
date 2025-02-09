import Card from '../Card/Card';
import { CardInfo } from '../../types';
import { ERROR_MESSAGE } from '../../utils/constants';
import './CardList.css';

const CardList = (props: { cards: CardInfo[] }) => {
  const { cards } = props;

  return cards.length > 0 ? (
    <>
      <div className="card-flex" data-testid={'card-list'}>
        {cards.map((card: CardInfo) => (
          <div key={card.id} className="card-item" data-testid={'card-item'}>
            <Card cardInfo={card} />
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div>{ERROR_MESSAGE}</div>
    </>
  );
};

export default CardList;
