# AARK React Modalify 🚀

A lightweight, customizable, and easy-to-use modal library for React applications with TypeScript support and full CSS customization.

## ✨ Features

- **Zero Dependencies**: Pure React implementation
- **TypeScript Support**: Full type safety out of the box
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
				mode: "modal",
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
aark.fire(<div>Themed Modal</div>);

// Reset to default theme
aark.resetTheme();

// Get current theme
const currentTheme = aark.getTheme();
```

## 📚 API Reference

### `aark.fire(component, options)`

Display a modal with the given component and options.

**Parameters:**

- `component` (ReactNode): The React component or element to render
- `options` (ModalOptions): Configuration options

**Returns:** `void`

### `aark.close()`

Close the currently open modal.

### `aark.isOpen()`

Check if a modal is currently open.

**Returns:** `boolean`

### `aark.closeAll()`

Close all open modals.

### `aark.setTheme(theme)`

Set custom theme for AARK modals.

**Parameters:**

- `theme` (AarkModalTheme): Theme configuration object

### `aark.resetTheme()`

Reset theme to default values.

### `aark.getTheme()`

Get current theme values.

**Returns:** `AarkModalTheme`

## ⚙️ Modal Options

```typescript
interface ModalOptions {
	mode?: "modal" | "notification" | "popup";
	position?: "center" | "top" | "bottom" | "left" | "right";
	showCloseIcon?: boolean;
	closeOnOverlayClick?: boolean;
	closeOnEscapeKey?: boolean;
	customClass?: string;
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
