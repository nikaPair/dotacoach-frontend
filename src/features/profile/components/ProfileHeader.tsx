import { UserProfile } from '../../../shared/api';

interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  if (!user) return null;

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        {user.steamAvatar ? (
          <img src={user.steamAvatar} alt="Аватар" />
        ) : (
          <div className="avatar-placeholder">
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      <div className="profile-info">
        <h1>{user.steamDisplayName || user.email || 'Пользователь'}</h1>
        {user.steamId && (
          <div className="steam-info">
            <p>Steam ID: {user.steamId}</p>
            {user.steamProfile && (
              <a
                href={user.steamProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="steam-profile-link"
              >
                Профиль Steam
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
