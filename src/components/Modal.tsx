import type { FC, MouseEvent } from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { ModalConfig, ModalSize } from '../types';
import Icon from './Icon';
import StandardModal from './modals/StandardModal';
import { getModalRoot } from '../utils/modal-root';

// Note: CSS is NOT imported here. It is imported from src/index.ts so that the
// no-styles entry (index-no-styles.ts) produces a JS-only bundle.

interface ModalProps {
  config: ModalConfig;
  onClose: () => void;
}

const sizeMaxWidths: Record<ModalSize, string> = {
  sm:   '400px',
  md:   '550px',
  lg:   '700px',
  xl:   '900px',
  full: 'calc(100vw - 32px)',
};

const Modal: FC<ModalProps> = ({ config, onClose }) => {
  const { content, props, options = {} } = config;
  const {
    position = 'center',
    showCloseIcon = true,
    className = '',
    overlayClassName = '',
    preventEscClose = false,
    preventOverlayClose = false,
    width,
    maxWidth,
    size,
  } = options;

  // Keyboard ESC handling
  useEffect(() => {
    if (preventEscClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, preventEscClose]);

  // Overlay click
  const handleOverlayClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget && !preventOverlayClose) {
        onClose();
      }
    },
    [onClose, preventOverlayClose]
  );

  // Close button click
  const handleCloseClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  // Resolve container size: explicit width/maxWidth > size preset > CSS default
  const containerSizeStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    if (width !== undefined) {
      style.width = typeof width === 'number' ? `${width}px` : width;
      if (maxWidth === undefined) style.maxWidth = style.width;
    }

    if (maxWidth !== undefined) {
      style.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    } else if (size) {
      const preset = sizeMaxWidths[size];
      if (size === 'full') {
        style.width = style.width ?? preset;
        style.maxWidth = preset;
      } else {
        style.maxWidth = preset;
      }
    }

    return style;
  }, [width, maxWidth, size]);

  const contentClasses = `aark-modal-container ${position} ${className}`.trim();
  const modalContainer = getModalRoot();

  const renderContent = () => {
    if (props) {
      return (
        <div
          className={contentClasses}
          style={containerSizeStyle}
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
    }

    if (content) {
      // Component-based modal — close button is inside the body card
      return (
        <div
          className={contentClasses}
          style={containerSizeStyle}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aark-modal-body">
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
        // Use CSS variable so setAarkModalTheme({ modalZIndex }) works
        zIndex: 'var(--aark-modal-z, 9999)' as unknown as number,
        background: 'var(--aark-modal-overlay-bg)',
        // Use CSS variable — set overlayBlur to e.g. '2px' via setAarkModalTheme
        backdropFilter: 'blur(var(--aark-modal-overlay-blur, 0px))',
        WebkitBackdropFilter: 'blur(var(--aark-modal-overlay-blur, 0px))',
        animation: 'fade-in var(--aark-anim)',
        display: 'flex',
        alignItems:
          position.includes('center') ? 'center' :
          position.includes('top') ? 'flex-start' : 'flex-end',
        justifyContent:
          position.includes('center') ? 'center' :
          position.includes('right') ? 'flex-end' : 'flex-start',
        padding: '1rem',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {renderContent()}
    </div>,
    modalContainer
  );
};

export default Modal;
