const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function addMissingColumns() {
  try {
    console.log("Connecting to database specifically to alter tables...");

    const tables = ["study", "work_profiles", "invest", "language_leads"];

    for (const table of tables) {
      try {
        await pool.query(`ALTER TABLE ${table} ADD COLUMN country_code VARCHAR(10) DEFAULT '+91'`);
        console.log(`✅ Default country_code added to ${table}`);
      } catch (err) {
        if (err.code === '42701') {
          console.log(`⚠️  Column already exists in ${table}, skipping.`);
        } else {
          console.error(`❌ Error altering ${table}:`, err.message);
        }
      }
    }
  } catch (e) {
    console.error("Connection error:", e);
  } finally {
    await pool.end();
  }
}

addMissingColumns();
