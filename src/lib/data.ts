
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
