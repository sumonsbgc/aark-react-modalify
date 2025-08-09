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
	modalZIndex?: number;
	modalContentZIndex?: number;

	// Close button
	closeButtonColor?: string;
	closeButtonHoverBackground?: string;
	closeButtonHoverColor?: string;
	closeButtonFocusOutline?: string;

	// Animation
	animationDuration?: string;
	fadeDuration?: string;

	// Custom overlay (for special cases)
	customOverlayBackground?: string;
	customOverlayBlur?: string;

	// Custom modal gradient
	customModalGradientStart?: string;
	customModalGradientEnd?: string;
	customModalTextColor?: string;
	customModalShadow?: string;
	customModalCloseColor?: string;
	customModalCloseHoverBackground?: string;
	customModalCloseHoverColor?: string;
}

/**
 * Apply custom theme to AARK Modal CSS variables
 */
export function setAarkModalTheme(theme: AarkModalTheme): void {
	const root = document.documentElement;

	if (theme.overlayBackground) {
		root.style.setProperty("--aark-modal-overlay-bg", theme.overlayBackground);
	}
	if (theme.overlayBlur) {
		root.style.setProperty("--aark-modal-overlay-blur", theme.overlayBlur);
	}
	if (theme.modalBackground) {
		root.style.setProperty("--aark-modal-bg", theme.modalBackground);
	}
	if (theme.modalBorderRadius) {
		root.style.setProperty(
			"--aark-modal-border-radius",
			theme.modalBorderRadius
		);
	}
	if (theme.modalShadow) {
		root.style.setProperty("--aark-modal-shadow", theme.modalShadow);
	}
	if (theme.modalPadding) {
		root.style.setProperty("--aark-modal-padding", theme.modalPadding);
	}
	if (theme.modalZIndex) {
		root.style.setProperty(
			"--aark-modal-z-index",
			theme.modalZIndex.toString()
		);
	}
	if (theme.modalContentZIndex) {
		root.style.setProperty(
			"--aark-modal-content-z-index",
			theme.modalContentZIndex.toString()
		);
	}
	if (theme.closeButtonColor) {
		root.style.setProperty("--aark-modal-close-color", theme.closeButtonColor);
	}
	if (theme.closeButtonHoverBackground) {
		root.style.setProperty(
			"--aark-modal-close-hover-bg",
			theme.closeButtonHoverBackground
		);
	}
	if (theme.closeButtonHoverColor) {
		root.style.setProperty(
			"--aark-modal-close-hover-color",
			theme.closeButtonHoverColor
		);
	}
	if (theme.closeButtonFocusOutline) {
		root.style.setProperty(
			"--aark-modal-close-focus-outline",
			theme.closeButtonFocusOutline
		);
	}
	if (theme.animationDuration) {
		root.style.setProperty(
			"--aark-modal-animation-duration",
			theme.animationDuration
		);
	}
	if (theme.fadeDuration) {
		root.style.setProperty("--aark-modal-fade-duration", theme.fadeDuration);
	}
	if (theme.customOverlayBackground) {
		root.style.setProperty(
			"--aark-custom-overlay-bg",
			theme.customOverlayBackground
		);
	}
	if (theme.customOverlayBlur) {
		root.style.setProperty(
			"--aark-custom-overlay-blur",
			theme.customOverlayBlur
		);
	}
	if (theme.customModalGradientStart) {
		root.style.setProperty(
			"--aark-custom-modal-gradient-start",
			theme.customModalGradientStart
		);
	}
	if (theme.customModalGradientEnd) {
		root.style.setProperty(
			"--aark-custom-modal-gradient-end",
			theme.customModalGradientEnd
		);
	}
	if (theme.customModalTextColor) {
		root.style.setProperty(
			"--aark-custom-modal-text-color",
			theme.customModalTextColor
		);
	}
	if (theme.customModalShadow) {
		root.style.setProperty(
			"--aark-custom-modal-shadow",
			theme.customModalShadow
		);
	}
	if (theme.customModalCloseColor) {
		root.style.setProperty(
			"--aark-custom-modal-close-color",
			theme.customModalCloseColor
		);
	}
	if (theme.customModalCloseHoverBackground) {
		root.style.setProperty(
			"--aark-custom-modal-close-hover-bg",
			theme.customModalCloseHoverBackground
		);
	}
	if (theme.customModalCloseHoverColor) {
		root.style.setProperty(
			"--aark-custom-modal-close-hover-color",
			theme.customModalCloseHoverColor
		);
	}
}

/**
 * Reset AARK Modal theme to default values
 */
export function resetAarkModalTheme(): void {
	const root = document.documentElement;

	// Remove all custom properties to fall back to defaults
	const properties = [
		"--aark-modal-overlay-bg",
		"--aark-modal-overlay-blur",
		"--aark-modal-bg",
		"--aark-modal-border-radius",
		"--aark-modal-shadow",
		"--aark-modal-padding",
		"--aark-modal-z-index",
		"--aark-modal-content-z-index",
		"--aark-modal-close-color",
		"--aark-modal-close-hover-bg",
		"--aark-modal-close-hover-color",
		"--aark-modal-close-focus-outline",
		"--aark-modal-animation-duration",
		"--aark-modal-fade-duration",
		"--aark-custom-overlay-bg",
		"--aark-custom-overlay-blur",
		"--aark-custom-modal-gradient-start",
		"--aark-custom-modal-gradient-end",
		"--aark-custom-modal-text-color",
		"--aark-custom-modal-shadow",
		"--aark-custom-modal-close-color",
		"--aark-custom-modal-close-hover-bg",
		"--aark-custom-modal-close-hover-color",
	];

	properties.forEach((property) => {
		root.style.removeProperty(property);
	});
}

/**
 * Get current AARK Modal theme values
 */
export function getAarkModalTheme(): AarkModalTheme {
	const root = document.documentElement;
	const computedStyle = getComputedStyle(root);

	return {
		overlayBackground: computedStyle
			.getPropertyValue("--aark-modal-overlay-bg")
			.trim(),
		overlayBlur: computedStyle
			.getPropertyValue("--aark-modal-overlay-blur")
			.trim(),
		modalBackground: computedStyle.getPropertyValue("--aark-modal-bg").trim(),
		modalBorderRadius: computedStyle
			.getPropertyValue("--aark-modal-border-radius")
			.trim(),
		modalShadow: computedStyle.getPropertyValue("--aark-modal-shadow").trim(),
		modalPadding: computedStyle.getPropertyValue("--aark-modal-padding").trim(),
		modalZIndex:
			parseInt(computedStyle.getPropertyValue("--aark-modal-z-index").trim()) ||
			undefined,
		modalContentZIndex:
			parseInt(
				computedStyle.getPropertyValue("--aark-modal-content-z-index").trim()
			) || undefined,
		closeButtonColor: computedStyle
			.getPropertyValue("--aark-modal-close-color")
			.trim(),
		closeButtonHoverBackground: computedStyle
			.getPropertyValue("--aark-modal-close-hover-bg")
			.trim(),
		closeButtonHoverColor: computedStyle
			.getPropertyValue("--aark-modal-close-hover-color")
			.trim(),
		closeButtonFocusOutline: computedStyle
			.getPropertyValue("--aark-modal-close-focus-outline")
			.trim(),
		animationDuration: computedStyle
			.getPropertyValue("--aark-modal-animation-duration")
			.trim(),
		fadeDuration: computedStyle
			.getPropertyValue("--aark-modal-fade-duration")
			.trim(),
		customOverlayBackground: computedStyle
			.getPropertyValue("--aark-custom-overlay-bg")
			.trim(),
		customOverlayBlur: computedStyle
			.getPropertyValue("--aark-custom-overlay-blur")
			.trim(),
		customModalGradientStart: computedStyle
			.getPropertyValue("--aark-custom-modal-gradient-start")
			.trim(),
		customModalGradientEnd: computedStyle
			.getPropertyValue("--aark-custom-modal-gradient-end")
			.trim(),
		customModalTextColor: computedStyle
			.getPropertyValue("--aark-custom-modal-text-color")
			.trim(),
		customModalShadow: computedStyle
			.getPropertyValue("--aark-custom-modal-shadow")
			.trim(),
		customModalCloseColor: computedStyle
			.getPropertyValue("--aark-custom-modal-close-color")
			.trim(),
		customModalCloseHoverBackground: computedStyle
			.getPropertyValue("--aark-custom-modal-close-hover-bg")
			.trim(),
		customModalCloseHoverColor: computedStyle
			.getPropertyValue("--aark-custom-modal-close-hover-color")
			.trim(),
	};
}
