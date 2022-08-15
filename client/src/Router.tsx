import React from 'react';
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import ManageSite from './pages/ManageSite';
import ManageUser from './pages/ManageUser';
import UserInfo from './pages/UserInfo';
import About from './components/About';
import NotFound from './components/NotFound';
import FindPassword from './pages/FindPassword';
import Signin from './pages/Signin';
import Editor from './pages/Editor';
import ChangePassword from './pages/ChangePassword';
import Main from './pages/Main';
import HostedPage from './pages/HostedPage';
import Logo from './components/Logo';
import Sidebar from './components/Sidebar';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<Logo />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/findpassword' element={<FindPassword />} />
          {/* <Route path='/oauth/kakao' element={<Kakao />} /> */}
        </Route>

        <Route element={<Sidebar />}>
          <Route path='/account' element={<Account />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='admin/site' element={<ManageSite />} />
          <Route path='/admin/user' element={<ManageUser />} />
          <Route path='/admin/user/:userId' element={<UserInfo />} />
          <Route path='/editor/:siteId' element={<Editor />} />
        </Route>

        <Route path='/' element={<Navigate to='/blok' />} />
        <Route path='/main' element={<Main />} />
        <Route path='/:domain' element={<HostedPage />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
