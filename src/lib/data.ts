
export type BillItem = {
    id: string;
    productName: string;
    quantity: number;
    unit: 'kg' | 'ton' | 'bags';
    price: number;
}

export type Transaction = {
  id: string;
  date: string;
  type: 'Sale' | 'Purchase';
  company: 'Company 1' | 'Company 2';
  counterparty: string;
  counterpartyType: 'Customer' | 'Farmer' | 'Organization';
  items: BillItem[];
  totalAmount: number;
};

export const initialTransactionData: Transaction[] = [
  { 
    id: 'TRN001', 
    date: '2024-07-15', 
    type: 'Sale', 
    company: 'Company 1', 
    counterparty: 'John Doe Farms', 
    counterpartyType: 'Customer', 
    items: [{ id: 'STK001', productName: 'Urea Fertilizer', quantity: 50, unit: 'bags', price: 25 }],
    totalAmount: 1250.00 
  },
  { 
    id: 'TRN002', 
    date: '2024-07-14', 
    type: 'Purchase', 
    company: 'Company 2', 
    counterparty: 'Samuel Miller', 
    counterpartyType: 'Farmer', 
    items: [{ id: 'STK003', productName: 'Yellow Maize', quantity: 20, unit: 'ton', price: 200 }],
    totalAmount: 4000.00
  },
  { 
    id: 'TRN003', 
    date: '2024-07-12', 
    type: 'Purchase', 
    company: 'Company 1', 
    counterparty: 'Agri Supplies Co.', 
    counterpartyType: 'Organization',
    items: [{ id: 'STK004', productName: 'DAP Fertilizer', quantity: 100, unit: 'bags', price: 35 }],
    totalAmount: 3500.00
  },
  { 
    id: 'TRN004', 
    date: '2024-07-11', 
    type: 'Sale', 
    company: 'Company 1', 
    counterparty: 'Jane Smith Fields', 
    counterpartyType: 'Customer',
    items: [
        { id: 'STK002', productName: 'Hybrid Maize Seeds', quantity: 10, unit: 'bags', price: 50 },
        { id: 'STK001', productName: 'Urea Fertilizer', quantity: 5, unit: 'bags', price: 25 }
    ],
    totalAmount: 625.00
  },
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
};

export const farmerData: Farmer[] = [
  { id: 'FARM001', name: 'Samuel Miller', location: 'West Valley', phone: '555-0301' },
  { id: 'FARM002', name: 'Isabella Garcia', location: 'East Ridge', phone: '555-0302' },
  { id: 'FARM003', name: 'William Brown', location: 'North Plains', phone: '555-0303' },
  { id: 'FARM004', name: 'Sophia Nguyen', location: 'South Delta', phone: '555-0304' },
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
  totalAmount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: BillItem[];
};

export const initialBillingData: Bill[] = [
    { invoiceId: 'INV-2024001', customer: 'John Doe Farms', counterpartyType: 'Customer', billType: 'Receivable', company: 'Company 1', totalAmount: 1250.00, dueDate: '2024-07-30', status: 'Paid', items: [{id: 'STK001', productName: 'Urea Fertilizer', quantity: 50, unit: 'bags', price: 25}] },
    { invoiceId: 'BILL-001', customer: 'Agri Supplies Co.', counterpartyType: 'Organization', billType: 'Payable', company: 'Company 1', totalAmount: 3500.00, dueDate: '2024-08-20', status: 'Pending', items: [{id: 'STK004', productName: 'DAP Fertilizer', quantity: 100, unit: 'bags', price: 35}] },
    { invoiceId: 'INV-2024002', customer: 'Global Exports Inc.', counterpartyType: 'Organization', billType: 'Receivable', company: 'Company 2', totalAmount: 15000.00, dueDate: '2024-08-15', status: 'Pending', items: [{id: 'STK003', productName: 'Imported Yellow Maize', quantity: 75, unit: 'ton', price: 200}] },
    { invoiceId: 'BILL-002', customer: 'Samuel Miller', counterpartyType: 'Farmer', billType: 'Payable', company: 'Company 2', totalAmount: 4000.00, dueDate: '2024-08-10', status: 'Paid', items: [{id: 'FARM001', productName: 'Yellow Maize', quantity: 20, unit: 'ton', price: 200}]},
    { invoiceId: 'INV-2024003', customer: 'Jane Smith Fields', counterpartyType: 'Customer', billType: 'Receivable', company: 'Company 1', totalAmount: 625.00, dueDate: '2024-08-05', status: 'Pending', items: [{ id: 'STK002', productName: 'Hybrid Maize Seeds', quantity: 10, unit: 'bags', price: 50 },{ id: 'STK001', productName: 'Urea Fertilizer', quantity: 5, unit: 'bags', price: 25 }]},
];

    