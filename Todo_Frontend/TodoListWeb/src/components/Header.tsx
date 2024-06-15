import { HeaderContainer } from '../styles/Header.styles';

export const Header = () => {
  const date = new Date();
  return (
    <HeaderContainer>
      <h1>todo list</h1>
      <h2>{date.toDateString()}</h2>
    </HeaderContainer>
  );
};

export default Header;
