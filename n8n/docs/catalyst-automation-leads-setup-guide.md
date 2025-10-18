# Catalyst-Automation Leads Workflow - Setup & Configuration Guide

## Overview
This automated HVAC lead management workflow implements a comprehensive qualification and routing system based on the BANT framework (Budget, Authority, Need, Timeline), adapted specifically for the HVAC industry.

## Workflow Architecture

### Phase 1: Lead Capture (Gmail Trigger)
- **Node**: Gmail Trigger - HVAC Lead Capture
- **Purpose**: Monitors dedicated email inbox with precision filtering
- **Filter Logic**: Captures HVAC-related keywords while excluding spam

**Configuration Required**:
1. Set up dedicated email address (e.g., leads@hvacvendor.com)
2. Configure Gmail OAuth2 credentials in n8n
3. Customize filter query if needed

### Phase 2: Lead Classification (Parser & Classifier)
- **Node**: Lead Parser & Classifier
- **Purpose**: Extracts contact data and classifies as Residential vs Commercial
- **Classification Criteria**:
  - Email domain analysis (corporate vs consumer)
  - Keyword detection (business vs home terms)
  - Job title identification

### Phase 3: Lead Scoring (HVAC BANT Scoring Engine)
- **Node**: HVAC BANT Scoring Engine
- **Purpose**: Assigns qualification score based on multiple criteria

**Scoring Matrix** (Max 115 points):
| Category | Max Points | Description |
|----------|-----------|-------------|
| Urgency | 30 | High-urgency keywords (emergency, broken, ASAP) |
| Service Specificity | 20 | Specific service request vs general inquiry |
| Authority | 15 | Decision-maker identification (commercial) |
| Budget | 20 | Explicit budget mention or financing inquiry |
| Contact Info | 10 | Completeness of phone/address |
| Pain Points | 15 | System age, high bills, frequent repairs |
| Lead Type Bonus | 15 | Commercial lead bonus |
| **Negative Factors** | -50 | Out of service area or non-HVAC service |

**Qualification Thresholds**:
- **Hot Lead (SQL)**: Score > 60
- **Warm Lead (MQL)**: Score 31-60
- **Cold Lead**: Score ≤ 30

### Phase 4: Lead Routing (Router + Action Protocols)

#### Hot Lead Protocol (Score > 60)
**Actions** (executed in parallel):
1. **CRM Integration**: Immediate record creation in Google Sheets/CRM
2. **Sales Notification**: Instant Slack alert to #hot-leads channel
3. **Customer Email**: Personalized response with:
   - Acknowledgment of specific request
   - Clear timeline (5-10 minute callback)
   - Self-service scheduling link (Calendly)

**Configuration Required**:
- Google Sheets API credentials
- Slack webhook URL
- SMTP email credentials
- Calendly link

#### Warm Lead Protocol (Score 31-60)
**Actions**:
1. **CRM Tagging**: Record tagged for 2-4 week nurture
2. **Educational Email**: Resources and soft CTA

**Configuration Required**:
- Google Sheets API credentials
- SMTP email credentials
- Website resource URLs

#### Cold Lead Protocol (Score ≤ 30)
**Two Paths**:

**Path A: Referral** (Out of area / Non-HVAC service)
- Sends referral email to partner company
- Logs as market intelligence

**Path B: Long-Term Nurture** (Low engagement)
- Tagged for 6-12 month educational campaign
- Enrolled in drip sequence

**Configuration Required**:
- Partner company contact information
- Long-term nurture email templates

### Phase 5: KPI Tracking
- **Node**: Track KPIs - All Leads
- **Purpose**: Logs all lead metrics for analysis

**Tracked Metrics**:
- Lead received timestamp
- Response timestamp (for response time calculation)
- Lead type (Residential/Commercial)
- Lead score and qualification tier
- Urgency level
- Contact information completeness

## Configuration Checklist

### 1. Email Setup
- [ ] Create dedicated leads email address
- [ ] Set up Gmail OAuth2 credentials in n8n
- [ ] Customize Gmail filter query for your keywords
- [ ] Configure dedicated sending domain for deliverability

### 2. Service Area Configuration
Edit the **HVAC BANT Scoring Engine** node:
```javascript
// Line in scoring function:
const serviceAreaZips = ['90001', '90002', '90003', '90004', '90005'];
// Replace with your actual service area ZIP codes
```

### 3. CRM/Google Sheets Setup
- [ ] Create Google Sheets workbook with two sheets:
  - **Leads** (for CRM records)
  - **KPI_Tracking** (for metrics)
- [ ] Set up Google Sheets API service account
- [ ] Share sheets with service account email
- [ ] Add Sheet ID to all Google Sheets nodes

**Sheet Headers**:

**Leads Sheet**:
```
| Timestamp | Email | Name | Phone | ZIP | Lead Type | Score | Tier | Subject | Body |
```

**KPI_Tracking Sheet**:
```
| Received At | Email | Lead Type | Score | Tier | Processed At | Urgency | Phone | ZIP |
```

### 4. Slack Notifications
- [ ] Create #hot-leads channel
- [ ] Set up Slack incoming webhook
- [ ] Replace webhook URL in **Notify Sales Team - Slack** node
- [ ] Customize message template

### 5. Email Templates
Configure SMTP credentials for all email nodes:
- [ ] Hot Lead Response
- [ ] Warm Lead Nurture
- [ ] Cold Lead Referral
- [ ] Cold Lead Long-Term Nurture

**Customization Points**:
- Company name
- Phone number
- Calendly scheduling link
- Website resource URLs
- Partner company information (for referrals)

### 6. Calendly Integration
- [ ] Set up Calendly account
- [ ] Create scheduling page for HVAC consultations
- [ ] Replace Calendly URL in all email templates

### 7. Testing
- [ ] Send test emails to trigger workflow
- [ ] Test Hot Lead path (score > 60)
- [ ] Test Warm Lead path (score 31-60)
- [ ] Test Cold Lead referral path
- [ ] Test Cold Lead nurture path
- [ ] Verify Slack notifications
- [ ] Verify email delivery
- [ ] Check CRM/Sheets data logging

## Key Customization Variables

### Replace in ALL Email Nodes:
```
leads@hvacvendor.com → Your actual email
(555) 123-4567 → Your actual phone
Your HVAC Company → Your company name
https://calendly.com/your-hvac-specialist → Your Calendly link
https://yourwebsite.com/ → Your website URL
```

### Replace in Slack Node:
```
https://hooks.slack.com/services/YOUR_WEBHOOK_URL → Your Slack webhook
https://your-crm.com/lead/ → Your actual CRM URL
```

### Replace in Scoring Engine:
```javascript
const serviceAreaZips = ['90001', '90002', ...]; // Your service area
```

### Replace in Referral Email:
```
Partner Company Name → Your partner company
(555) 987-6543 → Partner phone
info@partner-company.com → Partner email
https://partner-company.com → Partner website
```

## KPI Dashboard Recommendations

Create a Google Sheets dashboard with these formulas:

**Average Response Time**:
```
=AVERAGE(F:F - A:A)  // Processed At - Received At
```

**Qualification Rate**:
```
=COUNTIF(E:E, "SQL") / COUNTA(E:E) * 100  // % of Hot Leads
```

**Lead Type Distribution**:
```
=COUNTIF(C:C, "Commercial") / COUNTA(C:C) * 100
```

**Average Score by Type**:
```
=AVERAGEIF(C:C, "Commercial", D:D)  // Commercial avg score
=AVERAGEIF(C:C, "Residential", D:D)  // Residential avg score
```

## Workflow Activation

1. Complete all configuration steps above
2. Test workflow thoroughly with sample emails
3. In n8n UI, activate the workflow
4. Monitor execution logs for first few real leads
5. Refine scoring thresholds based on actual performance data

## Quarterly Optimization Process

Every 3 months, review:
1. **Keyword Efficacy**: Are there new terms customers use?
2. **Scoring Thresholds**: Adjust based on conversion data
3. **Email Performance**: A/B test subject lines and CTAs
4. **Channel Performance**: Which sources generate best leads?

## Troubleshooting

**Gmail Trigger Not Firing**:
- Check OAuth2 credentials
- Verify filter query syntax
- Ensure polling is enabled

**Emails Not Sending**:
- Verify SMTP credentials
- Check email templates for syntax errors
- Review sender domain reputation

**Slack Notifications Failing**:
- Confirm webhook URL is correct
- Check message payload format
- Verify channel permissions

**Scores Seem Incorrect**:
- Review scoring function logic
- Check for keyword typos
- Adjust point allocations

## Support & Maintenance

- **Workflow Version**: 1.0
- **Last Updated**: 2025-10-18
- **n8n Version Compatibility**: 0.200.0+
- **Required n8n Nodes**: Gmail Trigger, Function, Switch, Google Sheets, HTTP Request, Email Send

## Next Steps

After setup:
1. Create follow-up nurture sequences
2. Integrate with full CRM (e.g., ServiceTitan, HubSpot)
3. Add SMS notifications for hot leads
4. Implement round-robin sales assignment
5. Create automated follow-up reminders
6. Build reporting dashboard with data visualization