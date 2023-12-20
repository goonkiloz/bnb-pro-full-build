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

  const isOwner = (sessionUser) => {
    if(sessionUser !== null) {
      return true
    }
  }

  return (
    <ul className='nav'>
      <li>
        <NavLink to="/"><img src='/favicon.ico' onClick={Navigate('/')}></img></NavLink>
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
      <div className='profileDiv'>
      <li>
        {isOwner(sessionUser) && (
                <NavLink to='/spots/new' className='create'>
                Create a New Spot
              </NavLink>
        )}
      </li>
      {isLoaded && (
        <li className='dropDown'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
