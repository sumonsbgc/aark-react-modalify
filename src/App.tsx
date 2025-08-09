import React, { useEffect } from 'react';
import { aark } from './index';
import './App.css';

// Demo component to show how the library works
const MyModalContent: React.FC = () => (
  <div style={{ padding: '24px', maxWidth: '400px' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
      Demo Modal
    </h2>
    <p style={{ color: '#666', marginBottom: '16px' }}>
      This is a demo of the aark-react-modalify library. You can close this modal by:
    </p>
    <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#666', marginBottom: '16px' }}>
      <li>Clicking the × button</li>
      <li>Pressing the ESC key</li>
      <li>Clicking outside the modal</li>
      <li>Using the button below</li>
    </ul>
    <button
      onClick={() => aark.close()}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
    >
      Close Modal
    </button>
  </div>
);

const NotificationContent: React.FC = () => (
  <div style={{
    backgroundColor: '#28a745',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 8px 0' }}>Success!</h3>
    <p style={{ margin: 0 }}>This notification will auto-close in 3 seconds</p>
  </div>
);

function App() {
  // Demo: Show welcome modal on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      aark.fire(
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Welcome to AARK React Modalify!
          </h2>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            This demo shows how easy it is to use modals without any setup.
          </p>
          <button
            onClick={() => aark.close()}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Get Started
          </button>
        </div>,
        {
          position: 'center',
          preventOverlayClose: true,
        }
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const showBasicModal = () => {
    aark.fire(<MyModalContent />);
  };

  const showNotification = () => {
    aark.fire(<NotificationContent />, {
      mode: 'notification',
      position: 'top-right',
      autoCloseTime: 3000,
      showCloseIcon: false,
    });
  };

  const showCustomModal = () => {
    aark.fire(
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎨</div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Custom Styled Modal
        </h2>
        <p style={{ marginBottom: '16px' }}>This modal has custom styling and positioning</p>
        <button
          onClick={() => aark.close()}
          style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>,
      {
        position: 'top-center',
        className: 'custom-modal',
        overlayClassName: 'custom-overlay',
      }
    );
  };

  const showConfirmModal = () => {
    aark.fire(
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px', color: '#dc3545' }}>⚠️</div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Are you sure?
        </h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              alert('Deleted!');
              aark.close();
            }}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
          <button
            onClick={() => aark.close()}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        preventEscClose: false,
        preventOverlayClose: true,
      }
    );
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef'
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: 'white'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
            AARK React Modalify Demo
          </h1>
          <p style={{ fontSize: '20px', color: '#666' }}>
            A simple, powerful modal library for React with custom CSS
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              Basic Modal
            </h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              Simple modal with default settings
            </p>
            <button
              onClick={showBasicModal}
              style={{ ...buttonStyle, backgroundColor: '#007bff' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Show Basic Modal
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              Notification
            </h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              Auto-closing notification in top-right corner
            </p>
            <button
              onClick={showNotification}
              style={{ ...buttonStyle, backgroundColor: '#28a745' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e7e34'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
              Show Notification
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              Custom Styled
            </h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              Modal with custom styling and positioning
            </p>
            <button
              onClick={showCustomModal}
              style={{ ...buttonStyle, backgroundColor: '#6f42c1' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#59359a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6f42c1'}
            >
              Show Custom Modal
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              Confirmation
            </h3>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              Confirmation modal with action buttons
            </p>
            <button
              onClick={showConfirmModal}
              style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
            >
              Show Confirmation
            </button>
          </div>
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Usage Example
          </h2>
          <div style={{
            backgroundColor: '#2d3748',
            color: '#68d391',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'left',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflow: 'auto'
          }}>
            <pre>{`import { aark } from 'aark-react-modalify';

aark.fire(
  <MyComponent />, 
  {
    mode: "modal",
    position: "center",
    showCloseIcon: true,
  }
);`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
