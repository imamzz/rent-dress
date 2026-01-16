import AlertCircle from '../../icons/AlertCircle';
import CheckCircle from '../../icons/CheckCircle';
import InfoCircle from '../../icons/InfoCircle';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  const styles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <InfoCircle />
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} ${style.text} border rounded-lg p-4 flex items-start gap-3`}>
      <span className="shrink-0">{style.icon}</span>
      <p className="text-sm">{message}</p>
    </div>
  );
}
