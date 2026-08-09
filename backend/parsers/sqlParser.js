const fs = require("fs");

function parseSQL(filePath) {
  try {
    const sql = fs.readFileSync(filePath, "utf8");

    const tables = [];
    const relationships = [];

    // Remove SQL comments
    const cleanSQL = sql
      .replace(/--.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    // =========================================================
    // Helper: remove quotes/backticks from identifiers
    // =========================================================
    function cleanIdentifier(name) {
      if (!name) return "";

      return name
        .replace(/[`"'[\]]/g, "")
        .split(".")
        .pop()
        .trim();
    }

    // =========================================================
    // Helper: add relationship without duplicates
    // =========================================================
    function addRelationship(
      source,
      sourceColumn,
      target,
      targetColumn
    ) {
      source = cleanIdentifier(source);
      sourceColumn = cleanIdentifier(sourceColumn);
      target = cleanIdentifier(target);
      targetColumn = cleanIdentifier(targetColumn);

      if (!source || !sourceColumn || !target || !targetColumn) {
        return;
      }

      const exists = relationships.some(
        (r) =>
          r.source === source &&
          r.sourceColumn === sourceColumn &&
          r.target === target &&
          r.targetColumn === targetColumn
      );

      if (!exists) {
        relationships.push({
          source,
          sourceColumn,
          target,
          targetColumn,
        });
      }
    }

    // =========================================================
    // Match CREATE TABLE blocks
    // =========================================================
    const tableRegex =
      /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:[`"']?[\w]+\s*\.\s*)?[`"']?([\w]+)[`"']?\s*\(([\s\S]*?)\)\s*;/gi;

    let tableMatch;

    while ((tableMatch = tableRegex.exec(cleanSQL)) !== null) {
      const tableName = cleanIdentifier(tableMatch[1]);
      const tableBody = tableMatch[2];

      const columns = [];

      // =======================================================
      // Split table body safely by lines
      // =======================================================
      const lines = tableBody.split(/\r?\n/);

      lines.forEach((line) => {
        line = line.trim();

        if (!line) return;

        // Remove trailing comma
        line = line.replace(/,\s*$/, "");

        // =====================================================
        // FOREIGN KEY inside CREATE TABLE
        //
        // FOREIGN KEY (customer_id)
        // REFERENCES customers(id)
        // =====================================================
        const foreignKeyMatch = line.match(
          /FOREIGN\s+KEY\s*\(\s*[`"']?([\w]+)[`"']?\s*\)\s*REFERENCES\s+(?:(?:[`"']?[\w]+[`"']?)\s*\.\s*)?[`"']?([\w]+)[`"']?\s*\(\s*[`"']?([\w]+)[`"']?\s*\)/i
        );

        if (foreignKeyMatch) {
          addRelationship(
            tableName,
            foreignKeyMatch[1],
            foreignKeyMatch[2],
            foreignKeyMatch[3]
          );

          return;
        }

        // =====================================================
        // Ignore table constraints
        // =====================================================
        if (
          /^PRIMARY\s+KEY/i.test(line) ||
          /^UNIQUE/i.test(line) ||
          /^CONSTRAINT/i.test(line) ||
          /^CHECK/i.test(line) ||
          /^INDEX/i.test(line) ||
          /^KEY/i.test(line)
        ) {
          return;
        }

        // =====================================================
        // Column definition
        // =====================================================
        const parts = line.split(/\s+/);

        if (parts.length > 0) {
          let columnName = cleanIdentifier(parts[0]);

          if (
            columnName &&
            !columnName.includes("(") &&
            !columnName.includes(")") &&
            !columnName.includes("=")
          ) {
            columns.push(columnName);
          }

          // ===================================================
          // Inline REFERENCES
          //
          // customer_id INT REFERENCES customers(id)
          // ===================================================
          const inlineReferenceMatch = line.match(
            /^["'`]?([\w]+)["'`]?\s+.*?\bREFERENCES\s+(?:(?:["'`]?[\w]+["'`]?)\s*\.\s*)?["'`]?([\w]+)["'`]?\s*\(\s*["'`]?([\w]+)["'`]?\s*\)/i
          );

          if (inlineReferenceMatch) {
            addRelationship(
              tableName,
              inlineReferenceMatch[1],
              inlineReferenceMatch[2],
              inlineReferenceMatch[3]
            );
          }
        }
      });

      tables.push({
        name: tableName,
        columns: [...new Set(columns)],
      });
    }

    // =========================================================
    // ALTER TABLE FOREIGN KEYS
    //
    // Handles:
    //
    // ALTER TABLE orders
    // ADD FOREIGN KEY (customer_id)
    // REFERENCES customers(id);
    //
    // Also handles:
    //
    // ALTER TABLE orders
    // ADD CONSTRAINT fk_customer
    // FOREIGN KEY (customer_id)
    // REFERENCES customers(id);
    // =========================================================
    const alterForeignKeyRegex =
      /ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?(?:[`"']?[\w]+[`"']?\s*\.\s*)?[`"']?([\w]+)[`"']?[\s\S]*?FOREIGN\s+KEY\s*\(\s*[`"']?([\w]+)[`"']?\s*\)\s*REFERENCES\s+(?:(?:[`"']?[\w]+[`"']?)\s*\.\s*)?[`"']?([\w]+)[`"']?\s*\(\s*[`"']?([\w]+)[`"']?\s*\)/gi;

    let alterMatch;

    while (
      (alterMatch = alterForeignKeyRegex.exec(cleanSQL)) !== null
    ) {
      addRelationship(
        alterMatch[1],
        alterMatch[2],
        alterMatch[3],
        alterMatch[4]
      );
    }

    // =========================================================
    // Generic FOREIGN KEY detection
    //
    // This catches cases where formatting is unusual.
    // =========================================================
    const genericForeignKeyRegex =
      /(?:FOREIGN\s+KEY\s*\(\s*[`"']?([\w]+)[`"']?\s*\))\s*REFERENCES\s+(?:(?:[`"']?[\w]+[`"']?)\s*\.\s*)?[`"']?([\w]+)[`"']?\s*\(\s*[`"']?([\w]+)[`"']?\s*\)/gi;

    let genericMatch;

    while (
      (genericMatch = genericForeignKeyRegex.exec(cleanSQL)) !== null
    ) {
      const sourceColumn = cleanIdentifier(genericMatch[1]);
      const targetTable = cleanIdentifier(genericMatch[2]);
      const targetColumn = cleanIdentifier(genericMatch[3]);

      // Find the table that contains this foreign-key column
      const sourceTable = tables.find((table) =>
        table.columns.includes(sourceColumn)
      );

      if (sourceTable) {
        addRelationship(
          sourceTable.name,
          sourceColumn,
          targetTable,
          targetColumn
        );
      }
    }

    // =========================================================
    // Remove duplicate tables
    // =========================================================
    const uniqueTables = Array.from(
      new Map(
        tables.map((table) => [table.name, table])
      ).values()
    );

    // =========================================================
    // Debug
    // =========================================================
    console.log("=================================");
    console.log("Parsed Tables:");
    console.log(uniqueTables);

    console.log("Parsed Relationships:");
    console.log(relationships);

    console.log("=================================");

    return {
      tables: uniqueTables,
      relationships,
    };
  } catch (err) {
    console.error("SQL Parsing Error:", err);

    return {
      tables: [],
      relationships: [],
    };
  }
}

module.exports = parseSQL;