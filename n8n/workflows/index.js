/**
 * n8n Workflows Index
 * Central registry for all Catalyst-Automation workflows
 */

module.exports = {
  workflows: {
    'catalyst-automation-leads': {
      id: 'sHsuLUFzwe1d5ji2',
      name: 'Catalyst-Automation Leads',
      description: 'Automated HVAC lead management with BANT scoring and multi-tier routing',
      file: 'catalyst-automation-leads-workflow.json',
      version: '1.0.0',
      nodes: 15,
      features: [
        'Gmail precision filtering',
        'Residential/Commercial classification',
        'HVAC BANT scoring matrix (0-115 points)',
        'Hot/Warm/Cold lead routing',
        'CRM integration (Google Sheets)',
        'Slack notifications',
        'Automated email responses',
        'KPI tracking'
      ],
      requirements: {
        credentials: [
          'Gmail OAuth2',
          'Google Sheets API',
          'Slack Webhook',
          'SMTP Email'
        ],
        configuration: [
          'Service area ZIP codes',
          'Company branding (name, phone, URLs)',
          'Calendly scheduling link',
          'Partner referral information'
        ]
      },
      triggers: [
        'Gmail - Email monitoring every 1 minute'
      ],
      documentation: [
        'n8n/docs/catalyst-automation-leads-setup-guide.md',
        'n8n/docs/catalyst-automation-leads-workflow-summary.md'
      ]
    },
    'catalyst-automation-marketing': {
      id: 'nKpKjcrJWhmnuecC',
      name: 'Catalyst-Automation Marketing',
      description: 'Marketing automation workflow (to be configured)',
      file: 'catalyst-automation-marketing-workflow.json',
      version: '0.0.0',
      nodes: 0,
      features: [],
      requirements: {},
      triggers: [],
      documentation: []
    }
  },

  /**
   * Get workflow by ID
   */
  getById(id) {
    return Object.values(this.workflows).find(w => w.id === id);
  },

  /**
   * Get workflow by name key
   */
  getByKey(key) {
    return this.workflows[key];
  },

  /**
   * Get all workflow IDs
   */
  getAllIds() {
    return Object.values(this.workflows).map(w => w.id);
  },

  /**
   * Get all workflow files
   */
  getAllFiles() {
    return Object.values(this.workflows)
      .filter(w => w.file)
      .map(w => w.file);
  },

  /**
   * Get deployment status summary
   */
  getSummary() {
    const workflows = Object.values(this.workflows);
    return {
      total: workflows.length,
      configured: workflows.filter(w => w.nodes > 0).length,
      pending: workflows.filter(w => w.nodes === 0).length,
      totalNodes: workflows.reduce((sum, w) => sum + w.nodes, 0)
    };
  }
};
