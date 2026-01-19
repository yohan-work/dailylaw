import React from 'react';
import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: implement login logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:<br />
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label><br />
        <label>
          Password:<br />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;