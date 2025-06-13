import habitsData from '../mockData/habits.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class HabitService {
  constructor() {
    this.data = [...habitsData];
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('habit-buddy-habits');
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load habits from storage:', error);
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('habit-buddy-habits', JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save habits to storage:', error);
    }
  }

  async getAll() {
    await delay(200);
    return [...this.data];
  }

  async getSelected() {
    await delay(200);
    return this.data.filter(habit => habit.isSelected);
  }

  async updateSelected(selectedIds) {
    await delay(300);
    this.data = this.data.map(habit => ({
      ...habit,
      isSelected: selectedIds.includes(habit.id)
    }));
    this.saveToStorage();
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const habit = this.data.find(h => h.id === id);
    return habit ? { ...habit } : null;
  }
}

export default new HabitService();