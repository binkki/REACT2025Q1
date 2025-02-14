import { useDispatch } from 'react-redux';
import { EMPTY_SEARCH, NOTFOUND_URL } from '../../utils/constants';
import './NotFound.css';
import { useEffect } from 'react';
import { setParams } from '../../store/slices/appSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const NotFound = () => {
  const dispatch = useDispatch();
  const { setSearchValue } = useLocalStorage();

  useEffect(() => {
    setSearchValue(EMPTY_SEARCH);
    dispatch(
      setParams({
        page: 1,
        searchTerm: EMPTY_SEARCH,
      })
    );
  }, []);

  return (
    <div className="error-wrapper">
      <img className="error-image" src={NOTFOUND_URL} />
    </div>
  );
};

export default NotFound;
