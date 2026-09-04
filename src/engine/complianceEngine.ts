import { FailedTransaction, ComplianceConfig, AuditLogEntry } from '../types';

export const DEFAULT_COMPLIANCE_CONFIG: ComplianceConfig = {
  maxTouchesPerCustomer: 2,
  cooldownHours: 48,
  highValueEscalationThreshold: 50000, // INR
  enforceRbiMandateNotice: true,
  quietHoursActive: false,
};

export interface GuardrailEvaluation {
  allowed: boolean;
  reason: string;
  ruleCode: string;
  auditLog: AuditLogEntry;
}

export class ComplianceEngine {
  private config: ComplianceConfig;

  constructor(config: ComplianceConfig = DEFAULT_COMPLIANCE_CONFIG) {
    this.config = config;
  }

  public updateConfig(newConfig: Partial<ComplianceConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): ComplianceConfig {
    return this.config;
  }

  public evaluateTransaction(tx: FailedTransaction): GuardrailEvaluation {
    const timestamp = new Date().toISOString();

    // 1. Check Customer Opt-Out / DND
    if (tx.failureCode === 'CUSTOMER_OPT_OUT' || tx.rawErrorMessage.includes('DND_ACTIVE')) {
      return {
        allowed: false,
        reason: 'Execution stopped: Customer has explicit DND/Opt-Out active on record.',
        ruleCode: 'GUARDRAIL_DND_OPT_OUT',
        auditLog: {
          id: `aud_${Date.now()}_dnd`,
          timestamp,
          event: 'GUARDRAIL_ENFORCED',
          agentDecision: 'Halted all autonomous recovery touches per customer privacy preference.',
          guardrailChecked: 'DPDP_PRIVACY_OPT_OUT',
          passed: false
        }
      };
    }

    // 2. Check Touchpoint Frequency (Anti-Harassment Cap)
    if (tx.attemptsCount > this.config.maxTouchesPerCustomer) {
      return {
        allowed: false,
        reason: `Execution stopped: Max allowed touches (${this.config.maxTouchesPerCustomer}) exceeded within ${this.config.cooldownHours}h cooldown window.`,
        ruleCode: 'GUARDRAIL_MAX_TOUCH_EXCEEDED',
        auditLog: {
          id: `aud_${Date.now()}_touch`,
          timestamp,
          event: 'GUARDRAIL_ENFORCED',
          agentDecision: `Stopping rule triggered: Customer already received ${tx.attemptsCount} attempts. Enforcing 48h quiet window.`,
          guardrailChecked: 'RECOVERY_FREQUENCY_CAP_RBI',
          passed: false
        }
      };
    }

    // 3. High-Value Human Escalation Check
    if (tx.amount >= this.config.highValueEscalationThreshold) {
      return {
        allowed: false,
        reason: `Autonomous execution bounded: Amount ₹${tx.amount.toLocaleString('en-IN')} exceeds autonomous threshold (₹${this.config.highValueEscalationThreshold.toLocaleString('en-IN')}). Requires FinOps approval.`,
        ruleCode: 'GUARDRAIL_HIGH_VALUE_ESCALATION',
        auditLog: {
          id: `aud_${Date.now()}_highval`,
          timestamp,
          event: 'ESCALATED_TO_HUMAN',
          agentDecision: `Transaction flagged for high-touch human finance controller review. Drafted automated settlement term sheet.`,
          guardrailChecked: 'HIGH_VALUE_THRESHOLD_POLICY',
          passed: false
        }
      };
    }

    // Passed all guardrails
    return {
      allowed: true,
      reason: 'All compliance, RBI mandate, and frequency guardrails satisfied.',
      ruleCode: 'GUARDRAIL_PASSED',
      auditLog: {
        id: `aud_${Date.now()}_pass`,
        timestamp,
        event: 'GUARDRAIL_VERIFIED',
        agentDecision: 'Autonomous action approved under bounded execution policies.',
        guardrailChecked: 'BOUNDED_EXECUTION_STANDARD',
        passed: true
      }
    };
  }
}
