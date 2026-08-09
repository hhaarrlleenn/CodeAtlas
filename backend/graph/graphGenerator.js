function generateGraph(endpoints, tables) {
  const nodes = [];
  const edges = [];

  const services = {};

  // ============================
  // Create API Nodes + Services
  // ============================
  endpoints.forEach((endpoint) => {
    const apiId = `${endpoint.method} ${endpoint.path}`;

    nodes.push({
      id: apiId,
      type: "api",
    });

    const parts = endpoint.path.split("/").filter(Boolean);

    let serviceName = "Common Service";

    if (parts.length > 0) {
      serviceName =
        parts[0].charAt(0).toUpperCase() +
        parts[0].slice(1) +
        " Service";
    }

    if (!services[serviceName]) {
      services[serviceName] = true;

      nodes.push({
        id: serviceName,
        type: "service",
      });
    }

    edges.push({
      source: apiId,
      target: serviceName,
    });
  });

  // ============================
  // Create Database Nodes
  // ============================
  tables.forEach((table) => {
    nodes.push({
      id: table.name,
      type: "database",
      columns: table.columns, // ⭐ Save columns for later
    });

    const serviceName =
      table.name.charAt(0).toUpperCase() +
      table.name.slice(1) +
      " Service";

    if (services[serviceName]) {
      edges.push({
        source: serviceName,
        target: table.name,
      });
    }
  });

  return {
    nodes,
    edges,
  };
}

module.exports = generateGraph;