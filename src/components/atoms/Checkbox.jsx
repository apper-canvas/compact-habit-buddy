import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  size = 'md',
  color = 'primary',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colors = {
    primary: checked ? 'bg-primary border-primary' : 'bg-white border-gray-300',
    success: checked ? 'bg-accent border-accent' : 'bg-white border-gray-300',
    secondary: checked ? 'bg-secondary border-secondary' : 'bg-white border-gray-300'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  const filteredProps = { ...props };
  delete filteredProps.checked;
  delete filteredProps.onChange;
  delete filteredProps.label;
  delete filteredProps.size;
  delete filteredProps.color;

  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <motion.div
        className={`${sizes[size]} ${colors[color]} border-2 rounded-lg flex items-center justify-center transition-all duration-200 shadow-soft`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...filteredProps}
        />
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ApperIcon 
              name="Check" 
              className={`${iconSizes[size]} text-white`}
            />
          </motion.div>
        )}
      </motion.div>
      {label && (
        <span className="text-gray-700 font-medium select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;