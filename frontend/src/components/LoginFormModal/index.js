// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoLogin = () => {
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'})).then(closeModal)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className='signup-container'>
      <h1 style={{marginTop: '50px'}}>Log In</h1>
      <div className="signup-content">
      <form onSubmit={handleSubmit}>
        <ul style={{display: 'flex', justifyContent: 'center', color: 'red'}}>
          {errors.map((error, idx) => (
            <li style={{padding: '10px'}} key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='button1'type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      </div>
      <button onClick={demoLogin} className='button2'>Demo User</button>
    </div>

  );
}

export default LoginFormModal;
