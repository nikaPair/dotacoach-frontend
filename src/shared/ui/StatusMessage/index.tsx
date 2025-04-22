import './styles.css';

type StatusType = 'loading' | 'error' | 'empty';

interface StatusMessageProps {
  type: StatusType;
  message: string;
  className?: string;
}

export const StatusMessage = ({ type, message, className = '' }: StatusMessageProps) => {
  return (
    <div className={`status-message ${type} ${className}`}>
      {message}
    </div>
  );
}; 