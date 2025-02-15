import Card from '../Card/Card';
import { CardInfo } from '../../types';
import { ERROR_MESSAGE } from '../../utils/constants';
import './CardList.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CardList = () => {
  const cards = useSelector(
    (state: RootState) => state.app.data.currentPageCards?.results
  );

  return cards && cards?.length > 0 ? (
    <>
      <div className="flex-row card-flex" data-testid={'card-list'}>
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
