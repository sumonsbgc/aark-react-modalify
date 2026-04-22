/**
 * Utility to manage the single modal root container
 * Ensures only one instance of aark-react-modalify-root exists
 */

let modalRoot: HTMLElement | null = null;
let bodyObserver: MutationObserver | null = null;

/**
 * Maximum safe 32-bit signed integer — the practical ceiling for z-index
 * values in all browsers. Used as the absolute fallback so the modal layer
 * always paints above any consumer content, regardless of their z-index.
 */
const MAX_Z_INDEX = 2147483647;

/**
 * Ensure the root stays at the very end of <body>. DOM order is the tiebreaker
 * when two siblings share the same z-index (or when a consumer creates a new
 * stacking context with an equally high z-index). Re-appending an element that
 * is already in the DOM is a cheap move operation — React's portal keeps its
 * children intact.
 */
const ensureLastChildOfBody = (root: HTMLElement): void => {
	if (root.parentNode !== document.body || document.body.lastElementChild !== root) {
		document.body.appendChild(root);
	}
};

/**
 * Watch <body> and snap the modal root back to the last position if some other
 * script (analytics, chat widget, another portal lib) appends a sibling after
 * it. This guarantees the modal stays above dynamically-inserted overlays.
 */
const startBodyObserver = (root: HTMLElement): void => {
	if (bodyObserver || typeof MutationObserver === "undefined") return;
	bodyObserver = new MutationObserver(() => {
		if (document.body.lastElementChild !== root) {
			ensureLastChildOfBody(root);
		}
	});
	bodyObserver.observe(document.body, { childList: true });
};

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
			// `isolation: isolate` forces a new stacking context that cannot be pierced
			// by sibling stacking contexts, and `z-index: MAX_Z_INDEX` as fallback makes
			// sure this layer paints above every consumer element — even those using
			// extreme values like `z-[9999999]`. Consumers can still override via the
			// --aark-modal-z CSS variable for coordinated stacking.
			modalRoot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        isolation: isolate;
        z-index: var(--aark-modal-z, ${MAX_Z_INDEX});
      `;
			document.body.appendChild(modalRoot);
		}

		startBodyObserver(modalRoot);
	}

	// Always pop to the end of body so DOM order reinforces our z-index.
	ensureLastChildOfBody(modalRoot);
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
		if (bodyObserver) {
			bodyObserver.disconnect();
			bodyObserver = null;
		}
	}
};

/**
 * Check if modal root exists and has content
 */
export const hasActiveModals = (): boolean => {
	return modalRoot ? modalRoot.children.length > 0 : false;
};
