# AARK React Modalify

A lightweight, flexible React modal and notification library with TypeScript support. Features automatic DOM mounting, customizable styling via CSS variables, responsive size presets, and a simple imperative API.

[![npm version](https://img.shields.io/npm/v/aark-react-modalify)](https://www.npmjs.com/package/aark-react-modalify)
[![license](https://img.shields.io/npm/l/aark-react-modalify)](LICENSE)

## Features

- **Zero runtime dependencies** — pure React + ReactDOM
- **TypeScript** — full type safety out of the box
- **Dual API** — pass raw JSX _or_ a plain props object
- **Size presets** — `sm / md / lg / xl / full` with explicit `width` / `maxWidth` override
- **Body padding control** — `bodyPadding` option lets header/footer borders span edge-to-edge
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
    aark.notification(
      { title: "Deleted!", text: "The item has been deleted.", type: "success", timer: 3000 },
      { position: "top-right" }
    );
  },
});
```

> **Note:** `position` and other display options for notifications go in the **second argument** (`NotificationOptions`), not inside the props object.

---

## API Reference

### `aark.fire(content, options?)` — component-based modal

```tsx
aark.fire(<YourComponent />, options?: ModalOptions);
```

### `aark.modal(content, options?)` — alias for `aark.fire`

```tsx
aark.modal(<YourComponent />, options?: ModalOptions);
```

### `aark.fire(props, options?)` — props-based modal

```tsx
aark.fire(
  {
    title?: string;
    text?: string;
    type?: "success" | "error" | "warning" | "info" | "question";
    icon?: string | ReactNode;
    html?: string | ReactNode;       // string → dangerouslySetInnerHTML, ReactNode → rendered as JSX
    confirmText?: string;            // default: "OK"
    cancelText?: string;             // default: "Cancel"
    showCancelButton?: boolean;      // default: false
    showConfirmButton?: boolean;     // default: true
    reverseButtons?: boolean;        // swap confirm/cancel order
    onConfirm?: () => void;
    onCancel?: () => void;
    width?: string | number;         // e.g. "500px", "80%", 600
    fullWidth?: boolean;
    padding?: string | number;
    customClass?: {
      popup?: string;
      header?: string;
      title?: string;
      icon?: string;
      content?: string;
      confirmButton?: string;
      cancelButton?: string;
      footer?: string;
    };
  },
  options?: ModalOptions            // position, size, showCloseIcon, etc.
);
```

### `aark.notification(content, options?)` — component-based notification

```tsx
aark.notification(<YourToast />, options?: NotificationOptions);
```

### `aark.notification(props, options?)` — props-based notification

```tsx
aark.notification(
  {
    title?: string;
    text?: string;
    type?: "success" | "error" | "warning" | "info" | "question";
    icon?: string | ReactNode;
    html?: string | ReactNode;       // string → dangerouslySetInnerHTML, ReactNode → rendered as JSX
    timer?: number;                  // auto-close in ms (default: 5000)
    showCloseButton?: boolean;       // default: true
    clickToClose?: boolean;          // default: true
    width?: string | number;
    fullWidth?: boolean;
    padding?: string | number;
    customClass?: {
      popup?: string;
      header?: string;
      title?: string;
      icon?: string;
      content?: string;
    };
  },
  options?: NotificationOptions     // position, autoCloseTime, showCloseIcon, etc.
);
```

### Other methods

```tsx
aark.close();          // close the current modal / notification
aark.closeAll();       // close everything
aark.isOpen();         // returns boolean

// Theme shortcuts (same as the standalone imported functions)
aark.setTheme(theme);  // same as setAarkModalTheme(theme)
aark.resetTheme();     // same as resetAarkModalTheme()
aark.getTheme();       // same as getAarkModalTheme()
```

---

## Configuration Options

### `ModalOptions`

| Option                | Type                          | Default    | Description                                                                 |
| --------------------- | ----------------------------- | ---------- | --------------------------------------------------------------------------- |
| `position`            | `ModalPosition`               | `"center"` | Where the modal appears                                                     |
| `size`                | `ModalSize`                   | —          | Preset max-width (`sm/md/lg/xl/full`)                                       |
| `width`               | `string\|number`              | —          | Explicit width, overrides `size`                                            |
| `maxWidth`            | `string\|number`              | —          | Explicit max-width, overrides `size`                                        |
| `bodyPadding`         | `boolean\|string\|number`     | `true`     | Body card padding — see [bodyPadding](#bodypaddingcontrolling-body-padding) |
| `showCloseIcon`       | `boolean`                     | `true`     | Render the × close button                                                   |
| `className`           | `string`                      | —          | Extra class on the modal container                                          |
| `overlayClassName`    | `string`                      | —          | Extra class on the backdrop                                                 |
| `preventOverlayClose` | `boolean`                     | `false`    | Disable close on backdrop click                                             |
| `preventEscClose`     | `boolean`                     | `false`    | Disable close on ESC key                                                    |

### `NotificationOptions`

| Option            | Type                   | Default       | Description                          |
| ----------------- | ---------------------- | ------------- | ------------------------------------ |
| `position`        | `NotificationPosition` | `"top-right"` | Where the notification appears       |
| `autoCloseTime`   | `number`               | `5000`        | Auto-dismiss delay in ms             |
| `showCloseIcon`   | `boolean`              | `true`        | Render the × close button            |
| `className`       | `string`               | —             | Extra class on the notification      |
| `preventEscClose` | `boolean`              | `false`       | Disable dismiss on ESC key           |

### Size presets (`ModalSize`)

| Value  | Max-width        |
| ------ | ---------------- |
| `sm`   | 400 px           |
| `md`   | 550 px           |
| `lg`   | 700 px (default) |
| `xl`   | 900 px           |
| `full` | 100 vw − 32 px   |

```tsx
// Use a preset
aark.fire(<Content />, { size: "xl" });

// Or set exact dimensions
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

### `bodyPadding` — controlling body padding

By default the modal body card has `padding: var(--aark-modal-pad)` (16 px) on all sides. This means any `border-top` or `border-bottom` you add to a header or footer **inside** your content will be indented — it won't reach the card edges.

Use `bodyPadding` to control this:

| Value           | Result                                    |
| --------------- | ----------------------------------------- |
| `true` (default)| Default CSS variable padding (`16px`)     |
| `false` or `0`  | No padding — borders span edge-to-edge    |
| `number`        | Exact px value, e.g. `24` → `24px`        |
| `string`        | Any CSS value, e.g. `'8px 20px'`          |

**Pattern — full-width header/footer borders with padded content:**

```tsx
aark.fire(
  <div>
    {/* Header — border goes edge-to-edge */}
    <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}>
      <h3 style={{ margin: 0 }}>Modal Title</h3>
    </div>

    {/* Content — add padding back only here */}
    <div className="aark-body-pad">
      <p>Body content with standard padding.</p>
    </div>

    {/* Footer — border goes edge-to-edge */}
    <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
      <button onClick={() => aark.close()}>Cancel</button>
      <button onClick={() => aark.close()}>Confirm</button>
    </div>
  </div>,
  { bodyPadding: false }
);
```

> **`aark-body-pad`** is a CSS utility class provided by the library. It applies `padding: var(--aark-modal-pad)` — the same value as the body default — so your content section looks identical to a normally-padded modal while header/footer remain flush.

---

### CSS variables (full list with defaults)

Override any of these in your global CSS to theme the library without touching JS:

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

All properties are optional. Only the ones you pass are changed.

```tsx
import { setAarkModalTheme } from "aark-react-modalify";
// or: aark.setTheme({ ... })

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
// or: aark.resetTheme()

resetAarkModalTheme();
```

### `getAarkModalTheme()` — read current values

```tsx
import { getAarkModalTheme } from "aark-react-modalify";
// or: aark.getTheme()

const theme = getAarkModalTheme();
console.log(theme.modalBackground); // e.g. "#fff"
```

---

## CSS Import Options

**Option 1 — Automatic (default)**

```tsx
import { aark } from "aark-react-modalify";
// CSS is bundled and injected automatically
```

**Option 2 — Manual (no-styles build)**

Useful if you want full control over when/how the CSS is loaded:

```tsx
import { aark } from "aark-react-modalify/no-styles";
import "aark-react-modalify/css";
// or: import "aark-react-modalify/dist/aark-react-modalify.css";
```

---

## Advanced Usage

### `useModal` hook

Subscribe to modal state changes anywhere in your component tree:

```tsx
import { aark, useModal } from "aark-react-modalify";

function MyComponent() {
  const { isOpen, config } = useModal();
  // config.mode === "modal" | "notification"

  return (
    <div>
      <button onClick={() => aark.fire(<div>Content</div>, { position: "center" })}>
        Open
      </button>
      {isOpen && <p>A {config?.mode} is currently open</p>}
    </div>
  );
}
```

`useModal` returns:

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Whether a modal/notification is currently showing |
| `config` | `ComponentConfig \| null` | Current config object including `mode`, `content`, `props`, `options` |
| `close`  | `() => void` | Close the current modal/notification |

### Manual component integration

If you need to manage rendering yourself:

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

### Notification with position

```tsx
// position goes in options (second argument), not inside the props
aark.notification(
  { title: "Error", text: "Something went wrong.", type: "error", timer: 4000 },
  { position: "top-right" }
);
```

### Component-based notification

```tsx
aark.notification(
  <div style={{ padding: "1rem" }}>Custom toast content</div>,
  { position: "bottom-right", autoCloseTime: 3000 }
);
```

### Large custom modal

```tsx
aark.fire(<Dashboard />, {
  size: "xl",
  showCloseIcon: true,
  preventOverlayClose: true,
});
```

### Modal with exact dimensions

```tsx
aark.fire(<MyForm />, {
  width: "600px",
  maxWidth: "90vw",
  position: "top-center",
});
```

### Modal with full-width header/footer borders

```tsx
aark.fire(
  <div>
    <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}>
      <h3 style={{ margin: 0 }}>Confirm Action</h3>
    </div>
    <div className="aark-body-pad">
      <p>Are you sure you want to proceed?</p>
    </div>
    <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
      <button onClick={() => aark.close()}>Cancel</button>
      <button onClick={() => aark.close()}>Confirm</button>
    </div>
  </div>,
  { bodyPadding: false, size: "sm" }
);
```

### Dark theme

```tsx
import { setAarkModalTheme } from "aark-react-modalify";

setAarkModalTheme({
  modalBackground: "#1f2937",
  modalBorderRadius: "12px",
  overlayBackground: "rgba(0, 0, 0, 0.8)",
  overlayBlur: "4px",
  notificationBackground: "#111827",
  animationDuration: "0.3s",
});
```

---

## Framework Compatibility

| Framework                    | Support |
| ---------------------------- | ------- |
| Vite                         | ✅      |
| Next.js (App + Pages router) | ✅      |
| Create React App             | ✅      |
| Webpack                      | ✅      |
| Parcel                       | ✅      |

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
