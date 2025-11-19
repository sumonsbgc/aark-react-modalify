// Main API without CSS (for users who want to import CSS separately)
export { default as aark } from "./logic/aark";

// Types
export type {
	ModalOptions,
	NotificationOptions,
	ModalPosition,
	NotificationPosition,
	ModalMode,
	ModalType,
	ModalProps,
	NotificationProps,
	ModalConfig,
	NotificationConfig,
	ComponentConfig,
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
export { default as Modal } from "./components/Modal";
export { default as Notification } from "./components/Notification";
export { default as ModalProvider } from "./components/ModalProvider";
