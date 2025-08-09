// Main API
export { default as aark } from "./logic/aark";

// Types
export type {
	ModalOptions,
	ModalPosition,
	ModalMode,
	ModalConfig,
	ModalState,
	ModalEvent,
	ModalEventType,
} from "./types";

// Theme utilities
export type { AarkModalTheme } from "./utils/theme";
export {
	setAarkModalTheme,
	resetAarkModalTheme,
	getAarkModalTheme,
} from "./utils/theme";

// Hooks (for advanced use cases)
export { useModal } from "./hooks/useModal";

// Components (for manual integration)
export { default as ModalRenderer } from "./components/ModalRenderer";

// CSS styles (automatically included)
import "./assets/styles/aark-modal.css";
