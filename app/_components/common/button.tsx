import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shadowColor?: string; // Optional prop to override shadow color
  textColor?: string; // Optional prop to set text color explicitly
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
  className,
  shadowColor, // Relies on global --button-hover-background-color if not provided
  textColor, // Optional for text color control
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      style={
        shadowColor
          ? ({
              "--button-hover-background-color": shadowColor,
            } as React.CSSProperties)
          : undefined
      } // Only override if shadowColor is provided
      className={`
        font-semibold
        inline-block
        cursor-pointer
        no-underline
        border-2
        border-[var(--button-hover-background-color)]
        px-6
        py-3
        rounded
        shadow-[inset_0_0_0.5em_0_var(--button-hover-background-color),_0_0_0.5em_0_var(--button-hover-background-color)]
        relative
        z-10
        w-max
        transition-opacity
        duration-300
        hover:after:opacity-100
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:border-[var(--button-disabled-border-color,#ccc)]
        disabled:bg-[var(--button-disabled-background-color,#f2f2f2)]
        disabled:text-[var(--button-disabled-text-color,#aaa)]
        disabled:shadow-none
        disabled:hover:after:hidden
        after:content-['']
        after:absolute
        after:top-0
        after:rounded
        after:bottom-0
        after:left-0
        after:right-0
        after:shadow-[0_0_1em_0.25em_var(--button-hover-background-color)]
        after:opacity-0
        after:bg-[var(--button-hover-background-color)]
        after:-z-10
        after:transition-opacity
        after:duration-300
        ${textColor ? `text-[${textColor}]` : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
