import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { NotificationConfig } from '../types';
// Note: CSS is NOT imported here — only src/index.ts imports CSS.
import StandardNotification from './notifications/StandardNotification';
import { getModalRoot } from '../utils/modal-root';

interface NotificationProps {
  config: NotificationConfig;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ config, onClose }) => {
  const { content, props, options = {} } = config;
  const {
    position = 'top-right',
    showCloseIcon = true,
    autoCloseTime = 5000,
    className = '',
    preventEscClose = false,
  } = options;

  // Auto close — only for component-based notifications (props-based handle timer internally)
  useEffect(() => {
    if (autoCloseTime && !props) {
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoCloseTime, onClose, props]);

  // Keyboard ESC
  useEffect(() => {
    if (preventEscClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, preventEscClose]);

  // Close button click
  const handleCloseClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const contentClasses = `aark-notification-container ${position} ${className}`.trim();
  const modalContainer = getModalRoot();

  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      zIndex: 10000,
      margin: '1rem',
    };
    switch (position) {
      case 'top-left':    return { ...base, top: 0, left: 0 };
      case 'top-center':  return { ...base, top: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':   return { ...base, top: 0, right: 0 };
      case 'bottom-left': return { ...base, bottom: 0, left: 0 };
      case 'bottom-center': return { ...base, bottom: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right': return { ...base, bottom: 0, right: 0 };
      default:            return { ...base, top: 0, right: 0 };
    }
  };

  const renderContent = () => {
    if (props) {
      return (
        <div className="aark-notification-wrapper">
          <StandardNotification props={props} onClose={onClose} />
        </div>
      );
    }

    if (content) {
      return (
        <div
          className={contentClasses}
          role="alert"
          aria-live="polite"
        >
          {showCloseIcon && (
            <button
              onClick={handleCloseClick}
              className="aark-notification-close"
              aria-label="Close notification"
              type="button"
            >
              ×
            </button>
          )}
          <div className="aark-notification-body">
            {content}
          </div>
        </div>
      );
    }

    return null;
  };

  return createPortal(
    <div style={getPositionStyles()}>
      {renderContent()}
    </div>,
    modalContainer
  );
};

export default Notification;
