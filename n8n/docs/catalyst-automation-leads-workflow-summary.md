# Catalyst-Automation Leads Workflow - Implementation Summary

## ✅ Workflow Successfully Created!

**Workflow ID**: `sHsuLUFzwe1d5ji2`
**Name**: Catalyst-Automation Leads
**Status**: Inactive (ready for configuration and activation)
**Total Nodes**: 20 (15 functional + 5 sticky note sections)
**Implementation Date**: October 18, 2025
**Last Updated**: October 18, 2025 (Added color-coded sections)

---

## 🏗️ Workflow Architecture Overview (Color-Coded)

```
┌────────────────────────────────────────────────────────────────────────┐
│  🟡 YELLOW - ENTRY & PROCESSING (Section 1)                            │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐    │
│  │  Gmail   │ →   │  Parser  │ →   │  Scoring │ →   │  Router  │    │
│  │ Trigger  │     │Classifier│     │  Engine  │     │(by Score)│    │
│  └──────────┘     └──────────┘     └──────────┘     └────┬─────┘    │
└────────────────────────────────────────────────────────────│──────────┘
                                                             │
                    ┌────────────────────────────────────────┼────────────────┐
                    │                                        │                │
       ┌────────────▼───────────┐          ┌────────────────▼──────┐  ┌─────▼────────┐
       │  🔴 RED - HOT LEAD     │          │  🟠 ORANGE - WARM     │  │  🔵 BLUE -   │
       │  PATH (Section 2)      │          │  LEAD PATH (Section 3)│  │  COLD LEAD   │
       │  Score > 60            │          │  Score 31-60          │  │  PATH (Sec 4)│
       │  ┌──────────────┐      │          │  ┌──────────────┐    │  │  Score ≤ 30  │
       │  │  CRM Entry   │      │          │  │  CRM Entry   │    │  │  ┌─────────┐ │
       │  ├──────────────┤      │          │  ├──────────────┤    │  │  │ Analyze │ │
       │  │Slack Alert   │      │          │  │Nurture Email │    │  │  │ Reason  │ │
       │  ├──────────────┤      │          │  └──────────────┘    │  │  └────┬────┘ │
       │  │Hot Response  │      │          │                      │  │       │      │
       │  │Email         │      │          │                      │  │  ┌────▼────┐ │
       │  └──────────────┘      │          │                      │  │  │ Router  │ │
       └────────────────────────┘          └──────────────────────┘  │  └─┬────┬──┘ │
                                                                      │    │    │    │
                                                                      │ ┌──▼──┐ │    │
    ┌────────────────────────────────────────────────────────────────┼─│Refrl│ │    │
    │  🟢 GREEN - ANALYTICS & KPI TRACKING (Section 5)               │ │Email│ │    │
    │  ┌──────────────────────────────────────────────────┐          │ └─────┘ │    │
    │  │  Track KPIs - All Leads                          │          │    ┌────▼──┐ │
    │  │  Logs: Response time, score, type, tier, contact │          │    │ CRM + │ │
    │  └──────────────────────────────────────────────────┘          │    │Nurture│ │
    └─────────────────────────────────────────────────────────────────    └───────┘ │
                                                                      └──────────────┘

LEGEND:
🟡 YELLOW  = Entry & Processing (n8n color code: 1)
🔴 RED     = Hot Lead Path (n8n color code: 2)
🟠 ORANGE  = Warm Lead Path (n8n color code: 3)
🔵 BLUE    = Cold Lead Path (n8n color code: 4)
🟢 GREEN   = Analytics & KPI Tracking (n8n color code: 5)
```

### Visual Organization Benefits

✅ **Immediate Priority Recognition** - Red (urgent) → Orange (medium) → Blue (low)
✅ **Logical Flow** - Yellow entry → Color-coded routing → Green monitoring
✅ **Easy Navigation** - Quick visual scanning of workflow structure
✅ **Professional Presentation** - Clean, organized, client-ready appearance

---

## 📊 Node Breakdown

### Entry & Processing Nodes

**Node 1: Gmail Trigger - HVAC Lead Capture**
- Monitors dedicated email inbox every minute
- Precision filter excludes spam and non-leads
- Captures HVAC keywords: quote, repair, install, emergency, etc.

**Node 2: Lead Parser & Classifier**
- Extracts: email, phone, ZIP code, subject, body
- Classifies: Residential vs Commercial
- Uses: domain analysis, keyword detection, job title recognition

**Node 3: HVAC BANT Scoring Engine**
- Implements 7-criteria scoring matrix
- Maximum score: 115 points
- Generates detailed score breakdown

### Hot Lead Path (Score > 60)

**Node 4: Log to CRM/Google Sheets - Hot Lead**
- Immediate CRM record creation
- Full contact details + score breakdown
- Timestamps for KPI tracking

**Node 5: Notify Sales Team - Slack (Hot Lead)**
- Instant notification to #hot-leads channel
- Includes: score, type, contact info, urgency level
- Direct CRM link for one-click access

**Node 6: Send Personalized Response - Hot Lead**
- Acknowledges specific request
- Sets expectation: 5-10 minute callback
- Includes Calendly self-service link

### Warm Lead Path (Score 31-60)

**Node 7: Log to CRM - Warm Lead**
- CRM record tagged "Warm Lead"
- Flagged for 2-4 week nurture campaign

**Node 8: Send Nurture Email - Warm Lead**
- Educational resources (buying guide, case studies)
- Soft CTA with consultation scheduling link
- Promise of 24-48 hour follow-up

### Cold Lead Path (Score ≤ 30)

**Node 9: Analyze Disqualification Reason**
- Checks for hard disqualifiers:
  - Out of service area
  - Non-HVAC service request
- Routes to appropriate sub-path

**Node 10: Cold Lead Router**
- Path A: Referral (out of area, wrong service)
- Path B: Long-term nurture (low engagement)

**Node 11: Send Referral Email**
- Polite "helpful no"
- Partner company recommendation
- Maintains positive brand impression

**Node 12: Log to CRM - Cold/Nurture**
- Tagged for 6-12 month educational campaign
- Market intelligence data capture

**Node 13: Send Long-Term Nurture Email**
- Educational resources (energy tips, maintenance)
- Low-pressure, value-first approach
- Persistent scheduling link

### Analytics Node

**Node 14: Track KPIs - All Leads**
- Logs every lead regardless of qualification
- Tracks: timestamp, score, type, tier, contact info
- Enables performance analysis and optimization

---

## 🎯 Scoring Matrix Reference

| **Criteria** | **Points** | **Triggers** |
|--------------|-----------|-------------|
| **High Urgency** | +30 | urgent, emergency, broken, not working, no heat/cool |
| **Moderate Urgency** | +15 | soon, this week, schedule |
| **Specific Service** | +20 | quote for [X], install, replace, repair [system] |
| **General Inquiry** | +5 | question about, information on |
| **Residential Authority** | +5 | Consumer email domain (implicit homeowner) |
| **Commercial Authority** | +15 | Property manager, facility director, owner |
| **Budget Mentioned** | +15-20 | Budget is $X, we have $X (20 for commercial) |
| **Financing Inquiry** | +10 | financing, payment plans |
| **Complete Contact** | +10 | Phone AND ZIP code provided |
| **Pain Points** | +15 | Old system, high bills, frequent repairs, noisy |
| **Commercial Lead** | +15 | Bonus for commercial classification |
| **Out of Area** | -50 | ZIP not in service area list |
| **Non-HVAC Service** | -50 | Plumbing, electrical, roofing keywords |

**Qualification Thresholds:**
- **SQL (Hot)**: > 60 points
- **MQL (Warm)**: 31-60 points
- **Cold/Unqualified**: ≤ 30 points

---

## 🔧 Configuration Requirements

### Critical Setup Steps (Before Activation):

1. **Gmail Configuration**
   - Set up dedicated leads email (e.g., leads@hvacvendor.com)
   - Configure Gmail OAuth2 credentials in n8n
   - Verify filter query captures your target keywords

2. **Service Area Configuration**
   - Edit Node 3 (Scoring Engine)
   - Replace placeholder ZIP codes with your actual service area

3. **CRM/Google Sheets Setup**
   - Create Google Sheets workbook with:
     - "Leads" sheet (for CRM records)
     - "KPI_Tracking" sheet (for analytics)
   - Configure Google Sheets API service account
   - Add Sheet ID to all Google Sheets nodes (5 total)

4. **Slack Integration**
   - Create #hot-leads channel
   - Generate incoming webhook URL
   - Add webhook to Node 5

5. **Email SMTP Credentials**
   - Configure SMTP for 4 email nodes:
     - Hot Lead Response
     - Warm Lead Nurture
     - Referral Email
     - Cold Lead Nurture

6. **Calendly Setup**
   - Create HVAC consultation scheduling page
   - Replace placeholder URLs in email templates

7. **Branding Customization**
   - Company name
   - Phone numbers
   - Website URLs
   - Partner referral information

---

## 📈 KPI Dashboard Metrics

The workflow automatically tracks:

**Response Time Metrics**:
- Lead received timestamp
- Lead processed timestamp
- Time-to-first-response calculation

**Qualification Metrics**:
- Total leads captured
- Hot/Warm/Cold distribution
- Qualification rate (% becoming SQL/MQL)
- Average score by lead type

**Conversion Metrics**:
- Lead-to-booking conversion rate
- Nurture campaign re-engagement rate
- Cost per booked job (with marketing spend integration)

**Channel Performance**:
- Lead source effectiveness
- Score distribution by source
- Commercial vs residential split

---

## 🚀 Next Steps

### Immediate Actions:
1. ✅ Review the configuration guide: `catalyst-automation-leads-setup-guide.md`
2. ⚙️ Complete all configuration steps (credentials, URLs, ZIPs)
3. 🧪 Test workflow with sample emails covering all paths
4. 📊 Set up Google Sheets dashboard for KPI visualization
5. ✔️ Activate workflow in n8n UI

### Week 1 Goals:
- Monitor first 10 real leads closely
- Verify all notifications and emails are working
- Adjust scoring thresholds based on initial results

### Month 1 Goals:
- Analyze qualification accuracy
- Refine keyword lists based on actual language used
- A/B test email subject lines and CTAs
- Establish baseline conversion rates

### Quarterly Optimization:
- Review scoring model effectiveness
- Update keywords based on new customer patterns
- Analyze channel performance for budget allocation
- Expand service area based on demand data

---

## 📁 Generated Files

1. **`catalyst-automation-leads-workflow.json`**
   - Full n8n workflow export
   - Can be imported via n8n UI if needed

2. **`catalyst-automation-leads-setup-guide.md`**
   - Comprehensive configuration instructions
   - Troubleshooting guide
   - Customization reference

3. **`catalyst-automation-leads-workflow-summary.md`** (this file)
   - High-level architecture overview
   - Node descriptions
   - Quick reference guide

4. **`update-n8n-workflow.py`**
   - Python script used to update n8n database
   - Can be reused for future updates

---

## 🎓 Key Features Implemented

✅ **Precision Email Filtering** - Captures only relevant HVAC inquiries
✅ **Intelligent Classification** - Automatically distinguishes residential from commercial
✅ **BANT-Based Scoring** - Adapted for HVAC industry specifics
✅ **Multi-Tier Routing** - Hot, warm, and cold lead paths
✅ **Parallel Actions** - Simultaneous CRM, notifications, and customer emails
✅ **Strategic Disqualification** - Referral monetization for unfit leads
✅ **Comprehensive KPI Tracking** - Every lead logged for analysis
✅ **Personalized Communication** - Dynamic email templates based on lead data
✅ **Self-Service Conversion** - Calendly links for instant booking
✅ **Long-Term Nurture** - Educational campaigns for low-urgency leads

---

## 💡 Success Factors

This workflow implements industry best practices:
- **5-Minute Response Goal**: Hot leads get instant attention
- **Qualification Automation**: Sales team only sees qualified leads
- **No Lead Left Behind**: Even unqualified leads provide value
- **Data-Driven Optimization**: KPI tracking enables continuous improvement
- **Brand Protection**: Professional communication at every touchpoint

---

## 🆘 Support Resources

- **Full Setup Guide**: See `catalyst-automation-leads-setup-guide.md`
- **n8n Documentation**: https://docs.n8n.io/
- **Workflow Location**: n8n database, ID: `sHsuLUFzwe1d5ji2`
- **Configuration Files**: All files saved in home directory

---

**Workflow Status**: ✅ Built & Deployed to Database
**Next Action**: Complete configuration checklist and activate in n8n UI