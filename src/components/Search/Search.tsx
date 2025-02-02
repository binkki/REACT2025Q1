import React from 'react';
import { SEARCH_KEY } from '../../utils/constants';
import { getLsValue, setLsValue } from '../../utils/utils';

class Search extends React.Component {
  searchValue: string;

  constructor(props: object) {
    super(props);
    this.searchValue = getLsValue(SEARCH_KEY);
    this.search = this.search.bind(this);
    this.input = this.input.bind(this);
  }

  search = () => {
    setLsValue(SEARCH_KEY, this.searchValue);
  };

  input = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.searchValue = (e.target as HTMLInputElement).value;
  };

  render() {
    return (
      <form className="search-wrapper" onSubmit={this.search}>
        <input
          id="search-input"
          type="search"
          onChange={this.input}
          defaultValue={getLsValue(SEARCH_KEY)}
        />
        <input className="search-submit" type="submit" value="Search" />
      </form>
    );
  }
}

export default Search;
