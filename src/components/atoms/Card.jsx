import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  ...props 
}) => {
  const baseClasses = "bg-white rounded-xl shadow-card overflow-hidden";
  const gradientClasses = gradient ? "bg-gradient-to-br from-white to-gray-50" : "";
  
  const filteredProps = { ...props };
  delete filteredProps.hover;
  delete filteredProps.gradient;

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`${baseClasses} ${gradientClasses} ${className}`}
        {...filteredProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${gradientClasses} ${className}`}
      {...filteredProps}
    >
      {children}
    </div>
  );
};

export default Card;