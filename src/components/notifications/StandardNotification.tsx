import type { FC } from 'react';
import { useMemo, useEffect } from 'react';
import type { NotificationProps, ModalType } from '../../types';

interface StandardNotificationProps {
  props: NotificationProps;
  onClose: () => void;
}

const typeColors: Record<ModalType, string> = {
  success: '#4ade80',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  question: '#8b5cf6'
};

const typeIcons: Record<ModalType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ⓘ',
  question: '?'
};

const StandardNotification: FC<StandardNotificationProps> = ({ props, onClose }) => {
  const {
    title,
    text,
    type = 'info',
    icon,
    html,
    timer = 5000,
    showCloseButton = true,
    clickToClose = true,
    width,
    fullWidth = false,
    padding,
    customClass = {}
  } = props;

  // Auto close timer
  useEffect(() => {
    if (timer && timer > 0) {
      const timeoutId = setTimeout(onClose, timer);
      return () => clearTimeout(timeoutId);
    }
  }, [timer, onClose]);

  const handleClick = () => {
    if (clickToClose) {
      onClose();
    }
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

  // Only width/fullWidth/padding are controlled via inline style.
  // Background, border, borderRadius, boxShadow, and colors are handled by
  // CSS classes (.aark-standard-notification, .aark-notification-{type}) so
  // that host apps can theme them via CSS variables without needing !important.
  const sizeStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (padding !== undefined) {
      style.padding = typeof padding === 'number' ? `${padding}px` : padding;
    }
    if (fullWidth) {
      style.width = 'calc(100vw - 40px)';
      style.maxWidth = 'calc(100vw - 40px)';
    } else if (width !== undefined) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    return style;
  }, [width, fullWidth, padding]);

  return (
    <div
      className={`aark-standard-notification aark-notification-${type} ${customClass.popup || ''}`}
      style={sizeStyle}
      onClick={handleClick}
    >
      {/* Progress bar */}
      {timer && timer > 0 && (
        <div
          className="aark-notification-progress"
          style={{
            background: typeColors[type],
            animation: `aark-notification-progress ${timer}ms linear forwards`,
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {iconElement && (
          <div className={`aark-notification-icon ${customClass.icon || ''}`}>
            {iconElement}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div className={`aark-notification-header ${customClass.header || ''}`}>
              <h4 className={`aark-notification-title ${customClass.title || ''}`}>
                {title}
              </h4>
            </div>
          )}

          <div
            className={`aark-notification-content ${customClass.content || ''}`}
            style={{ marginTop: title ? '0.25rem' : 0 }}
          >
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: typeof html === 'string' ? html : '' }} />
            ) : text ? (
              <p>{text}</p>
            ) : null}
          </div>
        </div>

        {showCloseButton && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className={`aark-notification-close ${customClass.closeButton || ''}`}
            aria-label="Close notification"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default StandardNotification;
