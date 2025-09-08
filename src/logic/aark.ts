import type { ReactNode } from "react";
import type {
	ModalOptions,
	NotificationOptions,
	ModalProps,
	NotificationProps,
} from "../types";
import { modalManager } from "./ModalManager";
import type { AarkModalTheme } from "../utils/theme";
import {
	setAarkModalTheme,
	resetAarkModalTheme,
	getAarkModalTheme,
} from "../utils/theme";

const aark = {
	fire: (contentOrProps: ReactNode | ModalProps, options?: ModalOptions) =>
		modalManager.fire(contentOrProps, options),
	modal: (contentOrProps: ReactNode | ModalProps, options?: ModalOptions) =>
		modalManager.fireModal(contentOrProps, options),
	notification: (
		contentOrProps: ReactNode | NotificationProps,
		options?: NotificationOptions
	) => modalManager.fireNotification(contentOrProps, options),
	close: () => modalManager.close(),
	isOpen: () => modalManager.isOpen(),
	closeAll: () => modalManager.closeAll(),
	setTheme: (theme: AarkModalTheme) => setAarkModalTheme(theme),
	resetTheme: () => resetAarkModalTheme(),
	getTheme: () => getAarkModalTheme(),
};

export default aark;
