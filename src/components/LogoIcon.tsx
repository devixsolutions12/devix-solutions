'use client'

const LogoIcon = ({ className = 'w-8 h-8' }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left bracket < */}
      <path 
        d="M8 5L3 12L8 19" 
        stroke="#A3E635" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Right bracket > */}
      <path 
        d="M16 5L21 12L16 19" 
        stroke="#A3E635" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Forward slash / */}
      <path 
        d="M14 5L10 19" 
        stroke="#A3E635" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LogoIcon