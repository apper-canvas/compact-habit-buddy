import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Confetti = ({ delay = 0 }) => {
  const colors = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = Math.random() * 100;
  const randomDelay = delay + Math.random() * 2;

  return (
    <motion.div
      className="absolute w-3 h-3 rounded"
      style={{
        backgroundColor: randomColor,
        left: `${randomLeft}%`,
        top: '-20px'
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: window.innerHeight + 100,
        opacity: 0,
        rotate: 720
      }}
      transition={{
        duration: 3,
        delay: randomDelay,
        ease: "easeOut"
      }}
    />
  );
};

const ConfettiCelebration = ({ isVisible, onComplete }) => {
  const [confettiPieces] = useState(
    Array.from({ length: 50 }, (_, i) => i)
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Confetti */}
          {confettiPieces.map((_, index) => (
            <Confetti key={index} delay={index * 0.1} />
          ))}

          {/* Success Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: 2,
                  delay: 0.8
                }}
                className="mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <ApperIcon name="Smile" className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <Text variant="h2" className="font-display text-primary mb-2">
                Well Done! 🎉
              </Text>
              
              <Text variant="body" color="muted">
                You've completed all your habits for today. Keep up the amazing work!
              </Text>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
                className="mt-4 flex justify-center gap-2"
              >
                {['🌟', '✨', '🎊'].map((emoji, index) => (
                  <motion.span
                    key={index}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiCelebration;