import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/providers/store';
import { logout } from '../../../features/auth/model/authSlice';
import Logo from '../../../shared/ui/Logo/Logo';
import './header.css';

const Header = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  console.log('AUTH STATE:', { isAuth, user });
  console.log('steamAvatar exists:', user?.steamAvatar ? 'YES' : 'NO');
  console.log('steamAvatar value:', user?.steamAvatar);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__navigation">
          <Link to="/">
            <Logo />
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/training">Training</Link>
              </li>
              <li>
                <Link to="/replays">Replays</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
            </ul>
          </nav>
        </div>
        {isAuth ? (
          <div className="header__actions">
            <button className="header__notifications"></button>
            <div className="header__profile-dropdown">
              <button className="header__profile">
                {user?.steamAvatar ? (
                  <img
                    src={user.steamAvatar}
                    alt="Profile"
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </button>
              <div className="header__dropdown-content">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="header__actions">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
