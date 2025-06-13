import { format, subDays, isToday } from 'date-fns';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProgressService {
  constructor() {
    this.data = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('habit-buddy-progress');
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load progress from storage:', error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('habit-buddy-progress', JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save progress to storage:', error);
    }
  }

  async getAll() {
    await delay(200);
    return [...this.data];
  }

  async getHabitProgress(habitId, days = 7) {
    await delay(200);
    const today = new Date();
    const progress = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = format(subDays(today, i), 'yyyy-MM-dd');
      const dayProgress = this.data.find(p => p.date === date && p.habitId === habitId);
      progress.push({
        date,
        completed: dayProgress ? dayProgress.completed : false,
        isToday: i === 0
      });
    }
    
    return progress;
  }

  async getTodayProgress(habitIds) {
    await delay(200);
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayProgress = this.data.filter(p => p.date === today && habitIds.includes(p.habitId));
    
    const result = {};
    habitIds.forEach(habitId => {
      const progress = todayProgress.find(p => p.habitId === habitId);
      result[habitId] = progress ? progress.completed : false;
    });
    
    return result;
  }

  async updateHabitProgress(habitId, completed, date = null) {
    await delay(300);
    const targetDate = date || format(new Date(), 'yyyy-MM-dd');
    
    const existingIndex = this.data.findIndex(p => 
      p.date === targetDate && p.habitId === habitId
    );
    
    if (existingIndex >= 0) {
      this.data[existingIndex] = { ...this.data[existingIndex], completed };
    } else {
      this.data.push({
        id: `${habitId}-${targetDate}-${Date.now()}`,
        date: targetDate,
        habitId,
        completed
      });
    }
    
    this.saveToStorage();
    return [...this.data];
  }

  async resetTodayProgress() {
    await delay(300);
    const today = format(new Date(), 'yyyy-MM-dd');
    this.data = this.data.filter(p => p.date !== today);
    this.saveToStorage();
    return [...this.data];
  }

  async getAllHabitsProgress(habitIds) {
    await delay(200);
    const result = {};
    
    for (const habitId of habitIds) {
      result[habitId] = await this.getHabitProgress(habitId);
    }
    
    return result;
  }
}

export default new ProgressService();