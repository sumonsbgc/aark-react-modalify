# AARK React Modalify - Usage Examples

## Basic Usage

### Component-Based Approach (Original)

```jsx
import { aark } from "aark-react-modalify";

// Simple modal
aark.fire(<div>Hello World!</div>);

// Modal with options
aark.modal(<div>Custom Modal</div>, {
	position: "center",
	showCloseIcon: true,
});

// Notification with component
aark.notification(<div>Success!</div>, {
	position: "top-right",
	autoCloseTime: 3000,
});

// Close modal
aark.close();
```

### Props-Based Approach (New!)

```jsx
import { aark } from "aark-react-modalify";

// Simple alert modal
aark.fire({
	title: "Alert",
	text: "This is a simple alert message.",
	type: "info",
});

// Confirmation modal
aark.modal({
	title: "Delete Item",
	text: "Are you sure you want to delete this item?",
	type: "warning",
	showCancelButton: true,
	confirmText: "Yes, delete it!",
	cancelText: "Cancel",
	onConfirm: () => console.log("Deleted!"),
	onCancel: () => console.log("Cancelled!"),
});

// Success notification
aark.notification({
	title: "Success!",
	text: "Your action was completed successfully.",
	type: "success",
	timer: 3000,
});

// Error notification
aark.notification({
	title: "Error",
	text: "Something went wrong. Please try again.",
	type: "error",
	timer: 5000,
	showCloseButton: true,
});
```

## Props-Based Configuration

### Modal Props

```typescript
interface ModalProps {
	title?: string; // Modal title
	text?: string; // Modal text content
	type?: "success" | "error" | "warning" | "info" | "question";
	cancelText?: string; // Cancel button text
	confirmText?: string; // Confirm button text
	onCancel?: () => void; // Cancel button callback
	onConfirm?: () => void; // Confirm button callback
	icon?: string | ReactNode; // Custom icon
	html?: string | ReactNode; // HTML content (instead of text)
	showCancelButton?: boolean; // Show cancel button
	showConfirmButton?: boolean; // Show confirm button
	allowOutsideClick?: boolean; // Allow closing by clicking outside
	allowEscapeKey?: boolean; // Allow closing with Escape key
	reverseButtons?: boolean; // Reverse button order
	width?: string | number; // Modal width
	fullWidth?: boolean; // Take full width with small margins
	padding?: string | number; // Modal padding
	background?: string; // Modal background color
	customClass?: {
		// Custom CSS classes
		container?: string;
		popup?: string;
		header?: string;
		title?: string;
		closeButton?: string;
		icon?: string;
		content?: string;
		actions?: string;
		confirmButton?: string;
		cancelButton?: string;
		footer?: string;
	};
}
```

### Notification Props

```typescript
interface NotificationProps {
	title?: string; // Notification title
	text?: string; // Notification text content
	type?: "success" | "error" | "warning" | "info" | "question";
	icon?: string | ReactNode; // Custom icon
	html?: string | ReactNode; // HTML content (instead of text)
	timer?: number; // Auto-close timer (ms)
	showCloseButton?: boolean; // Show close button
	clickToClose?: boolean; // Close on click
	width?: string | number; // Notification width
	fullWidth?: boolean; // Take full width with small margins
	padding?: string | number; // Notification padding
	background?: string; // Notification background color
	customClass?: {
		// Custom CSS classes
		container?: string;
		popup?: string;
		header?: string;
		title?: string;
		closeButton?: string;
		icon?: string;
		content?: string;
		footer?: string;
	};
}
```

## Detailed Examples

### Success Modal

```jsx
aark.modal({
	title: "Account Created",
	text: "Your account has been created successfully!",
	type: "success",
	confirmText: "Continue to Dashboard",
	onConfirm: () => {
		// Redirect to dashboard
		window.location.href = "/dashboard";
	},
});
```

### Error Modal with Custom Icon

```jsx
aark.modal({
	title: "Connection Failed",
	text: "Unable to connect to the server. Please check your internet connection.",
	type: "error",
	icon: "🌐",
	showCancelButton: true,
	confirmText: "Retry",
	cancelText: "Cancel",
	onConfirm: () => {
		// Retry connection logic
		retryConnection();
	},
});
```

### Custom HTML Content

```jsx
aark.modal({
	title: "Release Notes",
	html: `
		<div>
			<h3>What's New in v2.0</h3>
			<ul>
				<li>✨ Props-based API</li>
				<li>🎨 Enhanced styling options</li>
				<li>🚀 Better performance</li>
			</ul>
			<p><strong>Thank you for using our library!</strong></p>
		</div>
	`,
	type: "info",
	confirmText: "Got it!",
});
```

### Progressive Enhancement

```jsx
// Start with simple notification
aark.notification({
	title: "Processing...",
	text: "Please wait while we process your request.",
	type: "info",
	timer: 0, // Don't auto-close
	showCloseButton: false,
});

// Update to success after operation
setTimeout(() => {
	aark.close(); // Close current
	aark.notification({
		title: "Complete!",
		text: "Your request has been processed successfully.",
		type: "success",
		timer: 3000,
	});
}, 2000);
```

### Custom Styling

```jsx
aark.modal({
	title: "Custom Styled Modal",
	text: "This modal has custom styling applied.",
	type: "info",
	width: "600px",
	padding: "2rem",
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	customClass: {
		title: "custom-modal-title",
		content: "custom-modal-content",
		confirmButton: "custom-confirm-btn",
	},
});
```

### Responsive Width Examples

```jsx
// Default responsive behavior (recommended)
aark.modal({
	title: "Responsive Modal",
	text: "This modal automatically adjusts width based on screen size.",
	type: "info",
});

// Custom fixed width
aark.modal({
	title: "Fixed Width Modal",
	text: "This modal has a fixed width of 500px on all devices.",
	type: "info",
	width: "500px",
});

// Full width modal (takes almost entire screen width)
aark.modal({
	title: "Full Width Modal",
	text: "This modal takes the full width with small margins on all devices.",
	type: "info",
	fullWidth: true,
});

// Numeric width (converted to pixels)
aark.modal({
	title: "Numeric Width Modal",
	text: "This modal has a width of 350 pixels.",
	type: "info",
	width: 350,
});
```

## Theme Customization

```jsx
import { aark } from "aark-react-modalify";

// Set custom theme
aark.setTheme({
	modalBackground: "#1a1a1a",
	overlayBackground: "rgba(0, 0, 0, 0.8)",
	closeButtonColor: "#ffffff",
	closeButtonHoverBackground: "rgba(255, 255, 255, 0.1)",
	modalBorderRadius: "12px",
	animationDuration: "0.3s",
});

// Use props-based modal with custom theme
aark.fire({
	title: "Dark Theme Modal",
	text: "This modal uses the custom dark theme.",
	type: "info",
});

// Reset to default theme
aark.resetTheme();

// Get current theme
const currentTheme = aark.getTheme();
console.log(currentTheme);
```

## Available Theme Properties

```typescript
interface AarkModalTheme {
	// Overlay
	overlayBackground?: string;
	overlayBlur?: string;

	// Modal
	modalBackground?: string;
	modalBorderRadius?: string;
	modalShadow?: string;
	modalPadding?: string;
	modalZIndex?: number;
	modalContentZIndex?: number;

	// Close button
	closeButtonColor?: string;
	closeButtonHoverBackground?: string;
	closeButtonHoverColor?: string;
	closeButtonFocusOutline?: string;

	// Animation
	animationDuration?: string;
	fadeDuration?: string;

	// Custom styles for special cases
	customOverlayBackground?: string;
	customOverlayBlur?: string;
	customModalGradientStart?: string;
	customModalGradientEnd?: string;
	customModalTextColor?: string;
	customModalShadow?: string;
	customModalCloseColor?: string;
	customModalCloseHoverBackground?: string;
	customModalCloseHoverColor?: string;
}
```

## Advanced Usage with React Hooks

```jsx
import { useModal } from "aark-react-modalify";

function MyComponent() {
	const { modals, close } = useModal();

	const handleOpenModal = () => {
		aark.fire({
			title: "Hook-based Modal",
			text: "This modal was opened using the useModal hook.",
			type: "info",
		});
	};

	return (
		<div>
			<button onClick={handleOpenModal}>Open Modal</button>
			{modals.length > 0 && <p>Currently {modals.length} modal(s) open</p>}
		</div>
	);
}
```

## Migration Guide: Component to Props

### Before (Component-based)

```jsx
aark.modal(
	<div style={{ padding: "2rem", textAlign: "center" }}>
		<h2>Confirm Delete</h2>
		<p>Are you sure you want to delete this item?</p>
		<button
			onClick={() => {
				deleteItem();
				aark.close();
			}}
		>
			Delete
		</button>
		<button onClick={() => aark.close()}>Cancel</button>
	</div>
);
```

### After (Props-based)

```jsx
aark.modal({
	title: "Confirm Delete",
	text: "Are you sure you want to delete this item?",
	type: "warning",
	showCancelButton: true,
	confirmText: "Delete",
	cancelText: "Cancel",
	onConfirm: () => deleteItem(),
	onCancel: () => console.log("Cancelled"),
});
```

## API Methods

```jsx
import { aark } from "aark-react-modalify";

// Fire modal (can use either approach)
aark.fire(<Component />); // Component-based
aark.fire({ title: "Hello", type: "info" }); // Props-based

// Modal (same as fire)
aark.modal(<Component />);
aark.modal({ title: "Hello", type: "info" });

// Notification
aark.notification(<Component />);
aark.notification({ title: "Hello", type: "success", timer: 3000 });

// Control
aark.close(); // Close current modal/notification
aark.isOpen(); // Check if any modal is open
aark.closeAll(); // Close all modals/notifications

// Theme management
aark.setTheme({ modalBackground: "#custom" });
aark.resetTheme();
const theme = aark.getTheme();
```
