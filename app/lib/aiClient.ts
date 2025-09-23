// lib/aiClient.ts

import {
  AIPayload,
  AIResponse,
  AIResponseSchema,
  AITaskType,
} from '@/app/types/ai';

// Mock data shaped with a pharmacy context
const mockResponses: Record<AITaskType, AIResponse> = {
  analyzeBusiness: {
    task: 'analyzeBusiness',
    kpis: { revenue: 1250340, gross_margin_pct: 34.2, stock_turns: 8.1, service_level_pct: 96.5 },
    top_categories: [
      { name: "Prescription Drugs", revenue: 780120 },
      { name: "Over-the-Counter", revenue: 210450 },
      { name: "Personal Care", revenue: 150430 }
    ],
    seasonality: [{ month: "Jan", index: 1.2 }, { month: "Jul", index: 0.9 }],
    data_quality: { missing_prices: 12, sku_without_cost: 5 },
  },
  forecastDemand: {
    task: 'forecastDemand',
    forecast: [
      { ilc: 11523, store: "302", week: "2025-10-06", qty: 42, lo: 36, hi: 49, uplift_pct: 12.5 },
      { ilc: 45887, store: "302", week: "2025-10-06", qty: 18, lo: 12, hi: 25 },
      { ilc: 78134, store: "302", week: "2025-10-06", qty: 35, lo: 30, hi: 41 },
    ],
  },
  optimizeStock: {
    task: 'optimizeStock',
    recommendations: [
      { ilc: 11523, store: "302", woc: 3.2, op: 48, om: 12, rop: 30, safety_stock: 12, note: "Increase order multiple due to high volatility" },
      { ilc: 78134, store: "302", woc: 4.0, op: 24, om: 6, rop: 15, safety_stock: 6 },
    ],
  },
  generatePurchasePlan: {
    task: 'generatePurchasePlan',
    orders: [
      { supplier: "McKesson", lines: [{ ilc: 11523, qty: 48, cost: 432.00, eta: "2025-10-08" }] },
      { supplier: "AmerisourceBergen", lines: [{ ilc: 78134, qty: 24, cost: 180.50, eta: "2025-10-09" }] },
    ],
  },
  // --- UPDATED MOCK DATA FOR PROMOTIONS ---
  planPromotions: {
    task: 'planPromotions',
    promos: [
      { 
        ilc: 88701, 
        baseline: 20, 
        uplift_pct: 28, 
        recommended_discount: 15, 
        cannibalization: [88702],
        current_price: 24.99,
        suggested_price: 21.24
      },
    ],
  },
  // --- END OF UPDATE ---
  optimizePrices: {
    task: 'optimizePrices',
    price_moves: [
      { ilc: 77734, current_price: 19.99, suggested_price: 21.49, expected_volume_delta_pct: -4.2, profit_delta: 1200.50 }
    ]
  },
  optimizeShelves: {
    task: 'optimizeShelves',
    planogram: [
      { ilc: 32155, facings: 3, notes: "High velocity, front-row" }
    ]
  },
  askAssistant: {
    task: 'askAssistant',
    answer: "Three products are nearing their expiry date within the next 30 days: Amoxicillin 500mg (12 units), Lisinopril 10mg (8 units), and Vitamin C 1000mg (25 units). I recommend creating a promotion for the Vitamin C to accelerate sell-through.",
  },
};

export const callAI = async <T extends AIResponse>(payload: AIPayload): Promise<T> => {
  console.log('AITask Requested:', payload);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let mockResponse = mockResponses[payload.task];
        
        if (payload.task === 'askAssistant') {
          const query = (payload.inputs.query as string).toLowerCase();
          if (query.includes('zero stock')) {
            mockResponse = { task: 'askAssistant', answer: "Currently, 2 SKUs have zero stock: Atorvastatin 20mg (ILC: 45887) and Salbutamol Inhaler (ILC: 99120). A purchase order recommendation for Atorvastatin is already in the latest plan." };
          } else if (query.includes('nearing expiry')) {
            mockResponse = { task: 'askAssistant', answer: "Three products are nearing their expiry date within the next 30 days: Amoxicillin 500mg (12 units), Lisinopril 10mg (8 units), and Vitamin C 1000mg (25 units). I recommend creating a promotion for the Vitamin C to accelerate sell-through." };
          }
        }
        
        const validatedResponse = AIResponseSchema.parse(mockResponse);
        resolve(validatedResponse as T);
      } catch (error) {
        console.error("Mock response validation error:", error);
        reject(error);
      }
    }, 1200);
  });
};
