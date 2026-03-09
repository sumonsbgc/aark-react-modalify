import type { ReactNode } from "react";

export type ModalPosition =
	| "center"
	| "top-center"
	| "top-right"
	| "bottom-right"
	| "bottom-center";

export type NotificationPosition =
	| "top-right"
	| "top-center"
	| "top-left"
	| "bottom-right"
	| "bottom-center"
	| "bottom-left";

export type ModalMode = "modal" | "notification";

export type ModalType = "success" | "error" | "warning" | "info" | "question";

/** Convenience size presets — maps to max-width values */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

// Props-based modal configuration
export interface ModalProps {
	title?: string;
	text?: string;
	type?: ModalType;
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
	icon?: string | ReactNode;
	html?: string | ReactNode;
	showCancelButton?: boolean;
	showConfirmButton?: boolean;
	allowOutsideClick?: boolean;
	allowEscapeKey?: boolean;
	reverseButtons?: boolean;
	focusConfirm?: boolean;
	focusCancel?: boolean;
	width?: string | number;
	fullWidth?: boolean;
	padding?: string | number;
	background?: string;
	customClass?: {
		container?: string;
		popup?: string;
		header?: string;
		title?: string;
		closeButton?: string;
		icon?: string;
		image?: string;
		content?: string;
		input?: string;
		actions?: string;
		confirmButton?: string;
		cancelButton?: string;
		footer?: string;
	};
}

// Props-based notification configuration
export interface NotificationProps {
	title?: string;
	text?: string;
	type?: ModalType;
	icon?: string | ReactNode;
	html?: string | ReactNode;
	timer?: number;
	showCloseButton?: boolean;
	clickToClose?: boolean;
	width?: string | number;
	fullWidth?: boolean;
	padding?: string | number;
	background?: string;
	customClass?: {
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

export interface BaseOptions {
	showCloseIcon?: boolean;
	className?: string;
	preventEscClose?: boolean;
}

export interface ModalOptions extends BaseOptions {
	position?: ModalPosition;
	overlayClassName?: string;
	preventOverlayClose?: boolean;
	/** Convenience size preset. Overridden by explicit width/maxWidth. */
	size?: ModalSize;
	/** Explicit width (e.g. '500px', '80%', 600). Overrides size preset. */
	width?: string | number;
	/** Explicit max-width (e.g. '600px', '90vw'). Overrides size preset. */
	maxWidth?: string | number;
	/**
	 * Controls padding on the modal body card (component-based modals only).
	 * - true / omitted → default CSS var (--aark-modal-pad, 16px)
	 * - false | 0       → no padding (useful when header/footer need edge-to-edge borders)
	 * - number          → px value  e.g. 24
	 * - string          → any CSS value e.g. '8px 16px'
	 */
	bodyPadding?: boolean | string | number;
}

export interface NotificationOptions extends BaseOptions {
	position?: NotificationPosition;
	autoCloseTime?: number; // ms for notification auto close
}

export interface ModalConfig {
	content?: ReactNode;
	props?: ModalProps;
	options?: ModalOptions;
	mode: "modal";
}

export interface NotificationConfig {
	content?: ReactNode;
	props?: NotificationProps;
	options?: NotificationOptions;
	mode: "notification";
}

export type ComponentConfig = ModalConfig | NotificationConfig;

export interface ModalState {
	isOpen: boolean;
	config: ComponentConfig | null;
}

// Event types for modal lifecycle
export type ModalEventType = "open" | "close" | "beforeClose";

export interface ModalEvent {
	type: ModalEventType;
	config?: ComponentConfig;
}
