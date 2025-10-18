#!/usr/bin/env node

/**
 * n8n Workflow Listing Script
 * Lists all workflows in the n8n database
 *
 * Usage:
 *   node n8n/scripts/list-workflows.js [--all|--catalyst]
 *
 * Example:
 *   node n8n/scripts/list-workflows.js --catalyst
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuration
const N8N_DB_PATH = path.join(process.env.HOME, '.n8n', 'database.sqlite');

/**
 * List workflows
 */
async function listWorkflows(filterType = 'catalyst') {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(N8N_DB_PATH, (err) => {
      if (err) {
        return reject(new Error(`Failed to connect to n8n database: ${err.message}`));
      }
    });

    let query;
    if (filterType === 'all') {
      query = `SELECT id, name, active, createdAt, updatedAt,
               json_array_length(nodes) as node_count
               FROM workflow_entity
               ORDER BY updatedAt DESC`;
    } else {
      query = `SELECT id, name, active, createdAt, updatedAt,
               json_array_length(nodes) as node_count
               FROM workflow_entity
               WHERE name LIKE 'Catalyst-Automation%' OR name LIKE 'catalyst-automation%'
               ORDER BY updatedAt DESC`;
    }

    db.all(query, [], (err, rows) => {
      db.close();

      if (err) {
        return reject(new Error(`Database query failed: ${err.message}`));
      }

      resolve(rows);
    });
  });
}

/**
 * Format workflow info for display
 */
function formatWorkflow(workflow, index) {
  const statusIcon = workflow.active ? '🟢' : '⚪';
  const nodeCountIcon = workflow.node_count > 0 ? '📊' : '📄';

  console.log(`${index}. ${statusIcon} ${workflow.name}`);
  console.log(`   ID: ${workflow.id}`);
  console.log(`   ${nodeCountIcon} Nodes: ${workflow.node_count}`);
  console.log(`   Created: ${new Date(workflow.createdAt).toLocaleString()}`);
  console.log(`   Updated: ${new Date(workflow.updatedAt).toLocaleString()}`);
  console.log('');
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const filterType = args.includes('--all') ? 'all' : 'catalyst';

  try {
    console.log(filterType === 'all'
      ? '📋 Listing all n8n workflows...\n'
      : '📋 Listing Catalyst-Automation workflows...\n'
    );

    const workflows = await listWorkflows(filterType);

    if (workflows.length === 0) {
      console.log('⚠️  No workflows found');
      return;
    }

    workflows.forEach((workflow, i) => formatWorkflow(workflow, i + 1));

    console.log(`Total: ${workflows.length} workflow(s)`);
    console.log(`Active: ${workflows.filter(w => w.active).length}`);
    console.log(`Inactive: ${workflows.filter(w => !w.active).length}`);
  } catch (error) {
    console.error('❌ Failed to list workflows:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { listWorkflows };
