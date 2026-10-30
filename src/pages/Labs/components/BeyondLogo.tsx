import React from "react";
interface BeyondLogoProps {
  className?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}
export const BeyondLogo: React.FC<BeyondLogoProps> = ({
  className = "",
  variant = "dark",
  showTagline = false,
  size = "md",
}) => (
  <span
    className={`beyond-official-logo beyond-official-${size} beyond-official-${variant} ${className}`}
  >
    <span className="beyond-logo-frame">
      <img src="/images/beyond/beyond-logo.png" alt="Beyond by Focsera" />
    </span>
    {showTagline && (
      <span className="beyond-logo-tagline">
        Beyond Classrooms. Into What's Next.
      </span>
    )}
  </span>
);
export default BeyondLogo;
