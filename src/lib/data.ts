
export type Transaction = {
  id: string;
  date: string;
  type: 'Sale' | 'Purchase';
  company: 'Company 1' | 'Company 2';
  counterparty: string;
  counterpartyType: 'Customer' | 'Farmer' | 'Organization';
  productName: string;
  quantity: number;
  unit: 'kg' | 'ton' | 'bags';
  amount: string;
};

export const initialTransactionData: Transaction[] = [
  { id: 'TRN001', date: '2024-07-15', type: 'Sale', company: 'Company 1', counterparty: 'John Doe Farms', counterpartyType: 'Customer', productName: 'Urea Fertilizer', quantity: 50, unit: 'bags', amount: '$1,250.00' },
  { id: 'TRN002', date: '2024-07-14', type: 'Purchase', company: 'Company 2', counterparty: 'Samuel Miller', counterpartyType: 'Farmer', productName: 'Yellow Maize', quantity: 20, unit: 'ton', amount: '$4,000.00' },
  { id: 'TRN003', date: '2024-07-12', type: 'Purchase', company: 'Company 1', counterparty: 'Agri Supplies Co.', counterpartyType: 'Organization', productName: 'DAP Fertilizer', quantity: 100, unit: 'bags', amount: '$3,500.00' },
  { id: 'TRN004', date: '2024-07-11', type: 'Sale', company: 'Company 1', counterparty: 'Jane Smith Fields', counterpartyType: 'Customer', productName: 'Hybrid Maize Seeds', quantity: 10, unit: 'bags', amount: '$500.00' },
  { id: 'TRN005', date: '2024-07-10', type: 'Sale', company: 'Company 1', counterparty: 'Local Coop', counterpartyType: 'Customer', productName: 'Urea Fertilizer', quantity: 20, unit: 'bags', amount: '$500.00' },
  { id: 'TRN006', date: '2024-07-09', type: 'Purchase', company: 'Company 2', counterparty: 'Isabella Garcia', counterpartyType: 'Farmer', productName: 'White Maize', quantity: 30, unit: 'ton', amount: '$6,300.00' },
  { id: 'TRN007', date: '2024-07-08', type: 'Purchase', company: 'Company 1', counterparty: 'Heritage Seeds Ltd.', counterpartyType: 'Organization', productName: 'Sorghum Seeds', quantity: 50, unit: 'bags', amount: '$1,200.00' },
  { id: 'TRN008', date: '2024-07-05', type: 'Sale', company: 'Company 1', counterparty: 'Green Valley Gardens', counterpartyType: 'Customer', productName: 'DAP Fertilizer', quantity: 15, unit: 'bags', amount: '$525.00' },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  lastPurchaseDate: string;
};

export const customerData: Customer[] = [
  { id: 'CUS001', name: 'John Doe Farms', phone: '555-0101', email: 'john.doe@example.com', address: '123 Farm Rd, Rural Town', lastPurchaseDate: '2024-05-15' },
  { id: 'CUS002', name: 'Jane Smith Fields', phone: '555-0102', email: 'jane.smith@example.com', address: '456 Meadow Ln, Greenfield', lastPurchaseDate: '2024-06-01' },
  { id: 'CUS003', name: 'Local Coop', phone: '555-0103', email: 'contact@localcoop.com', address: '789 Market St, Cityville', lastPurchaseDate: '2024-05-28' },
  { id: 'CUS004', name: 'Green Valley Gardens', phone: '555-0104', email: 'info@gvgardens.net', address: '321 Orchard Ave, Fruitdale', lastPurchaseDate: '2024-06-10' },
];

export type Farmer = {
  id: string;
  name: string;
  location: string;
  phone: string;
  cropType: string;
  acreage: number;
};

export const farmerData: Farmer[] = [
  { id: 'FARM001', name: 'Samuel Miller', location: 'West Valley', phone: '555-0301', cropType: 'Yellow Maize', acreage: 150 },
  { id: 'FARM002', name: 'Isabella Garcia', location: 'East Ridge', phone: '555-0302', cropType: 'White Maize', acreage: 200 },
  { id: 'FARM003', name: 'William Brown', location: 'North Plains', phone: '555-0303', cropType: 'Yellow Maize', acreage: 120 },
  { id: 'FARM004', name: 'Sophia Nguyen', location: 'South Delta', phone: '555-0304', cropType: 'Mixed Maize', acreage: 300 },
];

export type Organization = {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  productTypes: string;
};

export const organizationData: Organization[] = [
  { id: 'ORG001', name: 'Agri Supplies Co.', contactPerson: 'Mark Johnson', phone: '555-0201', email: 'sales@agrisupplies.com', productTypes: 'Fertilizer, Seeds' },
  { id: 'ORG002', name: 'Global Exports Inc.', contactPerson: 'Susan Lee', phone: '555-0202', email: 'susan.lee@globalexports.com', productTypes: 'Maize' },
  { id: 'ORG003', name: 'Maize Traders LLC', contactPerson: 'David Chen', phone: '555-0203', email: 'david.chen@maizetraders.com', productTypes: 'Maize' },
  { id: 'ORG004', name: 'Heritage Seeds Ltd.', contactPerson: 'Maria Garcia', phone: '555-0204', email: 'maria.g@heritageseeds.com', productTypes: 'Seeds' },
];

export type StockItem = {
  id: string;
  productName: string;
  type: 'Fertilizer' | 'Seeds' | 'Maize';
  company: 'Company 1' | 'Company 2';
  quantity: number;
  unit: 'kg' | 'ton' | 'bags';
  location: string;
};

export const stockData: StockItem[] = [
  { id: 'STK001', productName: 'Urea Fertilizer', type: 'Fertilizer', company: 'Company 1', quantity: 500, unit: 'bags', location: 'Warehouse A' },
  { id: 'STK002', productName: 'Hybrid Maize Seeds', type: 'Seeds', company: 'Company 1', quantity: 200, unit: 'bags', location: 'Warehouse B' },
  { id: 'STK003', productName: 'Imported Yellow Maize', type: 'Maize', company: 'Company 2', quantity: 150, unit: 'ton', location: 'Silo 3' },
  { id: 'STK004', productName: 'DAP Fertilizer', type: 'Fertilizer', company: 'Company 1', quantity: 300, unit: 'bags', location: 'Warehouse A' },
  { id: 'STK005', productName: 'Sorghum Seeds', type: 'Seeds', company: 'Company 1', quantity: 150, unit: 'bags', location: 'Warehouse B' },
  { id: 'STK006', productName: 'Local White Maize', type: 'Maize', company: 'Company 2', quantity: 250, unit: 'ton', location: 'Silo 1' },
];

export type Bill = {
  invoiceId: string;
  customer: string;
  counterpartyType: 'Customer' | 'Organization' | 'Farmer';
  billType: 'Receivable' | 'Payable';
  company: 'Company 1' | 'Company 2';
  amount: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const initialBillingData: Bill[] = [
    { invoiceId: 'INV-2024001', customer: 'John Doe Farms', counterpartyType: 'Customer', billType: 'Receivable', company: 'Company 1', amount: '$1,250.00', dueDate: '2024-07-30', status: 'Paid' },
    { invoiceId: 'BILL-001', customer: 'Agri Supplies Co.', counterpartyType: 'Organization', billType: 'Payable', company: 'Company 1', amount: '$3,500.00', dueDate: '2024-08-20', status: 'Pending' },
    { invoiceId: 'INV-2024002', customer: 'Global Exports Inc.', counterpartyType: 'Organization', billType: 'Receivable', company: 'Company 2', amount: '$15,000.00', dueDate: '2024-08-15', status: 'Pending' },
    { invoiceId: 'BILL-002', customer: 'Samuel Miller', counterpartyType: 'Farmer', billType: 'Payable', company: 'Company 2', amount: '$4,000.00', dueDate: '2024-08-10', status: 'Paid' },
    { invoiceId: 'INV-2024003', customer: 'Agri Supplies Co.', counterpartyType: 'Organization', billType: 'Receivable', company: 'Company 1', amount: '$800.50', dueDate: '2024-06-20', status: 'Overdue' },
    { invoiceId: 'INV-2024004', customer: 'Jane Smith Fields', counterpartyType: 'Customer', billType: 'Receivable', company: 'Company 1', amount: '$3,500.00', dueDate: '2024-08-05', status: 'Pending' },
    { invoiceId: 'INV-2024005', customer: 'Maize Traders LLC', counterpartyType: 'Organization', billType: 'Receivable', company: 'Company 2', amount: '$22,300.00', dueDate: '2024-07-25', status: 'Paid' },
    { invoiceId: 'INV-2024006', customer: 'Local Coop', counterpartyType: 'Customer', billType: 'Receivable', company: 'Company 1', amount: '$550.00', dueDate: '2024-08-20', status: 'Pending' },
    { invoiceId: 'BILL-003', customer: 'Isabella Garcia', counterpartyType: 'Farmer', billType: 'Payable', company: 'Company 2', amount: '$6,300.00', dueDate: '2024-08-25', status: 'Pending' },
];
