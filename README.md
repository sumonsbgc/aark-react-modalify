# AARK React Modalify 🚀

A lightweight, customizable, and easy-to-use modal library for React applications with TypeScript support and automatic CSS inclusion. Now supports both **component-based** and **props-based** modals and notifications!

## ✨ Features

- **Zero Dependencies**: Pure React implementation
- **TypeScript Support**: Full type safety out of the box
- **Automatic CSS**: Styles are included automatically when you import the library
- **Dual API**: Use components OR simple props-based configuration
- **Class-based Architecture**: Clean, singleton-based API
- **Fully Customizable**: CSS variables for complete theme control
- **Portal Rendering**: Modals render outside your component tree
- **Accessibility**: Built-in keyboard navigation and focus management
- **Multiple Positions**: Center, top, bottom, left, right positioning
- **Animation Support**: Smooth fade and slide animations
- **Hook Integration**: useModal hook for advanced use cases
- **No Provider Required**: Just import and use anywhere
- **Minified CSS**: Only 8.97 kB of optimized styles

## 📦 Installation

```bash
npm install aark-react-modalify
```

## 🚀 Quick Start

### Basic Usage (CSS Included Automatically)

```jsx
import { aark } from "aark-react-modalify";
// ✅ CSS is automatically included - no separate import needed!

function App() {
	const openModal = () => {
		aark.fire(
			<div>
				<h2>Hello World!</h2>
				<p>This is a simple modal.</p>
				<button onClick={() => aark.close()}>Close</button>
			</div>,
			{
				position: "center",
				showCloseIcon: true,
			}
		);
	};

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
		</div>
	);
}
```

### Alternative: Import Without CSS

If you prefer to manage CSS separately:

```jsx
import { aark } from "aark-react-modalify/no-styles";
import "aark-react-modalify/css";

// Rest of your code...
```

## 🎯 Component-Based Approach

Perfect for complex, reusable modal content:

```jsx
import { aark } from "aark-react-modalify";

function App() {
	const openCustomModal = () => {
		aark.fire(
			<div className="my-custom-modal">
				<h2>Custom Modal</h2>
				<form>
					<input type="text" placeholder="Enter your name" />
					<button type="submit">Submit</button>
				</form>
				<button onClick={() => aark.close()}>Cancel</button>
			</div>,
			{
				position: "center",
				showCloseIcon: true,
				clickOutsideToClose: true,
			}
		);
	};

	return <button onClick={openCustomModal}>Open Custom Modal</button>;
}
```

## 🎯 Props-Based Approach

Perfect for quick alerts, confirmations, and notifications:

```jsx
import { aark } from "aark-react-modalify";

function App() {
	const showConfirmation = () => {
		aark.fire({
			title: "Delete Item",
			text: "Are you sure you want to delete this item? This action cannot be undone.",
			type: "warning",
			showCancelButton: true,
			confirmText: "Yes, delete it!",
			cancelText: "Cancel",
			confirmButtonColor: "#d33",
			onConfirm: () => {
				console.log("Item deleted!");
				aark.notification({
					title: "Deleted!",
					text: "The item has been deleted successfully.",
					type: "success",
					timer: 3000,
				});
			},
			onCancel: () => console.log("Deletion cancelled"),
		});
	};

	const showNotification = () => {
		aark.notification({
			title: "Welcome!",
			text: "Thanks for using AARK React Modalify!",
			type: "info",
			timer: 4000,
			position: "top-right",
		});
	};

	return (
		<div>
			<button onClick={showConfirmation}>Delete Item</button>
			<button onClick={showNotification}>Show Notification</button>
		</div>
	);
}
```

## 📚 API Reference

### Modal API

#### `aark.fire(content, options?)`

**Component-based:**

```jsx
aark.fire(<YourComponent />, options);
```

**Props-based:**

```jsx
aark.fire({
	title: "Modal Title",
	text: "Modal content",
	type: "info", // "success" | "error" | "warning" | "info" | "question"
	showCancelButton: true,
	confirmText: "OK",
	cancelText: "Cancel",
	onConfirm: () => {},
	onCancel: () => {},
});
```

#### Modal Options

| Option                | Type            | Default    | Description              |
| --------------------- | --------------- | ---------- | ------------------------ |
| `position`            | `ModalPosition` | `"center"` | Modal position           |
| `showCloseIcon`       | `boolean`       | `false`    | Show close button        |
| `clickOutsideToClose` | `boolean`       | `true`     | Close on backdrop click  |
| `escapeKeyToClose`    | `boolean`       | `true`     | Close on ESC key         |
| `onOpen`              | `() => void`    | -          | Called when modal opens  |
| `onClose`             | `() => void`    | -          | Called when modal closes |

### Notification API

#### `aark.notification(options)`

```jsx
aark.notification({
	title: "Notification Title",
	text: "Notification message",
	type: "success", // "success" | "error" | "warning" | "info" | "question"
	timer: 3000, // Auto-close after 3 seconds
	position: "top-right",
	showCloseButton: true,
	onClick: () => {},
	onClose: () => {},
});
```

#### Notification Options

| Option            | Type                   | Default       | Description           |
| ----------------- | ---------------------- | ------------- | --------------------- |
| `title`           | `string`               | -             | Notification title    |
| `text`            | `string`               | -             | Notification content  |
| `type`            | `NotificationType`     | `"info"`      | Notification type     |
| `timer`           | `number`               | `0`           | Auto-close timer (ms) |
| `position`        | `NotificationPosition` | `"top-right"` | Notification position |
| `showCloseButton` | `boolean`              | `true`        | Show close button     |
| `onClick`         | `() => void`           | -             | Click handler         |
| `onClose`         | `() => void`           | -             | Close handler         |

### Position Types

```typescript
type ModalPosition =
	| "center"
	| "top-center"
	| "top-left"
	| "top-right"
	| "bottom-center"
	| "bottom-left"
	| "bottom-right";

type NotificationPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";
```

### Other Methods

```jsx
aark.close(); // Close current modal
aark.closeAll(); // Close all modals and notifications
aark.isOpen(); // Check if any modal is open
```

## 🎨 Customization

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
	/* Modal Variables */
	--aark-modal-overlay-bg: rgba(0, 0, 0, 0.5);
	--aark-modal-bg: #fff;
	--aark-modal-radius: 8px;
	--aark-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	--aark-modal-pad: 16px;
	--aark-modal-z: 9999;

	/* Notification Variables */
	--aark-notification-bg: #fff;
	--aark-notification-radius: 8px;
	--aark-notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	--aark-notification-pad: 16px;
	--aark-notification-z: 10000;

	/* Shared Variables */
	--aark-close-color: #666;
	--aark-close-hover: #f5f5f5;
	--aark-anim: 0.2s;
}
```

### Dark Mode Example

```css
[data-theme="dark"] {
	--aark-modal-bg: #1f2937;
	--aark-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
	--aark-notification-bg: #374151;
}

[data-theme="dark"] .aark-standard-modal .aark-modal-title {
	color: #ffffff;
}

[data-theme="dark"] .aark-standard-modal .aark-modal-content p {
	color: #d1d5db;
}
```

### Custom Button Colors

```css
.aark-standard-modal .aark-modal-confirm-button {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.aark-notification-success {
	border-left: 4px solid #10b981;
}
```

## 🔧 Advanced Usage

### Using with Hooks

```jsx
import { useModal } from "aark-react-modalify";

function MyComponent() {
	const { openModal, closeModal, isOpen } = useModal();

	const handleOpen = () => {
		openModal(<div>My modal content</div>, { position: "center" });
	};

	return (
		<div>
			<button onClick={handleOpen}>Open Modal</button>
			{isOpen && <p>Modal is currently open</p>}
		</div>
	);
}
```

### Theme Management

```jsx
import { setAarkModalTheme, resetAarkModalTheme } from "aark-react-modalify";

// Apply custom theme
setAarkModalTheme({
	modalBg: "#1f2937",
	modalRadius: "12px",
	animationDuration: "0.3s",
});

// Reset to defaults
resetAarkModalTheme();
```

## 📁 CSS Import Options

### Option 1: Automatic (Recommended)

```jsx
import { aark } from "aark-react-modalify";
// CSS is included automatically ✅
```

### Option 2: Manual Import

```jsx
import { aark } from "aark-react-modalify/no-styles";
import "aark-react-modalify/css";
```

### Option 3: Individual Style Files

```jsx
// For modal-only usage
import "aark-react-modalify/src/assets/styles/aark-modal-only.css";

// For notification-only usage
import "aark-react-modalify/src/assets/styles/aark-notification-only.css";
```

## 🌐 Framework Compatibility

Works seamlessly with:

- ✅ **Vite** - CSS automatically processed
- ✅ **Create React App** - Styles included in bundle
- ✅ **Next.js** - Works with both App and Pages router
- ✅ **Webpack** - CSS automatically bundled
- ✅ **Parcel** - Styles processed automatically

## 📊 Bundle Size

- **JavaScript**: ~16 kB (minified)
- **CSS**: 8.97 kB (minified)
- **Total**: ~25 kB
- **Gzipped**: ~8 kB (estimated)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆕 What's New in v1.1.0

- ✅ **Automatic CSS Import**: No need to import CSS separately
- ✅ **Optimized Bundle**: CSS minified to 8.97 kB
- ✅ **Better Tree Shaking**: Import only what you need
- ✅ **Enhanced TypeScript**: Improved type definitions
- ✅ **Framework Agnostic**: Works with any modern bundler

---

Made with ❤️ by [Mohammad Sumon](https://github.com/sumonsbgc)

## ✨ Features

- **Zero Dependencies**: Pure React implementation
- **TypeScript Support**: Full type safety out of the box
- **Dual API**: Use components OR simple props-based configuration
- **Class-based Architecture**: Clean, singleton-based API
- **Fully Customizable**: CSS variables for complete theme control
- **Portal Rendering**: Modals render outside your component tree
- **Accessibility**: Built-in keyboard navigation and focus management
- **Multiple Positions**: Center, top, bottom, left, right positioning
- **Animation Support**: Smooth fade and slide animations
- **Hook Integration**: useModal hook for advanced use cases
- **No Provider Required**: Just import and use anywhere

## 📦 Installation

```bash
npm install aark-react-modalify
```

## 🚀 Quick Start

### Component-Based Approach (Original)

```jsx
import { aark } from "aark-react-modalify";

function App() {
	const openModal = () => {
		aark.fire(
			<div>
				<h2>Hello World!</h2>
				<p>This is a simple modal.</p>
				<button onClick={() => aark.close()}>Close</button>
			</div>,
			{
				position: "center",
				showCloseIcon: true,
			}
		);
	};

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
		</div>
	);
}
```

### Props-Based Approach (New!)

```jsx
import { aark } from "aark-react-modalify";

function App() {
	const openModal = () => {
		aark.fire({
			title: "Confirmation",
			text: "Are you sure you want to proceed?",
			type: "question",
			showCancelButton: true,
			confirmText: "Yes, proceed!",
			cancelText: "Cancel",
			onConfirm: () => console.log("Confirmed!"),
			onCancel: () => console.log("Cancelled!"),
		});
	};

	const openNotification = () => {
		aark.notification({
			title: "Success!",
			text: "Your action was completed successfully.",
			type: "success",
			timer: 3000,
		});
	};

	return (
		<div>
			<button onClick={openModal}>Open Props Modal</button>
			<button onClick={openNotification}>Show Notification</button>
		</div>
	);
}
```

## 📋 API Methods

### `aark.fire(contentOrProps, options?)`

Display a modal with either component content or props configuration.

**Component-based usage:**

```jsx
aark.fire(<MyComponent />, { position: "center" });
```

**Props-based usage:**

```jsx
aark.fire({
	title: "Alert",
	text: "This is a simple alert",
	type: "info",
});
```

### `aark.modal(contentOrProps, options?)`

Same as `aark.fire()` - display a modal.

### `aark.notification(contentOrProps, options?)`

Display a notification with either component content or props configuration.

**Component-based usage:**

```jsx
aark.notification(<MyNotification />, { position: "top-right" });
```

**Props-based usage:**

```jsx
aark.notification({
	title: "New Message",
	text: "You have a new message!",
	type: "info",
	timer: 5000,
});
```

### Other Methods

- `aark.close()` - Close the currently open modal/notification
- `aark.isOpen()` - Check if a modal is currently open
- `aark.closeAll()` - Close all open modals/notifications

## 🎨 Props-Based Configuration

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

## 💡 Usage Examples

### Success Modal

```jsx
aark.modal({
	title: "Success!",
	text: "Your data has been saved successfully.",
	type: "success",
	confirmText: "Great!",
});
```

### Confirmation Dialog

```jsx
aark.modal({
	title: "Delete Item",
	text: "Are you sure you want to delete this item? This action cannot be undone.",
	type: "warning",
	showCancelButton: true,
	confirmText: "Yes, delete it!",
	cancelText: "Cancel",
	onConfirm: () => {
		// Delete logic here
		console.log("Item deleted");
	},
});
```

### Error Notification

```jsx
aark.notification({
	title: "Error",
	text: "Something went wrong. Please try again.",
	type: "error",
	timer: 4000,
});
```

### Custom HTML Content

```jsx
aark.modal({
	title: "Custom Content",
	html: `
		<div>
			<p>This is <strong>custom HTML</strong> content.</p>
			<ul>
				<li>Feature 1</li>
				<li>Feature 2</li>
			</ul>
		</div>
	`,
	type: "info",
});
```

### Using Component-Based Approach (Original)

```jsx
// You can still use the original component-based approach
aark.modal(
	<div style={{ padding: "2rem" }}>
		<h2>Custom Component</h2>
		<p>This is a custom React component!</p>
		<button onClick={() => aark.close()}>Close</button>
	</div>,
	{
		position: "center",
		showCloseIcon: false,
	}
);
```

## 🎨 Theme Customization

AARK React Modalify supports full theme customization through CSS variables:

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

// Fire modal with custom theme
aark.fire({ title: "Themed Modal", text: "This modal uses custom theme!" });

// Reset to default theme
aark.resetTheme();

// Get current theme
const currentTheme = aark.getTheme();
```

## ⚙️ Modal Options (for component-based approach)

```typescript
interface ModalOptions {
	position?:
		| "center"
		| "top-center"
		| "top-right"
		| "bottom-right"
		| "bottom-center";
	showCloseIcon?: boolean;
	className?: string;
	overlayClassName?: string;
	preventEscClose?: boolean;
	preventOverlayClose?: boolean;
}

interface NotificationOptions {
	position?:
		| "top-right"
		| "top-center"
		| "top-left"
		| "bottom-right"
		| "bottom-center"
		| "bottom-left";
	showCloseIcon?: boolean;
	autoCloseTime?: number;
	className?: string;
	preventEscClose?: boolean;
}
```

## 🎨 Theme Properties

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

	// Custom styles
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

## 🔗 React Hook Integration

For advanced use cases, you can use the `useModal` hook:

```jsx
import { useModal } from "aark-react-modalify";

function MyComponent() {
	const { modals, close } = useModal();

	return (
		<div>
			{modals.length > 0 && <p>Currently {modals.length} modal(s) open</p>}
		</div>
	);
}
```

## 🆚 Comparison: Component vs Props-Based

| Feature         | Component-Based             | Props-Based                 |
| --------------- | --------------------------- | --------------------------- |
| **Flexibility** | Complete control over JSX   | Predefined templates        |
| **Ease of Use** | Requires React knowledge    | Simple object configuration |
| **Styling**     | Full CSS control            | Built-in styled templates   |
| **Type Safety** | ReactNode typing            | Structured props interface  |
| **Best for**    | Complex UIs, custom designs | Quick alerts, confirmations |

**When to use Component-Based:**

- Complex modal content
- Custom styling requirements
- Existing React components
- Advanced interactions

**When to use Props-Based:**

- Quick alerts and confirmations
- Consistent design system
- Simple notifications
- Rapid prototyping

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📄 License

Licensed under MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
