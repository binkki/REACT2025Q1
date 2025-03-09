import { LOADER_URL } from '../../utils/constants';

const Loader = () => {
  return (
    <>
      <img className="loader" data-testid={'loader'} src={LOADER_URL} />
    </>
  );
};

export default Loader;
