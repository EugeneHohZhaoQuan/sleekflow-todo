// src/pages/Home.tsx
import React from 'react';
import { MainContainer } from './styles/Home.styles';
import Header from './components/Header';
import TodoList from '../src/components/TodoList';

const Home: React.FC = () => {
  return (
    <MainContainer>
      <Header />
      <TodoList />
    </MainContainer>
  );
};

export default Home;
