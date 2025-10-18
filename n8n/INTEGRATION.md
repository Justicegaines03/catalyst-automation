# n8n Workflow Integration with Catalyst-Automation Project

**Status**: ✅ Complete
**Integration Date**: October 18, 2025
**Project Type**: Next.js + n8n Hybrid Application

---

## 🎯 Integration Overview

All n8n workflow JSON files and management scripts have been successfully integrated into the `catalyst-automation` Next.js project. This integration enables version control, programmatic workflow management, and streamlined deployment processes.

---

## 📁 Project Structure

```
catalyst-automation/
├── app/                          # Next.js application
├── public/                       # Static assets
├── n8n/                          # ✨ n8n Integration (NEW)
│   ├── workflows/                # Workflow JSON definitions
│   │   ├── catalyst-automation-leads-workflow.json
│   │   └── index.js              # Workflow registry
│   ├── scripts/                  # Management scripts
│   │   ├── deploy-workflow.js    # Deploy workflows to n8n DB
│   │   ├── backup-workflows.js   # Export workflows from n8n DB
│   │   └── list-workflows.js     # List all workflows
│   ├── docs/                     # Workflow documentation
│   │   ├── INDEX.md              # Documentation index
│   │   ├── catalyst-automation-leads-setup-guide.md
│   │   └── catalyst-automation-leads-workflow-summary.md
│   ├── backups/                  # Timestamped backups (gitignored)
│   └── README.md                 # n8n integration guide
├── package.json                  # Updated with n8n scripts
├── .gitignore                    # Updated to exclude backups
└── README.md                     # Project README

```

---

## 🚀 Available NPM Scripts

### List Workflows

```bash
# List Catalyst-Automation workflows
npm run n8n:list

# List ALL n8n workflows
npm run n8n:list:all
```

**Output Example**:
```
📋 Listing Catalyst-Automation workflows...

1. ⚪ Catalyst-Automation Leads
   ID: sHsuLUFzwe1d5ji2
   📊 Nodes: 15
   Created: 10/12/2025, 5:46:32 PM
   Updated: 10/18/2025, 1:15:42 PM

Total: 2 workflow(s)
Active: 0
Inactive: 2
```

### Backup Workflows

```bash
# Backup all Catalyst-Automation workflows
npm run n8n:backup

# Backup a specific workflow by ID
npm run n8n:backup:single sHsuLUFzwe1d5ji2
```

**What it does**:
- Exports workflows from n8n database
- Saves to `n8n/workflows/<name>.json` (latest version)
- Creates timestamped backup in `n8n/backups/<name>_<timestamp>.json`

### Deploy Workflows

```bash
# Deploy a specific workflow
npm run n8n:deploy catalyst-automation-leads-workflow

# Deploy all workflows
npm run n8n:deploy:all
```

**Use cases**:
- After editing workflow JSON locally
- Deploying to new n8n instance
- Restoring from backup
- CI/CD workflow deployment

---

## 📦 Integrated Workflows

### 1. Catalyst-Automation Leads
**File**: `n8n/workflows/catalyst-automation-leads-workflow.json`
**ID**: `sHsuLUFzwe1d5ji2`
**Status**: ✅ Configured (15 nodes)
**Version**: 1.0.0

**Purpose**: Automated HVAC lead management with BANT scoring

**Features**:
- Gmail precision filtering
- Residential/Commercial classification
- HVAC BANT scoring (0-115 points)
- Hot/Warm/Cold routing
- CRM integration
- Slack notifications
- Automated emails
- KPI tracking

**Documentation**:
- `n8n/docs/catalyst-automation-leads-setup-guide.md`
- `n8n/docs/catalyst-automation-leads-workflow-summary.md`

### 2. Catalyst-Automation Marketing
**File**: Not yet created
**ID**: `nKpKjcrJWhmnuecC`
**Status**: ⚪ Pending configuration
**Version**: 0.0.0

---

## 🔧 Technical Details

### Dependencies Added

```json
{
  "devDependencies": {
    "sqlite3": "^5.1.7"
  }
}
```

### Scripts Added

```json
{
  "scripts": {
    "n8n:list": "node n8n/scripts/list-workflows.js",
    "n8n:list:all": "node n8n/scripts/list-workflows.js --all",
    "n8n:backup": "node n8n/scripts/backup-workflows.js all",
    "n8n:backup:single": "node n8n/scripts/backup-workflows.js",
    "n8n:deploy": "node n8n/scripts/deploy-workflow.js",
    "n8n:deploy:all": "node n8n/scripts/deploy-workflow.js all"
  }
}
```

### Gitignore Updates

```gitignore
# n8n
/n8n/backups/
```

**Why**: Backups are timestamped duplicates. Only `workflows/` directory needs version control.

---

## 🔄 Development Workflow

### Recommended Git Workflow

**After making changes in n8n UI**:

```bash
# 1. Backup workflow from n8n database
npm run n8n:backup

# 2. Review changes
git diff n8n/workflows/

# 3. Commit to version control
git add n8n/workflows/
git commit -m "Update lead scoring thresholds"

# 4. Push to repository
git push origin main
```

**After pulling changes from repository**:

```bash
# 1. Pull latest code
git pull origin main

# 2. Deploy workflows to local n8n instance
npm run n8n:deploy:all

# 3. Verify in n8n UI
# Open http://localhost:5678
```

### Editing Workflows

**Option 1: Edit in n8n UI** (Recommended)
1. Make changes in n8n web interface
2. Test thoroughly
3. Run `npm run n8n:backup`
4. Commit to git

**Option 2: Edit JSON Directly**
1. Edit `n8n/workflows/<workflow>.json`
2. Run `npm run n8n:deploy <workflow-name>`
3. Verify in n8n UI
4. Commit to git

---

## 📊 Workflow Registry

**File**: `n8n/workflows/index.js`

Centralized workflow metadata:

```javascript
const workflows = require('./n8n/workflows/index.js');

// Get workflow by ID
const workflow = workflows.getById('sHsuLUFzwe1d5ji2');

// Get all workflow files
const files = workflows.getAllFiles();

// Get summary
const summary = workflows.getSummary();
// { total: 2, configured: 1, pending: 1, totalNodes: 15 }
```

---

## 🛡️ Security Considerations

### ✅ Safe for Version Control

- Workflow JSON files contain **NO credentials**
- Credentials managed separately in n8n UI
- `workflows/` directory is safe to commit

### ❌ Never Commit

- `.n8n/database.sqlite` (contains credentials)
- `n8n/backups/` (redundant, timestamped duplicates)
- Environment variables with API keys

### Credential Management

All credentials configured in n8n UI:
- Gmail OAuth2
- Google Sheets API
- Slack Webhook
- SMTP Email

**Credentials are NOT stored in workflow JSON files**

---

## 🔗 Integration with Next.js App

### Current Integration

- ✅ Version control for workflows
- ✅ Programmatic workflow management
- ✅ Automated backup and deployment
- ✅ Comprehensive documentation

### Future Integration Possibilities

**1. Workflow Status Dashboard**
Create a Next.js page to display workflow status:

```typescript
// app/workflows/page.tsx
import { getWorkflows } from '@/n8n/workflows/index.js';

export default function WorkflowsPage() {
  const workflows = getWorkflows();

  return (
    <div>
      {workflows.map(w => (
        <WorkflowCard key={w.id} workflow={w} />
      ))}
    </div>
  );
}
```

**2. n8n API Integration**
Use n8n REST API for real-time workflow control:

```typescript
// lib/n8n-client.ts
export async function executeWorkflow(workflowId: string, data: any) {
  const response = await fetch('http://localhost:5678/api/v1/workflows/' + workflowId + '/execute', {
    method: 'POST',
    headers: {
      'X-N8N-API-KEY': process.env.N8N_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
```

**3. Webhook Integration**
Next.js API routes can trigger n8n workflows:

```typescript
// app/api/webhooks/lead/route.ts
export async function POST(request: Request) {
  const leadData = await request.json();

  // Forward to n8n webhook
  await fetch('http://localhost:5678/webhook/lead-intake', {
    method: 'POST',
    body: JSON.stringify(leadData)
  });

  return Response.json({ success: true });
}
```

---

## 📚 Documentation Structure

```
n8n/docs/
├── INDEX.md                                        # Documentation index
├── catalyst-automation-leads-setup-guide.md        # Complete setup guide
└── catalyst-automation-leads-workflow-summary.md   # Architecture overview
```

**Quick Links**:
- [Documentation Index](./docs/INDEX.md)
- [n8n README](./README.md)
- [Workflow Registry](./workflows/index.js)

---

## 🧪 Testing the Integration

### Verify Installation

```bash
# 1. List workflows
npm run n8n:list

# Expected output: 2 Catalyst-Automation workflows

# 2. Backup workflows
npm run n8n:backup

# Expected: Files created in n8n/workflows/ and n8n/backups/

# 3. Check workflow registry
node -e "console.log(require('./n8n/workflows/index.js').getSummary())"

# Expected: { total: 2, configured: 1, pending: 1, totalNodes: 15 }
```

### Directory Structure Test

```bash
# Verify directory structure
tree n8n/

# Expected:
# n8n/
# ├── workflows/
# ├── scripts/
# ├── docs/
# ├── backups/
# └── README.md
```

---

## 🎉 Integration Complete!

### What You Can Now Do

✅ **Version Control Workflows**
- All workflow JSON files tracked in git
- Full change history
- Team collaboration enabled

✅ **Programmatic Management**
- List workflows via CLI
- Backup/restore workflows
- Deploy to multiple environments

✅ **Comprehensive Documentation**
- Setup guides
- Architecture diagrams
- Troubleshooting resources

✅ **Development Workflow**
- Edit in n8n UI or JSON
- Test locally
- Deploy with npm scripts

### Next Steps

1. **Configure Credentials**
   - Set up Gmail OAuth2
   - Configure Google Sheets API
   - Add Slack webhook
   - Set SMTP credentials

2. **Customize Workflows**
   - Update service area ZIP codes
   - Add company branding
   - Configure Calendly links

3. **Test & Deploy**
   - Test all workflow paths
   - Verify integrations
   - Activate workflows

4. **Monitor & Optimize**
   - Review KPI dashboards
   - Analyze lead qualification
   - Iterate on scoring thresholds

---

## 📞 Support Resources

- **n8n Integration Guide**: `n8n/README.md`
- **Workflow Documentation**: `n8n/docs/INDEX.md`
- **Workflow Registry**: `n8n/workflows/index.js`
- **n8n Official Docs**: https://docs.n8n.io/

---

**Integration Completed**: October 18, 2025
**Maintained By**: Catalyst-Automation Team
**Project Version**: 0.1.0 (with n8n integration)
