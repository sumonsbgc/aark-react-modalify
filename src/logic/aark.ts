import type { ReactNode } from "react";
import type { ModalOptions } from "../types";
import { modalManager } from "./ModalManager";
import type { AarkModalTheme } from "../utils/theme";
import {
	setAarkModalTheme,
	resetAarkModalTheme,
	getAarkModalTheme,
} from "../utils/theme";

/**
 * Main API for AARK React Modalify - Class-based architecture
 *
 * Usage:
 * import { aark } from 'aark-react-modalify';
 *
 * aark.fire(<MyComponent />, { mode: 'modal', position: 'center' });
 * aark.setTheme({ modalBackground: '#custom-color' });
 */
export class Aark {
	private static instance: Aark | null = null;

	private constructor() {
		// Private constructor to enforce singleton pattern
	}

	/**
	 * Get the singleton instance of Aark
	 */
	static getInstance(): Aark {
		if (!Aark.instance) {
			Aark.instance = new Aark();
		}
		return Aark.instance;
	}

	/**
	 * Fire/open a modal with content and optional configuration
	 * @param content - React component or element to render in modal
	 * @param options - Optional configuration for modal behavior and styling
	 */
	fire(content: ReactNode, options?: ModalOptions): void {
		modalManager.fire(content, options);
	}

	/**
	 * Close the currently open modal
	 */
	close(): void {
		modalManager.close();
	}

	/**
	 * Check if a modal is currently open
	 */
	isOpen(): boolean {
		return modalManager.isOpen();
	}

	/**
	 * Close all modals (alias for close since only one modal can be open at a time)
	 */
	closeAll(): void {
		modalManager.closeAll();
	}

	/**
	 * Set custom theme for AARK modals
	 */
	setTheme(theme: AarkModalTheme): void {
		setAarkModalTheme(theme);
	}

	/**
	 * Reset theme to default values
	 */
	resetTheme(): void {
		resetAarkModalTheme();
	}

	/**
	 * Get current theme values
	 */
	getTheme(): AarkModalTheme {
		return getAarkModalTheme();
	}

	/**
	 * Destroy the singleton instance (useful for testing)
	 */
	static destroy(): void {
		Aark.instance = null;
	}
}

// Create and export a singleton instance
const aark = Aark.getInstance();
export default aark;
