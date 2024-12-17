import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Layout from './components/Global/Layout/Layout';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPanelPage from './components/AdminPanelPage/AdminPanelPage';
import IndexPage from './components/IndexPage/IndexPage';

import './index.css';
import "react-toastify/dist/ReactToastify.css";

import { LoginProvider } from './core/contexts/LoginContext';

const App = () => {
  return (
    <Router>
      <LoginProvider>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/" element={<IndexPage />}></Route>
          </Routes>

        </Layout>
      </LoginProvider>
    </Router>
  );
};

export default App;