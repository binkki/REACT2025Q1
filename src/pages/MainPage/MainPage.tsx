import React from 'react';
import './MainPage.css';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import { API, SEARCH_KEY } from '../../utils/constants';
import { ApiResponse, CardInfo } from '../../types';
import { getLsValue } from '../../utils/utils';
import Loader from '../../components/Loader/Loader';

class MainPage extends React.Component {
  search: Search;
  cards: CardInfo[] | null = null;
  loader: Loader;

  constructor(props: object) {
    super(props);
    this.search = new Search(props);
    this.loader = new Loader(props);
  }

  componentDidMount() {
    fetch(API + getLsValue(SEARCH_KEY))
      .then((response) => response.json())
      .then((value: ApiResponse) => {
        console.log(value);
        this.cards = value.results ?? [];
        this.forceUpdate();
      });
  }

  render() {
    return (
      <div className="main-wrapper">
        {this.search.render()}
        {this.cards
          ? new CardList({ cards: this.cards }).render()
          : this.loader.render()}
      </div>
    );
  }
}

export default MainPage;
