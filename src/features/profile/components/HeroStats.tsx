import React from 'react';
import { motion } from 'framer-motion';
import { TopHero } from '../../../shared/api';
import { useHeroes } from '../hooks/useHeroes';
import { FaStar, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from '../../../shared/ui/Tooltip';

interface HeroStatsProps {
  heroes?: TopHero[];
}

export const HeroStats = React.memo(({ heroes }: HeroStatsProps) => {
  const { getHeroName, getHeroIcon, getHeroImage } = useHeroes();

  if (!heroes?.length) return null;

  const getWinrateClassName = (winRate: number) => {
    if (winRate >= 60) return 'high-winrate';
    if (winRate >= 45) return 'medium-winrate';
    return 'low-winrate';
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Н/Д';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <motion.div 
      className="profile-section" 
      initial={{opacity:1 , y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2><FaStar /> Лучшие герои</h2>
      <div className="hero-stats">
        {heroes.map((hero, index) => {
          const winRate = Math.round((hero.win / hero.games) * 100);
          const winrateClass = getWinrateClassName(winRate);
          
          // Hero details for tooltip
          const heroDetails = (
            <div className="hero-details-tooltip">
              <div>Всего игр: {hero.games}</div>
              <div>Побед: {hero.win}</div>
              <div>Поражений: {hero.games - hero.win}</div>
              <div>Последняя игра: {formatDate(hero.last_played)}</div>
            </div>
          );
          
          return (
            <motion.div 
              key={hero.hero_id}
              className="hero-stat-item"
              initial={{opacity:1 , x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(30, 32, 51, 0.8)' }}
            >
              <Tooltip content={
                <div className="hero-image-tooltip">
                  <img 
                    src={getHeroImage(hero.hero_id)} 
                    alt={getHeroName(hero.hero_id)}
                    style={{ width: '150px', height: 'auto', borderRadius: '8px' }}  
                  />
                  <div style={{ marginTop: '8px', textAlign: 'center' }}>
                    {getHeroName(hero.hero_id)}
                  </div>
                </div>
              } position="left">
                <img 
                  src={getHeroIcon(hero.hero_id)} 
                  alt={getHeroName(hero.hero_id)} 
                  className="hero-stat-icon" 
                />
              </Tooltip>
              <div className="hero-stat-info">
                <div className="hero-stat-name">{getHeroName(hero.hero_id)}</div>
                <Tooltip content={heroDetails} position="bottom">
                  <div className="hero-stat-details">
                    <span>{hero.games} матчей</span>
                    <span>{hero.win} побед</span>
                    <FaInfoCircle size={12} style={{ marginLeft: '4px' }} />
                  </div>
                </Tooltip>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill win"
                    initial={{opacity:1,width: 0 }}
                    animate={{ width: `${winRate}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 1 }}
                  />
                </div>
              </div>
              <div className="hero-win-rate">
                <span className={`hero-win-rate-value ${winrateClass}`}>{winRate}%</span>
                <span className="hero-win-rate-label">побед</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}); 