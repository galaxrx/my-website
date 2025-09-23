// app/hooks/useCommandBar.ts

import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { AITaskType, AIPayload, AIResponse } from '@/app/types/ai';
import { callAI } from '@/app/lib/aiClient';
import { useHotkeys } from 'react-hotkeys-hook';

type CommandBarStatus = 'idle' | 'loading' | 'ok' | 'error';

// Updated map to better catch new keywords
const intentMap: Record<string, AITaskType> = {
  health: 'analyzeBusiness',
  analyze: 'analyzeBusiness',
  forecast: 'forecastDemand',
  predict: 'forecastDemand',
  'dead stock': 'askAssistant',
  supplier: 'askAssistant',
  purchase: 'generatePurchasePlan',
  buy: 'generatePurchasePlan',
  order: 'generatePurchasePlan',
  shelf: 'optimizeShelves',
  layout: 'optimizeShelves',
  stock: 'optimizeStock', // Kept for general queries
  inventory: 'optimizeStock', // Kept for general queries
};

const parseIntent = (query: string): AITaskType => {
  const lowerQuery = query.toLowerCase();
  for (const keyword in intentMap) {
    if (lowerQuery.includes(keyword)) {
      return intentMap[keyword];
    }
  }
  return 'askAssistant';
};

export const useCommandBar = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<CommandBarStatus>('idle');
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys('mod+k', (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  });
  
  useEffect(() => {
    const stored = localStorage.getItem('galaxrx_recent_queries');
    if (stored) {
      setRecentQueries(JSON.parse(stored));
    }
  }, []);

  const addRecentQuery = (newQuery: string) => {
    const updated = [newQuery, ...recentQueries.filter(q => q !== newQuery)].slice(0, 5);
    setRecentQueries(updated);
    localStorage.setItem('galaxrx_recent_queries', JSON.stringify(updated));
  };

  const handleSubmit = async (submittedQuery: string) => {
    if (!submittedQuery.trim()) return;

    setStatus('loading');
    setResult(null);
    setError(null);
    addRecentQuery(submittedQuery);

    const task = parseIntent(submittedQuery);
    
    const payload: AIPayload = { task, inputs: { query: submittedQuery } };

    try {
      const response = await callAI(payload);
      setResult(response);
      setStatus('ok');
    } catch (e) {
      setError('An error occurred while processing your request.');
      setStatus('error');
      console.error(e);
    }
  };

  return {
    query,
    setQuery,
    status,
    result,
    error,
    recentQueries,
    inputRef,
    handleSubmit,
  };
};