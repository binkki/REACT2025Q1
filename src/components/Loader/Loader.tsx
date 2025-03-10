import { LOADER_URL } from '../../utils/constants';

export const Loader = () => {
  return (
    <>
      <img className="loader" data-testid={'loader'} src={LOADER_URL} />
    </>
  );
};
