#!/usr/bin/env node

/**
 * n8n Workflow Deployment Script
 * Deploys workflow JSON files to the n8n database
 *
 * Usage:
 *   node n8n/scripts/deploy-workflow.js <workflow-name>
 *   node n8n/scripts/deploy-workflow.js all
 *
 * Example:
 *   node n8n/scripts/deploy-workflow.js catalyst-automation-leads-workflow
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Configuration
const N8N_DB_PATH = path.join(process.env.HOME, '.n8n', 'database.sqlite');
const WORKFLOWS_DIR = path.join(__dirname, '..', 'workflows');

// Workflow ID mapping (workflow name → n8n database ID)
const WORKFLOW_IDS = {
  'catalyst-automation-leads-workflow': 'sHsuLUFzwe1d5ji2',
  'catalyst-automation-marketing-workflow': 'nKpKjcrJWhmnuecC'
};

/**
 * Deploy a single workflow to n8n database
 */
async function deployWorkflow(workflowFileName, workflowId) {
  return new Promise((resolve, reject) => {
    const workflowPath = path.join(WORKFLOWS_DIR, `${workflowFileName}.json`);

    // Check if workflow file exists
    if (!fs.existsSync(workflowPath)) {
      return reject(new Error(`Workflow file not found: ${workflowPath}`));
    }

    // Read workflow JSON
    const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

    // Extract components
    const nodes = JSON.stringify(workflowData.nodes);
    const connections = JSON.stringify(workflowData.connections);
    const settings = JSON.stringify(workflowData.settings || { executionOrder: 'v1' });
    const name = workflowData.name;

    // Connect to n8n database
    const db = new sqlite3.Database(N8N_DB_PATH, (err) => {
      if (err) {
        return reject(new Error(`Failed to connect to n8n database: ${err.message}`));
      }
    });

    // Update workflow in database
    db.run(
      `UPDATE workflow_entity
       SET nodes = ?,
           connections = ?,
           settings = ?,
           name = ?,
           updatedAt = datetime('now')
       WHERE id = ?`,
      [nodes, connections, settings, name, workflowId],
      function(err) {
        if (err) {
          db.close();
          return reject(new Error(`Failed to update workflow: ${err.message}`));
        }

        if (this.changes === 0) {
          db.close();
          return reject(new Error(`Workflow ID not found in database: ${workflowId}`));
        }

        // Verify deployment
        db.get(
          'SELECT name, active, json_array_length(nodes) as node_count FROM workflow_entity WHERE id = ?',
          [workflowId],
          (err, row) => {
            db.close();

            if (err) {
              return reject(new Error(`Failed to verify deployment: ${err.message}`));
            }

            resolve({
              name: row.name,
              id: workflowId,
              nodeCount: row.node_count,
              active: row.active === 1,
              file: workflowFileName
            });
          }
        );
      }
    );
  });
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Error: Please specify a workflow name or "all"');
    console.log('\nUsage:');
    console.log('  node n8n/scripts/deploy-workflow.js <workflow-name>');
    console.log('  node n8n/scripts/deploy-workflow.js all');
    console.log('\nAvailable workflows:');
    Object.keys(WORKFLOW_IDS).forEach(name => {
      console.log(`  - ${name}`);
    });
    process.exit(1);
  }

  const target = args[0];

  try {
    if (target === 'all') {
      console.log('🚀 Deploying all workflows...\n');

      for (const [workflowName, workflowId] of Object.entries(WORKFLOW_IDS)) {
        try {
          const result = await deployWorkflow(workflowName, workflowId);
          console.log(`✅ Deployed: ${result.name}`);
          console.log(`   ID: ${result.id}`);
          console.log(`   Nodes: ${result.nodeCount}`);
          console.log(`   Status: ${result.active ? 'Active' : 'Inactive'}`);
          console.log('');
        } catch (error) {
          console.error(`❌ Failed to deploy ${workflowName}:`, error.message);
          console.log('');
        }
      }

      console.log('✨ Deployment complete!');
    } else {
      // Deploy single workflow
      const workflowId = WORKFLOW_IDS[target];

      if (!workflowId) {
        console.error(`❌ Error: Unknown workflow "${target}"`);
        console.log('\nAvailable workflows:');
        Object.keys(WORKFLOW_IDS).forEach(name => {
          console.log(`  - ${name}`);
        });
        process.exit(1);
      }

      console.log(`🚀 Deploying workflow: ${target}\n`);

      const result = await deployWorkflow(target, workflowId);

      console.log(`✅ Successfully deployed!`);
      console.log(`   Name: ${result.name}`);
      console.log(`   ID: ${result.id}`);
      console.log(`   Nodes: ${result.nodeCount}`);
      console.log(`   Status: ${result.active ? 'Active' : 'Inactive'}`);
      console.log(`   File: ${result.file}.json`);
    }
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { deployWorkflow, WORKFLOW_IDS };
