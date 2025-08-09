import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
import type {
	ModalConfig,
	ModalOptions,
	ModalEvent,
	ModalEventType,
} from "../types";

type ModalListener = (event: ModalEvent) => void;

const listeners = new Set<ModalListener>();
let currentConfig: ModalConfig | null = null;
let container: HTMLDivElement | null = null;
let root: Root | null = null;

function init(): void {
	if (container) return;
	container = document.createElement("div");
	container.id = "aark-react-modalify-root";
	container.style.position = "relative";
	container.style.zIndex = "9999";
	document.body.appendChild(container);
	import("../components/ModalProvider").then(({ default: ModalProvider }) => {
		if (container) {
			root = createRoot(container);
			root.render(createElement(ModalProvider));
		}
	});
}

function subscribe(listener: ModalListener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function emit(type: ModalEventType, config?: ModalConfig): void {
	const event: ModalEvent = { type, config };
	listeners.forEach((listener) => listener(event));
}

function fire(content: ReactNode, options?: ModalOptions): void {
	init();
	const config: ModalConfig = {
		content,
		options: Object.assign(
			{
				position: "center",
				mode: "modal",
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

function getCurrentConfig(): ModalConfig | null {
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
	close,
	isOpen,
	getCurrentConfig,
	closeAll,
	cleanup,
};
