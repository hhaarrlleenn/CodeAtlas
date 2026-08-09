const fs = require("fs");
const yaml = require("yaml");

function parseOpenAPI(filePath) {
  try {
    // Read file
    const file = fs.readFileSync(filePath, "utf8");

    // Parse YAML
    const api = yaml.parse(file);

    // Extract paths
    const paths = api.paths || {};

    const endpoints = [];

    for (const path in paths) {
      const methods = paths[path];

      for (const method in methods) {
        endpoints.push({
          method: method.toUpperCase(),
          path: path,
        });
      }
    }

    return endpoints;
  } catch (err) {
    console.error("OpenAPI Parsing Error:", err);
    return [];
  }
}

module.exports = parseOpenAPI;