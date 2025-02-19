import { useDispatch, useSelector } from 'react-redux';
import {
  EMPTY_SEARCH,
  NOTFOUND_URL,
  SEARCH_TERM_ERROR,
} from '../../utils/constants';
import './NotFound.css';
import { useEffect } from 'react';
import { setParams } from '../../store/slices/appSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { RootState } from '../../store/store';

const NotFound = () => {
  const dispatch = useDispatch();
  const { setSearchValue } = useLocalStorage();
  const error = useSelector((state: RootState) => state.app.error);

  useEffect(() => {
    if (error.pageError === SEARCH_TERM_ERROR) {
      setSearchValue(EMPTY_SEARCH);
      dispatch(
        setParams({
          page: 1,
          searchTerm: EMPTY_SEARCH,
        })
      );
    }
  }, []);

  return (
    <div className="flex-row error-wrapper" data-testid={'not-found'}>
      <img src={NOTFOUND_URL} />
    </div>
  );
};

export default NotFound;
