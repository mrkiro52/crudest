import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../slices/usersSlice';
import './userCreate.scss';

const UserCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!formData.phone) {
      newErrors.phone = 'Телефон обязателен';
    } else {
      const cleaned = formData.phone.replace(/\D/g, '');
      if (formData.phone.startsWith('8') && cleaned.length !== 11) {
        newErrors.phone = 'Номер должен быть 11 цифр (например: 89991234567)';
      } else if (formData.phone.startsWith('+7') && cleaned.length !== 11) {
        newErrors.phone = 'Номер должен содержать 11 цифр после +7';
      } else if (!formData.phone.startsWith('8') && !formData.phone.startsWith('+7')) {
        newErrors.phone = 'Номер должен начинаться с 8 или +7';
      }
    }
    if (!['Admin', 'User', 'Manager'].includes(formData.role)) {
      newErrors.role = 'Выберите роль';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addUser({ ...formData, id: Date.now() }));
    navigate('/users');
  };

  return (
    <div className="create-page">
      <header className="page-header">
        <h1>Новый пользователь</h1>
      </header>

      <main className="page-content">
        <form onSubmit={handleSubmit} className="user-form">
          <section className="form-card">
            <div className="form-field">
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ivan@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label>Телефон</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 999 123 45 67"
                inputMode="tel"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>

            <div className="form-field">
              <label>Роль</label>
              <div className="select-wrapper">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? 'error' : ''}
                >
                  <option value="User">Пользователь</option>
                  <option value="Manager">Менеджер</option>
                  <option value="Admin">Администратор</option>
                </select>
              </div>
              {errors.role && <p className="field-error">{errors.role}</p>}
            </div>
          </section>

          <button type="submit" className="primary-button">
            Создать пользователя
          </button>
        </form>
      </main>
    </div>
  );
};

export default UserCreate;