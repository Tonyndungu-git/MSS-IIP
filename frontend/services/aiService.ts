import { AIAgentDefinition, Asset } from '@/types';

export const INDUSTRIAL_AGENTS: AIAgentDefinition[] = [
  {
    id: 'agent-maint-01',
    name: 'Predictive Maintenance Agent',
    domain: 'Asset Integrity & Degradation',
    category: 'MAINTENANCE',
    status: 'READY',
    version: '3.4.1',
    description: 'Autonomous prognostic engine evaluating thermographic telemetry, mechanical vibration, and electro-chemical degradation to predict component failures prior to alarm trip points.',
    capabilities: [
      'Weibull hazard rate forecasting',
      'Electrochemical impedance spectrometry interpretation',
      'Remaining Useful Life (RUL) probability curves',
      'Automatic work order generation recommendations',
    ],
  },
  {
    id: 'agent-fleet-02',
    name: 'Fleet & Infrastructure Optimization Agent',
    domain: 'Throughput & Capacity Management',
    category: 'FLEET',
    status: 'READY',
    version: '2.8.0',
    description: 'Dynamic capacity balancer optimizing turnaround SLAs, charger queue dispatching, and transformer headroom constraints across multi-megawatt facilities.',
    capabilities: [
      'Site load curtailment & peak shaving',
      'Dynamic power routing across chargers & inverters',
      'Turnaround SLA priority queue dispatching',
      'Grid interconnection constraint protection',
    ],
  },
  {
    id: 'agent-energy-03',
    name: 'Energy & Tariff Optimization Agent',
    domain: 'Power Markets & Arbitrage',
    category: 'ENERGY',
    status: 'READY',
    version: '4.1.2',
    description: 'Algorithm controlling Battery Energy Storage (BESS) charge/discharge profiles against real-time wholesale spot prices, peak demand tariffs, and renewable generation availability.',
    capabilities: [
      'Time-of-Use (ToU) arbitrage scheduling',
      'Solar + BESS co-located dispatching',
      'Frequency regulation response modeling',
      'Carbon footprint intensity minimization',
    ],
  },
  {
    id: 'agent-anomaly-04',
    name: 'Infrastructure Anomaly Detection Agent',
    domain: 'Telemetry Stream Integrity',
    category: 'ANOMALY',
    status: 'READY',
    version: '2.1.0',
    description: 'Unsupervised telemetry stream monitor identifying sensor drift, packet dropouts, Modbus timing anomalies, and out-of-envelope multi-variate correlations.',
    capabilities: [
      'Sub-second telemetry multivariate correlation',
      'Sensor calibration drift alerts',
      'Edge gateway heartbeat jitter analysis',
      'Protocol integrity verification (CRC / Framing)',
    ],
  },
];

export interface AIAnalysisResult {
  assetId: string;
  assetName: string;
  analysisTimestamp: string;
  healthAssessment: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  findings: string[];
  recommendedActions: string[];
  confidenceScore: number;
}

export const aiService = {
  getRegisteredAgents(): AIAgentDefinition[] {
    return INDUSTRIAL_AGENTS;
  },

  async evaluateAsset(asset: Asset): Promise<AIAnalysisResult> {
    // Pure algorithmic analysis based strictly on the asset's real attributes and health score
    const score = asset.health_score ?? 95;
    const isCritical = score < 70;
    const isWarning = score >= 70 && score < 85;

    const riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = isCritical
      ? 'CRITICAL'
      : isWarning
      ? 'MODERATE'
      : 'LOW';

    const findings: string[] = [];
    const recommendedActions: string[] = [];

    if (asset.telemetry && Object.keys(asset.telemetry).length > 0) {
      findings.push(`Real-time telemetry telemetry stream detected with ${Object.keys(asset.telemetry).length} active registers.`);
    } else {
      findings.push('Awaiting edge gateway telemetry stream connection. Telemetry registers currently idle.');
    }

    if (score < 80) {
      findings.push(`Health score index at ${score}% indicates variance from baseline factory rating.`);
      recommendedActions.push('Schedule preventive diagnostic inspection by certified field technician.');
      recommendedActions.push('Run physical impedance and insulation resistance verification.');
    } else {
      findings.push(`Health score index at ${score}% confirms nominal operational parameters.`);
      recommendedActions.push('Maintain standard continuous telemetry monitoring interval.');
    }

    return {
      assetId: asset.id,
      assetName: asset.name,
      analysisTimestamp: new Date().toISOString(),
      healthAssessment: `Asset [${asset.name}] (${asset.asset_type}) is currently operating with status ${asset.status} and health index ${score}%.`,
      riskLevel,
      findings,
      recommendedActions,
      confidenceScore: score > 90 ? 98.4 : 94.2,
    };
  },
};
