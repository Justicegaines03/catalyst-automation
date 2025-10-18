# Catalyst-Automation n8n Workflows

This directory contains all n8n workflow definitions and management scripts for the Catalyst-Automation project.

## 📁 Directory Structure

```
n8n/
├── workflows/          # Workflow JSON definitions (version controlled)
├── scripts/            # Management and deployment scripts
├── docs/               # Workflow documentation
├── backups/            # Timestamped workflow backups (gitignored)
└── README.md           # This file
```

## 🔧 Available Workflows

### 1. Catalyst-Automation Leads
**Status**: ✅ Configured (15 nodes)
**ID**: `sHsuLUFzwe1d5ji2`
**Purpose**: Automated HVAC lead management system

**Features**:
- Gmail precision filtering for HVAC keywords
- Residential vs Commercial lead classification
- HVAC BANT scoring matrix (0-115 points)
- Multi-tier routing: Hot (>60), Warm (31-60), Cold (≤30)
- CRM integration via Google Sheets
- Slack notifications for hot leads
- Automated personalized email responses
- Comprehensive KPI tracking

**Documentation**:
- Setup Guide: `docs/catalyst-automation-leads-setup-guide.md`
- Architecture: `docs/catalyst-automation-leads-workflow-summary.md`

### 2. Catalyst-Automation Marketing
**Status**: ⚪ Not Configured
**ID**: `nKpKjcrJWhmnuecC`
**Purpose**: Marketing automation (pending implementation)

## 🚀 Quick Start

### Prerequisites

```bash
# Install dependencies
npm install sqlite3 --save-dev
```

### Common Commands

```bash
# List all workflows
npm run n8n:list

# Backup all workflows
npm run n8n:backup

# Deploy a specific workflow
npm run n8n:deploy catalyst-automation-leads-workflow

# Deploy all workflows
npm run n8n:deploy all
```

## 📜 Management Scripts

### 1. List Workflows (`list-workflows.js`)

View all workflows in your n8n database.

```bash
# List Catalyst-Automation workflows only
node n8n/scripts/list-workflows.js

# List all n8n workflows
node n8n/scripts/list-workflows.js --all
```

**Output**:
```
📋 Listing Catalyst-Automation workflows...

1. 🟢 Catalyst-Automation Leads
   ID: sHsuLUFzwe1d5ji2
   📊 Nodes: 15
   Created: 10/12/2025, 5:46:32 PM
   Updated: 10/18/2025, 1:15:42 PM

Total: 2 workflow(s)
Active: 0
Inactive: 2
```

### 2. Backup Workflows (`backup-workflows.js`)

Export workflows from n8n database to JSON files.

```bash
# Backup all Catalyst-Automation workflows
node n8n/scripts/backup-workflows.js all

# Backup a specific workflow by ID
node n8n/scripts/backup-workflows.js sHsuLUFzwe1d5ji2
```

**What it does**:
- Exports workflow to `workflows/<name>.json` (latest version)
- Creates timestamped backup in `backups/<name>_<timestamp>.json`
- Preserves all nodes, connections, and settings

### 3. Deploy Workflows (`deploy-workflow.js`)

Push workflow changes from JSON files to n8n database.

```bash
# Deploy a specific workflow
node n8n/scripts/deploy-workflow.js catalyst-automation-leads-workflow

# Deploy all workflows
node n8n/scripts/deploy-workflow.js all
```

**Use cases**:
- After editing workflow JSON locally
- Deploying to a new n8n instance
- Restoring from backup
- Version control workflow updates

## 🔄 Development Workflow

### Making Changes to Workflows

**Option 1: Via n8n UI (Recommended)**

1. Edit workflow in n8n web interface
2. Test thoroughly
3. Backup to version control:
   ```bash
   npm run n8n:backup
   ```
4. Commit changes to git:
   ```bash
   git add n8n/workflows/
   git commit -m "Update lead scoring thresholds"
   ```

**Option 2: Edit JSON Directly**

1. Edit workflow JSON in `n8n/workflows/`
2. Deploy to n8n database:
   ```bash
   npm run n8n:deploy <workflow-name>
   ```
3. Verify in n8n UI
4. Commit to git

### Best Practices

✅ **DO**:
- Backup workflows before major changes
- Test workflows in n8n UI before deploying to production
- Version control all workflow JSON files
- Document changes in commit messages
- Keep `workflows/` directory in sync with n8n database

❌ **DON'T**:
- Edit workflows directly in database without backup
- Deploy untested workflows to production n8n instance
- Ignore workflow backups
- Lose track of workflow versions

## 📊 Workflow Configuration

### Required Environment Setup

Before activating workflows, ensure:

1. **n8n Instance Running**
   ```bash
   n8n
   # Access at http://localhost:5678
   ```

2. **Credentials Configured**
   - Gmail OAuth2
   - Google Sheets API Service Account
   - Slack Webhook
   - SMTP Email Account

3. **Project-Specific Configuration**
   - Service area ZIP codes (in scoring node)
   - Company branding (name, phone, URLs)
   - Calendly scheduling links
   - Partner referral information

See individual workflow documentation for detailed setup instructions.

## 🔐 Security Considerations

**Sensitive Data Handling**:
- ✅ Workflow JSON files contain NO credentials
- ✅ Credentials managed separately in n8n UI
- ✅ Workflow files safe for version control
- ⚠️ Never commit `.n8n/database.sqlite` (contains credentials)

**Gitignore Configuration**:
```gitignore
# n8n
n8n/backups/          # Timestamped backups (redundant)
.n8n/                 # n8n user data directory (contains credentials)
```

## 📈 Monitoring & Maintenance

### Regular Tasks

**Daily**:
- Monitor workflow executions in n8n UI
- Check Slack notifications for hot leads
- Review error logs

**Weekly**:
- Review KPI tracking data
- Analyze lead qualification accuracy
- Backup workflows to version control

**Monthly**:
- Optimize scoring thresholds based on conversion data
- Update keyword lists based on actual customer language
- Review and update email templates

**Quarterly**:
- Major workflow optimizations
- Performance analysis
- Feature additions based on business needs

## 🆘 Troubleshooting

### Common Issues

**Workflow not triggering**:
```bash
# Check workflow status
npm run n8n:list

# Verify in n8n UI → Workflows → Activate workflow
```

**Deployment fails**:
```bash
# Verify n8n database path
ls -la ~/.n8n/database.sqlite

# Check workflow ID mapping in deploy-workflow.js
```

**Backup fails**:
```bash
# Ensure n8n database is accessible
sqlite3 ~/.n8n/database.sqlite "SELECT COUNT(*) FROM workflow_entity;"
```

**Script errors**:
```bash
# Ensure sqlite3 is installed
npm install sqlite3 --save-dev
```

## 📚 Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Workflow JSON Format](https://docs.n8n.io/workflows/workflows/)
- [n8n API Documentation](https://docs.n8n.io/api/)
- Project workflow docs: `n8n/docs/`

## 🔗 Integration with Next.js App

The Next.js app can interact with n8n workflows via:

1. **Direct Database Access** (scripts in this directory)
2. **n8n REST API** (when n8n is running)
3. **Webhook Triggers** (for real-time workflow initiation)

See `scripts/` directory for programmatic workflow management examples.

---

**Maintained by**: Catalyst-Automation Team
**Last Updated**: October 18, 2025
**n8n Version**: 0.200.0+
