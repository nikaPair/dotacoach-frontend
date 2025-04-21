import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSteamCallbackMutation } from '../../../features/auth/api/steamAuth';
import { setUser, setAuthMethod } from '../../../features/auth/model/authSlice';
import { useDispatch } from 'react-redux';

const SteamCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [processSteamCallback, { isLoading }] = useSteamCallbackMutation();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Получаем код авторизации из URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          setError('Ошибка авторизации: отсутствует код авторизации');
          return;
        }

        // Отправляем запрос на бэкенд для завершения авторизации
        const result = await processSteamCallback({ code }).unwrap();

        // Сохраняем токен
        localStorage.setItem('token', result.token);
        // Обновляем состояние в Redux
        dispatch(setUser(result.user));
        dispatch(setAuthMethod('steam'));

        // Перенаправляем на дашборд
        navigate('/');

        // Если это было открыто в новом окне, закрываем его
        if (window.opener) {
          window.opener.postMessage(
            { type: 'STEAM_AUTH_SUCCESS', user: result.user },
            '*'
          );
          window.close();
        }
      } catch (err: any) {
        console.error('Ошибка при авторизации через Steam:', err);
        setError(
          err.data?.message || 'Произошла ошибка при авторизации через Steam'
        );
      }
    };

    processCallback();
  }, [dispatch, navigate, processSteamCallback]);

  if (isLoading) {
    return (
      <div className="steam-callback-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="steam-callback-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/login')} className="back-button">
          Вернуться на страницу входа
        </button>
      </div>
    );
  }

  return (
    <div className="steam-callback-container">
      <div className="success-message">
        Авторизация через Steam успешна. Перенаправление...
      </div>
    </div>
  );
};

export default SteamCallback;
