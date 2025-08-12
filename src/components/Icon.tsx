import { memo, useMemo } from "react";
import type { FC, CSSProperties, KeyboardEvent } from "react";

const colors: Record<string, string> = {
  white: "#FFFFFF",
  black: "#0B071A",
};

export type IconName =
  | "close"

export type IconSize = string | number;
export type IconColor = keyof typeof colors | string;

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  style?: CSSProperties;
  className?: string;
  noHoverEffect?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  title?: string;
}

const Icon: FC<IconProps> = memo(
  ({
    name,
    color = "black",
    style,
    className = "",
    noHoverEffect = false,
    onClick,
    size = 24,
    "aria-label": ariaLabel,
    title,
  }) => {
    // Resolve size - convert to string for SVG attributes
    const resolvedSize = useMemo(() => {
      return String(size);
    }, [size]);

    // Resolve color - use theme color or custom hex/named value
    const resolvedColor = useMemo(() => {
      // If color is a key in our predefined colors, use it
      if (colors[color]) {
        return colors[color];
      }

      // If color starts with #, treat it as a hex code
      if (color.startsWith("#")) {
        return color;
      }

      // If color is a valid CSS color name or any other format, use it directly
      return color;
    }, [color]);

    // Memoize the icon rendering for performance
    const iconElement = useMemo(() => {
      const fill = resolvedColor;
      switch (name) {
        case "close":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width={resolvedSize} height={resolvedSize} viewBox="0 0 16 16" fill="none">
              <path d="M15.281 14.2198C15.3507 14.2895 15.406 14.3722 15.4437 14.4632C15.4814 14.5543 15.5008 14.6519 15.5008 14.7504C15.5008 14.849 15.4814 14.9465 15.4437 15.0376C15.406 15.1286 15.3507 15.2114 15.281 15.281C15.2114 15.3507 15.1286 15.406 15.0376 15.4437C14.9465 15.4814 14.849 15.5008 14.7504 15.5008C14.6519 15.5008 14.5543 15.4814 14.4632 15.4437C14.3722 15.406 14.2895 15.3507 14.2198 15.281L8.00042 9.06073L1.78104 15.281C1.64031 15.4218 1.44944 15.5008 1.25042 15.5008C1.05139 15.5008 0.860523 15.4218 0.719792 15.281C0.579062 15.1403 0.5 14.9494 0.5 14.7504C0.5 14.5514 0.579062 14.3605 0.719792 14.2198L6.9401 8.00042L0.719792 1.78104C0.579062 1.64031 0.5 1.44944 0.5 1.25042C0.5 1.05139 0.579062 0.860523 0.719792 0.719792C0.860523 0.579062 1.05139 0.5 1.25042 0.5C1.44944 0.5 1.64031 0.579062 1.78104 0.719792L8.00042 6.9401L14.2198 0.719792C14.3605 0.579062 14.5514 0.5 14.7504 0.5C14.9494 0.5 15.1403 0.579062 15.281 0.719792C15.4218 0.860523 15.5008 1.05139 15.5008 1.25042C15.5008 1.44944 15.4218 1.64031 15.281 1.78104L9.06073 8.00042L15.281 14.2198Z" fill={fill} />
            </svg>
          );
        default:
          return null;
      }
    }, [name, resolvedColor, resolvedSize]);

    // Generate accessible props
    const accessibilityProps = useMemo(() => {
      const props: Record<string, string | number | undefined> = {};

      if (ariaLabel) {
        props["aria-label"] = ariaLabel;
      } else {
        props["aria-label"] = `${name} icon`;
      }

      if (title) {
        props.title = title;
      }

      props.role = onClick ? "button" : "img";

      return props;
    }, [ariaLabel, title, name, onClick]);

    // Handle keyboard interaction for clickable icons
    const handleKeyDown = useMemo(() => {
      if (!onClick) return undefined;

      return (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      };
    }, [onClick]);

    return (
      <i
        className={`
        inline-flex items-center justify-center bg-transparent outline-none border-none
        ${!noHoverEffect &&
          onClick &&
          "hover:opacity-80 cursor-pointer transition-opacity duration-200"
          }
        ${onClick &&
          "focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
          }
        ${className}
      `.trim()}
        style={style}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick ? 0 : undefined}
        {...accessibilityProps}
      >
        {iconElement}
      </i>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
