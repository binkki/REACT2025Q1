import { NOTFOUND_URL } from '../../utils/constants';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="error-wrapper">
      <img className="error-image" src={NOTFOUND_URL} />
    </div>
  );
};

export default NotFound;
