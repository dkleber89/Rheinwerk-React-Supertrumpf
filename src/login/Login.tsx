import React, { FormEvent, useState, useRef, useEffect, ReactElement, useCallback } from 'react';

import './Login.scss';

interface Props {
  onLogin: (username: string, password: string) => void;
  error: string;
}

const Login = ({ onLogin, error }: Props): ReactElement => {
  const [localError, setLocalError] = useState('');

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    username.current!.focus();
  }, []);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    let tempError = 'Bitte Benutzernamen und Passwort eingeben';

    if (username.current!.value && password.current!.value) {
      tempError = '';
      onLogin(username.current!.value, password.current!.value);
    }

    setLocalError(tempError);
  },[onLogin]);

  return (
    <form onSubmit={handleSubmit} className="login">
      {(error !== '' || localError !== '') && (
        <div className="error">
          {error}
          {localError}
        </div>
      )}
      <div>
        <label htmlFor="">Benutzername:</label>
        <input type="text" id="username" ref={username} />
      </div>
      <div>
        <label>Passwort:</label>
        <input type="password" id="password" ref={password} />
      </div>
      <button type="submit">anmelden</button>
    </form>
  );
};

export default Login;
