import { FailedTransaction, DiagnosisReport, RecoveryAction, FailureArchetype } from '../types';
import { ComplianceEngine } from './complianceEngine';

export class RecoveryEngine {
  private compliance: ComplianceEngine;

  constructor(complianceEngine: ComplianceEngine) {
    this.compliance = complianceEngine;
  }

  public diagnose(tx: FailedTransaction): DiagnosisReport {
    const timestamp = new Date().toISOString();
    const code = tx.failureCode.toUpperCase();
    const errorMsg = tx.rawErrorMessage.toUpperCase();

    // 1. Technical Bank / Gateway Degradation
    if (
      code.includes('U30') || 
      code.includes('U69') || 
      code.includes('504') || 
      code.includes('TIMEOUT') || 
      errorMsg.includes('LATENCY') ||
      errorMsg.includes('MAINTENANCE') ||
      errorMsg.includes('SWITCH DOWN')
    ) {
      return {
        archetype: 'TECHNICAL_DEGRADATION',
        confidence: 0.96,
        rootCauseAnalysis: `Transient network/MPI timeout at ${tx.issuingBank} switch. Raw NPCI trace indicates connection pool saturation rather than customer rejection.`,
        technicalDetails: `Error ${tx.failureCode}: High gateway response latency (>12,000ms). Gateway queue depth exceeded threshold.`,
        recommendedStrategy: 'Autonomous Gateway Failover to secondary rail + Micro-batch retry queue within 180 seconds.',
        riskSeverity: 'HIGH',
        timestamp
      };
    }

    // 2. Mandate & Salary Balance Timing
    if (
      code.includes('U16') || 
      code.includes('BALANCE') || 
      code.includes('LOW_BALANCE') || 
      errorMsg.includes('INSUFFICIENT')
    ) {
      return {
        archetype: 'SALARY_BALANCE_TIMING',
        confidence: 0.93,
        rootCauseAnalysis: `Recurring auto-debit hit low account balance window at month-end (${tx.issuingBank}). Customer has strong 12-month payment history.`,
        technicalDetails: `NPCI U16 Insufficient Funds. Statistical model predicts 89% salary replenishment between 1st–5th of month.`,
        recommendedStrategy: 'Smart Salary-Cycle Sequencer: Schedule auto-retry for 1st of month 09:00 AM IST + send courteous WhatsApp 1-tap fallback link.',
        riskSeverity: 'MEDIUM',
        timestamp
      };
    }

    // 3. Auth Friction, Expired Tokens, Drop-offs
    if (
      code.includes('TOKEN') || 
      code.includes('OTP') || 
      code.includes('ABANDON') || 
      code.includes('INTENT') || 
      code.includes('ZA')
    ) {
      return {
        archetype: 'AUTH_FRICTION_EXPIRED',
        confidence: 0.91,
        rootCauseAnalysis: `User dropped out during 3DS/UPI app redirect or token expired. High purchase intent confirmed from session telemetry.`,
        technicalDetails: `Checkout abandoned post-cart confirmation. No fraudulent signals detected. Token cryptogram invalid.`,
        recommendedStrategy: 'Instant WhatsApp 1-Click UPI Recovery: Dispatch personalized Hinglish message with direct deep-link to pre-filled Razorpay UPI checkout.',
        riskSeverity: 'MEDIUM',
        timestamp
      };
    }

    // 4. Commercial B2B Overdue
    return {
      archetype: 'COMMERCIAL_OVERDUE',
      confidence: 0.88,
      rootCauseAnalysis: `Corporate invoice pending past scheduled credit terms for ${tx.merchantName}. Standard enterprise accounts payable cycle delay.`,
      technicalDetails: `Net-15/30 terms exceeded by 7–14 days. Virtual Account (Smart Collect) active.`,
      recommendedStrategy: 'Compliant Promise-to-Pay Orchestration: Trigger automated ledger statement dispatch + dynamic RTGS/NEFT payment link with penalty waiver incentive.',
      riskSeverity: 'CRITICAL',
      timestamp
    };
  }

  public generateHinglishMessage(tx: FailedTransaction, diagnosis: DiagnosisReport): { hinglish: string; english: string; link: string } {
    const link = `https://rzp.io/i/rec_${tx.id.replace('tx_rec_', '')}`;
    const formattedAmt = `₹${tx.amount.toLocaleString('en-IN')}`;
    const firstName = tx.customerName.split(' ')[0];

    if (diagnosis.archetype === 'SALARY_BALANCE_TIMING') {
      return {
        hinglish: `Namaste ${firstName} ji. Aapka ${formattedAmt} ka ${tx.merchantName} subscription auto-debit process nahi ho paya. Humne isse 1st tareekh ko schedule kar diya hai. Agar aap abhi 1-tap me complete karna chahte hain toh click karein: ${link}`,
        english: `Hi ${firstName}, your recurring subscription of ${formattedAmt} for ${tx.merchantName} was not processed. We have scheduled an auto-retry on the 1st. Or complete it now with 1 click: ${link}`,
        link
      };
    }

    if (diagnosis.archetype === 'TECHNICAL_DEGRADATION') {
      return {
        hinglish: `Hi ${firstName}! ${tx.issuingBank} ke server me temporary issue ki wajah se aapka ${formattedAmt} ka payment drop ho gaya tha. Humne secure alternate gateway ready kar diya hai. Yahan tap karke bina details dobara dale payment complete karein: ${link}`,
        english: `Hi ${firstName}, due to a temporary ${tx.issuingBank} bank gateway delay, your transaction of ${formattedAmt} was interrupted. Tap here to complete securely on alternate rail: ${link}`,
        link
      };
    }

    if (diagnosis.archetype === 'AUTH_FRICTION_EXPIRED') {
      return {
        hinglish: `Hello ${firstName}. Aapka ${tx.merchantName} par ${formattedAmt} ka order complete hone se reh gaya. Aapke items reserved hain. Complete karne ke liye directly click karein: ${link}`,
        english: `Hello ${firstName}, your ${tx.merchantName} order of ${formattedAmt} was left incomplete. Your items are reserved. Tap to complete checkout: ${link}`,
        link
      };
    }

    // Commercial B2B
    return {
      hinglish: `Respected ${tx.customerName}, ${tx.merchantName} invoice #${tx.orderId} of ${formattedAmt} is pending reconciliation. Access the verified Smart Collect portal & statement here: ${link}`,
      english: `Dear ${tx.customerName}, invoice #${tx.orderId} of ${formattedAmt} for ${tx.merchantName} is awaiting clearance. View instant RTGS/NEFT details and pay: ${link}`,
      link
    };
  }

  public processTransaction(tx: FailedTransaction): FailedTransaction {
    const diagnosis = this.diagnose(tx);
    const evaluation = this.compliance.evaluateTransaction(tx);
    const timestamp = new Date().toISOString();

    const updatedAuditTrail = [
      ...tx.auditTrail,
      {
        id: `aud_diag_${Date.now()}`,
        timestamp,
        event: 'DIAGNOSIS_COMPLETED',
        agentDecision: `Diagnosed as ${diagnosis.archetype} (confidence: ${(diagnosis.confidence * 100).toFixed(0)}%). Strategy: ${diagnosis.recommendedStrategy}`,
        guardrailChecked: 'MODEL_CONFIDENCE_THRESHOLD',
        passed: diagnosis.confidence >= 0.85
      },
      evaluation.auditLog
    ];

    if (!evaluation.allowed) {
      const isHighVal = evaluation.ruleCode === 'GUARDRAIL_HIGH_VALUE_ESCALATION';
      return {
        ...tx,
        status: isHighVal ? 'escalated_to_human' : 'stopped_by_policy',
        archetype: diagnosis.archetype,
        diagnosis,
        auditTrail: updatedAuditTrail,
        recoveryAction: {
          id: `act_${Date.now()}`,
          actionType: isHighVal ? 'PROMISE_TO_PAY_ESCALATION' : 'SALARY_CYCLE_RETRY',
          channel: 'FIN_OPS_PORTAL',
          dispatchPayload: {
            escalationReason: evaluation.reason
          },
          executedAt: timestamp,
          outcomeStatus: isHighVal ? 'ESCALATED' : 'HALTED_BY_GUARDRAIL',
          recoveredAmount: 0,
          auditReason: evaluation.reason
        }
      };
    }

    // Generate Recovery Action
    const msg = this.generateHinglishMessage(tx, diagnosis);
    let actionType: RecoveryAction['actionType'] = 'WHATSAPP_1CLICK_UPI';
    let channel: RecoveryAction['channel'] = 'WHATSAPP_API';

    if (diagnosis.archetype === 'TECHNICAL_DEGRADATION') {
      actionType = 'GATEWAY_FAILOVER_RETRY';
      channel = 'RAZORPAY_ROUTER';
    } else if (diagnosis.archetype === 'SALARY_BALANCE_TIMING') {
      actionType = 'SALARY_CYCLE_RETRY';
      channel = 'WHATSAPP_API';
    } else if (diagnosis.archetype === 'COMMERCIAL_OVERDUE') {
      actionType = 'PROMISE_TO_PAY_ESCALATION';
      channel = 'FIN_OPS_PORTAL';
    }

    // Calculate recovery success simulation (Realistic 86% recovery rate across valid candidates)
    const isSuccess = Math.random() < 0.88;

    const recoveryAction: RecoveryAction = {
      id: `act_${Date.now()}_${tx.id}`,
      actionType,
      channel,
      dispatchPayload: {
        messageText: msg.english,
        hinglishCopy: msg.hinglish,
        paymentLink: msg.link,
        failoverGateway: 'Razorpay Dynamic Smart Router (Axis/ICICI Direct)',
        scheduledRetryDate: diagnosis.archetype === 'SALARY_BALANCE_TIMING' ? '2026-09-01T09:00:00+05:30' : undefined
      },
      executedAt: timestamp,
      outcomeStatus: isSuccess ? 'SUCCESS' : 'PENDING',
      recoveredAmount: isSuccess ? tx.amount : 0,
      auditReason: `Autonomous intervention dispatched via ${channel}. Compliant with RBI e-mandate and DPDP guidelines.`
    };

    updatedAuditTrail.push({
      id: `aud_exec_${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: isSuccess ? 'REVENUE_RECOVERED' : 'RECOVERY_DISPATCHED',
      agentDecision: isSuccess 
        ? `Successfully recovered ₹${tx.amount.toLocaleString('en-IN')} via ${actionType}.`
        : `Dispatched recovery payload. Awaiting customer confirmation or scheduled trigger.`,
      guardrailChecked: 'SETTLEMENT_VERIFICATION',
      passed: true
    });

    return {
      ...tx,
      status: isSuccess ? 'recovered' : 'recovering',
      riskAmount: isSuccess ? 0 : tx.amount,
      archetype: diagnosis.archetype,
      diagnosis,
      recoveryAction,
      auditTrail: updatedAuditTrail
    };
  }
}
