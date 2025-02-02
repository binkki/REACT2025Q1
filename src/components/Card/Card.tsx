import React from 'react';
import { CardInfo } from '../../types';
import './Card.css';

class Card extends React.Component {
  info: CardInfo;

  constructor(props: { info: CardInfo }) {
    super(props);
    this.info = props.info;
  }

  render() {
    return (
      <div className="item-wrapper">
        <div className="item-preview">
          <img src={this.info.image} className="item-image" />
          <div className="item-title">{this.info.name}</div>
        </div>
        <div>
          <p className="item-text">Species: {this.info.species}</p>
          <p className="item-text">Gender: {this.info.gender}</p>
          <p className="item-text">Status: {this.info.status}</p>
        </div>
      </div>
    );
  }
}

export default Card;
