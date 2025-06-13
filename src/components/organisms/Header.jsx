import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ onAddHabits, selectedCount = 0 }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-8 rounded-b-2xl shadow-card"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Text variant="display" className="text-white mb-1">
              Habit Buddy
            </Text>
            <Text variant="small" className="text-purple-100">
              {currentDate}
            </Text>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ApperIcon name="Heart" className="w-6 h-6 text-yellow-300" />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Text variant="small" className="text-purple-100 mb-1">
              Active Habits
            </Text>
            <Text variant="bodyLarge" className="text-white font-semibold">
              {selectedCount} selected
            </Text>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon="Settings"
            onClick={onAddHabits}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Manage
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;