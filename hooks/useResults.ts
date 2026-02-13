
import { useState, useEffect } from 'react';
import { ExamResult } from '../types';
import { storage } from '../services/storage';

export const useResults = () => {
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    setResults(storage.getResults());
  }, []);

  const refreshResults = () => {
    setResults(storage.getResults());
  };

  const getStats = () => {
    const passedCount = results.filter(r => r.passed).length;
    const failedCount = results.filter(r => !r.passed).length;
    const total = results.length;
    const userCount = storage.getUsers().length;

    return {
      totalExams: total,
      passed: passedCount,
      failed: failedCount,
      avgScore: total ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / total) : 0,
      userCount: userCount,
      passRate: total > 0 ? Math.round((passedCount / total) * 100) : 0
    };
  };

  return {
    results,
    refreshResults,
    getStats
  };
};
