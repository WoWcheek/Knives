import { createContext, useState } from 'react';
import axios from 'axios';
import config from '../../config'; // Assuming config is defined elsewhere

import { MessageError, MessageSuccess } from '../../components/Alert'; // Assuming these components exist

export const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');

  const submitLogin = async () => {
    try {
      const response = await axios.post(`${config.backendUrl}/authorization/signin`, { username: login, password });
      MessageSuccess('Ви авторизувалися.');
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/admin';
    } catch (error) {
      MessageError('Не вірно введенно дані.');
    }
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
        password,
        setPassword,
        submitLogin,
        authToken,
        setAuthToken
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
