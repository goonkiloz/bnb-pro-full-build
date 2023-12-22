import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(true)
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
     console.log(e)
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  useEffect(() => {
    if(credential?.length > 4 && password?.length > 6) {
      return setDisable(false)
    } else setDisable(true)
  }, [credential, password, setDisable])

  return (
    <div className='loginForm'>
      <h1>Log In</h1>
      {errors.message && (
          <p style={{color: 'red'}}>The provided credentials were invalid.</p>
        )}
      <form onSubmit={handleSubmit} className='loginForm'>
        <label>
          <input
            className='user'
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className='password'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='loginButton' disabled={disable}>Log In</button>
        <button type='submit' className='demoUser' onClick={() => {
            setCredential('FakeUser1')
            setPassword('password')
          }}>
            Demo User
          </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
