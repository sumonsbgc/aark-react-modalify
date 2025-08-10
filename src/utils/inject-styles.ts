// Inline CSS injection utility
export const injectStyles = (css: string, id: string): void => {
	if (typeof document === "undefined") return;

	if (document.getElementById(id)) return;

	const style = document.createElement("style");
	style.id = id;
	style.innerHTML = css;
	document.head.appendChild(style);
};
