import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </Router>
  );
}
