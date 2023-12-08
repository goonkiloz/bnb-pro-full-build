import { NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='Nav'>
      <li>
        <NavLink to="/"><img src='../../../public/favicon.ico' onClick={Navigate('/')}></img></NavLink>
      </li>
      <li>
        Search bar
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
