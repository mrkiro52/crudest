// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import UserCreate from './pages/userCreate/userCreate';
import UserEdit from './pages/userEdit/userEdit';
import UsersTable from './pages/usersTable/usersTable';
import './App.scss';

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Routes>
          <Route path="/new" element={<UserCreate />} />
          <Route path="/edit/:id" element={<UserEdit />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/" element={<UsersTable />} />
        </Routes>
      </Router>
    </div>
  );
}

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;