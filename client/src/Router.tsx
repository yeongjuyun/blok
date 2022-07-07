import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import About from './components/About';
import NotFound from './components/NotFound';
import Editor from './pages/Editor';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />} />
        <Route path='/edit' element={<Editor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
