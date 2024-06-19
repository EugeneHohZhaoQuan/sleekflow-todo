import { useState } from 'react';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ErrorMessage,
  Input,
  LoginContainer,
  SignUpLink,
  Title,
} from '../styles/Login.styles';

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

    if (response === 'Authentication successful.') {
      navigate('/home');
    } else {
      setMessage(response);
    }
  };

  return (
    <LoginContainer>
      {message !== null && <ErrorMessage>{message}</ErrorMessage>}
      <Title>Login</Title>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      <div>
        Don't have an account ? <SignUpLink href="/signup">Sign Up</SignUpLink>
      </div>
    </LoginContainer>
  );
};

export default Login;
