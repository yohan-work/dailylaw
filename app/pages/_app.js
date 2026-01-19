import { useState } from 'react';
import Link from 'next/link';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={() => console.log('Login button clicked!')}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
