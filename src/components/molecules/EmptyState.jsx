import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

const EmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon = 'Plus',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      
      <Text variant="h3" className="mb-3 font-display text-primary">
        {title}
      </Text>
      
      {description && (
        <Text variant="body" color="muted" className="mb-6 max-w-md mx-auto">
          {description}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="primary"
            onClick={onAction}
            icon="Sparkles"
            size="lg"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;