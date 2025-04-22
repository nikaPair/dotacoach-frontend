import { UserProfile } from '../../../shared/api';
import React from 'react';
import { motion } from 'framer-motion';
import { FaSteam, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader = React.memo(({ user }: ProfileHeaderProps) => {
  if (!user) return null;

  return (
    <motion.div 
      className="profile-header"
      initial={{opacity:1 , y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="profile-avatar"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {user.steamAvatar ? (
          <img src={user.steamAvatar} alt="Аватар" />
        ) : (
          <div className="avatar-placeholder">
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </motion.div>
      <div className="profile-info">
        <motion.h1
          initial={{opacity:1  }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {user.steamDisplayName || user.email || 'Пользователь'}
        </motion.h1>
        {user.email && (
          <motion.p
            initial={{opacity:1  }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="user-email"
          >
            <FaEnvelope /> {user.email}
          </motion.p>
        )}
        {user.steamId && (
          <motion.div 
            className="steam-info"
            initial={{opacity:1  }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p>
              <FaSteam /> Steam ID: {user.steamId}
            </p>
            {user.steamProfile && (
              <motion.a
                href={user.steamProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="steam-profile-link"
                whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(74, 118, 253, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt /> Профиль Steam
              </motion.a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});
