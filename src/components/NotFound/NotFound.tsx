import { NOTFOUND_URL } from '../../utils/constants';

export const NotFound = () => {
  return (
    <div className="flex-row error-wrapper" data-testid={'not-found'}>
      <img src={NOTFOUND_URL} />
    </div>
  );
};
