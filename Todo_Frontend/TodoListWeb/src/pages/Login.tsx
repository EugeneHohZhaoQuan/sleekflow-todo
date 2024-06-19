import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const { postLogin } = authApi;

  const handleLogin = async () => {
    const response = await postLogin({
      usernameOrEmail: username,
      password: password,
    });

    navigate('/home');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <a href="/signup">Sign Up</a>
    </div>
  );
};

export default Login;
