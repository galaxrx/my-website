// types/ai.ts

import { z } from 'zod';

// A union of all possible task names
export const AITask = z.enum([
  'analyzeBusiness',
  'forecastDemand',
  'optimizeStock',
  'generatePurchasePlan',
  'planPromotions',
  'optimizePrices',
  'optimizeShelves',
  'askAssistant',
]);
export type AITaskType = z.infer<typeof AITask>;

// Schemas for API Responses
export const AnalyzeBusinessResponseSchema = z.object({
  task: z.literal(AITask.enum.analyzeBusiness),
  kpis: z.object({
    revenue: z.number(),
    gross_margin_pct: z.number(),
    stock_turns: z.number(),
    service_level_pct: z.number(),
  }),
  top_categories: z.array(z.object({ name: z.string(), revenue: z.number() })),
  seasonality: z.array(z.object({ month: z.string(), index: z.number() })),
  data_quality: z.object({ missing_prices: z.number(), sku_without_cost: z.number() }),
});
export type AnalyzeBusinessResponse = z.infer<typeof AnalyzeBusinessResponseSchema>;

export const ForecastDemandResponseSchema = z.object({
  task: z.literal(AITask.enum.forecastDemand),
  forecast: z.array(
    z.object({
      ilc: z.number(),
      store: z.string(),
      week: z.string(),
      qty: z.number(),
      lo: z.number(),
      hi: z.number(),
      uplift_pct: z.number().optional(),
    })
  ),
});
export type ForecastDemandResponse = z.infer<typeof ForecastDemandResponseSchema>;

export const OptimizeStockResponseSchema = z.object({
  task: z.literal(AITask.enum.optimizeStock),
  recommendations: z.array(
    z.object({
      ilc: z.number(),
      store: z.string(),
      woc: z.number(),
      op: z.number(),
      om: z.number(),
      rop: z.number(),
      safety_stock: z.number(),
      note: z.string().optional(),
    })
  ),
});
export type OptimizeStockResponse = z.infer<typeof OptimizeStockResponseSchema>;

export const GeneratePurchasePlanResponseSchema = z.object({
  task: z.literal(AITask.enum.generatePurchasePlan),
  orders: z.array(
    z.object({
      supplier: z.string(),
      lines: z.array(
        z.object({
          ilc: z.number(),
          qty: z.number(),
          cost: z.number(),
          eta: z.string(),
        })
      ),
    })
  ),
});
export type GeneratePurchasePlanResponse = z.infer<typeof GeneratePurchasePlanResponseSchema>;

export const PlanPromotionsResponseSchema = z.object({
  task: z.literal(AITask.enum.planPromotions),
  promos: z.array(
    z.object({
      ilc: z.number(),
      baseline: z.number(),
      uplift_pct: z.number(),
      recommended_discount: z.number(),
      cannibalization: z.array(z.number()),
      current_price: z.number(), // Added
      suggested_price: z.number(), // Added
    })
  ),
});
export type PlanPromotionsResponse = z.infer<typeof PlanPromotionsResponseSchema>;

export const OptimizePricesResponseSchema = z.object({
    task: z.literal(AITask.enum.optimizePrices),
    price_moves: z.array(z.object({
        ilc: z.number(),
        current_price: z.number(),
        suggested_price: z.number(),
        expected_volume_delta_pct: z.number(),
        profit_delta: z.number(),
    }))
});
export type OptimizePricesResponse = z.infer<typeof OptimizePricesResponseSchema>;

export const OptimizeShelvesResponseSchema = z.object({
    task: z.literal(AITask.enum.optimizeShelves),
    planogram: z.array(z.object({
        ilc: z.number(),
        facings: z.number(),
        notes: z.string(),
    }))
});
export type OptimizeShelvesResponse = z.infer<typeof OptimizeShelvesResponseSchema>;


export const AskAssistantResponseSchema = z.object({
  task: z.literal(AITask.enum.askAssistant),
  answer: z.string(),
});
export type AskAssistantResponse = z.infer<typeof AskAssistantResponseSchema>;


// Union of all possible valid API responses
export const AIResponseSchema = z.union([
  AnalyzeBusinessResponseSchema,
  ForecastDemandResponseSchema,
  OptimizeStockResponseSchema,
  GeneratePurchasePlanResponseSchema,
  PlanPromotionsResponseSchema,
  OptimizePricesResponseSchema,
  OptimizeShelvesResponseSchema,
  AskAssistantResponseSchema,
]);
export type AIResponse = z.infer<typeof AIResponseSchema>;

// Generic Request Payload type
export type AIPayload = {
  task: AITaskType;
  inputs: Record<string, any>;
};