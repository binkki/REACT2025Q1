import React from 'react';
import Card from '../Card/Card';
import { CardInfo } from '../../types';
import { ERROR_MESSAGE } from '../../utils/constants';

class CardList extends React.Component {
  cards: CardInfo[];

  constructor(props: { cards: CardInfo[] }) {
    super(props);
    this.cards = [];
    if (props.cards) this.cards.push(...props.cards);
  }

  render() {
    return this.cards.length > 0 ? (
      <>
        <div>
          {this.cards.map((card: CardInfo) => (
            <div key={card.url}>{new Card({ info: card }).render()}</div>
          ))}
        </div>
      </>
    ) : (
      <>
        <div>{ERROR_MESSAGE}</div>
      </>
    );
  }
}

export default CardList;
