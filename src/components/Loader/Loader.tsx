import React from 'react';
import './Loader.css';
import { LOADER_URL } from '../../utils/constants';

class Loader extends React.Component {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <>
        <img className="loader" src={LOADER_URL} />
      </>
    );
  }
}

export default Loader;
