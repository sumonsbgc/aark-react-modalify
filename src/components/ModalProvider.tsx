import type { FC } from 'react';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import Notification from './Notification';

/**
 * ModalProvider component that renders modals globally
 * This component should be rendered once in your app's root
 */
const ModalProvider: FC = () => {
  const { isOpen, config, close } = useModal();

  if (!isOpen || !config) {
    return null;
  }

  if (config.mode === 'modal') {
    return <Modal config={config} onClose={close} />;
  }

  if (config.mode === 'notification') {
    return <Notification config={config} onClose={close} />;
  }

  return null;
};

export default ModalProvider;
