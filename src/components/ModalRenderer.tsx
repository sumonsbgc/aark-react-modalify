import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalConfig } from '../types';
import '../assets/styles/aark-modal.css';

interface ModalRendererProps {
  config: ModalConfig;
  onClose: () => void;
}

const ModalRenderer: FC<ModalRendererProps> = ({ config, onClose }) => {
  const { content, options = {} } = config;
  const {
    position = 'center',
    mode = 'modal',
    showCloseIcon = true,
    autoCloseTime,
    className = '',
    overlayClassName = '',
    preventEscClose = false,
    preventOverlayClose = false,
  } = options;

  // Handle auto close for notifications
  useEffect(() => {
    if (autoCloseTime && mode === 'notification') {
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoCloseTime, mode, onClose]);

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

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget && !preventOverlayClose) {
        onClose();
      }
    },
    [onClose, preventOverlayClose]
  );

  // Handle close button click
  const handleCloseClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const containerClasses = `aark-modal-container ${mode === 'notification' ? 'notification' : ''}`;
  const contentClasses = `aark-modal-content ${position} ${mode === 'notification' ? 'notification' : ''} ${className}`.trim();
  const overlayClasses = `aark-modal-overlay ${overlayClassName}`.trim();

  return createPortal(
    <div className={containerClasses}>
      {mode === 'modal' && (
        <div
          className={overlayClasses}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      <div
        className={contentClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aark-modal-content"
      >
        {showCloseIcon && (
          <button
            onClick={handleCloseClick}
            className="aark-modal-close"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        )}
        <div id="aark-modal-content" className="aark-modal-body">
          {content}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalRenderer;
