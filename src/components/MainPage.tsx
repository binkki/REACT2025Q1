import { NavLink } from 'react-router';

function MainPage() {
  return (
    <>
      <NavLink to={'/uncontrolled-form'} className="link">
        Fill out an Uncontrolled Form
      </NavLink>
      <NavLink to={'/controlled-form'} className="link">
        Fill out a Controlled Form
      </NavLink>
    </>
  );
}

export default MainPage;
