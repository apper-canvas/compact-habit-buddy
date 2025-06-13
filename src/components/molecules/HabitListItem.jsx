import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Text from '@/components/atoms/Text';

const HabitListItem = ({ 
  habit, 
  isChecked = false, 
  onToggle,
  history = [],
  className = '' 
}) => {
  const handleToggle = (e) => {
    if (onToggle) {
      onToggle(habit.id, e.target.checked);
    }
  };

  const getHistoryIcon = (day) => {
    if (day.isToday) return null; // Today is handled by the main checkbox
    return day.completed ? '✅' : '⛔';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-card ${className}`}
    >
      {/* Main habit with checkbox */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
          <ApperIcon name={habit.icon} className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <Text variant="bodyLarge" className="font-semibold">
            {habit.name}
          </Text>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={handleToggle}
          size="lg"
          color="success"
        />
      </div>

      {/* 7-day history */}
      <div className="flex justify-between items-center">
        <Text variant="small" color="muted" className="font-medium">
          Past 7 days:
        </Text>
        <div className="flex gap-2">
          {history.slice(0, -1).map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-soft ${
                day.completed 
                  ? 'bg-green-100 border-2 border-green-200' 
                  : 'bg-red-100 border-2 border-red-200'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {getHistoryIcon(day)}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HabitListItem;