import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import Header from '@/components/organisms/Header';
import HabitSelector from '@/components/organisms/HabitSelector';
import ConfettiCelebration from '@/components/organisms/ConfettiCelebration';
import HabitListItem from '@/components/molecules/HabitListItem';
import EmptyState from '@/components/molecules/EmptyState';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

import { habitService, progressService } from '@/services';

const Home = () => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [todayProgress, setTodayProgress] = useState({});
  const [habitHistory, setHabitHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    checkForCompletion();
  }, [todayProgress, selectedHabits]);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const habits = await habitService.getSelected();
      setSelectedHabits(habits);

      if (habits.length > 0) {
        const habitIds = habits.map(h => h.id);
        const [progress, history] = await Promise.all([
          progressService.getTodayProgress(habitIds),
          progressService.getAllHabitsProgress(habitIds)
        ]);
        setTodayProgress(progress);
        setHabitHistory(history);
      }
    } catch (err) {
      setError('Failed to load your habits');
      toast.error('Failed to load your habits');
    } finally {
      setLoading(false);
    }
  };

  const checkForCompletion = () => {
    if (selectedHabits.length === 0) return;
    
    const allCompleted = selectedHabits.every(habit => 
      todayProgress[habit.id] === true
    );
    
    if (allCompleted && selectedHabits.length > 0) {
      setShowCelebration(true);
    }
  };

  const handleHabitToggle = async (habitId, completed) => {
    // Optimistic update
    setTodayProgress(prev => ({
      ...prev,
      [habitId]: completed
    }));

    try {
      await progressService.updateHabitProgress(habitId, completed);
      
      // Reload history to show updated data
      const habitIds = selectedHabits.map(h => h.id);
      const history = await progressService.getAllHabitsProgress(habitIds);
      setHabitHistory(history);
      
      if (completed) {
        toast.success('Great job! Keep it up! 🎉');
      }
    } catch (err) {
      // Revert optimistic update
      setTodayProgress(prev => ({
        ...prev,
        [habitId]: !completed
      }));
      toast.error('Failed to update progress');
    }
  };

  const handleResetDay = async () => {
    if (Object.values(todayProgress).every(val => !val)) {
      toast.info('No progress to reset today');
      return;
    }

    try {
      await progressService.resetTodayProgress();
      const habitIds = selectedHabits.map(h => h.id);
      const [progress, history] = await Promise.all([
        progressService.getTodayProgress(habitIds),
        progressService.getAllHabitsProgress(habitIds)
      ]);
      setTodayProgress(progress);
      setHabitHistory(history);
      toast.success('Today\'s progress has been reset');
    } catch (err) {
      toast.error('Failed to reset progress');
    }
  };

  const handleSaveHabits = (habits) => {
    setSelectedHabits(habits);
    // Reload data for new habits
    loadInitialData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Header selectedCount={0} />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Header selectedCount={0} />
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto text-center">
            <Text color="muted" className="mb-4">{error}</Text>
            <Button
              variant="primary"
              onClick={loadInitialData}
              icon="RefreshCw"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header 
        selectedCount={selectedHabits.length}
        onAddHabits={() => setShowSelector(true)}
      />

      <main className="px-6 py-8 max-w-md mx-auto">
        {selectedHabits.length === 0 ? (
          <EmptyState
            icon="Target"
            title="Let's Get Started!"
            description="Choose up to 5 habits to track daily. Building good habits has never been more fun!"
            actionLabel="Choose Your Habits"
            onAction={() => setShowSelector(true)}
          />
        ) : (
          <>
            {/* Today's Habits */}
            <div className="mb-8">
              <Text variant="h3" className="mb-4 font-display text-primary">
                Today's Habits ✨
              </Text>
              <div className="space-y-4">
                {selectedHabits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HabitListItem
                      habit={habit}
                      isChecked={todayProgress[habit.id] || false}
                      onToggle={handleHabitToggle}
                      history={habitHistory[habit.id] || []}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                icon="RotateCcw"
                onClick={handleResetDay}
                className="text-gray-600 hover:text-error hover:border-error"
              >
                Reset Today
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      <HabitSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        onSave={handleSaveHabits}
        currentSelected={selectedHabits.map(h => h.id)}
      />

      <ConfettiCelebration
        isVisible={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
};

export default Home;