import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../../features/auth/api/emailAuth';
import { openSteamAuthWindow } from '../../../features/auth/api/steamAuth';
import { setUser, setAuthMethod } from '../../../features/auth/model/authSlice';
import { useDispatch } from 'react-redux';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Авторизация
        const result = await login({ email, password }).unwrap();

        // Сохраняем токен в localStorage
        localStorage.setItem('token', result.token);

        // Обновляем состояние Redux
        dispatch(setUser(result.user));
        dispatch(setAuthMethod('email'));

        // Перенаправляем на страницу профиля или дашборда
        navigate('/');
      } else {
        // Регистрация - проверка совпадения паролей
        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          return;
        }

        const result = await register({ email, password }).unwrap();

        // Сохраняем токен в localStorage
        localStorage.setItem('token', result.token);

        // Обновляем состояние Redux
        dispatch(setUser(result.user));
        dispatch(setAuthMethod('email'));

        // Перенаправляем на страницу профиля или дашборда
        navigate('/');
      }
    } catch (err: any) {
      setError(
        err.data?.message || 'Произошла ошибка. Пожалуйста, попробуйте снова.'
      );
    }
  };

  const handleSteamLogin = () => {
    // Авторизация через Steam
    dispatch(setAuthMethod('steam'));
    openSteamAuthWindow();
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoginLoading || isRegisterLoading}
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-alternatives">
          <p className="toggle-mode" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? 'У вас нет аккаунта? Зарегистрируйтесь'
              : 'Уже зарегистрированы? Войдите'}
          </p>

          <div className="separator">
            <span>или</span>
          </div>

          <button className="steam-button" onClick={handleSteamLogin}>
            Войти через Steam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
