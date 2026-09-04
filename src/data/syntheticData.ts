import { FailedTransaction } from '../types';

export const INITIAL_DATASET: FailedTransaction[] = [
  // 1. Technical Bank Degradation & Gateway Drops
  {
    id: 'tx_rec_001',
    orderId: 'order_RZP_90184',
    timestamp: '2026-09-03T07:45:12+05:30',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98201 44521',
    customerEmail: 'aarav.sharma@gmail.com',
    merchantName: 'QuickCommerce India',
    amount: 1849,
    paymentMethod: 'UPI',
    issuingBank: 'HDFC Bank',
    gateway: 'Razorpay UPI Switch A',
    failureCode: 'U30',
    rawErrorMessage: 'NPCI_U30: Issuing bank system timeout during VPA validation step.',
    status: 'at_risk',
    riskAmount: 1849,
    attemptsCount: 1,
    auditTrail: [
      {
        id: 'aud_1',
        timestamp: '2026-09-03T07:45:12+05:30',
        event: 'PAYMENT_FAILED_WEBHOOK',
        agentDecision: 'Ingested raw failure payload from Razorpay webhook (code: U30).',
        guardrailChecked: 'INGESTION_FORMAT_CHECK',
        passed: true
      }
    ]
  },
  {
    id: 'tx_rec_002',
    orderId: 'order_RZP_90185',
    timestamp: '2026-09-03T07:46:05+05:30',
    customerName: 'Pooja Iyer',
    customerPhone: '+91 98450 11982',
    customerEmail: 'pooja.iyer@techcorp.in',
    merchantName: 'Zepto Mart',
    amount: 3250,
    paymentMethod: 'UPI',
    issuingBank: 'State Bank of India',
    gateway: 'Razorpay UPI Switch B',
    failureCode: 'U69',
    rawErrorMessage: 'NPCI_U69: PSP switch down or transaction frequency cap hit on bank switch.',
    status: 'at_risk',
    riskAmount: 3250,
    attemptsCount: 1,
    auditTrail: [
      {
        id: 'aud_2',
        timestamp: '2026-09-03T07:46:05+05:30',
        event: 'PAYMENT_FAILED_WEBHOOK',
        agentDecision: 'Ingested raw failure payload (SBI PSP degradation detected).',
        guardrailChecked: 'INGESTION_FORMAT_CHECK',
        passed: true
      }
    ]
  },
  {
    id: 'tx_rec_003',
    orderId: 'order_RZP_90186',
    timestamp: '2026-09-03T07:48:22+05:30',
    customerName: 'Rohan Mehra',
    customerPhone: '+91 97110 34891',
    customerEmail: 'rohan.mehra@consulting.com',
    merchantName: 'FlightBooker Pro',
    amount: 14500,
    paymentMethod: 'CARD',
    issuingBank: 'ICICI Bank',
    gateway: 'Razorpay PG Direct',
    failureCode: 'GATEWAY_TIMEOUT_504',
    rawErrorMessage: 'HTTP 504: ICICI 3DS MPI Server took >15000ms to respond.',
    status: 'at_risk',
    riskAmount: 14500,
    attemptsCount: 1,
    auditTrail: [
      {
        id: 'aud_3',
        timestamp: '2026-09-03T07:48:22+05:30',
        event: 'PAYMENT_FAILED_WEBHOOK',
        agentDecision: '3DS MPI timeout flagged under technical latency spike.',
        guardrailChecked: 'INGESTION_FORMAT_CHECK',
        passed: true
      }
    ]
  },
  {
    id: 'tx_rec_004',
    orderId: 'order_RZP_90187',
    timestamp: '2026-09-03T07:50:11+05:30',
    customerName: 'Neha Deshmukh',
    customerPhone: '+91 99203 88471',
    customerEmail: 'neha.d@startup.io',
    merchantName: 'CloudCompute India',
    amount: 8990,
    paymentMethod: 'NETBANKING',
    issuingBank: 'Axis Bank',
    gateway: 'Razorpay Netbanking Rail',
    failureCode: 'BANK_PORTAL_MAINTENANCE',
    rawErrorMessage: 'AXIS_ERR_09: Netbanking authentication gateway undergoing unscheduled node sync.',
    status: 'at_risk',
    riskAmount: 8990,
    attemptsCount: 1,
    auditTrail: []
  },

  // 2. e-Mandate & Subscription Salary Timing Failures
  {
    id: 'tx_rec_005',
    orderId: 'sub_mandate_8801',
    timestamp: '2026-09-03T07:52:00+05:30',
    customerName: 'Vikramaditya Roy',
    customerPhone: '+91 98199 55410',
    customerEmail: 'vikram.roy@fintech.co',
    merchantName: 'CultFit Annual Pass',
    amount: 17500,
    paymentMethod: 'E_MANDATE',
    issuingBank: 'HDFC Bank',
    gateway: 'Razorpay Subscriptions Hub',
    failureCode: 'U16',
    rawErrorMessage: 'NPCI_U16: Insufficient funds in consumer account at auto-debit trigger (Month-end dip).',
    status: 'at_risk',
    riskAmount: 17500,
    attemptsCount: 1,
    auditTrail: []
  },
  {
    id: 'tx_rec_006',
    orderId: 'sub_mandate_8802',
    timestamp: '2026-09-03T07:53:15+05:30',
    customerName: 'Ananya Singhania',
    customerPhone: '+91 99870 23114',
    customerEmail: 'ananya.s@designstudio.in',
    merchantName: 'Adobe Creative Cloud Pro',
    amount: 4230,
    paymentMethod: 'E_MANDATE',
    issuingBank: 'Kotak Mahindra Bank',
    gateway: 'Razorpay Subscriptions Hub',
    failureCode: 'DEBIT_FAIL_LOW_BALANCE',
    rawErrorMessage: 'KOTAK_NACH_04: Standing instruction failed: Balance below threshold on 29th.',
    status: 'at_risk',
    riskAmount: 4230,
    attemptsCount: 1,
    auditTrail: []
  },
  {
    id: 'tx_rec_007',
    orderId: 'sub_mandate_8803',
    timestamp: '2026-09-03T07:54:40+05:30',
    customerName: 'Kabir Sen',
    customerPhone: '+91 97690 19022',
    customerEmail: 'kabir.sen@streammedia.com',
    merchantName: 'Hotstar VIP + OTT Bundle',
    amount: 1499,
    paymentMethod: 'E_MANDATE',
    issuingBank: 'State Bank of India',
    gateway: 'Razorpay Subscriptions Hub',
    failureCode: 'U16',
    rawErrorMessage: 'NPCI_U16: Auto-debit retry failed on customer account.',
    status: 'at_risk',
    riskAmount: 1499,
    attemptsCount: 2,
    auditTrail: []
  },

  // 3. Auth Friction, Expired Tokens & Checkout Drop-offs
  {
    id: 'tx_rec_008',
    orderId: 'order_RZP_90190',
    timestamp: '2026-09-03T07:55:18+05:30',
    customerName: 'Deepak Nair',
    customerPhone: '+91 98401 77239',
    customerEmail: 'deepak.nair@chennai.org',
    merchantName: 'Nykaa Beauty App',
    amount: 2890,
    paymentMethod: 'CARD',
    issuingBank: 'HDFC Bank',
    gateway: 'Razorpay Card Tokenizer',
    failureCode: 'TOKEN_EXPIRY_DECLINED',
    rawErrorMessage: 'RBI_COFT_EXPIRED: Network token expired or cryptogram invalidated by issuing bank.',
    status: 'at_risk',
    riskAmount: 2890,
    attemptsCount: 1,
    auditTrail: []
  },
  {
    id: 'tx_rec_009',
    orderId: 'order_RZP_90191',
    timestamp: '2026-09-03T07:56:02+05:30',
    customerName: 'Simran Kaur',
    customerPhone: '+91 98720 44109',
    customerEmail: 'simran.kaur@punjabcorp.com',
    merchantName: 'Myntra Fashion',
    amount: 3899,
    paymentMethod: 'UPI',
    issuingBank: 'Axis Bank',
    gateway: 'Razorpay Intent SDK',
    failureCode: 'USER_ABANDONED_INTENT',
    rawErrorMessage: 'INTENT_DROP: User switched out of GPay app before completing PIN entry.',
    status: 'at_risk',
    riskAmount: 3899,
    attemptsCount: 1,
    auditTrail: []
  },
  {
    id: 'tx_rec_010',
    orderId: 'order_RZP_90192',
    timestamp: '2026-09-03T07:57:30+05:30',
    customerName: 'Arjun Kapoor',
    customerPhone: '+91 98112 39011',
    customerEmail: 'arjun.k@delhicapital.com',
    merchantName: 'Apple India Reseller',
    amount: 24900,
    paymentMethod: 'CARD',
    issuingBank: 'ICICI Bank',
    gateway: 'Razorpay PG Direct',
    failureCode: 'OTP_EXPIRED_NO_ENTRY',
    rawErrorMessage: '3DS_FAIL: Customer did not submit OTP within 180s timeout window.',
    status: 'at_risk',
    riskAmount: 24900,
    attemptsCount: 1,
    auditTrail: []
  },

  // 4. Overdue B2B Receivables & Invoices (High Value)
  {
    id: 'tx_rec_011',
    orderId: 'inv_B2B_7710',
    timestamp: '2026-09-03T08:00:10+05:30',
    customerName: 'Rajesh Mittal (CFO, Mittal Infra)',
    customerPhone: '+91 98290 55431',
    customerEmail: 'cfo@mittalinfra.in',
    merchantName: 'Razorpay X Payroll & Invoicing',
    amount: 145000,
    paymentMethod: 'B2B_INVOICE',
    issuingBank: 'Punjab National Bank',
    gateway: 'Razorpay Smart Collect (Virtual Account)',
    failureCode: 'INVOICE_OVERDUE_14D',
    rawErrorMessage: 'SMART_COLLECT_OVERDUE: Invoice payment pending 14 days past Net-30 terms.',
    status: 'at_risk',
    riskAmount: 145000,
    attemptsCount: 1,
    auditTrail: []
  },
  {
    id: 'tx_rec_012',
    orderId: 'inv_B2B_7711',
    timestamp: '2026-09-03T08:01:45+05:30',
    customerName: 'Sunita Menon (Finance Lead, Apex Logistics)',
    customerPhone: '+91 98470 99218',
    customerEmail: 'accounts@apexlogistics.in',
    merchantName: 'SaaS Suite Enterprise',
    amount: 82000,
    paymentMethod: 'B2B_INVOICE',
    issuingBank: 'State Bank of India',
    gateway: 'Razorpay Smart Collect',
    failureCode: 'INVOICE_OVERDUE_7D',
    rawErrorMessage: 'SMART_COLLECT_OVERDUE: RTGS transaction expected but not matched on NEFT router.',
    status: 'at_risk',
    riskAmount: 82000,
    attemptsCount: 1,
    auditTrail: []
  },

  // 5. Edge Case: Policy Stopping Rules (Guardrails test)
  {
    id: 'tx_rec_013',
    orderId: 'order_RZP_90199',
    timestamp: '2026-09-03T08:02:11+05:30',
    customerName: 'Tanvi Gokhale',
    customerPhone: '+91 98220 11943',
    customerEmail: 'tanvi.g@pune.ac.in',
    merchantName: 'Urban Company Pro',
    amount: 1299,
    paymentMethod: 'UPI',
    issuingBank: 'HDFC Bank',
    gateway: 'Razorpay UPI Switch A',
    failureCode: 'CUSTOMER_OPT_OUT',
    rawErrorMessage: 'DND_ACTIVE: Customer previously replied STOP to recovery nudges within 48h.',
    status: 'at_risk',
    riskAmount: 1299,
    attemptsCount: 3,
    lastTouchpointTime: '2026-09-03T06:10:00+05:30',
    auditTrail: []
  },
  {
    id: 'tx_rec_014',
    orderId: 'inv_B2B_7799',
    timestamp: '2026-09-03T08:03:00+05:30',
    customerName: 'Devansh Singhal (Director, Singhal Steels)',
    customerPhone: '+91 98100 88219',
    customerEmail: 'director@singhalsteel.com',
    merchantName: 'Heavy Machinery Rentals',
    amount: 450000,
    paymentMethod: 'B2B_INVOICE',
    issuingBank: 'Canara Bank',
    gateway: 'Razorpay Smart Collect',
    failureCode: 'HIGH_VALUE_THRESHOLD_EXCEEDED',
    rawErrorMessage: 'POLICY_TRIGGER: Amount exceeds autonomous agent limit (₹50,000 threshold).',
    status: 'at_risk',
    riskAmount: 450000,
    attemptsCount: 1,
    auditTrail: []
  },

  // Additional 36 Batch items for realistic large-scale processing
  ...generateSyntheticBatch(36)
];

function generateSyntheticBatch(count: number): FailedTransaction[] {
  const banks = ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Yes Bank'];
  const merchants = ['Swiggy Gourmet', 'Blinkit Express', 'Zomato Gold', 'Lenskart Air', 'Tata Neu', 'JioFiber Home', 'Unacademy Plus', 'Cleartrip Business'];
  const names = [
    'Manish Verma', 'Kritika Joshi', 'Siddharth Rao', 'Priyanka Bose', 'Tarun Nambiar', 
    'Divya Aggarwal', 'Rajat Gupta', 'Ishaan Malhotra', 'Shruti Chawla', 'Varun Reddy',
    'Meera Namboodiri', 'Aditya Kulkarni', 'Sneha Paul', 'Kunal Shah', 'Bhavna Trivedi',
    'Gaurav Sethi', 'Alok Pandey', 'Pallavi Nair', 'Sameer Bhat', 'Shreya Banerjee'
  ];
  const archetypes: Array<{ method: FailedTransaction['paymentMethod'], code: string, error: string, minAmt: number, maxAmt: number }> = [
    { method: 'UPI', code: 'U30', error: 'NPCI_U30: UPI switch transient network latency during debit authorization.', minAmt: 350, maxAmt: 4500 },
    { method: 'E_MANDATE', code: 'U16', error: 'NPCI_U16: Insufficient balance at recurring mandate scheduled execution.', minAmt: 1200, maxAmt: 18000 },
    { method: 'CARD', code: 'OTP_TIMEOUT', error: '3DS_DROP: Customer authentication session timed out on bank redirect.', minAmt: 899, maxAmt: 12500 },
    { method: 'UPI', code: 'ZA', error: 'NPCI_ZA: Transaction declined by customer UPI App risk firewall.', minAmt: 450, maxAmt: 5200 },
    { method: 'B2B_INVOICE', code: 'INVOICE_PENDING', error: 'B2B_OVERDUE: Corporate procurement payment overdue past Net-15 terms.', minAmt: 35000, maxAmt: 98000 }
  ];

  const results: FailedTransaction[] = [];

  for (let i = 0; i < count; i++) {
    const idx = 15 + i;
    const name = names[i % names.length] + ` ${i > 19 ? '(' + (i + 1) + ')' : ''}`;
    const bank = banks[i % banks.length];
    const merchant = merchants[i % merchants.length];
    const arch = archetypes[i % archetypes.length];
    const amount = Math.floor(Math.random() * (arch.maxAmt - arch.minAmt + 1)) + arch.minAmt;

    results.push({
      id: `tx_rec_${idx.toString().padStart(3, '0')}`,
      orderId: `order_RZP_${90200 + i}`,
      timestamp: new Date(Date.now() - (count - i) * 120000).toISOString(),
      customerName: name,
      customerPhone: `+91 ${Math.floor(9800000000 + Math.random() * 199999999).toString().replace(/(\d{5})(\d{5})/, '$1 $2')}`,
      customerEmail: `${name.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`,
      merchantName: merchant,
      amount: amount,
      paymentMethod: arch.method,
      issuingBank: bank,
      gateway: `Razorpay Switch ${String.fromCharCode(65 + (i % 4))}`,
      failureCode: arch.code,
      rawErrorMessage: arch.error,
      status: 'at_risk',
      riskAmount: amount,
      attemptsCount: 1,
      auditTrail: []
    });
  }

  return results;
}
