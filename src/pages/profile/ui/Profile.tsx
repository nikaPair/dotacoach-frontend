import { useProfile } from '../../../features/profile/hooks';
import { ProfileHeader, PlayerStats, MatchHistory, HeroStats } from '../../../features/profile/components';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { motion } from 'framer-motion';
import { useInView } from '../../../shared/hooks/useInView';
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

  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [heroesRef, heroesInView] = useInView({ triggerOnce: true });
  const [matchesRef, matchesInView] = useInView({ triggerOnce: true });

  // Обработчик для "Загрузить больше"
  const handleLoadMore = () => {
    // TODO: Implement loading more matches
  };

  // Состояние загрузки
  if (isLoading) {
    return <StatusMessage type="loading" message="Загрузка профиля..." className="profile-container" />;
  }

  // Состояние ошибки
  if (error) {
    return (
      <StatusMessage 
        type="error" 
        message="Ошибка при загрузке профиля. Пожалуйста, попробуйте позже." 
        className="profile-container" 
      />
    );
  }

  // Если нет данных пользователя
  if (!user) {
    return (
      <StatusMessage 
        type="empty" 
        message="Профиль не найден. Пожалуйста, войдите в систему." 
        className="profile-container" 
      />
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
              <StatusMessage type="loading" message="Загрузка статистики..." className="profile-section" />
            ) : statsError ? (
              <StatusMessage type="error" message="Ошибка при загрузке статистики" className="profile-section" />
            ) : (
              hasStatsData && (
                <>
                  {stats && (
                    <>
                      <motion.div
                        ref={statsRef}
                        initial={{opacity:1 , y: 50 }}
                        animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                        transition={{ duration: 0.6 }}
                      >
                        <PlayerStats stats={stats} />
                      </motion.div>
                      
                      {stats.topHeroes && stats.topHeroes.length > 0 && (
                        <motion.div
                          ref={heroesRef}
                          initial={{opacity:1 , y: 50 }}
                          animate={heroesInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <HeroStats heroes={stats.topHeroes} />
                        </motion.div>
                      )}
                      
                      <motion.div
                        ref={matchesRef}
                        initial={{opacity:1 , y: 50 }}
                        animate={matchesInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <MatchHistory
                          matches={recentMatches}
                          onLoadMore={handleLoadMore}
                        />
                      </motion.div>
                    </>
                  )}
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
