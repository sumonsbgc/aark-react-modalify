import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { NotificationConfig } from '../types';
import '../assets/styles/aark-modal.css';

interface NotificationProps {
  config: NotificationConfig;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ config, onClose }) => {
  const { content, options = {} } = config;
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

  // Handle auto close for notifications
  useEffect(() => {
    if (autoCloseTime) {
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoCloseTime, onClose]);

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

  return createPortal(
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
    </div>,
    modalContainer
  );
};

export default Notification;
