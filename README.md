# AARK React Modalify

A lightweight, flexible React modal and notification library with TypeScript support. Features automatic DOM mounting, customizable styling via CSS variables, responsive size presets, and a simple imperative API.

[![npm version](https://img.shields.io/npm/v/aark-react-modalify)](https://www.npmjs.com/package/aark-react-modalify)
[![license](https://img.shields.io/npm/l/aark-react-modalify)](LICENSE)

## Features

- **Zero runtime dependencies** — pure React + ReactDOM
- **TypeScript** — full type safety out of the box
- **Dual API** — pass raw JSX _or_ a plain props object
- **Size presets** — `sm / md / lg / xl / full` with explicit `width` / `maxWidth` override
- **Responsive** — adapts automatically on tablet and mobile
- **CSS variables** — theme every visual property without touching JS
- **Imperative** — call `aark.fire()` / `aark.notification()` anywhere, no context required
- **Portal rendering** — modal root managed automatically, no wrapping provider needed
- **Accessibility** — ESC key, overlay click, and focus management built in

---

## Installation

```bash
# npm
npm install aark-react-modalify

# pnpm
pnpm add aark-react-modalify

# yarn
yarn add aark-react-modalify
```

**Peer dependencies:** `react >= 16.8.0`, `react-dom >= 16.8.0`

---

## Quick Start

### Component-based (pass any JSX)

```tsx
import { aark } from "aark-react-modalify";

function App() {
  const openModal = () => {
    aark.fire(
      <div>
        <h2>Hello World!</h2>
        <p>This is a simple modal.</p>
        <button onClick={() => aark.close()}>Close</button>
      </div>,
      { position: "center", showCloseIcon: true }
    );
  };

  return <button onClick={openModal}>Open Modal</button>;
}
```

### Props-based (built-in styled templates)

```tsx
import { aark } from "aark-react-modalify";

aark.fire({
  title: "Delete Item",
  text: "Are you sure you want to delete this item?",
  type: "warning",
  showCancelButton: true,
  confirmText: "Yes, delete it!",
  cancelText: "Cancel",
  onConfirm: () => {
    aark.notification({
      title: "Deleted!",
      text: "The item has been deleted successfully.",
      type: "success",
      timer: 3000,
    });
  },
});
```

---

## API Reference

### `aark.fire(content, options?)` — component-based modal

```tsx
aark.fire(<YourComponent />, options?: ModalOptions);
```

### `aark.fire(props)` — props-based modal

```tsx
aark.fire({
  title?: string;
  text?: string;
  type?: "success" | "error" | "warning" | "info" | "question";
  icon?: string | ReactNode;
  html?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  reverseButtons?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  width?: string | number;       // e.g. "500px", "80%", 600
  fullWidth?: boolean;
  padding?: string | number;
  background?: string;
  customClass?: {
    popup?: string;
    title?: string;
    icon?: string;
    content?: string;
    confirmButton?: string;
    cancelButton?: string;
    footer?: string;
  };
});
```

### `aark.notification(content, options?)` — component-based notification

```tsx
aark.notification(<YourToast />, options?: NotificationOptions);
```

### `aark.notification(props)` — props-based notification

```tsx
aark.notification({
  title?: string;
  text?: string;
  type?: "success" | "error" | "warning" | "info" | "question";
  icon?: string | ReactNode;
  html?: string | ReactNode;
  timer?: number;                // auto-close in ms (default: 5000)
  showCloseButton?: boolean;
  clickToClose?: boolean;
  width?: string | number;
  fullWidth?: boolean;
  padding?: string | number;
  background?: string;
  customClass?: {
    popup?: string;
    title?: string;
    content?: string;
  };
});
```

### Other methods

```tsx
aark.close();       // close the current modal / notification
aark.closeAll();    // close everything
aark.isOpen();      // returns boolean
```

---

## Configuration Options

### `ModalOptions`

| Option                | Type            | Default    | Description                              |
| --------------------- | --------------- | ---------- | ---------------------------------------- |
| `position`            | `ModalPosition` | `"center"` | Where the modal appears                  |
| `size`                | `ModalSize`     | —          | Preset max-width (`sm/md/lg/xl/full`)    |
| `width`               | `string\|number`| —          | Explicit width, overrides `size`         |
| `maxWidth`            | `string\|number`| —          | Explicit max-width, overrides `size`     |
| `showCloseIcon`       | `boolean`       | `false`    | Render the × close button                |
| `className`           | `string`        | —          | Extra class on the modal container       |
| `overlayClassName`    | `string`        | —          | Extra class on the backdrop              |
| `preventOverlayClose` | `boolean`       | `false`    | Disable close on backdrop click          |
| `preventEscClose`     | `boolean`       | `false`    | Disable close on ESC key                 |

### `NotificationOptions`

| Option           | Type                   | Default       | Description                          |
| ---------------- | ---------------------- | ------------- | ------------------------------------ |
| `position`       | `NotificationPosition` | `"top-right"` | Where the notification appears       |
| `autoCloseTime`  | `number`               | `5000`        | Auto-dismiss delay in ms             |
| `showCloseIcon`  | `boolean`              | `true`        | Render the × close button            |
| `className`      | `string`               | —             | Extra class on the notification      |
| `preventEscClose`| `boolean`              | `false`       | Disable dismiss on ESC key           |

### Size presets (`ModalSize`)

| Value  | Max-width         |
| ------ | ----------------- |
| `sm`   | 400 px            |
| `md`   | 550 px            |
| `lg`   | 700 px (default)  |
| `xl`   | 900 px            |
| `full` | 100 vw − 32 px    |

```tsx
// Use a preset
aark.fire(<Content />, { size: "xl" });

// Or set an exact width
aark.fire(<Content />, { width: "80%", maxWidth: "900px" });
```

### Position types

```ts
type ModalPosition =
  | "center"
  | "top-center"
  | "top-right"
  | "bottom-center"
  | "bottom-right";

type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
```

---

## Customization

### CSS variables (full list)

```css
:root {
  /* Overlay */
  --aark-modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --aark-modal-overlay-blur: 0px;

  /* Modal */
  --aark-modal-bg: #fff;
  --aark-modal-radius: 8px;
  --aark-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  --aark-modal-pad: 16px;
  --aark-modal-max-width: 700px;
  --aark-modal-z: 9999;

  /* Close button */
  --aark-close-color: #666;
  --aark-close-hover: #f5f5f5;
  --aark-close-hover-color: #333;
  --aark-close-focus-outline: 2px solid #007bff;

  /* Notification */
  --aark-notification-bg: #fff;
  --aark-notification-radius: 8px;
  --aark-notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --aark-notification-pad: 16px;
  --aark-notification-z: 10000;

  /* Animation */
  --aark-anim: 0.2s;
}
```

### `setAarkModalTheme(theme)` — apply theme via JS

```tsx
import { setAarkModalTheme } from "aark-react-modalify";

setAarkModalTheme({
  // Overlay
  overlayBackground: "rgba(0, 0, 0, 0.7)",
  overlayBlur: "4px",

  // Modal
  modalBackground: "#1f2937",
  modalBorderRadius: "12px",
  modalShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  modalPadding: "24px",
  modalMaxWidth: "600px",
  modalZIndex: 9999,

  // Close button
  closeButtonColor: "#9ca3af",
  closeButtonHoverBackground: "rgba(255,255,255,0.1)",
  closeButtonHoverColor: "#fff",

  // Notification
  notificationBackground: "#111827",
  notificationBorderRadius: "8px",
  notificationShadow: "0 4px 20px rgba(0,0,0,0.3)",
  notificationPadding: "12px 16px",
  notificationZIndex: 10000,

  // Animation
  animationDuration: "0.3s",
});
```

### `resetAarkModalTheme()` — restore defaults

```tsx
import { resetAarkModalTheme } from "aark-react-modalify";

resetAarkModalTheme();
```

### `getAarkModalTheme()` — read current values

```tsx
import { getAarkModalTheme } from "aark-react-modalify";

const theme = getAarkModalTheme();
console.log(theme.modalBackground); // e.g. "#fff"
```

---

## CSS Import Options

**Option 1 — Automatic (default)**

```tsx
import { aark } from "aark-react-modalify";
// CSS is bundled automatically
```

**Option 2 — Manual (no-styles build)**

```tsx
import { aark } from "aark-react-modalify/no-styles";
import "aark-react-modalify/css";
// or: import "aark-react-modalify/dist/aark-react-modalify.css";
```

---

## Advanced Usage

### `useModal` hook

```tsx
import { aark, useModal } from "aark-react-modalify";

function MyComponent() {
  const { isOpen, config } = useModal();

  return (
    <div>
      <button onClick={() => aark.fire(<div>Content</div>, { position: "center" })}>
        Open
      </button>
      {isOpen && <p>Modal is open (mode: {config?.mode})</p>}
    </div>
  );
}
```

### Manual component integration

```tsx
import { Modal, Notification, ModalProvider } from "aark-react-modalify";
```

---

## Examples

### Success modal

```tsx
aark.fire({
  title: "Saved!",
  text: "Your changes have been saved successfully.",
  type: "success",
  confirmText: "Great!",
});
```

### Confirmation dialog

```tsx
aark.fire({
  title: "Delete Item",
  text: "This action cannot be undone.",
  type: "warning",
  showCancelButton: true,
  confirmText: "Yes, delete it!",
  cancelText: "Cancel",
  onConfirm: () => console.log("deleted"),
});
```

### Error notification (top-right, 4 s)

```tsx
aark.notification({
  title: "Error",
  text: "Something went wrong. Please try again.",
  type: "error",
  timer: 4000,
  position: "top-right",
});
```

### Large custom modal

```tsx
aark.fire(<Dashboard />, {
  size: "xl",
  showCloseIcon: true,
  preventOverlayClose: true,
});
```

---

## Framework Compatibility

| Framework         | Support |
| ----------------- | ------- |
| Vite              | ✅       |
| Next.js (App + Pages router) | ✅ |
| Create React App  | ✅       |
| Webpack           | ✅       |
| Parcel            | ✅       |

---

## Bundle Size

| Asset      | Size (minified) |
| ---------- | --------------- |
| JavaScript | ~16 kB          |
| CSS        | ~5 kB           |
| **Total**  | **~21 kB**      |
| Gzipped    | ~7 kB (est.)    |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

Made with ❤️ by [Mohammad Sumon](https://github.com/sumonsbgc)
