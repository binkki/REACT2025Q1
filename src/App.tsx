import MainPage from './pages/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
