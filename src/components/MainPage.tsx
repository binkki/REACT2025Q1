import { useSelector } from 'react-redux';
import { RootState } from '../store';
import FormList from './FormList';

function MainPage() {
  const uncontrolledResults = useSelector(
    (state: RootState) => state.app.uncontrolledResults
  );
  const controlledResults = useSelector(
    (state: RootState) => state.app.controlledResults
  );

  return (
    <div className="flex flex-column main-wrapper">
      <FormList data={uncontrolledResults} title={'uncontrolled'} />
      <FormList data={controlledResults} title={'controlled'} />
    </div>
  );
}

export default MainPage;
