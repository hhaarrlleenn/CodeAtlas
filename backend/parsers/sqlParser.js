const fs = require("fs");

function parseSQL(filePath) {
  try {
    const sql = fs.readFileSync(filePath, "utf8");

    const tables = [];

    // Match CREATE TABLE blocks
    const tableRegex =
      /CREATE TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;

    let tableMatch;

    while ((tableMatch = tableRegex.exec(sql)) !== null) {
      const tableName = tableMatch[1];
      const tableBody = tableMatch[2];

      const columns = [];

      // Split table body into lines
      const lines = tableBody.split("\n");

      lines.forEach((line) => {
        line = line.trim();

        if (
          line === "" ||
          line.startsWith("PRIMARY KEY") ||
          line.startsWith("FOREIGN KEY") ||
          line.startsWith("UNIQUE") ||
          line.startsWith("CONSTRAINT")
        ) {
          return;
        }

        // Remove trailing comma
        line = line.replace(/,$/, "");

        // First word is column name
        const parts = line.split(/\s+/);

        if (parts.length > 0) {
          columns.push(parts[0]);
        }
      });

      tables.push({
        name: tableName,
        columns,
      });
    }

    return tables;
  } catch (err) {
    console.error("SQL Parsing Error:", err);
    return [];
  }
}

module.exports = parseSQL;