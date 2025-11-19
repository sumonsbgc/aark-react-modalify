import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
import ModalProvider from "../components/ModalProvider";
import { getModalRoot, cleanupModalRoot } from "../utils/modal-root";
import type {
	ModalConfig,
	NotificationConfig,
	ComponentConfig,
	ModalOptions,
	NotificationOptions,
	ModalEvent,
	ModalEventType,
	ModalProps,
	NotificationProps,
} from "../types";

type ModalListener = (event: ModalEvent) => void;

const listeners = new Set<ModalListener>();
let currentConfig: ComponentConfig | null = null;
let root: Root | null = null;

function init(): void {
	if (root) return;

	// Use the centralized modal root
	const container = getModalRoot();
	root = createRoot(container);
	root.render(createElement(ModalProvider));
}

function subscribe(listener: ModalListener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function emit(type: ModalEventType, config?: ComponentConfig): void {
	const event: ModalEvent = { type, config };
	listeners.forEach((listener) => listener(event));
}

function fireModal(
	contentOrProps: ReactNode | ModalProps,
	options?: ModalOptions
): void {
	init();

	let content: ReactNode | undefined;
	let props: ModalProps | undefined;

	// Determine if first argument is props object or React component
	if (
		contentOrProps &&
		typeof contentOrProps === "object" &&
		!("$$typeof" in contentOrProps) &&
		!Array.isArray(contentOrProps)
	) {
		// It's a props object
		props = contentOrProps as ModalProps;
		content = undefined;
	} else {
		// It's a React component/element
		content = contentOrProps as ReactNode;
		props = undefined;
	}

	const config: ModalConfig = {
		content,
		props,
		mode: "modal",
		options: Object.assign(
			{
				position: "center",
				showCloseIcon: true,
				preventEscClose: false,
				preventOverlayClose: false,
			},
			options
		),
	};
	currentConfig = config;
	emit("open", config);
}

function fireNotification(
	contentOrProps: ReactNode | NotificationProps,
	options?: NotificationOptions
): void {
	init();

	let content: ReactNode | undefined;
	let props: NotificationProps | undefined;

	// Determine if first argument is props object or React component
	if (
		contentOrProps &&
		typeof contentOrProps === "object" &&
		!("$$typeof" in contentOrProps) &&
		!Array.isArray(contentOrProps)
	) {
		// It's a props object
		props = contentOrProps as NotificationProps;
		content = undefined;
	} else {
		// It's a React component/element
		content = contentOrProps as ReactNode;
		props = undefined;
	}

	const config: NotificationConfig = {
		content,
		props,
		mode: "notification",
		options: Object.assign(
			{
				position: "top-right",
				showCloseIcon: true,
				autoCloseTime: 5000,
				preventEscClose: false,
			},
			options
		),
	};
	currentConfig = config;
	emit("open", config);
}

function fire(
	contentOrProps: ReactNode | ModalProps,
	options?: ModalOptions
): void {
	// Legacy method - defaults to modal
	fireModal(contentOrProps, options);
}

function close(): void {
	if (currentConfig) {
		emit("beforeClose", currentConfig);
		currentConfig = null;
		emit("close");
	}
}

function isOpen(): boolean {
	return currentConfig !== null;
}

function getCurrentConfig(): ComponentConfig | null {
	return currentConfig;
}

function closeAll(): void {
	close();
}

function cleanup(): void {
	if (root) {
		root.unmount();
		root = null;
	}
	// Use centralized cleanup
	cleanupModalRoot();
}

export const modalManager = {
	subscribe,
	fire,
	fireModal,
	fireNotification,
	close,
	isOpen,
	getCurrentConfig,
	closeAll,
	cleanup,
};
