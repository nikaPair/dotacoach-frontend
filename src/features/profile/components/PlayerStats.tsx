import { PlayerStats as PlayerStatsType } from '../../../shared/api';
import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaTrophy, FaSkull, FaPercentage, FaUserTag } from 'react-icons/fa';
import { WinRateChart } from './WinRateChart';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  index: number;
}

const StatsCard = React.memo(({ label, value, icon, index }: StatsCardProps) => (
  <motion.div 
    className="stat-item"
    initial={{opacity:1 , y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
  >
    <span className="stat-label">{icon} {label}</span>
    <span className="stat-value">{value}</span>
  </motion.div>
));

interface PlayerStatsProps {
  stats: PlayerStatsType;
}

export const PlayerStats = React.memo(({ stats }: PlayerStatsProps) => {
  const statItems = [
    { label: 'Всего матчей', value: stats.totalMatches, icon: <FaGamepad /> },
    { label: 'Побед', value: stats.wins, icon: <FaTrophy /> },
    { label: 'Поражений', value: stats.losses, icon: <FaSkull /> },
    { label: 'Процент побед', value: `${stats.winRate}%`, icon: <FaPercentage /> },
  ];
  
  if (!stats) return null;

  return (
    <>
      <motion.div 
        className="profile-section"
        initial={{opacity:1 , y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Статистика игрока</h2>
        <div className="stats-grid">
          {statItems.map((item, index) => (
            <StatsCard 
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
        <motion.div 
          className="main-roles"
          initial={{opacity:1  }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3><FaUserTag /> Основные роли:</h3>
          <div className="roles-list">
            {stats.mainRoles.map((role, index) => (
              <motion.span 
                key={index} 
                className="role-badge"
                initial={{opacity:1 , scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <div className="charts-container">
        <WinRateChart wins={stats.wins} losses={stats.losses} />
      </div>
    </>
  );
});
