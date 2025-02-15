import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import './ThemeButton.css';

const ThemeButton = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <>
      <input
        type="checkbox"
        value=""
        onChange={setTheme}
        id="toogle"
        className="toggle-checkbox"
        data-testid={'theme-checkbox'}
      />
      <label htmlFor="toogle" className="toggle-label"></label>
    </>
  );
};

export default ThemeButton;
