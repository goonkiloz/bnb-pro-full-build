import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            console.log(data)
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signUpForm'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signUpForm'>
        <label>
          <input
            className='emailSignUp'
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email &&(
          <p className='signUpError' style={{color: 'red'}}>{errors.email}</p>
        )}
        <label>
          <input
            className='userSignUp'
            placeholder='Username(must be longer than 4 characters)'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && (
          <p className='signUpError' style={{color: 'red'}}>{errors.username}</p>
        )}
        <label>
          <input
            className='firstName'
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && (
          <p className='signUpError' style={{color: 'red'}}>{errors.firstName}</p>
        )}
        <label>
          <input
            className='lastName'
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && (
          <p className='signUpError' style={{color: 'red'}}>{errors.lastName}</p>
        )}
        <label>
          <input
            className='passwordSignUp'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className='signUpError' style={{color: 'red'}}>{errors.password}</p>
        )}
        <label>
          <input
            className='confirmPasswordSignUp'
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='signUpError' style={{color: 'red'}}>{errors.confirmPassword}</p>
        )}
        <button type="submit" className='signUpButton'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
