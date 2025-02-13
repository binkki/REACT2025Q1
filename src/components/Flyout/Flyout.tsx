import { CardInfo } from '../../types';
import './Flyout.css';

type FlyoutProps = {
  data: CardInfo[];
};

const Flyout = (props: FlyoutProps) => {
  const { data } = props;

  return (
    <>
      <div className="flyout">
        <span>Selected {data.length} characters</span>
      </div>
    </>
  );
};

export default Flyout;
