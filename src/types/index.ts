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
