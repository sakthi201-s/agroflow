'use server';

/**
 * @fileOverview AI-powered inventory forecasting flow.
 *
 * - inventoryForecaster - A function that forecasts optimal stock levels.
 * - InventoryForecasterInput - The input type for the inventoryForecaster function.
 * - InventoryForecasterOutput - The return type for the inventoryForecaster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryForecasterInputSchema = z.object({
  productType: z.enum(['fertilizer', 'seeds', 'maize']).describe('The type of product to forecast.'),
  companyName: z.string().describe('The name of the company (Company 1 or Company 2).'),
  historicalData: z.string().describe('Historical sales data in CSV format.'),
  seasonalDemand: z.string().describe('Expected seasonal demand variations.'),
});
export type InventoryForecasterInput = z.infer<typeof InventoryForecasterInputSchema>;

const InventoryForecasterOutputSchema = z.object({
  forecastedStockLevel: z.number().describe('The forecasted optimal stock level.'),
  explanation: z.string().describe('Explanation of the forecast.'),
  notificationMessage: z.string().describe('Notification message for stock levels.'),
});
export type InventoryForecasterOutput = z.infer<typeof InventoryForecasterOutputSchema>;

export async function inventoryForecaster(input: InventoryForecasterInput): Promise<InventoryForecasterOutput> {
  return inventoryForecasterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryForecasterPrompt',
  inputSchema: InventoryForecasterInputSchema,
  outputSchema: InventoryForecasterOutputSchema,
  prompt: `You are an expert inventory forecaster specializing in agricultural products.

You will use the provided historical sales data, seasonal demand variations, product type, and company name to forecast the optimal stock level.

Historical Data: {{{historicalData}}}

Seasonal Demand: {{{seasonalDemand}}}

Product Type: {{{productType}}}

Company Name: {{{companyName}}}

Based on this information, provide the forecasted optimal stock level, an explanation of the forecast, and a notification message if the stock level is out of expected values.

Forecasted Stock Level: 
Explanation: 
Notification Message:`,
});

const inventoryForecasterFlow = ai.defineFlow(
  {
    name: 'inventoryForecasterFlow',
    inputSchema: InventoryForecasterInputSchema,
    outputSchema: InventoryForecasterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
