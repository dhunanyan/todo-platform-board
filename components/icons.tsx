import { CSSProperties } from "react";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

function Svg({ children, size = 16, className, style }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return <Svg {...props}><path d="M12 5v14" /><path d="M5 12h14" /></Svg>;
}

export function FlagIcon(props: IconProps) {
  return <Svg {...props}><path d="M4 21V5" /><path d="M4 5h11l-1.5 3L15 11H4" /></Svg>;
}

export function LabelIcon(props: IconProps) {
  return <Svg {...props}><path d="M20.59 13.41 12 22l-9-9V4h9z" /><path d="M7 7h.01" /></Svg>;
}

export function ClockIcon(props: IconProps) {
  return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></Svg>;
}

export function CheckIcon(props: IconProps) {
  return <Svg {...props}><path d="m20 6-11 11-5-5" /></Svg>;
}

export function AlertIcon(props: IconProps) {
  return <Svg {...props}><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /></Svg>;
}

export function BlockIcon(props: IconProps) {
  return <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></Svg>;
}

export function ProcessIcon(props: IconProps) {
  return <Svg {...props}><path d="M3 12h4" /><path d="M17 12h4" /><path d="M12 3v4" /><path d="M12 17v4" /><circle cx="12" cy="12" r="4" /></Svg>;
}

export function BoardIcon(props: IconProps) {
  return <Svg {...props}><rect x="3" y="3" width="7" height="8" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="15" width="7" height="6" rx="1" /></Svg>;
}

export function TrashIcon(props: IconProps) {
  return <Svg {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 10v6" /><path d="M14 10v6" /></Svg>;
}
