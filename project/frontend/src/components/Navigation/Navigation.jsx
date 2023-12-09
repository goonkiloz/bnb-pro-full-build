import { NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [search, setSearch] = useState()

  const searchButton = (e) => {
    e.preventDefault()
    window.alert('Feature in Work!')
  }

  return (
    <ul className='Nav'>
      <li>
        <NavLink to="/"><img src='../../../public/favicon.ico' onClick={Navigate('/')}></img></NavLink>
      </li>
      <li className='searchBarLi'>
        <input className='searchBar'
        placeholder='Search here!'
        onChange={(e) => setSearch(e.target.value)}
        value={search}

        />

        <button
        className='searchBarButton'
        onClick={searchButton}>
          Search
          </button>
      </li>
      {isLoaded && (
        <li className='dropDown'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
