import { HeaderContainer } from '../styles/Header.styles';

export const Header = () => {
  const date = new Date();
  return (
    <HeaderContainer>
      <h1>Todo List</h1>
      <h2>{date.toDateString()}</h2>
    </HeaderContainer>
  );
};

export default Header;
