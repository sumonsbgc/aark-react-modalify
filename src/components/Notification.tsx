import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { NotificationConfig } from '../types';
import '../assets/styles/aark-modal.css';
import StandardNotification from './notifications/StandardNotification';

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

  // CSS is now imported at the top of the file
  // useEffect(() => {
  //   injectStyles(MODAL_CSS, 'aark-modal-styles');
  // }, []);

  // Handle auto close for notifications (only for component-based notifications)
  useEffect(() => {
    if (autoCloseTime && !props) { // Only auto-close component-based notifications
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoCloseTime, onClose, props]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !preventEscClose) {
        onClose();
      }
    };

    if (!preventEscClose) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose, preventEscClose]);

  // Handle close button click
  const handleCloseClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const contentClasses = `aark-modal-content notification ${position} ${className}`.trim();

  // Get the modal container or fallback to document.body
  const modalContainer = document.getElementById('aark-react-modalify-root') || document.body;

  // Get position styles
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 'var(--aark-modal-z)',
      margin: '1rem'
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: 0, left: 0 };
      case 'top-center':
        return { ...baseStyles, top: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...baseStyles, top: 0, right: 0 };
      case 'bottom-left':
        return { ...baseStyles, bottom: 0, left: 0 };
      case 'bottom-center':
        return { ...baseStyles, bottom: 0, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...baseStyles, bottom: 0, right: 0 };
      default:
        return { ...baseStyles, top: 0, right: 0 };
    }
  };

  // Render content based on whether it's props-based or component-based
  const renderContent = () => {
    if (props) {
      // Props-based notification
      return <StandardNotification props={props} onClose={onClose} />;
    } else if (content) {
      // Component-based notification (existing behavior)
      return (
        <div
          className={contentClasses}
          role="alert"
          aria-live="polite"
          aria-labelledby="aark-notification-content"
        >
          {showCloseIcon && (
            <button
              onClick={handleCloseClick}
              className="aark-modal-close"
              aria-label="Close notification"
              type="button"
            >
              ×
            </button>
          )}
          <div id="aark-notification-content" className="aark-modal-body">
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
