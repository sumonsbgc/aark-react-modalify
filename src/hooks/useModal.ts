import { useEffect, useState, useCallback } from "react";
import { modalManager } from "../logic/ModalManager";
import type { ComponentConfig, ModalEvent } from "../types";

export interface UseModalReturn {
	isOpen: boolean;
	config: ComponentConfig | null;
	close: () => void;
}

/**
 * Hook to manage modal state and listen to modal events
 */
export function useModal(): UseModalReturn {
	const [isOpen, setIsOpen] = useState(false);
	const [config, setConfig] = useState<ComponentConfig | null>(null);

	const close = useCallback(() => {
		modalManager.close();
	}, []);

	useEffect(() => {
		const handleModalEvent = (event: ModalEvent) => {
			switch (event.type) {
				case "open":
					setIsOpen(true);
					setConfig(event.config || null);
					break;
				case "close":
					setIsOpen(false);
					setConfig(null);
					break;
				case "beforeClose":
					// Could be used for animations or cleanup
					break;
			}
		};

		const unsubscribe = modalManager.subscribe(handleModalEvent);

		// Set initial state
		setIsOpen(modalManager.isOpen());
		setConfig(modalManager.getCurrentConfig());

		return unsubscribe;
	}, []);

	return {
		isOpen,
		config,
		close,
	};
}
