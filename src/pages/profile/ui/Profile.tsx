import { useProfile } from '../../../features/profile/hooks/useProfile';
import { ProfileHeader } from '../../../features/profile/components/ProfileHeader';
import { PlayerStats } from '../../../features/profile/components/PlayerStats';
import { MatchHistory } from '../../../features/profile/components/MatchHistory';
import './Profile.css';

/**
 * Страница профиля пользователя
 */
const Profile = () => {
  // Используем кастомный хук для получения данных профиля
  const {
    user,
    stats,
    recentMatches,
    isLoading,
    error,
    isStatsLoading,
    statsError,
    hasStatsData,
  } = useProfile();

  // Обработчик для "Загрузить больше"
  const handleLoadMore = () => {
    // Будущая имплементация загрузки большего количества матчей
    console.log('Загрузка дополнительных матчей...');
  };

  // Состояние загрузки
  if (isLoading) {
    return <div className="profile-container loading">Загрузка профиля...</div>;
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="profile-container error">
        Ошибка при загрузке профиля. Пожалуйста, попробуйте позже.
      </div>
    );
  }

  // Если нет данных пользователя
  if (!user) {
    return (
      <div className="profile-container not-found">
        Профиль не найден. Пожалуйста, войдите в систему.
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Шапка профиля */}
      <ProfileHeader user={user} />

      <div className="profile-details">
        {/* Базовая информация */}
        <div className="profile-section">
          <h2>Контактная информация</h2>
          {user.email && <p>Email: {user.email}</p>}
        </div>

        {/* Статистика и матчи только если есть steamId */}
        {user.steamId && (
          <>
            {isStatsLoading ? (
              <div className="profile-section loading">
                Загрузка статистики...
              </div>
            ) : statsError ? (
              <div className="profile-section error">
                Ошибка при загрузке статистики
              </div>
            ) : (
              hasStatsData && (
                <>
                  {/* Статистика игрока */}
                  {stats && <PlayerStats stats={stats} />}

                  {/* История матчей */}
                  <MatchHistory
                    matches={recentMatches}
                    onLoadMore={handleLoadMore}
                  />
                </>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
