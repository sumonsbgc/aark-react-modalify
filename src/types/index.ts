import type { ReactNode } from "react";

export type ModalPosition =
	| "center"
	| "top-center"
	| "top-right"
	| "bottom-right"
	| "bottom-center";

export type ModalMode = "modal" | "notification";

export interface ModalOptions {
	position?: ModalPosition;
	mode?: ModalMode;
	showCloseIcon?: boolean;
	autoCloseTime?: number; // ms for notification auto close
	className?: string; // custom CSS classes
	overlayClassName?: string; // custom overlay CSS classes
	preventEscClose?: boolean; // prevent closing with escape key
	preventOverlayClose?: boolean; // prevent closing by clicking overlay
}

export interface ModalConfig {
	content: ReactNode;
	options?: ModalOptions;
}

export interface ModalState {
	isOpen: boolean;
	config: ModalConfig | null;
}

// Event types for modal lifecycle
export type ModalEventType = "open" | "close" | "beforeClose";

export interface ModalEvent {
	type: ModalEventType;
	config?: ModalConfig;
}
