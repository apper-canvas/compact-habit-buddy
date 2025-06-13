import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import HabitCard from '@/components/molecules/HabitCard';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import { habitService } from '@/services';

const HabitSelector = ({ isOpen, onClose, onSave, currentSelected = [] }) => {
  const [habits, setHabits] = useState([]);
  const [selectedIds, setSelectedIds] = useState(currentSelected);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadHabits();
      setSelectedIds(currentSelected);
    }
  }, [isOpen, currentSelected]);

  const loadHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await habitService.getAll();
      setHabits(result);
    } catch (err) {
      setError('Failed to load habits');
      toast.error('Failed to load habits');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHabit = (habitId) => {
    setSelectedIds(prev => {
      if (prev.includes(habitId)) {
        return prev.filter(id => id !== habitId);
      } else if (prev.length < 5) {
        return [...prev, habitId];
      } else {
        toast.warning('You can select up to 5 habits only');
        return prev;
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await habitService.updateSelected(selectedIds);
      const selectedHabits = habits.filter(h => selectedIds.includes(h.id));
      onSave(selectedHabits);
      toast.success(`${selectedIds.length} habits selected!`);
      onClose();
    } catch (err) {
      toast.error('Failed to save habits');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="h2" className="font-display text-primary">
                    Choose Your Habits
                  </Text>
                  <Text variant="small" color="muted">
                    Select up to 5 habits ({selectedIds.length}/5)
                  </Text>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <Text color="muted">{error}</Text>
                  <Button
                    variant="outline"
                    onClick={loadHabits}
                    className="mt-4"
                    size="sm"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {habits.map((habit, index) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <HabitCard
                        habit={habit}
                        isSelected={selectedIds.includes(habit.id)}
                        onToggle={handleToggleHabit}
                        disabled={!selectedIds.includes(habit.id) && selectedIds.length >= 5}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1"
                  disabled={loading || selectedIds.length === 0}
                  icon={loading ? undefined : "Check"}
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Save Habits'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HabitSelector;