import { Match } from '../../../shared/api';

interface MatchHistoryProps {
  matches: Match[];
  onLoadMore?: () => void;
}

const MatchItem = ({ match }: { match: Match }) => {
  return (
    <div key={match.id} className={`match-item ${match.result}`}>
      <div className="match-item-content">
        <div className="match-hero">
          {match.heroIcon ? (
            <img src={match.heroIcon} alt={match.hero} className="hero-icon" />
          ) : null}
          <span>{match.hero}</span>
        </div>
        <div className="match-stats">
          <span>
            {match.kills} / {match.deaths} / {match.assists}
          </span>
        </div>
        <div className="match-result">
          {match.result === 'win' ? 'Победа' : 'Поражение'}
        </div>
        <div className="match-date">{match.date}</div>
      </div>
    </div>
  );
};

export const MatchHistory = ({ matches, onLoadMore }: MatchHistoryProps) => {
  if (!matches || !matches.length) {
    return <p className="no-matches">История матчей отсутствует</p>;
  }

  return (
    <div className="profile-section">
      <h2>Последние матчи</h2>
      <div className="matches-list">
        {matches.map((match) => (
          <MatchItem key={match.id} match={match} />
        ))}
      </div>
      {onLoadMore && (
        <button className="load-more-btn" onClick={onLoadMore}>
          Загрузить больше
        </button>
      )}
    </div>
  );
};
