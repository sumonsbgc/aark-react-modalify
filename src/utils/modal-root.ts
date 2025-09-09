/**
 * Utility to manage the single modal root container
 * Ensures only one instance of aark-react-modalify-root exists
 */

let modalRoot: HTMLElement | null = null;

/**
 * Gets or creates the modal root container
 * Returns the same instance for both modals and notifications
 */
export const getModalRoot = (): HTMLElement => {
	if (!modalRoot) {
		// Try to find existing root
		modalRoot = document.getElementById("aark-react-modalify-root");

		// Create if doesn't exist
		if (!modalRoot) {
			modalRoot = document.createElement("div");
			modalRoot.id = "aark-react-modalify-root";
			modalRoot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
      `;
			document.body.appendChild(modalRoot);
		}
	}

	return modalRoot;
};

/**
 * Cleanup function to remove the modal root when no longer needed
 * Should be called when the last modal/notification is closed
 */
export const cleanupModalRoot = (): void => {
	if (modalRoot && modalRoot.children.length === 0) {
		modalRoot.remove();
		modalRoot = null;
	}
};

/**
 * Check if modal root exists and has content
 */
export const hasActiveModals = (): boolean => {
	return modalRoot ? modalRoot.children.length > 0 : false;
};
