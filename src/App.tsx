import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { EmailVerify } from './pages/auth/EmailVerify';
import { MantineProvider } from '@mantine/core';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './plugins/PrivateRoutes';

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/verifyEmail" element={<EmailVerify />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
