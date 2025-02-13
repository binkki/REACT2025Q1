import { useDispatch } from 'react-redux';
import { CardInfo } from '../../types';
import { removeAllBookmarks } from '../../store/slices/appSlice';
import './Flyout.css';

type FlyoutProps = {
  data: CardInfo[];
};

const Flyout = (props: FlyoutProps) => {
  const { data } = props;
  const dispatch = useDispatch();

  const unselectAll = () => {
    dispatch(removeAllBookmarks());
  };

  return (
    <>
      <div className="flyout">
        <span>Selected {data.length} characters</span>
        <button onClick={() => unselectAll()}>Unselect all</button>
      </div>
    </>
  );
};

export default Flyout;
