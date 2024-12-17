import { useContext, useState } from 'react';
import { RegisterProvider, RegisterContext } from '../../core/contexts/RegisterContext';
import { LoginProvider, LoginContext } from '../../core/contexts/LoginContext'; // Import LoginContext

import {
  LoginContainer,
  LoginForm,
  FormTitle,
  Input,
  SubmitButton,
  LinkWrapper,
} from './LoginPage.styled';

import { ModalOverlay, ModalContent, CloseButton, ModalFormContent } from './Modal.styled';

const LoginConPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Access data from RegisterContext
  const {
    name, setName,
    password, setPassword, 
    submitRegistration  } = useContext(RegisterContext);

  // Access data from LoginContext
  const { login, setLogin, password: loginPassword, setPassword: setLoginPassword, submitLogin } = useContext(LoginContext);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <LoginContainer>
      <LoginForm>
        <FormTitle>Вхід</FormTitle>
        <Input 
          type="text" 
          placeholder="Ім'я" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Пароль" 
          value={loginPassword} 
          onChange={(e) => setLoginPassword(e.target.value)} 
        />
        <SubmitButton onClick={submitLogin}>Увійти</SubmitButton>
        <LinkWrapper>
          <button
            style={{ background: 'none', border: 'none', color: '#4caf50', cursor: 'pointer' }}
            onClick={openModal}
          >
            Немає акаунту? Зареєструватися
          </button>
        </LinkWrapper>
      </LoginForm>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>Реєстрація</h2>
            <ModalFormContent>
              <Input
                style={{ width: '100%' }}
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                style={{ width: '100%' }}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <SubmitButton
                onClick={async () => {await submitRegistration(); await closeModal();}}
                style={{ width: '100%' }}
                type="submit"
              >
                Зареєструватися
              </SubmitButton>
            </ModalFormContent>
          </ModalContent>
        </ModalOverlay>
      )}
    </LoginContainer>
  );
};

const LoginPage = () => {
  return (
    <LoginProvider>
      <RegisterProvider>
        <LoginConPage />
      </RegisterProvider>
    </LoginProvider>
  );
};

export default LoginPage;
