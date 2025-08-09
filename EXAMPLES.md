# AARK React Modalify - Usage Examples

## Basic Usage

```jsx
import { aark } from "aark-react-modalify";

// Simple modal
aark.fire(<div>Hello World!</div>);

// Modal with options
aark.fire(<div>Custom Modal</div>, {
	mode: "modal",
	position: "center",
	showCloseIcon: true,
});

// Close modal
aark.close();
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

// Fire modal with custom theme
aark.fire(<div>Themed Modal</div>);

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
		aark.fire(<div>Hook-based Modal</div>);
	};

	return (
		<div>
			<button onClick={handleOpenModal}>Open Modal</button>
			{modals.length > 0 && <p>Currently {modals.length} modal(s) open</p>}
		</div>
	);
}
```

## Class-based API Methods

```jsx
import { aark } from "aark-react-modalify";

// Fire modal
const modalId = aark.fire(<Component />);

// Check if modal is open
const isOpen = aark.isOpen();

// Close modal
aark.close();

// Close all modals
aark.closeAll();

// Theme management
aark.setTheme({ modalBackground: "#custom" });
aark.resetTheme();
const theme = aark.getTheme();
```
