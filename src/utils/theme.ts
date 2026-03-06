/**
 * CSS Theme customization utilities for AARK React Modalify
 */

export interface AarkModalTheme {
	// Overlay
	overlayBackground?: string;
	overlayBlur?: string;

	// Modal
	modalBackground?: string;
	modalBorderRadius?: string;
	modalShadow?: string;
	modalPadding?: string;
	modalMaxWidth?: string;
	modalZIndex?: number;

	// Close button
	closeButtonColor?: string;
	closeButtonHoverBackground?: string;
	closeButtonHoverColor?: string;
	closeButtonFocusOutline?: string;

	// Animation
	animationDuration?: string;

	// Notification
	notificationBackground?: string;
	notificationBorderRadius?: string;
	notificationShadow?: string;
	notificationPadding?: string;
	notificationZIndex?: number;
}

/**
 * CSS variable name map — keys are theme properties, values are the actual CSS var names
 * used in aark-modal-only.css and aark-notification-only.css.
 * Previously these were mismatched, causing setAarkModalTheme to have no effect.
 */
const VAR_MAP: Record<keyof AarkModalTheme, string> = {
	overlayBackground:          "--aark-modal-overlay-bg",
	overlayBlur:                "--aark-modal-overlay-blur",
	modalBackground:            "--aark-modal-bg",
	modalBorderRadius:          "--aark-modal-radius",       // CSS uses --aark-modal-radius
	modalShadow:                "--aark-modal-shadow",
	modalPadding:               "--aark-modal-pad",          // CSS uses --aark-modal-pad
	modalMaxWidth:              "--aark-modal-max-width",
	modalZIndex:                "--aark-modal-z",             // CSS uses --aark-modal-z
	closeButtonColor:           "--aark-close-color",
	closeButtonHoverBackground: "--aark-close-hover",
	closeButtonHoverColor:      "--aark-close-hover-color",
	closeButtonFocusOutline:    "--aark-close-focus-outline",
	animationDuration:          "--aark-anim",
	notificationBackground:     "--aark-notification-bg",
	notificationBorderRadius:   "--aark-notification-radius",
	notificationShadow:         "--aark-notification-shadow",
	notificationPadding:        "--aark-notification-pad",
	notificationZIndex:         "--aark-notification-z",
};

/**
 * Apply custom theme to AARK Modal CSS variables
 */
export function setAarkModalTheme(theme: AarkModalTheme): void {
	const root = document.documentElement;
	(Object.keys(theme) as Array<keyof AarkModalTheme>).forEach((key) => {
		const value = theme[key];
		const cssVar = VAR_MAP[key];
		if (value !== undefined && cssVar) {
			root.style.setProperty(cssVar, String(value));
		}
	});
}

/**
 * Reset AARK Modal theme to default values
 */
export function resetAarkModalTheme(): void {
	const root = document.documentElement;
	Object.values(VAR_MAP).forEach((cssVar) => {
		root.style.removeProperty(cssVar);
	});
}

/**
 * Get current AARK Modal theme values
 */
export function getAarkModalTheme(): AarkModalTheme {
	const root = document.documentElement;
	const s = getComputedStyle(root);
	const get = (v: string): string | undefined => s.getPropertyValue(v).trim() || undefined;

	return {
		overlayBackground:          get("--aark-modal-overlay-bg"),
		overlayBlur:                get("--aark-modal-overlay-blur"),
		modalBackground:            get("--aark-modal-bg"),
		modalBorderRadius:          get("--aark-modal-radius"),
		modalShadow:                get("--aark-modal-shadow"),
		modalPadding:               get("--aark-modal-pad"),
		modalMaxWidth:              get("--aark-modal-max-width"),
		modalZIndex:                parseInt(get("--aark-modal-z") ?? "0") || undefined,
		closeButtonColor:           get("--aark-close-color"),
		closeButtonHoverBackground: get("--aark-close-hover"),
		closeButtonHoverColor:      get("--aark-close-hover-color"),
		closeButtonFocusOutline:    get("--aark-close-focus-outline"),
		animationDuration:          get("--aark-anim"),
		notificationBackground:     get("--aark-notification-bg"),
		notificationBorderRadius:   get("--aark-notification-radius"),
		notificationShadow:         get("--aark-notification-shadow"),
		notificationPadding:        get("--aark-notification-pad"),
		notificationZIndex:         parseInt(get("--aark-notification-z") ?? "0") || undefined,
	};
}
