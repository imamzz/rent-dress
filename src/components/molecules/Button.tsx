interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'social';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-500/20",
    secondary: "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 focus:ring-4 focus:ring-neutral-200",
    social: "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 focus:ring-4 focus:ring-neutral-200 flex items-center justify-center gap-2"
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
