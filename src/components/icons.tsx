import type { SVGProps } from "react";

export const BlackHoleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M12 4a8 8 0 1 0 0 16" />
    <path d="M12 2a10 10 0 1 0 0 20" />
    <path d="M12 12a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" transform="rotate(45 12 12)" />
    <path d="M12 12a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" transform="rotate(135 12 12)" />
    <path d="M12 12a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" transform="rotate(225 12 12)" />
    <path d="M12 12a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" transform="rotate(315 12 12)" />
  </svg>
);


export const DiceIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <path d="M16 8h.01"></path>
      <path d="M12 12h.01"></path>
      <path d="M8 16h.01"></path>
      <path d="M8 8h.01"></path>
      <path d="M16 16h.01"></path>
    </svg>
);
