import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { EmailVerify } from './pages/auth/EmailVerify';
import { MantineProvider } from '@mantine/core';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './plugins/PrivateRoutes';
import Profile from './pages/dashboard/user/Profile';
import Layout from './pages/layout/Layout';
import ChangePassword from './pages/dashboard/user/ChangePassword';
import Category from './pages/dashboard/category/Category';
import Product from './pages/product/Product';
import Vendor from './pages/dashboard/vendor/Vendor';
import AddVendor from './pages/dashboard/vendor/AddVendor';
import Batch from './pages/dashboard/batch/Batch';
import AddBatch from './pages/dashboard/batch/AddBatch';
import Order from './pages/order/Order';

function App() {

  // const privateRoutes = [
  //   { path: '/dashboard', element: <Dashboard /> },
  //   { path: '/profile', element: <Profile /> },
  // ];

  return (
    <MantineProvider defaultColorScheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/verifyEmail" element={<EmailVerify />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ))} */}

          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/change-password/:id" element={<ChangePassword />} />

            {/* sidenavbar */}
            <Route path="/category" element={<Category />} />
            <Route path='/product' element={<Product />} />
            <Route path='/vendor' element={<Vendor />} />
            <Route path='/vendor/add-vendor' element={<AddVendor />} />
            <Route path='/batch' element={<Batch />} />
            <Route path='/batch/add-batch' element={<AddBatch />} />
            <Route path='/order' element={<Order />} />
          </Route>

        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
