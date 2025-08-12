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
	content: ReactNode;
	options?: ModalOptions;
	mode: "modal";
}

export interface NotificationConfig {
	content: ReactNode;
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
