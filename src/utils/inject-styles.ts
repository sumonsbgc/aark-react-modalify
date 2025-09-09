// Inline CSS injection utility
export const injectStyles = (css: string, id: string): void => {
	if (typeof document === "undefined") return;

	if (document.getElementById(id)) return;

	const style = document.createElement("style");
	style.id = id;
	style.innerHTML = css;
	document.head.appendChild(style);
};

// Utility to inject only modal styles
export const injectModalStyles = (): void => {
	// This would be used if you want to programmatically inject only modal styles
	// The actual CSS content would be imported from the separate files
	console.log("Modal styles would be injected here");
};

// Utility to inject only notification styles
export const injectNotificationStyles = (): void => {
	// This would be used if you want to programmatically inject only notification styles
	// The actual CSS content would be imported from the separate files
	console.log("Notification styles would be injected here");
};

// Utility to remove styles
export const removeStyles = (id: string): void => {
	if (typeof document === "undefined") return;

	const style = document.getElementById(id);
	if (style) {
		style.remove();
	}
};
