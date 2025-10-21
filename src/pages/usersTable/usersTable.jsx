import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../slices/usersSlice';
import { toggleTheme } from '../../slices/themeSlice';
import './usersTable.scss';

const UsersTable = () => {
  const users = useSelector((state) => state.users.users);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить пользователя?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="list-page">
      <header className="page-header">
        <h1>Пользователи</h1>
      </header>

      <main className="page-content">
        <div className="action-group">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="secondary-button"
          >
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </button>
          <Link to="/new">
            <button className="primary-button">+ Добавить</button>
          </Link>
        </div>

        <section className="user-list">
          {users.length === 0 ? (
            <p className="empty-state">Пользователи не найдены</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="list-item">
                <div className="item-content">
                  <div className="item-title">{user.name}</div>
                  <div className="item-subtitle">{user.email}</div>
                  <div className="item-detail">
                    {user.phone} • {user.role}
                  </div>
                </div>
                <div className="item-actions">
                  <Link to={`/edit/${user.id}`} className="action-link">
                    <span>Изменить</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-button"
                  >
                    <span>Удалить</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default UsersTable;