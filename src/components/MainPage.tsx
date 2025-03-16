import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import FormList from './FormList';

function MainPage() {
  const uncontrolledResults = useSelector(
    (state: RootState) => state.app.uncontrolledResults
  );
  const controlledResults = useSelector(
    (state: RootState) => state.app.controlledResults
  );

  const location = useLocation();

  const [lastSubmited, setLastSubmited] = useState('');

  useEffect(() => {
    setLastSubmited(location.state?.lastSubmited ?? '');
  }, []);

  return (
    <div className="flex flex-column main-wrapper">
      <FormList
        data={uncontrolledResults}
        title={'uncontrolled'}
        isNew={lastSubmited === 'uncontrolled'}
      />
      <FormList
        data={controlledResults}
        title={'controlled'}
        isNew={lastSubmited === 'controlled'}
      />
    </div>
  );
}

export default MainPage;
