import { Match } from '../../../shared/api';
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaSkull, FaCalendarAlt, FaMedal, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from '../../../shared/ui/Tooltip';

interface MatchItemProps {
  match: Match;
  index: number;
}

export const MatchItem = React.memo(({ match, index }: MatchItemProps) => {
  const { kills, deaths, assists } = match;
  const kda = deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(1);
  
  // Match details tooltip content
  const matchDetails = (
    <div className="match-details-tooltip">
      <div>Убийств: {kills}</div>
      <div>Смертей: {deaths}</div>
      <div>Помощи: {assists}</div>
      <div>KDA: {kda}</div>
    </div>
  );

  return (
    <motion.div 
      className={`match-item ${match.result}`}
      initial={{opacity:1 , x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ x: 5 }}
    >
      <div className="match-item-content">
        <div className="match-hero">
          {match.heroIcon && (
            <img src={match.heroIcon} alt={match.hero} className="hero-icon" />
          )}
          <span>{match.hero}</span>
        </div>
        <Tooltip content={matchDetails} position="top">
          <div className="match-stats">
            <span>
              {match.kills} / {match.deaths} / {match.assists} <FaInfoCircle size={12} />
            </span>
          </div>
        </Tooltip>
        <div className="match-result">
          {match.result === 'win' ? (
            <><FaTrophy /> Победа</>
          ) : (
            <><FaSkull /> Поражение</>
          )}
        </div>
        <div className="match-date">
          <FaCalendarAlt /> {match.date}
        </div>
      </div>
    </motion.div>
  );
});

interface MatchHistoryProps {
  matches: Match[];
  onLoadMore?: () => void;
}

export const MatchHistory = React.memo(({ matches, onLoadMore }: MatchHistoryProps) => {
  if (!matches?.length) {
    return (
      <motion.p 
        className="no-matches"
        initial={{opacity:1  }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        История матчей отсутствует
      </motion.p>
    );
  }

  return (
    <motion.div 
      className="profile-section"
      initial={{opacity:1 , y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2><FaMedal /> Последние матчи</h2>
      <div className="matches-list">
        {matches.map((match, index) => (
          <MatchItem key={match.id} match={match} index={index} />
        ))}
      </div>
      {onLoadMore && (
        <motion.button 
          className="load-more-btn" 
          onClick={onLoadMore}
          whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(74, 118, 253, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Загрузить больше
        </motion.button>
      )}
    </motion.div>
  );
});
