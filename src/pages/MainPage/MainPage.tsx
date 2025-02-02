import React from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';

class MainPage extends React.Component {
  search: Search;
  cards: CardList;

  constructor(props: object) {
    super(props);
    this.search = new Search(props);
    this.cards = new CardList(props);
  }

  render() {
    return (
      <div className="main-wrapper">
        {this.search.render()}
        {this.cards.render()}
      </div>
    );
  }
}

export default MainPage;
