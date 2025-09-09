import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalConfig } from '../types';
import '../assets/styles/aark-modal.css';
import Icon from './Icon';
import StandardModal from './modals/StandardModal';
import { getModalRoot } from '../utils/modal-root';

interface ModalProps {
  config: ModalConfig;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ config, onClose }) => {
  const { content, props, options = {} } = config;
  const {
    position = 'center',
    showCloseIcon = true,
    className = '',
    overlayClassName = '',
    preventEscClose = false,
    preventOverlayClose = false,
  } = options;

  // CSS is now imported at the top of the file
  // useEffect(() => {
  //   injectStyles(MODAL_CSS, 'aark-modal-styles');
  // }, []);

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

  const contentClasses = `aark-modal-container ${position} ${className}`.trim();

  // Get the single modal root container
  const modalContainer = getModalRoot();

  // Render content based on whether it's props-based or component-based
  const renderContent = () => {
    if (props) {
      // Props-based modal - direct StandardModal
      return (
        <div
          className={contentClasses}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseIcon && (
            <button
              onClick={handleCloseClick}
              className="aark-modal-close"
              aria-label="Close Modal"
              type="button"
            >
              <Icon name="close" size={12} />
            </button>
          )}
          <div className="aark-modal-wrapper">
            <StandardModal props={props} onClose={onClose} />
          </div>
        </div>
      );
    } else if (content) {
      // Component-based modal
      return (
        <div
          className={contentClasses}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseIcon && (
            <button
              onClick={handleCloseClick}
              className="aark-modal-close"
              aria-label="Close Modal"
              type="button"
            >
              <Icon name="close" size={12} />
            </button>
          )}
          <div className="aark-modal-body">
            {content}
          </div>
        </div>
      );
    }
    return null;
  };

  return createPortal(
    <div
      className={`aark-modal-overlay ${overlayClassName}`.trim()}
      onClick={handleOverlayClick}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--aark-modal-overlay-bg)',
        backdropFilter: 'blur(2px)',
        animation: 'fade-in var(--aark-anim)',
        display: 'flex',
        alignItems: position.includes('center') ? 'center' : position.includes('top') ? 'flex-start' : 'flex-end',
        justifyContent: position.includes('center') ? 'center' : position.includes('right') ? 'flex-end' : 'flex-start',
        padding: '1rem'
      }}
    >
      {renderContent()}
    </div>,
    modalContainer
  );
};

export default Modal;
