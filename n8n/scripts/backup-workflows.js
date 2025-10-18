#!/usr/bin/env node

/**
 * n8n Workflow Backup Script
 * Exports workflows from n8n database to JSON files
 *
 * Usage:
 *   node n8n/scripts/backup-workflows.js [workflow-id]
 *   node n8n/scripts/backup-workflows.js all
 *
 * Example:
 *   node n8n/scripts/backup-workflows.js sHsuLUFzwe1d5ji2
 *   node n8n/scripts/backup-workflows.js all
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Configuration
const N8N_DB_PATH = path.join(process.env.HOME, '.n8n', 'database.sqlite');
const WORKFLOWS_DIR = path.join(__dirname, '..', 'workflows');
const BACKUPS_DIR = path.join(__dirname, '..', 'backups');

// Ensure directories exist
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

/**
 * Backup a single workflow from n8n database
 */
async function backupWorkflow(workflowId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(N8N_DB_PATH, (err) => {
      if (err) {
        return reject(new Error(`Failed to connect to n8n database: ${err.message}`));
      }
    });

    db.get(
      'SELECT id, name, active, nodes, connections, settings FROM workflow_entity WHERE id = ?',
      [workflowId],
      (err, row) => {
        db.close();

        if (err) {
          return reject(new Error(`Database query failed: ${err.message}`));
        }

        if (!row) {
          return reject(new Error(`Workflow not found: ${workflowId}`));
        }

        // Parse JSON fields
        const workflowData = {
          name: row.name,
          nodes: JSON.parse(row.nodes),
          connections: JSON.parse(row.connections),
          settings: JSON.parse(row.settings || '{"executionOrder":"v1"}')
        };

        // Create filename from workflow name
        const filename = row.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

        // Save to workflows directory (latest version)
        const workflowPath = path.join(WORKFLOWS_DIR, `${filename}.json`);
        fs.writeFileSync(workflowPath, JSON.stringify(workflowData, null, 2));

        // Save to backups directory (timestamped)
        const backupPath = path.join(BACKUPS_DIR, `${filename}_${timestamp}.json`);
        fs.writeFileSync(backupPath, JSON.stringify(workflowData, null, 2));

        resolve({
          id: row.id,
          name: row.name,
          active: row.active === 1,
          nodeCount: workflowData.nodes.length,
          workflowPath,
          backupPath
        });
      }
    );
  });
}

/**
 * Get all Catalyst-Automation workflows
 */
async function getAllCatalystWorkflows() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(N8N_DB_PATH, (err) => {
      if (err) {
        return reject(new Error(`Failed to connect to n8n database: ${err.message}`));
      }
    });

    db.all(
      `SELECT id, name FROM workflow_entity
       WHERE name LIKE 'Catalyst-Automation%' OR name LIKE 'catalyst-automation%'`,
      [],
      (err, rows) => {
        db.close();

        if (err) {
          return reject(new Error(`Database query failed: ${err.message}`));
        }

        resolve(rows);
      }
    );
  });
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  try {
    if (args.length === 0 || args[0] === 'all') {
      console.log('🔍 Finding all Catalyst-Automation workflows...\n');

      const workflows = await getAllCatalystWorkflows();

      if (workflows.length === 0) {
        console.log('⚠️  No Catalyst-Automation workflows found');
        return;
      }

      console.log(`📦 Backing up ${workflows.length} workflow(s)...\n`);

      for (const workflow of workflows) {
        try {
          const result = await backupWorkflow(workflow.id);
          console.log(`✅ Backed up: ${result.name}`);
          console.log(`   ID: ${result.id}`);
          console.log(`   Nodes: ${result.nodeCount}`);
          console.log(`   Status: ${result.active ? 'Active' : 'Inactive'}`);
          console.log(`   File: ${path.basename(result.workflowPath)}`);
          console.log(`   Backup: ${path.basename(result.backupPath)}`);
          console.log('');
        } catch (error) {
          console.error(`❌ Failed to backup ${workflow.name}:`, error.message);
          console.log('');
        }
      }

      console.log('✨ Backup complete!');
    } else {
      // Backup single workflow by ID
      const workflowId = args[0];

      console.log(`🚀 Backing up workflow: ${workflowId}\n`);

      const result = await backupWorkflow(workflowId);

      console.log(`✅ Successfully backed up!`);
      console.log(`   Name: ${result.name}`);
      console.log(`   ID: ${result.id}`);
      console.log(`   Nodes: ${result.nodeCount}`);
      console.log(`   Status: ${result.active ? 'Active' : 'Inactive'}`);
      console.log(`   File: ${path.basename(result.workflowPath)}`);
      console.log(`   Backup: ${path.basename(result.backupPath)}`);
    }
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { backupWorkflow, getAllCatalystWorkflows };
