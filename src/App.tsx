// import { useEffect } from 'react';
import type { FC } from "react";
import { aark } from "./index";
import "./App.css";

// Demo component to show how the library works
const MyModalContent: FC = () => (
  <div>
    <h2
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px",
        color: "#333",
      }}
    >
      Component-Based Modal
    </h2>
    <p style={{ color: "#666", marginBottom: "16px" }}>
      This is a demo of the component-based approach. You can close this modal
      by:
    </p>
    <ul
      style={{
        listStyle: "disc",
        paddingLeft: "20px",
        color: "#666",
        marginBottom: "16px",
      }}
    >
      <li>Clicking the × button</li>
      <li>Pressing the ESC key</li>
      <li>Clicking outside the modal</li>
      <li>Using the button below</li>
    </ul>
    <button
      onClick={() => aark.close()}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
    >
      Close Modal
    </button>
  </div>
);

const SuccessNotification: FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <div style={{ fontSize: "24px", color: "#28a745" }}>✅</div>
    <div>
      <h3
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          margin: "0 0 4px 0",
          color: "#333",
        }}
      >
        Success!
      </h3>
      <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
        This notification will auto-close in 3 seconds
      </p>
    </div>
  </div>
);

function App() {
  // Demo: Show welcome modal on component mount
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     aark.fire({
  //       title: "Welcome to AARK React Modalify!",
  //       html: `
  //         <div style="text-align: center;">
  //           <div style="font-size: 48px; margin-bottom: 16px;">👋</div>
  //           <p style="color: #666; margin-bottom: 16px;">
  //             This demo shows both component-based and props-based approaches.
  //           </p>
  //           <p style="color: #666; margin-bottom: 16px; font-weight: 600;">
  //             🎉 New: Props-based API for quick modals and notifications!
  //           </p>
  //         </div>
  //       `,
  //       type: "info",
  //       confirmText: "Get Started",
  //       showCancelButton: false
  //     });
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, []);

  const showBasicModal = () => {
    aark.modal(<MyModalContent />);
  };

  // Props-based examples
  const showPropsModal = () => {
    aark.modal({
      title: "Confirmation Required",
      text: "Are you sure you want to proceed with this action?",
      type: "question",
      showCancelButton: true,
      confirmText: "Yes, Continue",
      cancelText: "Cancel",
      onConfirm: () => {
        console.log("User confirmed!");
        aark.notification({
          title: "Action Completed",
          text: "Your action was completed successfully!",
          type: "success",
          timer: 3000,
        });
      },
      onCancel: () => console.log("User cancelled!"),
    });
  };

  const showPropsNotification = () => {
    aark.notification({
      title: "Props-Based Notification",
      text: "This notification was created using the new props-based approach!",
      type: "info",
      timer: 4000,
      showCloseButton: true,
    });
  };

  const showSuccessProps = () => {
    aark.modal({
      title: "Success!",
      text: "Your data has been saved successfully.",
      type: "success",
      confirmText: "Great!",
    });
  };

  const showWarningProps = () => {
    aark.modal({
      title: "Delete Item",
      text: "Are you sure you want to delete this item? This action cannot be undone.",
      type: "warning",
      showCancelButton: true,
      confirmText: "Yes, delete it!",
      cancelText: "Cancel",
      onConfirm: () => {
        aark.notification({
          title: "Deleted!",
          text: "The item has been deleted successfully.",
          type: "success",
          timer: 2000,
        });
      },
    });
  };

  const showNotification = () => {
    aark.notification(<SuccessNotification />, {
      position: "top-right",
      autoCloseTime: 3000,
      showCloseIcon: false,
    });
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e9ecef",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    color: "white",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "16px",
            }}
          >
            AARK React Modalify Demo
          </h1>
          <p style={{ fontSize: "20px", color: "#666" }}>
            Component-based AND Props-based modal library for React
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Component-Based Modal
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Traditional component-based modal with React component
            </p>
            <button
              onClick={showBasicModal}
              style={{ ...buttonStyle, backgroundColor: "#007bff" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Show Component Modal
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Props-Based Modal
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              New props-based modal with simple configuration
            </p>
            <button
              onClick={showPropsModal}
              style={{ ...buttonStyle, backgroundColor: "#6f42c1" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#59359a")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#6f42c1")
              }
            >
              Show Props Modal
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Success Modal (Props)
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Success modal using props-based approach
            </p>
            <button
              onClick={showSuccessProps}
              style={{ ...buttonStyle, backgroundColor: "#28a745" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e7e34")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#28a745")
              }
            >
              Show Success
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Warning Modal (Props)
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Warning modal with confirmation using props
            </p>
            <button
              onClick={showWarningProps}
              style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#c82333")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc3545")
              }
            >
              Show Warning
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Component Notification
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Component-based notification in top-right corner
            </p>
            <button
              onClick={showNotification}
              style={{ ...buttonStyle, backgroundColor: "#17a2b8" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#138496")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#17a2b8")
              }
            >
              Show Component Notification
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Props Notification
            </h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>
              Props-based notification with simple configuration
            </p>
            <button
              onClick={showPropsNotification}
              style={{ ...buttonStyle, backgroundColor: "#fd7e14" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e55a00")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#fd7e14")
              }
            >
              Show Props Notification
            </button>
          </div>
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Usage Examples
          </h2>
          <div
            style={{
              backgroundColor: "#2d3748",
              color: "#68d391",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "left",
              fontFamily: "monospace",
              fontSize: "14px",
              overflow: "auto",
              marginBottom: "16px",
            }}
          >
            <div style={{ color: "#ffd700", marginBottom: "8px" }}>
							// Component-Based Approach (Original)
            </div>
            <pre>{`import { aark } from 'aark-react-modalify';

// Show a modal with React component
aark.modal(
  <MyComponent />, 
  {
    position: "center",
    showCloseIcon: true,
    preventOverlayClose: false,
  }
);

// Show a notification with React component
aark.notification(
  <MyNotification />,
  {
    position: "top-right",
    autoCloseTime: 3000,
    showCloseIcon: false,
  }
);`}</pre>
          </div>

          <div
            style={{
              backgroundColor: "#2d3748",
              color: "#68d391",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "left",
              fontFamily: "monospace",
              fontSize: "14px",
              overflow: "auto",
            }}
          >
            <div style={{ color: "#ffd700", marginBottom: "8px" }}>
							// Props-Based Approach (New!)
            </div>
            <pre>{`// Show a modal with props configuration
aark.modal({
  title: "Confirmation",
  text: "Are you sure you want to proceed?",
  type: "question",
  showCancelButton: true,
  confirmText: "Yes, Continue",
  cancelText: "Cancel",
  onConfirm: () => console.log("Confirmed!"),
  onCancel: () => console.log("Cancelled!")
});

// Show a notification with props
aark.notification({
  title: "Success!",
  text: "Your action was completed successfully.",
  type: "success",
  timer: 3000
});`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
