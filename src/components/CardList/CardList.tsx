import { Card } from '../Card';
import { CardInfo } from '../../types';
import { ERROR_MESSAGE } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { DetailsPage } from '../DetailsPage';

export const CardList = () => {
  const cards = useSelector(
    (state: RootState) => state.app.data.currentPageCards?.results
  );
  const detailsId = useSelector((state: RootState) => state.app.params.details);

  return cards && cards?.length > 0 ? (
    <div className="flex-row items-wrapper">
      <div className="flex-row card-flex" data-testid={'card-list'}>
        {cards.map((card: CardInfo) => (
          <div key={card.id} className="card-item" data-testid={'card-item'}>
            <Card cardInfo={card} />
          </div>
        ))}
      </div>
      {detailsId && <DetailsPage />}
    </div>
  ) : (
    <>
      <div className="flex-row items-wrapper">{ERROR_MESSAGE}</div>
    </>
  );
};
