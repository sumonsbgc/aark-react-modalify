import React from 'react';
import { useModal } from '../hooks/useModal';
import ModalRenderer from './ModalRenderer';

/**
 * ModalProvider component that renders modals globally
 * This component should be rendered once in your app's root
 */
const ModalProvider: React.FC = () => {
  const { isOpen, config, close } = useModal();

  if (!isOpen || !config) {
    return null;
  }

  return <ModalRenderer config={config} onClose={close} />;
};

export default ModalProvider;
