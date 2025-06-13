import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-medium rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-button active:shadow-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-purple-600 disabled:bg-gray-300",
    secondary: "bg-secondary text-white hover:bg-amber-600 disabled:bg-gray-300",
    success: "bg-accent text-white hover:bg-emerald-600 disabled:bg-gray-300",
    outline: "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary disabled:border-gray-200 disabled:text-gray-400",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 disabled:text-gray-400"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]"
  };

  const filteredProps = { ...props };
  delete filteredProps.variant;
  delete filteredProps.size;
  delete filteredProps.icon;
  delete filteredProps.iconPosition;

  return (
    <motion.button
      whileHover={!disabled ? { y: -2, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...filteredProps}
    >
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default Button;