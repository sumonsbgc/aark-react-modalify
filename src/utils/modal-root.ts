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
			// position:fixed always creates a stacking context even without z-index.
			// Without an explicit z-index the root sits at z-index:auto (bottom of order),
			// so fixed/sticky layout elements (sidebar z-10, header z-20, etc.) paint above
			// the modal. We use the same CSS variable the overlay uses so setAarkModalTheme
			// keeps them in sync.
			modalRoot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: var(--aark-modal-z, 9999);
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
