import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserSpots } from '../../store/spots';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "show" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className='ProfileButton'>
      <i className="fa fa-list-ul" aria-hidden="true" /> <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <ul className='UserInfo'>
            <li className='userName'>Hello, {user.username}</li>
            <li className='email'>{user.email}</li>
            <li>

            </li>
            <NavLink className='spotManage' to={'/spots/manage'} onClick={dispatch(getUserSpots())}>Manage Spots</NavLink>
            <li>
              <button onClick={logout} className='logoutButton'>Log Out</button>
            </li>
          </ul>
        ) : (
          <div className='dropdown'>
            <OpenModalMenuItem
              className='loginButton'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='signUpButton'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
