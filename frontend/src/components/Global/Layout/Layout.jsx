import { useContext, useEffect } from "react";
import { LoginContext } from "../../../core/contexts/LoginContext";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { setAuthToken } = useContext(LoginContext);

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token);
    setAuthToken(token);
  })

  return (
    <>
      <main style={{ minHeight: '600px' }}>{children}</main>
    </>
  );
};

export default Layout;
