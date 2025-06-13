import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

const HabitCard = ({ 
  habit, 
  isSelected = false, 
  onToggle, 
  disabled = false,
  className = '' 
}) => {
  const handleClick = () => {
    if (!disabled && onToggle) {
      onToggle(habit.id);
    }
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={className}
    >
      <Card 
        className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
          isSelected 
            ? 'border-primary bg-gradient-to-br from-purple-50 to-purple-100' 
            : 'border-transparent hover:border-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <ApperIcon name={habit.icon} className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <Text variant="body" className="font-medium">
              {habit.name}
            </Text>
          </div>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Check" className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default HabitCard;