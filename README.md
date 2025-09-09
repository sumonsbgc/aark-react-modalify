# AARK React Modalify 🚀

A lightweight, flexible React modal and notification library with TypeScript support. Features automatic DOM mounting, customizable styling, and a simple imperative API for displaying modals, alerts, confirmations, and toast notifications.

## ✨ Features

- **Zero Dependencies**: Pure React implementation
- **TypeScript Support**: Full type safety out of the box
- **Dual API**: Component-based OR props-based configuration
- **Automatic CSS**: Styles included automatically or import separately
- **Portal Rendering**: Modals render outside your component tree
- **Accessibility**: Built-in keyboard navigation and focus management
- **Customizable**: CSS variables for complete theme control
- **Multiple Positions**: Various positioning options for modals and notifications
- **Animation Support**: Smooth fade and slide animations
- **Hook Integration**: useModal hook for advanced use cases

## 📦 Installation

```bash
npm install aark-react-modalify
```

## 🚀 Quick Start

### Component-Based Approach

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

	return <button onClick={openModal}>Open Modal</button>;
}
```

### Props-Based Approach

```jsx
import { aark } from "aark-react-modalify";

function App() {
	const showConfirmation = () => {
		aark.fire({
			title: "Delete Item",
			text: "Are you sure you want to delete this item?",
			type: "warning",
			showCancelButton: true,
			confirmText: "Yes, delete it!",
			cancelText: "Cancel",
			onConfirm: () => {
				aark.notification({
					title: "Deleted!",
					text: "The item has been deleted successfully.",
					type: "success",
					timer: 3000,
				});
			},
		});
	};

	return <button onClick={showConfirmation}>Delete Item</button>;
}
```

## 📚 API Reference

### Modal Methods

#### `aark.fire(content, options?)` or `aark.fire(props)`

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

### Notification Methods

#### `aark.notification(content, options?)` or `aark.notification(props)`

**Component-based:**

```jsx
aark.notification(<YourNotification />, options);
```

**Props-based:**

```jsx
aark.notification({
	title: "Notification Title",
	text: "Notification message",
	type: "success",
	timer: 3000,
	position: "top-right",
});
```

### Other Methods

```jsx
aark.close(); // Close current modal
aark.closeAll(); // Close all modals and notifications
aark.isOpen(); // Check if any modal is open
```

## ⚙️ Configuration Options

### Modal Options

| Option                | Type            | Default    | Description              |
| --------------------- | --------------- | ---------- | ------------------------ |
| `position`            | `ModalPosition` | `"center"` | Modal position           |
| `showCloseIcon`       | `boolean`       | `false`    | Show close button        |
| `clickOutsideToClose` | `boolean`       | `true`     | Close on backdrop click  |
| `escapeKeyToClose`    | `boolean`       | `true`     | Close on ESC key         |
| `onOpen`              | `() => void`    | -          | Called when modal opens  |
| `onClose`             | `() => void`    | -          | Called when modal closes |

### Notification Options

| Option            | Type                   | Default       | Description           |
| ----------------- | ---------------------- | ------------- | --------------------- |
| `title`           | `string`               | -             | Notification title    |
| `text`            | `string`               | -             | Notification content  |
| `type`            | `NotificationType`     | `"info"`      | Notification type     |
| `timer`           | `number`               | `0`           | Auto-close timer (ms) |
| `position`        | `NotificationPosition` | `"top-right"` | Notification position |
| `showCloseButton` | `boolean`              | `true`        | Show close button     |

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

## 🎨 Customization

### CSS Variables

```css
:root {
	--aark-modal-overlay-bg: rgba(0, 0, 0, 0.5);
	--aark-modal-bg: #fff;
	--aark-modal-radius: 8px;
	--aark-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	--aark-modal-pad: 16px;
	--aark-modal-z: 9999;
	--aark-notification-bg: #fff;
	--aark-notification-radius: 8px;
	--aark-notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	--aark-notification-pad: 16px;
	--aark-notification-z: 10000;
	--aark-close-color: #666;
	--aark-close-hover: #f5f5f5;
	--aark-anim: 0.2s;
}
```

### CSS Import Options

**Option 1: Automatic (Default)**

```jsx
import { aark } from "aark-react-modalify";
// CSS is included automatically
```

**Option 2: Manual Import**

```jsx
import { aark } from "aark-react-modalify/no-styles";
import "aark-react-modalify/css";
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

## 💡 Examples

### Success Modal

```jsx
aark.fire({
	title: "Success!",
	text: "Your data has been saved successfully.",
	type: "success",
	confirmText: "Great!",
});
```

### Confirmation Dialog

```jsx
aark.fire({
	title: "Delete Item",
	text: "This action cannot be undone.",
	type: "warning",
	showCancelButton: true,
	confirmText: "Yes, delete it!",
	cancelText: "Cancel",
	onConfirm: () => console.log("Item deleted"),
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

## 🌐 Framework Compatibility

- ✅ **Vite** - CSS automatically processed
- ✅ **Create React App** - Styles included in bundle
- ✅ **Next.js** - Works with both App and Pages router
- ✅ **Webpack** - CSS automatically bundled
- ✅ **Parcel** - Styles processed automatically

## 📊 Bundle Size

- **JavaScript**: ~16 kB (minified)
- **CSS**: ~9 kB (minified)
- **Total**: ~25 kB
- **Gzipped**: ~8 kB (estimated)

## 🆚 Component vs Props-Based

| Feature         | Component-Based             | Props-Based                 |
| --------------- | --------------------------- | --------------------------- |
| **Flexibility** | Complete control over JSX   | Predefined templates        |
| **Ease of Use** | Requires React knowledge    | Simple object configuration |
| **Styling**     | Full CSS control            | Built-in styled templates   |
| **Best for**    | Complex UIs, custom designs | Quick alerts, confirmations |

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [Mohammad Sumon](https://github.com/sumonsbgc)
