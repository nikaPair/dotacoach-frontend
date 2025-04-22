import { PlayerStats as PlayerStatsType } from '../../../shared/api';

interface PlayerStatsProps {
  stats: PlayerStatsType;
}

export const PlayerStats = ({ stats }: PlayerStatsProps) => {
  if (!stats) return null;

  return (
    <div className="profile-section">
      <h2>Статистика игрока</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Всего матчей:</span>
          <span className="stat-value">{stats.totalMatches}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Побед:</span>
          <span className="stat-value">{stats.wins}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Поражений:</span>
          <span className="stat-value">{stats.losses}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Процент побед:</span>
          <span className="stat-value">{stats.winRate}%</span>
        </div>
      </div>
      <div className="main-roles">
        <h3>Основные роли:</h3>
        <div className="roles-list">
          {stats.mainRoles.map((role, index) => (
            <span key={index} className="role-badge">
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
