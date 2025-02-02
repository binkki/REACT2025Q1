import React from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API, SEARCH_KEY } from '../../utils/constants';
import { ApiResponse, CardInfo } from '../../types';
import { getLsValue } from '../../utils/utils';

class MainPage extends React.Component {
  search: Search;
  cards: CardInfo[];

  constructor(props: object) {
    super(props);
    this.search = new Search(props);
    this.cards = [];
  }

  componentDidMount() {
    fetch(API + getLsValue(SEARCH_KEY))
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        this.cards = value.results;
        this.forceUpdate();
      });
  }

  render() {
    return (
      <div className="main-wrapper">
        {this.search.render()}
        {new CardList({ cards: this.cards }).render()}
      </div>
    );
  }
}

export default MainPage;
