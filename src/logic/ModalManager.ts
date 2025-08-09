import React from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
import type {
	ModalConfig,
	ModalOptions,
	ModalEvent,
	ModalEventType,
} from "../types";

type ModalListener = (event: ModalEvent) => void;

class ModalManager {
	private listeners: Set<ModalListener> = new Set();
	private currentConfig: ModalConfig | null = null;
	private container: HTMLDivElement | null = null;
	private root: Root | null = null;

	/**
	 * Initialize the modal system
	 */
	private init(): void {
		if (this.container) return;

		// Create container for modals
		this.container = document.createElement("div");
		this.container.id = "aark-react-modalify-root";
		this.container.style.position = "relative";
		this.container.style.zIndex = "9999";
		document.body.appendChild(this.container);

		// Import and render ModalProvider dynamically to avoid circular dependency
		import("../components/ModalProvider").then(({ default: ModalProvider }) => {
			if (this.container) {
				this.root = createRoot(this.container);
				this.root.render(React.createElement(ModalProvider));
			}
		});
	}

	/**
	 * Subscribe to modal events
	 */
	subscribe(listener: ModalListener): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	/**
	 * Emit modal events to all listeners
	 */
	private emit(type: ModalEventType, config?: ModalConfig): void {
		const event: ModalEvent = { type, config };
		this.listeners.forEach((listener) => listener(event));
	}

	/**
	 * Open a modal with content and options
	 */
	fire(content: ReactNode, options?: ModalOptions): void {
		// Initialize on first use
		this.init();

		const config: ModalConfig = {
			content,
			options: {
				position: "center",
				mode: "modal",
				showCloseIcon: true,
				preventEscClose: false,
				preventOverlayClose: false,
				...options,
			},
		};

		this.currentConfig = config;
		this.emit("open", config);
	}

	/**
	 * Close the current modal
	 */
	close(): void {
		if (this.currentConfig) {
			this.emit("beforeClose", this.currentConfig);
			this.currentConfig = null;
			this.emit("close");
		}
	}

	/**
	 * Check if a modal is currently open
	 */
	isOpen(): boolean {
		return this.currentConfig !== null;
	}

	/**
	 * Get the current modal configuration
	 */
	getCurrentConfig(): ModalConfig | null {
		return this.currentConfig;
	}

	/**
	 * Force close all modals (useful for cleanup)
	 */
	closeAll(): void {
		this.close();
	}

	/**
	 * Cleanup the modal system (useful for testing or when unmounting the app)
	 */
	cleanup(): void {
		if (this.container && this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
			this.container = null;
			this.root = null;
		}
	}
}

// Create a singleton instance
export const modalManager = new ModalManager();
