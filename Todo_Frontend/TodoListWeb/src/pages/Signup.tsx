import React, { useState } from 'react';

import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Button, Input, SignUpContainer, Title } from '../styles/Signup.styles';
import { ErrorMessage, SignUpLink } from '../styles/Login.styles';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const response = await authApi.postSignUp({
      username: username,
      email: email,
      password: password,
      passwordHash: '',
    });

    if (response === 'User signed up successfully.') {
      navigate('/');
    } else {
      setMessage(response);
    }
  };

  return (
    <SignUpContainer>
      {message !== null && <ErrorMessage>{message}</ErrorMessage>}
      <Title>Sign Up</Title>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp}>Sign Up</Button>
      <div>
        Back to <SignUpLink href="/">Login</SignUpLink>
      </div>
    </SignUpContainer>
  );
};

export default SignUp;
