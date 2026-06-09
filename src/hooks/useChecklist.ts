
import { useState, useEffect } from 'react';
import { checklistData, ChecklistItem } from '@/data/checklistData';

export interface ChecklistProgress {
  [itemId: string]: {
    completed: boolean;
    completedAt?: Date;
    notes?: string;
  };
}

export const useChecklist = () => {
  const [progress, setProgress] = useState<ChecklistProgress>({});
  const [loading, setLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('checklist-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        Object.keys(parsed).forEach(key => {
          if (parsed[key].completedAt) {
            parsed[key].completedAt = new Date(parsed[key].completedAt);
          }
        });
        setProgress(parsed);
      } catch (error) {
        console.error('Error loading checklist progress:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ChecklistProgress) => {
    localStorage.setItem('checklist-progress', JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const toggleItem = (itemId: string, notes?: string) => {
    const newProgress = {
      ...progress,
      [itemId]: {
        completed: !progress[itemId]?.completed,
        completedAt: !progress[itemId]?.completed ? new Date() : undefined,
        notes: notes || progress[itemId]?.notes
      }
    };
    saveProgress(newProgress);
  };

  const updateNotes = (itemId: string, notes: string) => {
    const newProgress = {
      ...progress,
      [itemId]: {
        ...progress[itemId],
        notes
      }
    };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    localStorage.removeItem('checklist-progress');
    setProgress({});
  };

  const getStats = () => {
    const total = checklistData.length;
    const completed = Object.values(progress).filter(p => p.completed).length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      completionRate,
      inProgress: 0, // Not used in new structure
      notStarted: total - completed
    };
  };

  const stats = getStats();

  return {
    progress,
    loading,
    toggleItem,
    updateNotes,
    resetProgress,
    stats,
    getStats
  };
};
