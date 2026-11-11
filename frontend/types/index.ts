export type AssetStatus = 'REGISTERED' | 'ACTIVE' | 'WARNING' | 'CRITICAL' | 'OFFLINE' | 'MAINTENANCE';

export type AssetType = 
  | 'BATTERY' 
  | 'EV_CHARGER' 
  | 'INVERTER' 
  | 'TRANSFORMER' 
  | 'MOTOR' 
  | 'PUMP' 
  | 'GENERATOR' 
  | 'TURBINE' 
  | 'GATEWAY' 
  | 'SOLAR_ARRAY' 
  | 'COMPRESSOR' 
  | 'VALVE' 
  | 'CHILLER' 
  | 'SENSOR_NODE';

export interface Asset {
  id: string;
  name: string;
  asset_type: AssetType | string;
  manufacturer: string;
  model: string;
  serial_number: string;
  status: AssetStatus | string;
  health_score: number;
  organization_id?: string;
  site_id?: string;
  gateway_id?: string | null;
  created_at?: string;
  telemetry?: Record<string, any>;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  country: string;
  created_at?: string;
}

export interface Site {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  organization_id: string;
}

export interface Gateway {
  id: string;
  name: string;
  manufacturer: string;
  protocol: string;
  connection_type: string;
  ip_address?: string | null;
  port?: number | null;
  status?: string;
  site_id: string;
}

export interface TelemetryDataPoint {
  timestamp: string;
  parameter: string;
  value: number;
  unit: string;
  quality?: 'GOOD' | 'UNCERTAIN' | 'BAD';
}

export interface TelemetryPacket {
  timestamp: string;
  soc?: number;
  temperature?: number;
  voltage?: number;
  power?: number;
  current?: number;
  frequency?: number;
  pressure?: number;
  vibration?: number;
  flow_rate?: number;
  [key: string]: any;
}

export interface TelemetryLatestResponse {
  asset_code?: string | null;
  telemetry: any[];
  [key: string]: any;
}

export interface MetricItem {
  metric_name: string;
  unit: string;
}

export interface AssetMetricSetupInput {
  asset_id: string;
  metrics: MetricItem[];
}

export interface CreateAssetInput {
  name: string;
  asset_type: string;
  manufacturer: string;
  model: string;
  serial_number: string;
  organization_id: string;
  site_id: string;
  gateway_id?: string | null;
}

export interface CreateOrgInput {
  name: string;
  industry: string;
  country: string;
}

export interface CreateSiteInput {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  organization_id: string;
}

export interface CreateGatewayInput {
  name: string;
  manufacturer: string;
  protocol: string;
  connection_type: string;
  ip_address?: string | null;
  port?: number | null;
  site_id: string;
}

export interface MaintenanceOrder {
  id: string;
  asset_id: string;
  asset_name: string;
  title: string;
  type: 'PREVENTIVE' | 'CORRECTIVE' | 'CALIBRATION' | 'OVERHAUL';
  priority: 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
  status: 'PENDING' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assigned_team: string;
  due_date: string;
  created_at: string;
  description: string;
}

export interface ReportItem {
  id: string;
  title: string;
  report_type: 'ASSET_HEALTH' | 'TELEMETRY_LOG' | 'COMPLIANCE_ISO55000' | 'ENERGY_AUDIT' | 'ALARM_SUMMARY';
  format: 'PDF' | 'CSV' | 'JSON';
  status: 'READY' | 'GENERATING' | 'FAILED';
  file_size?: string;
  generated_at: string;
  checksum?: string;
}

export interface AIAgentDefinition {
  id: string;
  name: string;
  domain: string;
  category: 'MAINTENANCE' | 'FLEET' | 'ENERGY' | 'ANOMALY' | 'DISPATCH';
  status: 'READY' | 'MONITORING' | 'OPTIMIZING' | 'STANDBY';
  description: string;
  capabilities: string[];
  last_execution?: string;
  version: string;
}

export interface IndustryModule {
  id: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'PLANNED' | 'BETA';
  description: string;
  asset_types: string[];
  icon: string;
}
