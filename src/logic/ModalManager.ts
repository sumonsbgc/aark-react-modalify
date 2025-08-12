import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
import ModalProvider from "../components/ModalProvider";
import type {
	ModalConfig,
	NotificationConfig,
	ComponentConfig,
	ModalOptions,
	NotificationOptions,
	ModalEvent,
	ModalEventType,
} from "../types";

type ModalListener = (event: ModalEvent) => void;

const listeners = new Set<ModalListener>();
let currentConfig: ComponentConfig | null = null;
let container: HTMLDivElement | null = null;
let root: Root | null = null;

function init(): void {
	if (container) return;
	container = document.createElement("div");
	container.id = "aark-react-modalify-root";
	container.style.position = "relative";
	container.style.zIndex = "9999";
	document.body.appendChild(container);
	if (container) {
		root = createRoot(container);
		root.render(createElement(ModalProvider));
	}
}

function subscribe(listener: ModalListener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function emit(type: ModalEventType, config?: ComponentConfig): void {
	const event: ModalEvent = { type, config };
	listeners.forEach((listener) => listener(event));
}

function fireModal(content: ReactNode, options?: ModalOptions): void {
	init();
	const config: ModalConfig = {
		content,
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
	content: ReactNode,
	options?: NotificationOptions
): void {
	init();
	const config: NotificationConfig = {
		content,
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

function fire(content: ReactNode, options?: ModalOptions): void {
	// Legacy method - defaults to modal
	fireModal(content, options);
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
	if (container && container.parentNode) {
		container.parentNode.removeChild(container);
		container = null;
		root = null;
	}
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
