import config from '../../config';

import { createContext, useState } from 'react';
import axios from 'axios';


import { MessageSuccess, MessageError } from '../../components/Alert';

export const RegisterContext = createContext();

// eslint-disable-next-line react/prop-types
export const RegisterProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegistration = async () => {
    try {
      const response = await axios.post(`${config.backendUrl}/authorization/signup`, { username: name, password });
      if (response.status == 200) MessageSuccess('Ви зареєструвалися.')
      else MessageError('Щось пішло не так.')
    } catch (error) {
        MessageError('Щось пішло не так.')
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        submitRegistration,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
