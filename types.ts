export interface SurveillanceData {
  id: string;
  timestamp: string;
  location: string;
  imageUrl: string;
  personCount: number;
  maskCompliantCount: number;
  avgDistanceMeters: number;
  complianceStatus: 'Compliant' | 'Non-Compliant' | 'Critical';
  description: string;
}

export interface AppSettings {
  apiKey: string;
  model: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  INPUT = 'INPUT',
  SETTINGS = 'SETTINGS',
  DATA_TABLE = 'DATA_TABLE'
}

export interface ChartDataPoint {
  name: string;
  value: number;
}