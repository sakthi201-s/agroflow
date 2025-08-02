import { InventoryForecasterForm } from './components/inventory-forecaster-form';

export default function InventoryForecasterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Inventory Forecaster</h1>
        <p className="text-muted-foreground">
          Forecast optimal stock levels based on historical data and seasonal demand.
        </p>
      </div>
      <InventoryForecasterForm />
    </div>
  );
}
