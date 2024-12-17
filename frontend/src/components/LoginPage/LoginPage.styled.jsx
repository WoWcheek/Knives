// LoginPage.styled.jsx
import styled from 'styled-components';

const mobileWidth = '1072px';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #ffffff;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #0a0f1a;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(14, 0, 85, 0.75);

  @media (max-width: ${mobileWidth}) {
    padding: 20px;
  }
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #0e1624;
  color: #ffffff;
  width: 300px;
  border: 2px solid #0e1624;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border: 2px solid #4caf50;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const LinkWrapper = styled.div`
  margin-top: 10px;
  text-align: center;

  a {
    color: #4caf50;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
