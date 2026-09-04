export type PaymentMethod = 'UPI' | 'E_MANDATE' | 'CARD' | 'NETBANKING' | 'B2B_INVOICE';

export type FailureArchetype = 
  | 'TECHNICAL_DEGRADATION' 
  | 'SALARY_BALANCE_TIMING' 
  | 'AUTH_FRICTION_EXPIRED' 
  | 'COMMERCIAL_OVERDUE';

export type RecoveryStatus = 
  | 'at_risk' 
  | 'diagnosing' 
  | 'recovering' 
  | 'recovered' 
  | 'escalated_to_human' 
  | 'stopped_by_policy';

export interface FailedTransaction {
  id: string;
  orderId: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  merchantName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  issuingBank: string;
  gateway: string;
  failureCode: string;
  rawErrorMessage: string;
  status: RecoveryStatus;
  riskAmount: number;
  attemptsCount: number;
  lastTouchpointTime?: string;
  archetype?: FailureArchetype;
  diagnosis?: DiagnosisReport;
  recoveryAction?: RecoveryAction;
  auditTrail: AuditLogEntry[];
}

export interface DiagnosisReport {
  archetype: FailureArchetype;
  confidence: number;
  rootCauseAnalysis: string;
  technicalDetails: string;
  recommendedStrategy: string;
  riskSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
}

export interface RecoveryAction {
  id: string;
  actionType: 'GATEWAY_FAILOVER_RETRY' | 'SALARY_CYCLE_RETRY' | 'WHATSAPP_1CLICK_UPI' | 'PROMISE_TO_PAY_ESCALATION';
  channel: 'WHATSAPP_API' | 'RAZORPAY_ROUTER' | 'SMS_UPI_DEEPLINK' | 'FIN_OPS_PORTAL';
  dispatchPayload: {
    messageText?: string;
    paymentLink?: string;
    scheduledRetryDate?: string;
    failoverGateway?: string;
    escalationReason?: string;
    hinglishCopy?: string;
  };
  executedAt: string;
  outcomeStatus: 'SUCCESS' | 'PENDING' | 'HALTED_BY_GUARDRAIL' | 'ESCALATED';
  recoveredAmount: number;
  auditReason: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: string;
  agentDecision: string;
  guardrailChecked: string;
  passed: boolean;
}

export interface ComplianceConfig {
  maxTouchesPerCustomer: number;
  cooldownHours: number;
  highValueEscalationThreshold: number; // e.g. 50,000 INR
  enforceRbiMandateNotice: boolean;
  quietHoursActive: boolean; // e.g., no messages between 10 PM and 8 AM
}
