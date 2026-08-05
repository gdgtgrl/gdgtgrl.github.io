import React, { useState, useMemo } from 'react';
import { 
  Search, Shield, Filter, BookOpen, BarChart2, PieChart, CheckCircle2, 
  AlertCircle, Layers, FileText, Download, Bookmark, ChevronRight, X, 
  Info, ExternalLink, Grid, List, Activity, Lock, Database, SlidersHorizontal,
  Check, Copy, ArrowUpRight, Cpu, Eye, Tag, RefreshCw, FileCheck, Sparkles, ChevronDown
} from 'lucide-react';

const FAMILIES = [
  { id: 'AC', name: 'Access Control', count: 25, color: 'bg-blue-500', text: 'text-blue-400', bgLight: 'bg-blue-950/60', border: 'border-blue-800' },
  { id: 'AT', name: 'Awareness and Training', count: 6, color: 'bg-indigo-500', text: 'text-indigo-400', bgLight: 'bg-indigo-950/60', border: 'border-indigo-800' },
  { id: 'AU', name: 'Audit and Accountability', count: 16, color: 'bg-purple-500', text: 'text-purple-400', bgLight: 'bg-purple-950/60', border: 'border-purple-800' },
  { id: 'CA', name: 'Assessment, Authorization, and Monitoring', count: 9, color: 'bg-pink-500', text: 'text-pink-400', bgLight: 'bg-pink-950/60', border: 'border-pink-800' },
  { id: 'CM', name: 'Configuration Management', count: 14, color: 'bg-rose-500', text: 'text-rose-400', bgLight: 'bg-rose-950/60', border: 'border-rose-800' },
  { id: 'CP', name: 'Contingency Planning', count: 13, color: 'bg-amber-500', text: 'text-amber-400', bgLight: 'bg-amber-950/60', border: 'border-amber-800' },
  { id: 'IA', name: 'Identification and Authentication', count: 13, color: 'bg-orange-500', text: 'text-orange-400', bgLight: 'bg-orange-950/60', border: 'border-orange-800' },
  { id: 'IR', name: 'Incident Response', count: 10, color: 'bg-red-500', text: 'text-red-400', bgLight: 'bg-red-950/60', border: 'border-red-800' },
  { id: 'MA', name: 'Maintenance', count: 7, color: 'bg-emerald-500', text: 'text-emerald-400', bgLight: 'bg-emerald-950/60', border: 'border-emerald-800' },
  { id: 'MP', name: 'Media Protection', count: 8, color: 'bg-teal-500', text: 'text-teal-400', bgLight: 'bg-teal-950/60', border: 'border-teal-800' },
  { id: 'PE', name: 'Physical and Environmental Protection', count: 23, color: 'bg-cyan-500', text: 'text-cyan-400', bgLight: 'bg-cyan-950/60', border: 'border-cyan-800' },
  { id: 'PL', name: 'Planning', count: 11, color: 'bg-sky-500', text: 'text-sky-400', bgLight: 'bg-sky-950/60', border: 'border-sky-800' },
  { id: 'PM', name: 'Program Management', count: 32, color: 'bg-violet-500', text: 'text-violet-400', bgLight: 'bg-violet-950/60', border: 'border-violet-800' },
  { id: 'PS', name: 'Personnel Security', count: 9, color: 'bg-fuchsia-500', text: 'text-fuchsia-400', bgLight: 'bg-fuchsia-950/60', border: 'border-fuchsia-800' },
  { id: 'PT', name: 'PII Processing and Transparency', count: 8, color: 'bg-purple-600', text: 'text-purple-300', bgLight: 'bg-purple-950/60', border: 'border-purple-800' },
  { id: 'RA', name: 'Risk Assessment', count: 10, color: 'bg-yellow-500', text: 'text-yellow-400', bgLight: 'bg-yellow-950/60', border: 'border-yellow-800' },
  { id: 'SA', name: 'System and Services Acquisition', count: 23, color: 'bg-lime-600', text: 'text-lime-400', bgLight: 'bg-lime-950/60', border: 'border-lime-800' },
  { id: 'SC', name: 'System and Communications Protection', count: 51, color: 'bg-green-600', text: 'text-green-400', bgLight: 'bg-green-950/60', border: 'border-green-800' },
  { id: 'SI', name: 'System and Information Integrity', count: 23, color: 'bg-blue-600', text: 'text-blue-300', bgLight: 'bg-blue-950/60', border: 'border-blue-800' },
  { id: 'SR', name: 'Supply Chain Risk Management', count: 12, color: 'bg-slate-600', text: 'text-slate-300', bgLight: 'bg-slate-900/60', border: 'border-slate-700' }
];

const FISCAM_CATEGORIES = [
  { id: 'AC', name: 'Access Control', desc: 'Logical access, user account management, privilege enforcement, network boundary protection, and physical access controls.', color: 'bg-blue-600', text: 'text-blue-400' },
  { id: 'CM', name: 'Configuration Management', desc: 'Baseline configurations, change control, patch management, software integrity, and hardware asset inventories.', color: 'bg-rose-600', text: 'text-rose-400' },
  { id: 'SM', name: 'Security Management', desc: 'Enterprise security policies, management oversight, risk assessments, and periodic security evaluations.', color: 'bg-indigo-600', text: 'text-indigo-400' },
  { id: 'CP', name: 'Contingency Planning', desc: 'Business continuity, disaster recovery, system backups, alternate processing sites, and emergency response.', color: 'bg-amber-600', text: 'text-amber-400' },
  { id: 'SD', name: 'Segregation of Duties', desc: 'Incompatible duty separation, authorization matrices, independent reviews, and production vs development isolation.', color: 'bg-purple-600', text: 'text-purple-400' },
  { id: 'AS', name: 'Application Security & Audit', desc: 'Application-level access controls, event logging, automated input validation, and SIEM audit record reviews.', color: 'bg-emerald-600', text: 'text-emerald-400' }
];

const FISCAM_MAPPINGS = [
  {
    fiscamId: 'AC-1.01',
    category: 'AC',
    title: 'Access Control Policies & Operational Procedures',
    objective: 'Management establishes, documents, and disseminates access control policies and operational procedures.',
    auditProcedure: 'Inquire of management and inspect access control policies to verify authorization guidelines, role assignments, and annual policy reviews.',
    nistControls: ['AC-1', 'AC-2', 'PL-2']
  },
  {
    fiscamId: 'AC-2.01',
    category: 'AC',
    title: 'User Identification & Account Authorization',
    objective: 'User access is properly authorized, uniquely identified, and granted based on documented business need.',
    auditProcedure: 'Inspect account request forms, supervisor approvals, and sample user access rosters across Active Directory and application databases.',
    nistControls: ['AC-2', 'IA-2', 'AC-3']
  },
  {
    fiscamId: 'AC-2.02',
    category: 'AC',
    title: 'Timely Deactivation of Accounts',
    objective: 'Terminated employee and contractor accounts are promptly disabled or removed upon departure.',
    auditProcedure: 'Cross-reference HR departure list against domain account deactivation timestamps and active account logs.',
    nistControls: ['AC-2', 'AC-2(2)', 'AC-2(3)']
  },
  {
    fiscamId: 'AC-3.01',
    category: 'AC',
    title: 'Privilege & Least Privilege Enforcement',
    objective: 'Privileged access (administrator/root) is restricted to minimal authorized staff necessary for operational tasks.',
    auditProcedure: 'Analyze domain admin groups, sudoers lists, and privileged activity logs for adherence to least privilege principles.',
    nistControls: ['AC-3', 'AC-6', 'AC-6(1)', 'AC-6(2)']
  },
  {
    fiscamId: 'AC-4.01',
    category: 'AC',
    title: 'Remote Access Controls & Session Encryption',
    objective: 'Remote access sessions are monitored, encrypted, and routed via managed access control points.',
    auditProcedure: 'Verify VPN configurations, multi-factor authentication (MFA) enforcement for remote sessions, and session timeout settings.',
    nistControls: ['AC-17', 'AC-17(1)', 'AC-17(2)', 'AC-17(3)']
  },
  {
    fiscamId: 'AC-4.02',
    category: 'AC',
    title: 'Network Boundary Protection & Segmentation',
    objective: 'Network perimeters and internal subnets are monitored and controlled to prevent unauthorized communications.',
    auditProcedure: 'Review firewall rule sets, DMZ architectures, intrusion detection/prevention logs, and default-deny policies.',
    nistControls: ['SC-7', 'SC-7(3)', 'SC-7(5)']
  },
  {
    fiscamId: 'AC-4.03',
    category: 'AC',
    title: 'Cryptographic Protection in Transit & Rest',
    objective: 'Sensitive data in transit and at rest is protected using FIPS-validated cryptographic modules.',
    auditProcedure: 'Inspect TLS/SSL transport security configs, database encryption keys, and FIPS 140-2/3 validation certificates.',
    nistControls: ['SC-13', 'SC-13(1)']
  },
  {
    fiscamId: 'CM-1.01',
    category: 'CM',
    title: 'Baseline Configuration Standards & Enforcement',
    objective: 'Baseline configurations are documented, updated, and enforced under formal configuration management.',
    auditProcedure: 'Review baseline image standards, hardened server benchmarks (CIS/DISA STIGs), and change control board (CCB) minutes.',
    nistControls: ['CM-2', 'CM-2(1)', 'CM-2(3)']
  },
  {
    fiscamId: 'CM-1.02',
    category: 'CM',
    title: 'System Component Inventory Tracking',
    objective: 'Current and accurate inventories of hardware assets and software licenses are maintained.',
    auditProcedure: 'Inspect automated asset discovery scan reports and reconcile discovered assets against the official inventory database.',
    nistControls: ['CM-8', 'CM-8(1)', 'CM-8(3)']
  },
  {
    fiscamId: 'CM-3.01',
    category: 'CM',
    title: 'Flaw Remediation & Vulnerability Patching',
    objective: 'Software vulnerabilities are scanned, identified, prioritized, and remediated within mandated timelines.',
    auditProcedure: 'Inspect authenticated vulnerability scan results, patch management installation logs, and POAM tracking items.',
    nistControls: ['SI-2', 'SI-2(1)', 'SI-2(2)', 'RA-3']
  },
  {
    fiscamId: 'AS-2.01',
    category: 'AS',
    title: 'Security Event Logging & Timestamp Integrity',
    objective: 'System and application security events are logged, timestamped, and retained for audit trail analysis.',
    auditProcedure: 'Verify logging configurations across OS, database, and web server nodes; confirm NTP time synchronization.',
    nistControls: ['AU-2', 'AU-2(3)', 'AU-6']
  },
  {
    fiscamId: 'AS-2.02',
    category: 'AS',
    title: 'Audit Log Review & SIEM Correlation',
    objective: 'Audit logs are centrally collected, correlated, and reviewed for suspicious activities or security incidents.',
    auditProcedure: 'Evaluate SIEM dashboard rule triggers, alert notifications, log retention periods, and analyst review sign-offs.',
    nistControls: ['AU-6', 'AU-6(1)', 'AU-6(3)', 'SI-4']
  },
  {
    fiscamId: 'AS-2.03',
    category: 'AS',
    title: 'Continuous System & Threat Monitoring',
    objective: 'Automated tools monitor systems continuously to detect unauthorized access and malicious execution.',
    auditProcedure: 'Inspect EDR/XDR deployment coverage, intrusion detection system alert queues, and threat hunting documentation.',
    nistControls: ['SI-4', 'SI-4(2)', 'SI-4(4)', 'SI-4(5)']
  },
  {
    fiscamId: 'CP-2.01',
    category: 'CP',
    title: 'Incident Handling & Disaster Recovery Capabilities',
    objective: 'Incident response and contingency recovery plans are documented, tested annually, and operational.',
    auditProcedure: 'Review incident response playbooks, disaster recovery exercise results, and backup restoration test logs.',
    nistControls: ['IR-4', 'IR-4(1)', 'RA-3']
  },
  {
    fiscamId: 'SD-1.01',
    category: 'SD',
    title: 'Separation of Dev, Test, and Production Environments',
    objective: 'Development and testing environments are strictly separated from production systems to prevent unapproved code deployment.',
    auditProcedure: 'Inspect developer access controls on production servers, automated CI/CD pipeline approval gates, and network separation rules.',
    nistControls: ['CM-2', 'AC-6', 'AC-3']
  }
];

const SAMPLE_CONTROLS = [
  {
    id: 'AC-1',
    familyId: 'AC',
    name: 'Policy and Procedures',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Develop, document, and disseminate to organizational personnel an access control policy that addresses purpose, scope, roles, responsibilities, management commitment, and compliance; and procedures to facilitate policy implementation.',
    guidance: 'Access control policy and procedures address the controls in the AC family. Policy and procedures reflect applicable federal laws, Executive Orders, directives, regulations, and standards.',
    mitreAttack: ['T1078 - Valid Accounts', 'T1068 - Exploitation for Privilege Escalation'],
    csf2: 'GV.PO-01, PR.AA-01',
    nist171: '3.1.1',
    fiscam: 'AC-1.01',
    fismaMetrics: 'CIO Metric 1.1',
    priority: 'P1',
    enhancements: []
  },
  {
    id: 'AC-2',
    familyId: 'AC',
    name: 'Account Management',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts in accordance with organizational procedures and guidelines.',
    guidance: 'Account management includes the identification of account types (e.g., individual, shared, system, guest), assignment of account managers, and establishing conditions for group and role membership.',
    mitreAttack: ['T1078 - Valid Accounts', 'T1098 - Account Manipulation', 'T1136 - Create Account'],
    csf2: 'PR.AA-01, PR.AA-02',
    nist171: '3.1.1, 3.1.2',
    fiscam: 'AC-2.01, AC-2.02',
    fismaMetrics: 'CIO Metric 1.2',
    priority: 'P1',
    enhancements: [
      { id: 'AC-2(1)', name: 'Automated System Account Management', baselines: ['Moderate', 'High'], statement: 'Employ automated mechanisms to support the management of system accounts across the lifecycle.' },
      { id: 'AC-2(2)', name: 'Removal of Temporary or Emergency Accounts', baselines: ['Low', 'Moderate', 'High'], statement: 'Automatically disable or remove temporary and emergency accounts after [Assignment: organization-defined time period].' },
      { id: 'AC-2(3)', name: 'Disable Inactive Accounts', baselines: ['Low', 'Moderate', 'High'], statement: 'Disable accounts that have been inactive for [Assignment: organization-defined time period of inactivity].' },
      { id: 'AC-2(4)', name: 'Automated Audit Actions', baselines: ['Moderate', 'High'], statement: 'Automatically audit account creation, modification, enabling, disabling, and removal actions.' },
      { id: 'AC-2(12)', name: 'Account Monitoring for Atypical Usage', baselines: ['High'], statement: 'Monitor system accounts for atypical usage and report suspicious account behavior to security operations staff.' }
    ]
  },
  {
    id: 'AC-3',
    familyId: 'AC',
    name: 'Access Enforcement',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.',
    guidance: 'Access control policies (e.g., identity-based policies, role-based policies, rule-based policies, attribute-based policies) control access between active entities (subjects) and passive entities (objects).',
    mitreAttack: ['T1548 - Abuse Elevation Control Mechanism', 'T1068 - Exploitation for Privilege Escalation'],
    csf2: 'PR.AA-05',
    nist171: '3.1.1, 3.1.2',
    fiscam: 'AC-3.01',
    fismaMetrics: 'CIO Metric 1.3',
    priority: 'P1',
    enhancements: [
      { id: 'AC-3(7)', name: 'Role-Based Access Control (RBAC)', baselines: ['Low', 'Moderate', 'High'], statement: 'Enforce role-based access control (RBAC) across system resources and administrative interfaces.' },
      { id: 'AC-3(15)', name: 'Discretionary Access Control', baselines: ['Moderate', 'High'], statement: 'Enforce discretionary access control for target object access authorization.' }
    ]
  },
  {
    id: 'AC-6',
    familyId: 'AC',
    name: 'Least Privilege',
    baselines: ['Moderate', 'High'],
    statement: 'Employ the principle of least privilege, allowing only authorized accesses for users (or processes acting on behalf of users) which are necessary to accomplish assigned organizational tasks.',
    guidance: 'Organizations employ least privilege for specific duties and information systems. Privilege levels apply to security functions, administrative functions, and operational commands.',
    mitreAttack: ['T1078.004 - Maintained Privilege Escalation', 'T1548 - Abuse Elevation Control'],
    csf2: 'PR.AA-05',
    nist171: '3.1.5, 3.1.6',
    fiscam: 'AC-3.02',
    fismaMetrics: 'CIO Metric 1.4',
    priority: 'P1',
    enhancements: [
      { id: 'AC-6(1)', name: 'Authorize Access to Security Functions', baselines: ['Moderate', 'High'], statement: 'Authorize explicit access to security functions and security-relevant information.' },
      { id: 'AC-6(2)', name: 'Non-Privileged Access for Non-Security Functions', baselines: ['Moderate', 'High'], statement: 'Require that users of system accounts with privileged access use non-privileged accounts when performing non-security functions.' },
      { id: 'AC-6(5)', name: 'Privileged Accounts Restrictions', baselines: ['High'], statement: 'Restrict access to privileged accounts to authorized personnel.' },
      { id: 'AC-6(9)', name: 'Log Privileged Commands', baselines: ['Moderate', 'High'], statement: 'Log the execution of privileged commands and administrative operations.' }
    ]
  },
  {
    id: 'AC-17',
    familyId: 'AC',
    name: 'Remote Access',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Establish and document usage restrictions, configuration/connection requirements, and implementation guidance for remote access, and authorize remote access to the system prior to connection.',
    guidance: 'Remote access is access executed across an external network (e.g., the Internet). Cryptographic mechanisms and strong multi-factor authentication are mandatory.',
    mitreAttack: ['T1133 - External Remote Services', 'T1021 - Remote Services'],
    csf2: 'PR.AA-06',
    nist171: '3.1.12, 3.1.13, 3.1.14',
    fiscam: 'AC-4.01',
    fismaMetrics: 'CIO Metric 2.1',
    priority: 'P1',
    enhancements: [
      { id: 'AC-17(1)', name: 'Automated Monitoring and Control', baselines: ['Moderate', 'High'], statement: 'Employ automated mechanisms to monitor and control remote access sessions.' },
      { id: 'AC-17(2)', name: 'Protection of Confidentiality / Integrity', baselines: ['Moderate', 'High'], statement: 'Protect the confidentiality and integrity of remote access sessions using encryption.' },
      { id: 'AC-17(3)', name: 'Managed Access Control Points', baselines: ['Low', 'Moderate', 'High'], statement: 'Route all remote access connections through managed access control points.' }
    ]
  },
  {
    id: 'AU-2',
    familyId: 'AU',
    name: 'Event Logging',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Identify the types of events that the system has the capability to log, and select the events to log based on risk assessments and compliance mandates.',
    guidance: 'Event logging includes capturing successful and unsuccessful system logon attempts, privilege changes, file accesses, security policy modifications, and administrative operations.',
    mitreAttack: ['T1562.002 - Disable Windows Event Logging', 'T1070 - Indicator Removal'],
    csf2: 'DE.CM-01, DE.CM-03',
    nist171: '3.3.1, 3.3.2',
    fiscam: 'AS-2.01',
    fismaMetrics: 'IG Metric 3.1',
    priority: 'P1',
    enhancements: [
      { id: 'AU-2(3)', name: 'Reviews and Updates', baselines: ['Moderate', 'High'], statement: 'Review and update the events logged based on changes in threat environment and risk.' }
    ]
  },
  {
    id: 'AU-6',
    familyId: 'AU',
    name: 'Audit Record Review, Analysis, and Reporting',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Review and analyze system audit records for indications of unusual activity, suspected security incidents, or policy violations, and report findings to designated personnel.',
    guidance: 'Automated mechanisms (e.g., SIEM, SOAR, log analyzers) should be used to integrate audit record review, analysis, and reporting processes across security operations.',
    mitreAttack: ['T1070 - Indicator Removal', 'T1562 - Impair Defenses'],
    csf2: 'DE.AE-02, DE.AE-04',
    nist171: '3.3.5',
    fiscam: 'AS-2.02',
    fismaMetrics: 'IG Metric 3.2',
    priority: 'P1',
    enhancements: [
      { id: 'AU-6(1)', name: 'Automated Process Integration', baselines: ['Low', 'Moderate', 'High'], statement: 'Integrate audit record review, analysis, and reporting with automated SIEM and SOAR mechanisms.' },
      { id: 'AU-6(3)', name: 'Correlate Audit Repositories', baselines: ['Moderate', 'High'], statement: 'Analyze and correlate audit records across different repositories and system components.' }
    ]
  },
  {
    id: 'CM-2',
    familyId: 'CM',
    name: 'Baseline Configuration',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Develop, document, and maintain under configuration control, a current baseline configuration of the system and inventory of constituent components.',
    guidance: 'Baseline configurations serve as documented standards for hardware, software, firmware, and network topology, reflecting current operational security postures.',
    mitreAttack: ['T1082 - System Information Discovery', 'T1574 - Hijack Execution Flow'],
    csf2: 'PR.PS-01',
    nist171: '3.4.1, 3.4.2',
    fiscam: 'CM-1.01',
    fismaMetrics: 'CIO Metric 4.1',
    priority: 'P1',
    enhancements: [
      { id: 'CM-2(1)', name: 'Reviews and Updates', baselines: ['Low', 'Moderate', 'High'], statement: 'Review and update the baseline configuration of the system at least annually or when significant changes occur.' },
      { id: 'CM-2(3)', name: 'Automated Retention / Enforcement', baselines: ['Moderate', 'High'], statement: 'Employ automated tools to maintain baseline configuration integrity and prevent unauthorized drift.' }
    ]
  },
  {
    id: 'CM-8',
    familyId: 'CM',
    name: 'System Component Inventory',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Develop and document an inventory of system components that accurately reflects the system, including hardware, software, licenses, and ownership details.',
    guidance: 'Automated scanning and continuous monitoring tools ensure real-time inventory tracking across cloud, on-premises, and hybrid infrastructures.',
    mitreAttack: ['T1082 - System Information Discovery'],
    csf2: 'ID.AM-01, ID.AM-02',
    nist171: '3.4.1',
    fiscam: 'CM-1.02',
    fismaMetrics: 'CIO Metric 4.2',
    priority: 'P1',
    enhancements: [
      { id: 'CM-8(1)', name: 'Updates During Installation / Removal', baselines: ['Low', 'Moderate', 'High'], statement: 'Update the inventory of system components as part of component installation and removal.' },
      { id: 'CM-8(3)', name: 'Automated Inventory Tracking', baselines: ['Moderate', 'High'], statement: 'Employ automated mechanisms to detect and maintain an inventory of system components.' }
    ]
  },
  {
    id: 'IA-2',
    familyId: 'IA',
    name: 'Identification and Authentication (Organizational Users)',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Uniquely identify and authenticate organizational users (or processes acting on behalf of organizational users) using MFA for network and local access to privileged and non-privileged accounts.',
    guidance: 'Multifactor authentication (MFA) requires two or more distinct factors: something you know, something you have, and something you are. Phishing-resistant MFA (e.g., FIDO2/WebAuthn) is mandatory for federal systems.',
    mitreAttack: ['T1110 - Brute Force', 'T1556 - Modify Authentication Process', 'T1539 - Steal Web Session Cookie'],
    csf2: 'PR.AA-03',
    nist171: '3.5.1, 3.5.2, 3.5.3',
    fiscam: 'AC-2.03',
    fismaMetrics: 'CIO Metric 5.1 (Zero Trust MFA)',
    priority: 'P1',
    enhancements: [
      { id: 'IA-2(1)', name: 'Network Access to Privileged Accounts', baselines: ['Low', 'Moderate', 'High'], statement: 'Implement MFA for network access to privileged accounts.' },
      { id: 'IA-2(2)', name: 'Network Access to Non-Privileged Accounts', baselines: ['Low', 'Moderate', 'High'], statement: 'Implement MFA for network access to non-privileged accounts.' },
      { id: 'IA-2(3)', name: 'Local Access to Privileged Accounts', baselines: ['Moderate', 'High'], statement: 'Implement MFA for local access to privileged accounts.' },
      { id: 'IA-2(8)', name: 'Access to Accounts - Replay Resistant', baselines: ['Low', 'Moderate', 'High'], statement: 'Implement replay-resistant authentication mechanisms for network access.' },
      { id: 'IA-2(11)', name: 'Remote Access - Separate Device / Out-of-Band', baselines: ['Moderate', 'High'], statement: 'Require hardware tokens or out-of-band authenticators for MFA.' }
    ]
  },
  {
    id: 'IR-4',
    familyId: 'IR',
    name: 'Incident Handling',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Implement an incident handling capability for security incidents that includes preparation, detection and analysis, containment, eradication, and recovery.',
    guidance: 'Incident response capabilities align with NIST SP 800-61. Playbooks and automated orchestration enable rapid containment of ransomware and advanced threats.',
    mitreAttack: ['T1486 - Data Encrypted for Impact', 'T1485 - Data Destruction'],
    csf2: 'RS.MA-01, RS.MA-02, RS.AN-01',
    nist171: '3.6.1, 3.6.2',
    fiscam: 'CP-2.01',
    fismaMetrics: 'IG Metric 6.1',
    priority: 'P1',
    enhancements: [
      { id: 'IR-4(1)', name: 'Automated Incident Handling Mechanisms', baselines: ['Moderate', 'High'], statement: 'Employ automated mechanisms to support the incident handling process.' },
      { id: 'IR-4(8)', name: 'Correlation with External Events', baselines: ['High'], statement: 'Correlate threat logs and incident reports with external threat sources.' }
    ]
  },
  {
    id: 'RA-3',
    familyId: 'RA',
    name: 'Risk Assessment',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Assess risk, including the likelihood and magnitude of harm, from the operation and use of system and processing of personal data.',
    guidance: 'Risk assessments incorporate threat intelligence, vulnerability data, asset criticality, and impact analysis in accordance with NIST SP 800-30.',
    mitreAttack: ['T1595 - Active Scanning', 'T1592 - Gather Victim Host Information'],
    csf2: 'ID.RA-01, ID.RA-02',
    nist171: '3.11.1',
    fiscam: 'RA-3.01',
    fismaMetrics: 'CIO Metric 7.1',
    priority: 'P1',
    enhancements: [
      { id: 'RA-3(1)', name: 'Supply Chain Risk Assessment', baselines: ['Moderate', 'High'], statement: 'Assess supply chain risk associated with system components and third-party vendors.' }
    ]
  },
  {
    id: 'SC-7',
    familyId: 'SC',
    name: 'Boundary Protection',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Monitor and control communications at external boundaries of the system and at key internal boundaries within the system.',
    guidance: 'Boundary protection involves managed interfaces, firewalls, web application firewalls (WAF), proxy servers, network segmentation, and zero-trust microsegmentation.',
    mitreAttack: ['T1190 - Exploit Public-Facing Application', 'T1090 - Proxy', 'T1572 - Protocol Tunneling'],
    csf2: 'PR.IR-01',
    nist171: '3.13.1, 3.13.2',
    fiscam: 'AC-4.02',
    fismaMetrics: 'CIO Metric 8.1',
    priority: 'P1',
    enhancements: [
      { id: 'SC-7(3)', name: 'Access Points', baselines: ['Low', 'Moderate', 'High'], statement: 'Limit external network connections to managed interface points.' },
      { id: 'SC-7(4)', name: 'External Telecommunications Services', baselines: ['Moderate', 'High'], statement: 'Implement security controls at external boundary connections.' },
      { id: 'SC-7(5)', name: 'Deny by Default / Allow by Exception', baselines: ['Low', 'Moderate', 'High'], statement: 'Deny network communications traffic by default and allow network communications traffic by exception.' },
      { id: 'SC-7(7)', name: 'Prevent Split Tunneling', baselines: ['Moderate', 'High'], statement: 'Prevent split tunneling for remote virtual private network (VPN) connections.' }
    ]
  },
  {
    id: 'SC-13',
    familyId: 'SC',
    name: 'Cryptographic Protection',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Determine cryptographic standards and implement cryptographic modules compliant with applicable federal laws, Executive Orders, and FIPS 140 standards.',
    guidance: 'Cryptographic protection safeguards confidentiality and integrity for data in transit and at rest using approved cryptographic algorithms.',
    mitreAttack: ['T1557 - Man-in-the-Middle', 'T1040 - Network Sniffing'],
    csf2: 'PR.DS-01, PR.DS-02',
    nist171: '3.13.11',
    fiscam: 'AC-4.03',
    fismaMetrics: 'CIO Metric 8.2',
    priority: 'P1',
    enhancements: [
      { id: 'SC-13(1)', name: 'FIPS-Validated Cryptography', baselines: ['Low', 'Moderate', 'High'], statement: 'Employ FIPS-validated or NSA-approved cryptographic modules.' }
    ]
  },
  {
    id: 'SI-2',
    familyId: 'SI',
    name: 'Flaw Remediation',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Identify, report, and correct system flaws; test software patches for effectiveness before installation; and install security-relevant software updates within mandated timeframes.',
    guidance: 'Flaw remediation integrates automated patch management, vulnerability management platforms, and emergency out-of-band security updates.',
    mitreAttack: ['T1190 - Exploit Public-Facing Application', 'T1068 - Exploitation for Privilege Escalation'],
    csf2: 'ID.RA-01, PR.PS-02',
    nist171: '3.14.1',
    fiscam: 'CM-3.01',
    fismaMetrics: 'CIO Metric 9.1',
    priority: 'P1',
    enhancements: [
      { id: 'SI-2(1)', name: 'Central Management and Automated Flaw Remediation', baselines: ['Moderate', 'High'], statement: 'Employ automated mechanisms to centrally manage flaw remediation and patching.' },
      { id: 'SI-2(2)', name: 'Automated Flaw Remediation Status', baselines: ['Moderate', 'High'], statement: 'Determine flaw remediation status using automated tools.' }
    ]
  },
  {
    id: 'SI-4',
    familyId: 'SI',
    name: 'System Monitoring',
    baselines: ['Low', 'Moderate', 'High'],
    statement: 'Monitor the system to detect attacks, indicators of compromise, unauthorized local/remote connections, and illegal software execution.',
    guidance: 'System monitoring includes EDR/XDR agents, intrusion detection systems (IDS/IPS), flow analysis, threat hunting, and automated anomaly alert triggers.',
    mitreAttack: ['T1059 - Command and Scripting Interpreter', 'T1055 - Process Injection'],
    csf2: 'DE.CM-01, DE.CM-07',
    nist171: '3.14.6, 3.14.7',
    fiscam: 'AS-2.03',
    fismaMetrics: 'CIO Metric 9.2',
    priority: 'P1',
    enhancements: [
      { id: 'SI-4(2)', name: 'Automated Tool Integration', baselines: ['Moderate', 'High'], statement: 'Deploy automated monitoring tools (e.g., EDR/XDR, NIDS) across key system nodes.' },
      { id: 'SI-4(4)', name: 'Inbound and Outbound Communications Traffic', baselines: ['Moderate', 'High'], statement: 'Monitor inbound and outbound communications traffic for anomalous behavior.' },
      { id: 'SI-4(5)', name: 'System-Generated Alerts', baselines: ['Moderate', 'High'], statement: 'Configure system to generate automated alerts to security operations staff.' }
    ]
  }
];

const CSF2_FUNCTIONS = [
  { id: 'GV', name: 'GOVERN', color: 'bg-purple-600', text: 'text-purple-600', desc: 'Establish and monitor organizational cybersecurity risk management strategy, expectations, and policy.' },
  { id: 'ID', name: 'IDENTIFY', color: 'bg-blue-600', text: 'text-blue-600', desc: 'Understand organizational cybersecurity risks to systems, people, assets, data, and capabilities.' },
  { id: 'PR', name: 'PROTECT', color: 'bg-green-600', text: 'text-green-600', desc: 'Use safeguards to manage the organization’s cybersecurity risks and secure critical assets.' },
  { id: 'DE', name: 'DETECT', color: 'bg-yellow-500', text: 'text-yellow-600', desc: 'Find and analyze possible cybersecurity attacks and anomalies promptly.' },
  { id: 'RS', name: 'RESPOND', color: 'bg-red-600', text: 'text-red-600', desc: 'Take action regarding a detected cybersecurity incident to contain and mitigate impact.' },
  { id: 'RC', name: 'RECOVER', color: 'bg-indigo-600', text: 'text-indigo-600', desc: 'Restore assets and operations impacted by a cybersecurity incident.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('infographic');
  const [searchTerm, setSearchTerm] = useState('');
  const [fiscamSearchTerm, setFiscamSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('ALL');
  const [selectedBaseline, setSelectedBaseline] = useState('ALL');
  const [selectedFramework, setSelectedFramework] = useState('ALL');
  const [selectedCsfFunction, setSelectedCsfFunction] = useState('ALL');
  const [selectedFiscamCategory, setSelectedFiscamCategory] = useState('ALL');
  const [onlyEnhancements, setOnlyEnhancements] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(['AC-2', 'IA-2', 'SI-4']);
  const [complianceState, setComplianceState] = useState({
    'AC-1': 'Compliant',
    'AC-2': 'In Progress',
    'AC-3': 'Compliant',
    'AC-6': 'In Progress',
    'AC-17': 'In Progress',
    'AU-2': 'Compliant',
    'AU-6': 'In Progress',
    'CM-2': 'Compliant',
    'CM-8': 'Compliant',
    'IA-2': 'In Progress',
    'IR-4': 'Not Started',
    'RA-3': 'Compliant',
    'SC-7': 'In Progress',
    'SC-13': 'Compliant',
    'SI-2': 'In Progress',
    'SI-4': 'Not Started'
  });
  const [viewMode, setViewMode] = useState('cards');
  const [copiedId, setCopiedId] = useState(null);

  const filteredControls = useMemo(() => {
    return SAMPLE_CONTROLS.filter(control => {
      const query = searchTerm.toLowerCase();

      const matchesBase = 
        searchTerm === '' ||
        (control.id && control.id.toLowerCase().includes(query)) ||
        (control.name && control.name.toLowerCase().includes(query)) ||
        (control.statement && control.statement.toLowerCase().includes(query)) ||
        (control.guidance && control.guidance.toLowerCase().includes(query)) ||
        (control.mitreAttack && control.mitreAttack.some(m => m.toLowerCase().includes(query))) ||
        (control.csf2 && control.csf2.toLowerCase().includes(query)) ||
        (control.nist171 && control.nist171.toLowerCase().includes(query)) ||
        (control.fiscam && control.fiscam.toLowerCase().includes(query));

      const matchesEnhancements = control.enhancements && control.enhancements.some(enh => 
        (enh.id && enh.id.toLowerCase().includes(query)) ||
        (enh.name && enh.name.toLowerCase().includes(query)) ||
        (enh.statement && enh.statement.toLowerCase().includes(query))
      );

      const matchesSearch = matchesBase || matchesEnhancements;
      const matchesFamily = selectedFamily === 'ALL' || control.familyId === selectedFamily;
      const matchesBaseline = selectedBaseline === 'ALL' || (control.baselines && control.baselines.includes(selectedBaseline));
      const matchesFramework = selectedFramework === 'ALL' || 
        (selectedFramework === 'MITRE' && control.mitreAttack && control.mitreAttack.length > 0) ||
        (selectedFramework === 'CSF' && Boolean(control.csf2)) ||
        (selectedFramework === 'CUI' && Boolean(control.nist171)) ||
        (selectedFramework === 'FISCAM' && Boolean(control.fiscam));

      const matchesEnhancementOnly = !onlyEnhancements || (control.enhancements && control.enhancements.length > 0);

      return matchesSearch && matchesFamily && matchesBaseline && matchesFramework && matchesEnhancementOnly;
    });
  }, [searchTerm, selectedFamily, selectedBaseline, selectedFramework, onlyEnhancements]);

  const filteredFiscamMappings = useMemo(() => {
    return FISCAM_MAPPINGS.filter(item => {
      const query = fiscamSearchTerm.toLowerCase();
      const matchesSearch = 
        fiscamSearchTerm === '' ||
        (item.fiscamId && item.fiscamId.toLowerCase().includes(query)) ||
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.objective && item.objective.toLowerCase().includes(query)) ||
        (item.auditProcedure && item.auditProcedure.toLowerCase().includes(query)) ||
        (item.nistControls && item.nistControls.some(ctrl => ctrl.toLowerCase().includes(query)));

      const matchesCategory = selectedFiscamCategory === 'ALL' || item.category === selectedFiscamCategory;

      return matchesSearch && matchesCategory;
    });
  }, [fiscamSearchTerm, selectedFiscamCategory]);

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (controlId, newStatus) => {
    setComplianceState(prev => ({
      ...prev,
      [controlId]: newStatus
    }));
  };

  const copyToClipboard = (text, id) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Clipboard copy failed: ', err);
    }
  };

  const openControlById = (ctrlId) => {
    if (!ctrlId) return;
    const baseId = ctrlId.split('(')[0];
    const found = SAMPLE_CONTROLS.find(c => c.id === baseId);
    if (found) {
      setSelectedControl(found);
    }
  };

  const totalTracked = SAMPLE_CONTROLS.length;
  const compliantCount = Object.values(complianceState).filter(s => s === 'Compliant').length;
  const inProgressCount = Object.values(complianceState).filter(s => s === 'In Progress').length;
  const notStartedCount = Object.values(complianceState).filter(s => s === 'Not Started').length;
  const compliancePercentage = totalTracked > 0 ? Math.round((compliantCount / totalTracked) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-100 font-sans flex flex-col">
      <header className="bg-[#030814] border-b border-blue-900/50 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 p-2 rounded-xl shadow-lg shadow-blue-950">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
                  NIST SP 800-53 <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700/80">Rev. 5</span>
                </span>
                <p className="text-xs text-blue-300/70">Controls, Enhancements & Audit Framework Navigator</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-1">
              {[
                { id: 'infographic', label: 'Infographics & Analytics', icon: BarChart2 },
                { id: 'search', label: 'Control Search', icon: Search },
                { id: 'fiscam_matrix', label: 'FISCAM Audit Mapping', icon: FileCheck },
                { id: 'csf_matrix', label: 'CSF 2.0 Mapping', icon: Layers },
                { id: 'gap_assessment', label: 'Compliance Tracker', icon: FileCheck }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500/60' 
                        : 'text-slate-300 hover:text-white hover:bg-blue-950/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_CONTROLS, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "NIST_800_53_Rev5_Export.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="p-2 text-blue-300/80 hover:text-white hover:bg-blue-900/60 rounded-lg transition border border-transparent hover:border-blue-800/60" 
                title="Export Controls JSON"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden flex overflow-x-auto border-t border-blue-900/50 px-2 py-1.5 space-x-1 scrollbar-none bg-[#030814]">
          {[
            { id: 'infographic', label: 'Infographics', icon: BarChart2 },
            { id: 'search', label: 'Search', icon: Search },
            { id: 'fiscam_matrix', label: 'FISCAM', icon: FileCheck },
            { id: 'csf_matrix', label: 'CSF 2.0', icon: Layers },
            { id: 'gap_assessment', label: 'Tracker', icon: FileCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-blue-950'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {}
        {activeTab === 'infographic' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#060D1B] via-[#0D1B2A] to-[#1B263B] border border-blue-900/60 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block shadow-sm">
                  Navy Visual Architecture Dashboard
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  NIST SP 800-53 Rev. 5 Control Architecture & Family Taxonomy
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Explore all 20 Security and Privacy Control Families, Control Enhancements, and Federal Audit mappings. Click any family card below to filter controls in the Control Search tab.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <Shield className="w-96 h-96 text-blue-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg hover:border-blue-700/60 transition">
                <span className="text-xs font-medium text-blue-300/80">Total Catalog Base Controls</span>
                <span className="text-2xl font-extrabold text-white block mt-1">1,007</span>
                <span className="text-[11px] text-blue-400">Across 20 Control Families</span>
              </div>
              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg hover:border-amber-700/60 transition">
                <span className="text-xs font-medium text-slate-400">Control Enhancements</span>
                <span className="text-2xl font-extrabold text-amber-400 block mt-1">1,500+</span>
                <span className="text-[11px] text-amber-300/80">Tailored Capability Statements</span>
              </div>
              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg hover:border-emerald-700/60 transition">
                <span className="text-xs font-medium text-slate-400">GAO FISCAM Mappings</span>
                <span className="text-2xl font-extrabold text-emerald-400 block mt-1">Full 2024 Rev</span>
                <span className="text-[11px] text-emerald-300">Financial Audit Controls</span>
              </div>
              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-xl p-4 shadow-lg hover:border-red-700/60 transition">
                <span className="text-xs font-medium text-slate-400">MITRE ATT&CK Mitigations</span>
                <span className="text-2xl font-extrabold text-red-400 block mt-1">240+</span>
                <span className="text-[11px] text-red-300">Enterprise Technique Mappings</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Grid className="w-5 h-5 text-blue-400" />
                <span>Control Families Taxonomy Matrix (20 Families)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {FAMILIES.map((fam) => {
                  return (
                    <div
                      key={fam.id}
                      onClick={() => {
                        setSelectedFamily(fam.id);
                        setActiveTab('search');
                      }}
                      className="bg-[#0D1B2A]/90 hover:bg-[#132238] border border-blue-900/60 hover:border-blue-500/80 rounded-xl p-4 transition-all duration-200 cursor-pointer group hover:scale-[1.02] shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${fam.color} text-white`}>
                            {fam.id}
                          </span>
                          <span className="text-xs text-blue-300/70 group-hover:text-white font-mono">
                            {fam.count} controls
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-200 text-xs sm:text-sm group-hover:text-blue-300 line-clamp-2 leading-tight">
                          {fam.name}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-blue-900/50 flex items-center justify-between text-[11px] text-blue-300/70 group-hover:text-slate-200">
                        <span>Filter controls</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-amber-400" />
                    <span>Control Baseline Distribution</span>
                  </h3>
                  <span className="text-xs text-blue-300/70">NIST SP 800-53B</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Low Impact Baseline', count: '148 Controls', pct: 45, color: 'bg-emerald-500', desc: 'Basic protection against loss of confidentiality, integrity, availability' },
                    { label: 'Moderate Impact Baseline', count: '262 Controls', pct: 78, color: 'bg-amber-500', desc: 'Protects against serious adverse effect on operations or assets' },
                    { label: 'High Impact Baseline', count: '315 Controls', pct: 95, color: 'bg-red-500', desc: 'Protects against severe or catastrophic organizational impact' },
                    { label: 'Privacy Controls Overlay', count: '86 Controls', pct: 30, color: 'bg-purple-500', desc: 'PT Family & Fair Information Practice Principles (FIPPs)' }
                  ].map((b) => (
                    <div key={b.label} className="bg-[#050A15]/80 rounded-xl p-3 border border-blue-900/50">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-200">{b.label}</span>
                        <span className="font-mono text-blue-300/80">{b.count}</span>
                      </div>
                      <div className="w-full bg-blue-950 h-2.5 rounded-full overflow-hidden mb-1 border border-blue-900/50">
                        <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                      </div>
                      <p className="text-[11px] text-slate-400">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <span>Cross-Framework Interoperability</span>
                  </h3>
                  <span className="text-xs text-blue-300/70">FedRAMP, FISMA & GAO</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: 'GAO FISCAM 2024', subtitle: 'Federal Info System Controls Audit', mapped: 'Interactive Map', icon: FileCheck, color: 'border-emerald-500/40 bg-emerald-950/30', tab: 'fiscam_matrix' },
                    { title: 'NIST CSF 2.0', subtitle: '6 Functions / 106 Subcategories', mapped: '100% Mapped', icon: Layers, color: 'border-purple-500/40 bg-purple-950/30', tab: 'csf_matrix' },
                    { title: 'MITRE ATT&CK v16', subtitle: 'Enterprise Tactics & Techniques', mapped: '240+ Mapped', icon: Shield, color: 'border-red-500/40 bg-red-950/30', tab: 'search' },
                    { title: 'NIST SP 800-171 r3', subtitle: 'CUI Protection Non-Federal Systems', mapped: '110 Requirements', icon: Lock, color: 'border-sky-500/40 bg-sky-950/30', tab: 'search' }
                  ].map((fw) => {
                    const Icon = fw.icon;
                    return (
                      <div 
                        key={fw.title} 
                        onClick={() => setActiveTab(fw.tab)}
                        className={`border rounded-xl p-3.5 ${fw.color} flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition shadow-md`}
                      >
                        <div>
                          <Icon className="w-5 h-5 text-slate-300 mb-2" />
                          <h4 className="font-bold text-white text-xs">{fw.title}</h4>
                          <p className="text-[11px] text-slate-300/80 mt-0.5">{fw.subtitle}</p>
                        </div>
                        <div className="mt-3 text-[11px] font-semibold text-blue-200 bg-[#050A15]/90 px-2 py-1 rounded w-fit border border-blue-900/60 flex items-center gap-1">
                          <span>{fw.mapped}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search Control ID, Enhancement (e.g., AC-2(1)), keywords, MITRE technique, or CSF subcategory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-[#050A15] border border-blue-900/80 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-medium text-blue-300/80 mb-1">Control Family</label>
                  <select
                    value={selectedFamily}
                    onChange={(e) => setSelectedFamily(e.target.value)}
                    className="w-full bg-[#050A15] border border-blue-900/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Families ({FAMILIES.length})</option>
                    {FAMILIES.map(fam => (
                      <option key={fam.id} value={fam.id}>
                        [{fam.id}] {fam.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-300/80 mb-1">Impact Baseline</label>
                  <select
                    value={selectedBaseline}
                    onChange={(e) => setSelectedBaseline(e.target.value)}
                    className="w-full bg-[#050A15] border border-blue-900/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Baselines</option>
                    <option value="Low">Low Impact</option>
                    <option value="Moderate">Moderate Impact</option>
                    <option value="High">High Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-300/80 mb-1">Framework Alignment</label>
                  <select
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value)}
                    className="w-full bg-[#050A15] border border-blue-900/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Alignments</option>
                    <option value="MITRE">MITRE ATT&CK Mapped</option>
                    <option value="CSF">NIST CSF 2.0 Mapped</option>
                    <option value="CUI">NIST SP 800-171 CUI</option>
                    <option value="FISCAM">FISCAM Audit Mapped</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-300/80 mb-1">Control Enhancements</label>
                  <button
                    onClick={() => setOnlyEnhancements(!onlyEnhancements)}
                    className={`w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-sm font-medium transition border ${
                      onlyEnhancements 
                        ? 'bg-amber-950/80 border-amber-600 text-amber-300' 
                        : 'bg-[#050A15] border-blue-900/80 text-blue-300/70 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{onlyEnhancements ? 'Has Enhancements' : 'All Controls'}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-300/80 mb-1">View Mode</label>
                  <div className="flex bg-[#050A15] border border-blue-900/80 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-1 text-xs rounded-md transition ${
                        viewMode === 'cards' ? 'bg-blue-600 text-white font-medium shadow' : 'text-blue-300/70 hover:text-white'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-1 text-xs rounded-md transition ${
                        viewMode === 'table' ? 'bg-blue-600 text-white font-medium shadow' : 'text-blue-300/70 hover:text-white'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Table</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-blue-900/50 text-xs">
                <span className="text-blue-300/80 font-medium">Active Filters:</span>
                {selectedFamily !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 bg-blue-950 text-blue-300 border border-blue-700/80 px-2.5 py-0.5 rounded-full">
                    Family: {selectedFamily}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFamily('ALL')} />
                  </span>
                )}
                {selectedBaseline !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-300 border border-amber-700/80 px-2.5 py-0.5 rounded-full">
                    Baseline: {selectedBaseline}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBaseline('ALL')} />
                  </span>
                )}
                {selectedFramework !== 'ALL' && (
                  <span className="inline-flex items-center gap-1 bg-purple-950 text-purple-300 border border-purple-700/80 px-2.5 py-0.5 rounded-full">
                    Framework: {selectedFramework}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFramework('ALL')} />
                  </span>
                )}
                {onlyEnhancements && (
                  <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-300 border border-amber-700/80 px-2.5 py-0.5 rounded-full">
                    Has Control Enhancements
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyEnhancements(false)} />
                  </span>
                )}
                {(selectedFamily !== 'ALL' || selectedBaseline !== 'ALL' || selectedFramework !== 'ALL' || onlyEnhancements || searchTerm !== '') && (
                  <button
                    onClick={() => {
                      setSelectedFamily('ALL');
                      setSelectedBaseline('ALL');
                      setSelectedFramework('ALL');
                      setOnlyEnhancements(false);
                      setSearchTerm('');
                    }}
                    className="text-blue-400 hover:text-blue-300 underline ml-auto"
                  >
                    Reset all filters
                  </button>
                )}
                <div className="ml-auto text-blue-300/70">
                  Showing <strong className="text-white">{filteredControls.length}</strong> of {SAMPLE_CONTROLS.length} catalog controls
                </div>
              </div>
            </div>

            {}
            {filteredControls.length === 0 ? (
              <div className="bg-[#0D1B2A]/60 border border-blue-900/60 rounded-2xl p-12 text-center">
                <AlertCircle className="w-12 h-12 text-blue-400/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">No NIST 800-53 controls matched your criteria</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
                  Try broadening your search query or removing family/enhancement filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedFamily('ALL');
                    setSelectedBaseline('ALL');
                    setSelectedFramework('ALL');
                    setOnlyEnhancements(false);
                    setSearchTerm('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredControls.map((control) => {
                  const familyInfo = FAMILIES.find(f => f.id === control.familyId);
                  const isBookmarked = bookmarkedIds.includes(control.id);
                  const status = complianceState[control.id] || 'Not Started';
                  const enhancementsCount = control.enhancements ? control.enhancements.length : 0;

                  return (
                    <div
                      key={control.id}
                      onClick={() => setSelectedControl(control)}
                      className="bg-[#0D1B2A]/90 border border-blue-900/60 hover:border-blue-500/80 rounded-xl p-5 hover:bg-[#132238] transition cursor-pointer flex flex-col justify-between group relative shadow-lg hover:shadow-blue-950/50"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-blue-400 group-hover:text-blue-300 transition">
                              {control.id}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${familyInfo?.bgLight} ${familyInfo?.text} ${familyInfo?.border}`}>
                              {familyInfo?.name}
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleBookmark(control.id, e)}
                            className="text-slate-500 hover:text-amber-400 transition"
                            title={isBookmarked ? "Remove Bookmark" : "Bookmark Control"}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        </div>

                        <h3 className="font-semibold text-slate-100 text-base mb-2 group-hover:text-white line-clamp-1">
                          {control.name}
                        </h3>

                        <p className="text-slate-300 text-xs line-clamp-3 mb-4 leading-relaxed">
                          {control.statement}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-blue-900/50">
                        {enhancementsCount > 0 && (
                          <div className="flex items-center space-x-1.5 text-xs text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2.5 py-1 rounded-md">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="font-medium">{enhancementsCount} Control Enhancements</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-300/70">Baseline:</span>
                          <div className="flex space-x-1">
                            {['Low', 'Moderate', 'High'].map(b => (
                              <span
                                key={b}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                  control.baselines && control.baselines.includes(b)
                                    ? b === 'High' ? 'bg-red-950 text-red-300 border border-red-800/80'
                                      : b === 'Moderate' ? 'bg-amber-950 text-amber-300 border border-amber-800/80'
                                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                                    : 'bg-[#050A15] text-slate-600 line-through'
                                }`}
                              >
                                {b[0]}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 text-[11px]">
                          {control.fiscam && (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                              <FileCheck className="w-3 h-3" />
                              FISCAM: {control.fiscam}
                            </span>
                          )}
                          {control.csf2 && (
                            <span className="bg-purple-950 text-purple-300 border border-purple-800/80 px-2 py-0.5 rounded">
                              CSF 2.0
                            </span>
                          )}
                          {control.nist171 && (
                            <span className="bg-sky-950 text-sky-300 border border-sky-800/80 px-2 py-0.5 rounded">
                              CUI 800-171
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-blue-300/70">Status:</span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            status === 'Compliant' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                            status === 'In Progress' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                            'bg-[#050A15] text-slate-400 border border-blue-900/60'
                          }`}>
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-[#050A15] text-blue-300/80 text-xs uppercase tracking-wider border-b border-blue-900/80">
                      <tr>
                        <th className="py-3 px-4">Control ID</th>
                        <th className="py-3 px-4">Family</th>
                        <th className="py-3 px-4">Control Name</th>
                        <th className="py-3 px-4">Enhancements</th>
                        <th className="py-3 px-4">FISCAM Audit</th>
                        <th className="py-3 px-4">Baselines</th>
                        <th className="py-3 px-4">CSF 2.0</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-900/50">
                      {filteredControls.map((control) => {
                        const familyInfo = FAMILIES.find(f => f.id === control.familyId);
                        const status = complianceState[control.id] || 'Not Started';
                        const enhCount = control.enhancements ? control.enhancements.length : 0;

                        return (
                          <tr 
                            key={control.id}
                            onClick={() => setSelectedControl(control)}
                            className="hover:bg-[#132238] transition cursor-pointer"
                          >
                            <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">
                              {control.id}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`text-xs px-2 py-0.5 rounded border ${familyInfo?.bgLight} ${familyInfo?.text} ${familyInfo?.border}`}>
                                {control.familyId}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium text-white max-w-xs truncate">
                              {control.name}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {enhCount > 0 ? (
                                <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono font-semibold">
                                  {enhCount} Enh
                                </span>
                              ) : (
                                <span className="text-xs text-slate-500">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs font-mono text-emerald-300">
                              {control.fiscam || '-'}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="flex space-x-1">
                                {control.baselines && control.baselines.map(b => (
                                  <span key={b} className="text-[10px] px-1.5 py-0.5 rounded bg-[#050A15] text-slate-300 font-semibold border border-blue-900/50">
                                    {b}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs font-mono text-purple-300">
                              {control.csf2 || '-'}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                status === 'Compliant' ? 'bg-emerald-950 text-emerald-300' :
                                status === 'In Progress' ? 'bg-amber-950 text-amber-300' :
                                'bg-[#050A15] text-slate-400'
                              }`}>
                                {status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedControl(control);
                                }}
                                className="text-blue-400 hover:text-blue-300 font-medium text-xs flex items-center space-x-1 ml-auto"
                              >
                                <span>Details</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'fiscam_matrix' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#060D1B] via-[#0D1B2A] to-emerald-950 border border-emerald-900/60 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-600/20 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/30">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    GAO FISCAM 2024 Revision to NIST SP 800-53 Rev. 5 Audit Mapping
                  </h2>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                    The Federal Information System Controls Audit Manual (FISCAM) provides guidance to auditors evaluating general and business process application controls in federal financial audits. Select a control area below to view associated NIST 800-53 controls and illustrative audit procedures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search FISCAM Control Index (e.g., AC-2.01, CM-3.01), Title, Audit Procedure, or NIST Control ID..."
                  value={fiscamSearchTerm}
                  onChange={(e) => setFiscamSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-[#050A15] border border-blue-900/80 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                {fiscamSearchTerm && (
                  <button onClick={() => setFiscamSearchTerm('')} className="absolute right-3 top-3.5 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <button
                  onClick={() => setSelectedFiscamCategory('ALL')}
                  className={`p-3 rounded-xl border text-left transition text-xs font-semibold ${
                    selectedFiscamCategory === 'ALL'
                      ? 'bg-emerald-600 text-white border-transparent shadow-lg'
                      : 'bg-[#050A15] border-blue-900/80 hover:border-emerald-500/60 text-slate-300'
                  }`}
                >
                  <span>All FISCAM Categories</span>
                  <span className="block text-[10px] opacity-75 font-mono mt-1">{FISCAM_MAPPINGS.length} Mappings</span>
                </button>

                {FISCAM_CATEGORIES.map(cat => {
                  const count = FISCAM_MAPPINGS.filter(m => m.category === cat.id).length;
                  const isSelected = selectedFiscamCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedFiscamCategory(isSelected ? 'ALL' : cat.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected
                          ? `${cat.color} text-white border-transparent shadow-lg scale-105`
                          : 'bg-[#050A15] border-blue-900/80 hover:border-emerald-500/60 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold block">{cat.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">{count} Mappings</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFiscamMappings.length === 0 ? (
                <div className="bg-[#0D1B2A]/60 border border-blue-900/60 rounded-2xl p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-blue-400/60 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white">No FISCAM audit mappings matched your search</h3>
                  <button
                    onClick={() => {
                      setFiscamSearchTerm('');
                      setSelectedFiscamCategory('ALL');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition"
                  >
                    Reset FISCAM Filters
                  </button>
                </div>
              ) : (
                filteredFiscamMappings.map((item) => {
                  const catInfo = FISCAM_CATEGORIES.find(c => c.id === item.category);

                  return (
                    <div 
                      key={item.fiscamId}
                      className="bg-[#0D1B2A]/90 border border-blue-900/60 hover:border-emerald-500/60 rounded-2xl p-5 shadow-2xl transition space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/50 pb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-extrabold text-sm px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/80 shadow-inner">
                            FISCAM: {item.fiscamId}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#050A15] text-slate-300 border border-blue-900/60">
                            {catInfo?.name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <span className="text-xs text-blue-300/70 font-medium mr-1">Mapped NIST Controls:</span>
                          {item.nistControls && item.nistControls.map(ctrlId => (
                            <button
                              key={ctrlId}
                              onClick={() => openControlById(ctrlId)}
                              className="text-xs font-mono font-bold bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-700/80 px-2.5 py-1 rounded-md transition flex items-center gap-1 shadow-sm"
                              title="Click to view full control details"
                            >
                              <span>{ctrlId}</span>
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-3">
                          <strong className="text-slate-200">Control Objective: </strong>
                          {item.objective}
                        </p>

                        <div className="bg-[#050A15]/90 border border-blue-900/60 rounded-xl p-3.5 space-y-1">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Illustrative Audit Procedure (Test of Design / Test of Effectiveness)</span>
                          </span>
                          <p className="text-slate-300 text-xs leading-relaxed">
                            {item.auditProcedure}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {}
        {activeTab === 'csf_matrix' && (
          <div className="space-y-6">
            <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Layers className="w-6 h-6 text-purple-400" />
                <span>NIST CSF 2.0 to SP 800-53 Rev. 5 Mapping Matrix</span>
              </h2>
              <p className="text-slate-300 text-sm">
                NIST Cybersecurity Framework 2.0 structures cybersecurity activities around six Core Functions: <strong>GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, and RECOVER</strong>. Select a core function to explore mapped 800-53 controls.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CSF2_FUNCTIONS.map((fn) => {
                const isSelected = selectedCsfFunction === fn.id;
                return (
                  <button
                    key={fn.id}
                    onClick={() => setSelectedCsfFunction(isSelected ? 'ALL' : fn.id)}
                    className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected 
                        ? `${fn.color} text-white border-transparent shadow-lg scale-105`
                        : 'bg-[#0D1B2A]/80 border-blue-900/60 hover:border-blue-500/60 text-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold opacity-80">{fn.id}</span>
                      <h3 className="font-extrabold text-sm sm:text-base mt-1">{fn.name}</h3>
                    </div>
                    <span className="text-[11px] mt-3 opacity-90 block">
                      {isSelected ? 'Active Filter' : 'Click to View'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
                <span>Mapped NIST 800-53 Rev. 5 Controls</span>
                <span className="text-xs font-normal text-blue-300/70">
                  Showing controls with CSF mappings
                </span>
              </h3>

              <div className="space-y-3">
                {SAMPLE_CONTROLS.filter(c => selectedCsfFunction === 'ALL' || (c.csf2 && c.csf2.includes(selectedCsfFunction))).map((control) => (
                  <div
                    key={control.id}
                    onClick={() => setSelectedControl(control)}
                    className="p-4 bg-[#050A15]/90 border border-blue-900/60 hover:border-blue-500 rounded-xl transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="font-bold text-blue-400 font-mono text-sm bg-blue-950 px-2.5 py-1 rounded border border-blue-800/80">
                        {control.id}
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{control.name}</h4>
                        <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{control.statement}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-xs font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2.5 py-1 rounded-md">
                        CSF: {control.csf2}
                      </span>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'gap_assessment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-5 shadow-2xl">
                <span className="text-xs font-medium text-blue-300/80">Compliance Readiness</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-3xl font-extrabold text-white">{compliancePercentage}%</span>
                  <span className="text-xs text-emerald-400 font-semibold">{compliantCount} / {totalTracked} Met</span>
                </div>
                <div className="w-full bg-[#050A15] h-2 rounded-full overflow-hidden mt-3 border border-blue-900/50">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${compliancePercentage}%` }} />
                </div>
              </div>

              <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-5 shadow-2xl">
                <span className="text-xs font-medium text-slate-400">Compliant Controls</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-extrabold text-emerald-400">{compliantCount}</span>
                  <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Fully implemented & tested</p>
              </div>

              <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-5 shadow-2xl">
                <span className="text-xs font-medium text-slate-400">In Progress</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-extrabold text-amber-400">{inProgressCount}</span>
                  <Activity className="w-8 h-8 text-amber-500/40" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Remediation / Implementation under way</p>
              </div>

              <div className="bg-[#0D1B2A]/90 border border-blue-900/60 rounded-2xl p-5 shadow-2xl">
                <span className="text-xs font-medium text-slate-400">Not Started / Unaddressed</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-extrabold text-slate-400">{notStartedCount}</span>
                  <AlertCircle className="w-8 h-8 text-slate-500/40" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Gap identified requiring plan of action</p>
              </div>
            </div>

            <div className="bg-[#0D1B2A]/80 border border-blue-900/60 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">System Security Plan (SSP) Control Tracker</h3>
                  <p className="text-xs text-blue-300/70 mt-0.5">Update implementation statuses for audit preparedness</p>
                </div>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["Control ID,Name,Status,Baseline,FISCAM Ref,Enhancements Count"].concat(
                        SAMPLE_CONTROLS.map(c => `${c.id},"${c.name}",${complianceState[c.id] || 'Not Started'},"${(c.baselines || []).join(';')}",${c.fiscam || ''},${c.enhancements ? c.enhancements.length : 0}`)
                      ).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "NIST_800_53_Compliance_Report.csv");
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 w-fit shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Compliance CSV</span>
                </button>
              </div>

              <div className="space-y-3">
                {SAMPLE_CONTROLS.map((control) => {
                  const status = complianceState[control.id] || 'Not Started';
                  return (
                    <div
                      key={control.id}
                      className="p-4 bg-[#050A15]/90 border border-blue-900/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="font-bold text-blue-400 font-mono text-sm bg-blue-950 px-2.5 py-1 rounded border border-blue-800/80 mt-0.5">
                          {control.id}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-white text-sm">{control.name}</h4>
                            {control.enhancements && control.enhancements.length > 0 && (
                              <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/80 px-1.5 py-0.2 rounded font-mono">
                                +{control.enhancements.length} Enhancements
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{control.statement}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {['Not Started', 'In Progress', 'Compliant'].map((st) => {
                          const isActive = status === st;
                          return (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(control.id, st)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                isActive
                                  ? st === 'Compliant' ? 'bg-emerald-600 text-white shadow-md' :
                                    st === 'In Progress' ? 'bg-amber-600 text-white shadow-md' :
                                    'bg-blue-900 text-white shadow-md'
                                  : 'bg-[#0D1B2A] text-slate-400 hover:text-white border border-blue-900/60'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {}
      {selectedControl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0A1325] border border-blue-900/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            <div className="p-6 border-b border-blue-900/60 sticky top-0 bg-[#060D1B]/95 backdrop-blur z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl font-black text-blue-400 font-mono">{selectedControl.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                    {FAMILIES.find(f => f.id === selectedControl.familyId)?.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#050A15] text-slate-300 font-semibold border border-blue-900/60">
                    Priority {selectedControl.priority}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedControl.name}</h2>
              </div>

              <button
                onClick={() => setSelectedControl(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-blue-900/60 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm text-slate-200 leading-relaxed">
              <div className="bg-[#030814]/90 border border-blue-900/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Control Statement</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(selectedControl.statement, 'statement')}
                    className="text-xs text-blue-300/80 hover:text-white flex items-center gap-1"
                  >
                    {copiedId === 'statement' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'statement' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-slate-200">{selectedControl.statement}</p>
              </div>

              {selectedControl.enhancements && selectedControl.enhancements.length > 0 && (
                <div className="bg-[#030814]/90 border border-blue-900/80 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Control Enhancements ({selectedControl.enhancements.length})</span>
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const allEnhText = selectedControl.enhancements.map(e => `${e.id} ${e.name}\n${e.statement}`).join('\n\n');
                          copyToClipboard(allEnhText, 'all_enhancements');
                        }}
                        className="text-xs text-blue-300/80 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#0D1B2A] hover:bg-blue-900/60 border border-blue-900/80 transition"
                        title="Copy all control enhancements for this control"
                      >
                        {copiedId === 'all_enhancements' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === 'all_enhancements' ? 'Copied All' : 'Copy All'}</span>
                      </button>
                      <span className="text-[11px] text-blue-300/70 hidden sm:inline">NIST SP 800-53 Rev. 5</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedControl.enhancements.map((enh) => (
                      <div key={enh.id} className="bg-[#0D1B2A] border border-blue-900/80 rounded-lg p-3 hover:border-amber-500/50 transition">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-xs text-amber-300 bg-amber-950 border border-amber-800/80 px-2 py-0.5 rounded">
                              {enh.id}
                            </span>
                            <span className="font-semibold text-white text-xs">{enh.name}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(`${enh.id} ${enh.name}: ${enh.statement}`, enh.id)}
                              className="text-[11px] text-blue-300/80 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-[#050A15] hover:bg-blue-950 border border-blue-900/80 transition"
                              title="Copy this enhancement"
                            >
                              {copiedId === enh.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === enh.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <div className="flex space-x-1">
                              {['Low', 'Moderate', 'High'].map(b => (
                                <span key={b} className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                                  (enh.baselines || []).includes(b)
                                    ? 'bg-amber-950 text-amber-200 border border-amber-700/60'
                                    : 'bg-[#050A15] text-slate-600 line-through'
                                }`}>
                                  {b[0]}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-300 text-xs mt-1 leading-relaxed">{enh.statement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-blue-300/80 mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Supplemental Guidance</span>
                </h3>
                <p className="text-slate-300 bg-[#030814]/80 p-4 rounded-xl border border-blue-900/60">
                  {selectedControl.guidance}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-blue-300/80 mb-2">
                  Security Control Baselines
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {['Low', 'Moderate', 'High'].map(b => {
                    const isIncluded = selectedControl.baselines && selectedControl.baselines.includes(b);
                    return (
                      <div
                        key={b}
                        className={`p-3 rounded-xl border ${
                          isIncluded
                            ? 'bg-blue-950/80 border-blue-500/80 text-blue-200 font-bold'
                            : 'bg-[#050A15]/60 border-blue-900/40 text-slate-600 line-through'
                        }`}
                      >
                        <span className="block text-xs">{b} Impact</span>
                        <span className="text-[11px] font-normal">{isIncluded ? 'Required' : 'Not Required'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#030814]/90 border border-blue-900/80 rounded-xl p-4">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Cross-Framework Mappings</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0D1B2A] p-3 rounded-lg border border-blue-900/60">
                    <span className="text-blue-300/70 block font-semibold">GAO FISCAM Audit Activity:</span>
                    <span className="text-emerald-300 font-mono text-sm mt-0.5 block">{selectedControl.fiscam || 'N/A'}</span>
                  </div>

                  <div className="bg-[#0D1B2A] p-3 rounded-lg border border-blue-900/60">
                    <span className="text-blue-300/70 block font-semibold">NIST CSF 2.0 Subcategory:</span>
                    <span className="text-purple-300 font-mono text-sm mt-0.5 block">{selectedControl.csf2 || 'N/A'}</span>
                  </div>

                  <div className="bg-[#0D1B2A] p-3 rounded-lg border border-blue-900/60">
                    <span className="text-blue-300/70 block font-semibold">NIST SP 800-171 CUI Requirement:</span>
                    <span className="text-sky-300 font-mono text-sm mt-0.5 block">{selectedControl.nist171 || 'N/A'}</span>
                  </div>

                  <div className="bg-[#0D1B2A] p-3 rounded-lg border border-blue-900/60">
                    <span className="text-blue-300/70 block font-semibold">FISMA Metric Alignment:</span>
                    <span className="text-amber-300 font-mono text-sm mt-0.5 block">{selectedControl.fismaMetrics || 'N/A'}</span>
                  </div>
                </div>

                {selectedControl.mitreAttack && selectedControl.mitreAttack.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-blue-900/60">
                    <span className="text-xs text-blue-300/70 font-semibold block mb-2">Mapped MITRE ATT&CK Mitigations:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedControl.mitreAttack.map(tech => (
                        <span key={tech} className="bg-red-950 text-red-300 border border-red-800/80 px-2.5 py-1 rounded-md text-xs flex items-center gap-1 font-mono">
                          <Shield className="w-3 h-3 text-red-400" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-blue-900/60 bg-[#030814]/90 flex items-center justify-between">
              <button
                onClick={(e) => toggleBookmark(selectedControl.id, e)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-900/80 bg-[#0D1B2A] hover:bg-blue-950 text-slate-200 transition"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(selectedControl.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{bookmarkedIds.includes(selectedControl.id) ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                onClick={() => setSelectedControl(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-md"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      <footer className="bg-[#030814] border-t border-blue-900/50 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-blue-300/60 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>NIST SP 800-53 Rev. 5 Explorer • Security & Privacy Controls, Control Enhancements & FISCAM Audit Mappings</p>
          <div className="flex space-x-4">
            <span className="text-blue-300/80">GAO FISCAM 2024</span>
            <span className="text-blue-300/80">NIST CSF 2.0</span>
            <span className="text-blue-300/80">MITRE ATT&CK v16</span>
          </div>
        </div>
      </footer>
    </div>
  );
}