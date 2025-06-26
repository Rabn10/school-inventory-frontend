import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { EmailVerify } from './pages/auth/EmailVerify';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/verifyEmail" element={<EmailVerify />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
