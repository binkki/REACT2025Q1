import React from 'react';

type State = {
  isError: boolean;
};

class ErrorButton extends React.Component<object, State> {
  state = { isError: false };

  componentDidUpdate() {
    if (this.state.isError) {
      throw new Error('Error button was clicked');
    }
  }

  makeError = () => {
    this.setState({ isError: true });
  };

  render() {
    return (
      <div>
        <button onClick={this.makeError}>Error Boundary Error</button>
      </div>
    );
  }
}

export default ErrorButton;
