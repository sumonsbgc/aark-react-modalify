import type { FC } from 'react';
import { useMemo, useEffect } from 'react';
import type { NotificationProps, ModalType } from '../../types';

interface StandardNotificationProps {
  props: NotificationProps;
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
    width = '300px',
    fullWidth = false,
    padding = '1rem',
    background = '#ffffff',
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

  const notificationStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      padding,
      background,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${typeColors[type]}`,
      cursor: clickToClose ? 'pointer' : 'default',
      position: 'relative' as const,
      overflow: 'hidden'
    };

    if (fullWidth) {
      // Full width with small margins for notifications
      baseStyle.width = 'calc(100vw - 40px)';
      baseStyle.maxWidth = 'calc(100vw - 40px)';
    } else {
      // Regular width handling
      baseStyle.width = typeof width === 'number' ? `${width}px` : width;
    }

    return baseStyle;
  }, [width, fullWidth, padding, background, type, clickToClose]);

  return (
    <div
      className={`aark-standard-notification ${customClass.popup || ''}`}
      style={notificationStyle}
      onClick={handleClick}
    >
      {/* Progress bar for timer */}
      {timer && timer > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            background: typeColors[type],
            animation: `aark-notification-progress ${timer}ms linear forwards`,
            transformOrigin: 'left'
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        {iconElement && (
          <div className={`aark-notification-icon ${customClass.icon || ''}`} style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: '0.125rem' }}>
            {iconElement}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div className={`aark-notification-header ${customClass.header || ''}`}>
              <h4 className={`aark-notification-title ${customClass.title || ''}`} style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                {title}
              </h4>
            </div>
          )}

          <div className={`aark-notification-content ${customClass.content || ''}`} style={{ marginTop: title ? '0.25rem' : 0 }}>
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: typeof html === 'string' ? html : '' }} />
            ) : text ? (
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4' }}>
                {text}
              </p>
            ) : null}
          </div>
        </div>

        {showCloseButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`aark-notification-close ${customClass.closeButton || ''}`}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1rem',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              flexShrink: 0
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>

      <style>
        {`
          @keyframes aark-notification-progress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default StandardNotification;
