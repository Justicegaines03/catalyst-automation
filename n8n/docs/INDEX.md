# n8n Workflow Documentation Index

This directory contains comprehensive documentation for all Catalyst-Automation n8n workflows.

## 📚 Documentation Files

### Catalyst-Automation Leads Workflow

**Primary Documentation**:
- **[Setup Guide](./catalyst-automation-leads-setup-guide.md)** - Complete configuration instructions, credentials setup, troubleshooting
- **[Workflow Summary](./catalyst-automation-leads-workflow-summary.md)** - Architecture overview, node descriptions, quick reference

**Quick Links**:
- Workflow File: `../workflows/catalyst-automation-leads-workflow.json`
- Workflow ID: `sHsuLUFzwe1d5ji2`
- Status: ✅ Configured (15 nodes)

---

## 🎯 Documentation by Topic

### Getting Started
1. Read [n8n/README.md](../README.md) for project overview
2. Review [Setup Guide](./catalyst-automation-leads-setup-guide.md) for configuration steps
3. Check [Workflow Summary](./catalyst-automation-leads-workflow-summary.md) for architecture details

### Configuration & Deployment
- **Setup Guide** - Complete configuration checklist
  - Gmail OAuth2 setup
  - Google Sheets API configuration
  - Slack webhook integration
  - SMTP email credentials
  - Service area ZIP codes
  - Branding customization

### Architecture & Design
- **Workflow Summary** - Technical architecture
  - Node-by-node breakdown
  - Data flow diagrams
  - Scoring matrix reference
  - Action protocol specifications

### Operations & Maintenance
- **Setup Guide** - Sections 6-7
  - Testing procedures
  - KPI monitoring
  - Optimization strategies
  - Troubleshooting guide

---

## 📖 Workflow Concepts

### Lead Management System
The Catalyst-Automation Leads workflow implements a sophisticated lead qualification system based on the BANT framework:

**B** - Budget: Financial capacity indicators
**A** - Authority: Decision-maker identification
**N** - Need: Specific service requirements
**T** - Timeline: Urgency and timeframe

### Workflow Phases

**Phase 1: Email Gateway**
- Precision filtering using Gmail search operators
- HVAC-specific keyword capture
- Spam and noise exclusion

**Phase 2: Lead Classification**
- Automatic Residential vs Commercial detection
- Domain analysis
- Keyword pattern recognition

**Phase 3: Scoring & Qualification**
- 7-criteria scoring matrix (0-115 points)
- Dynamic threshold-based qualification
- Transparent score breakdown

**Phase 4: Multi-Tier Routing**
- **Hot Leads** (>60): Immediate sales engagement
- **Warm Leads** (31-60): Nurture and education
- **Cold Leads** (≤30): Referral or long-term nurture

**Phase 5: Action Execution**
- CRM record creation
- Team notifications (Slack)
- Automated customer emails
- KPI data logging

---

## 🔧 Configuration Reference

### Required Credentials

| Service | Type | Used In | Purpose |
|---------|------|---------|---------|
| Gmail | OAuth2 | Trigger Node | Email monitoring |
| Google Sheets | Service Account | 5 nodes | CRM & KPI tracking |
| Slack | Webhook | 1 node | Hot lead notifications |
| SMTP | Username/Password | 4 nodes | Automated emails |

### Required Configuration Data

| Item | Location | Description |
|------|----------|-------------|
| Service Area ZIPs | Scoring Engine Node | ZIP code validation |
| Company Name | Email Nodes (4) | Branding |
| Phone Number | Email Nodes (4) | Contact info |
| Calendly Link | Email Nodes (3) | Self-service booking |
| Partner Info | Referral Email Node | Out-of-area referrals |
| Slack Webhook | Notification Node | Team alerts |

---

## 📊 Key Metrics & KPIs

### Tracked Automatically

**Response Metrics**:
- Lead received timestamp
- Lead processed timestamp
- Time-to-first-response

**Qualification Metrics**:
- Lead score distribution
- Qualification tier breakdown
- Hot/Warm/Cold ratios
- Residential vs Commercial split

**Conversion Metrics** (manual tracking required):
- Lead-to-booking conversion rate
- Cost per booked job
- Nurture campaign re-engagement
- Channel performance analysis

### Dashboard Setup
See [Setup Guide - KPI Dashboard Recommendations](./catalyst-automation-leads-setup-guide.md#kpi-dashboard-recommendations)

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Read Setup Guide completely
- [ ] Prepare all required credentials
- [ ] Create Google Sheets workbook
- [ ] Set up Slack channel
- [ ] Configure Calendly
- [ ] Gather branding information

### Configuration
- [ ] Configure Gmail OAuth2 in n8n
- [ ] Set up Google Sheets API service account
- [ ] Add Slack webhook URL
- [ ] Configure SMTP credentials
- [ ] Update service area ZIP codes
- [ ] Replace all placeholder text

### Testing
- [ ] Test Hot Lead path (score > 60)
- [ ] Test Warm Lead path (score 31-60)
- [ ] Test Cold Lead referral path
- [ ] Test Cold Lead nurture path
- [ ] Verify Slack notifications
- [ ] Verify email delivery
- [ ] Check CRM data logging

### Activation
- [ ] Activate workflow in n8n UI
- [ ] Monitor first executions
- [ ] Verify KPI tracking
- [ ] Document any issues

---

## 🛠️ Maintenance & Optimization

### Weekly Tasks
- Review workflow execution logs
- Monitor lead qualification accuracy
- Check email deliverability
- Analyze response times

### Monthly Tasks
- Review KPI dashboard
- Analyze conversion rates
- Update keyword lists
- Optimize scoring thresholds

### Quarterly Tasks
- Major workflow optimizations
- A/B test email templates
- Analyze channel performance
- Update documentation

---

## 🆘 Common Issues & Solutions

### Gmail Trigger Not Firing
**Symptom**: Workflow doesn't execute for new emails
**Solution**:
1. Verify Gmail OAuth2 credentials
2. Check filter query syntax
3. Ensure workflow is activated
4. Review execution logs for errors

### Emails Not Sending
**Symptom**: No automated responses sent
**Solution**:
1. Verify SMTP credentials
2. Check email template syntax
3. Review sender domain reputation
4. Test with alternate SMTP provider

### Slack Notifications Missing
**Symptom**: No notifications in #hot-leads
**Solution**:
1. Verify webhook URL
2. Check Slack channel permissions
3. Review notification node configuration
4. Test webhook manually

### Incorrect Lead Scores
**Symptom**: Leads scored unexpectedly
**Solution**:
1. Review scoring matrix logic
2. Check for keyword typos
3. Verify service area ZIP codes
4. Adjust point allocations

See [Setup Guide - Troubleshooting](./catalyst-automation-leads-setup-guide.md#troubleshooting) for detailed solutions.

---

## 📱 Additional Resources

### External Documentation
- [n8n Official Docs](https://docs.n8n.io/)
- [Gmail Search Operators](https://support.google.com/mail/answer/7190)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

### Internal Resources
- Project README: `../README.md`
- Workflow Index: `../workflows/index.js`
- Management Scripts: `../scripts/`

### Related Projects
- Catalyst-Automation Marketing Workflow (pending)
- Next.js Web App Integration (in development)

---

## 📝 Contributing

### Updating Documentation
When updating workflows:
1. Update workflow JSON in `../workflows/`
2. Update corresponding documentation here
3. Update version numbers
4. Note changes in commit message

### Documentation Standards
- Use clear, concise language
- Include code examples where helpful
- Keep configuration tables up-to-date
- Add screenshots for complex UI steps (future)
- Cross-reference related documents

---

**Last Updated**: October 18, 2025
**Documentation Version**: 1.0.0
**Maintained By**: Catalyst-Automation Team
