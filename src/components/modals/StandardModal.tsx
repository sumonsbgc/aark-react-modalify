import type { FC } from 'react';
import { useMemo } from 'react';
import type { ModalProps, ModalType } from '../../types';

interface StandardModalProps {
  props: ModalProps;
  onClose: () => void;
}

const typeIcons: Record<ModalType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ⓘ',
  question: '?'
};

const typeColors: Record<ModalType, string> = {
  success: '#4ade80',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  question: '#8b5cf6'
};

const StandardModal: FC<StandardModalProps> = ({ props, onClose }) => {
  const {
    title,
    text,
    type = 'info',
    cancelText = 'Cancel',
    confirmText = 'OK',
    onCancel,
    onConfirm,
    icon,
    html,
    showCancelButton = false,
    showConfirmButton = true,
    reverseButtons = false,
    width = '600px',
    fullWidth = false,
    customClass = {}
  } = props;

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const iconElement = useMemo(() => {
    if (icon) {
      return typeof icon === 'string' ? <span>{icon}</span> : icon;
    }
    return (
      <span style={{ color: typeColors[type] }}>
        {typeIcons[type]}
      </span>
    );
  }, [icon, type]);

  const buttonOrder = reverseButtons ? ['confirm', 'cancel'] : ['cancel', 'confirm'];

  const modalStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {};

    if (fullWidth) {
      // Full width with small margins on all devices
      baseStyle.width = 'calc(100vw - 20px)';
      baseStyle.maxWidth = 'calc(100vw - 20px)';
    } else {
      // Responsive width based on screen size
      if (typeof width === 'number') {
        baseStyle.width = `${width}px`;
      } else {
        baseStyle.width = width;
      }
    }

    return baseStyle;
  }, [width, fullWidth]);

  return (
    <div className={`aark-standard-modal ${customClass.popup || ''}`} style={modalStyle}>
      {title && (
        <div className={`aark-modal-header ${customClass.header || ''}`}>
          <h2 className={`aark-modal-title ${customClass.title || ''}`}>
            {title}
          </h2>
        </div>
      )}

      <div className={`aark-modal-content ${customClass.content || ''}`}>
        {iconElement && (
          <div className={`aark-modal-icon ${customClass.icon || ''}`}>
            {iconElement}
          </div>
        )}

        {html ? (
          <div dangerouslySetInnerHTML={{ __html: typeof html === 'string' ? html : '' }} />
        ) : text ? (
          <p>
            {text}
          </p>
        ) : null}
      </div>

      {(showCancelButton || showConfirmButton) && (
        <div className={`aark-modal-actions ${customClass.actions || ''}`}>
          {buttonOrder.map((buttonType) => {
            if (buttonType === 'cancel' && showCancelButton) {
              return (
                <button
                  key="cancel"
                  onClick={handleCancel}
                  className={`aark-modal-cancel-button ${customClass.cancelButton || ''}`}
                >
                  {cancelText}
                </button>
              );
            }
            if (buttonType === 'confirm' && showConfirmButton) {
              return (
                <button
                  key="confirm"
                  onClick={handleConfirm}
                  className={`aark-modal-confirm-button ${customClass.confirmButton || ''}`}
                  style={{
                    background: typeColors[type],
                  }}
                >
                  {confirmText}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default StandardModal;
