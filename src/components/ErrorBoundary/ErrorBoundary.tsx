import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(`Error boundary caught error: ${error.message}`);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render() {
    return this.state.hasError ? (
      <>
        <div>Some Error</div>
        <button onClick={this.resetErrorBoundary}>Reset Error Boundary</button>
      </>
    ) : (
      this.props.children
    );
  }
}
