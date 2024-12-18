import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

const AuthButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #45a049;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin"); // Перейти к админ панели
    } else {
      navigate("/login"); // Перейти на страницу входа
    }
  };

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">Магазин ножів</Link>
      </Title>
      <AuthButton onClick={handleAuthClick}>
        {localStorage.getItem("token") ? "Перейти до адмін панелі" : "Увійти"}
      </AuthButton>
    </HeaderContainer>
  );
};

export default Header;
