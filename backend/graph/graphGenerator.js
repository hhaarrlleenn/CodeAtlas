function generateGraph(endpoints, tables, relationships = []) {
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

    // Create service only once
    if (!services[serviceName]) {
      services[serviceName] = true;

      nodes.push({
        id: serviceName,
        type: "service",
      });
    }

    // API → Service
    edges.push({
      source: apiId,
      target: serviceName,
      type: "smoothstep",
    });
  });

  // ============================
  // Create Database Nodes
  // ============================
  tables.forEach((table) => {
    nodes.push({
      id: table.name,
      type: "database",
      columns: table.columns || [],
    });

    // Connect table to matching service
    const serviceName =
      table.name.charAt(0).toUpperCase() +
      table.name.slice(1) +
      " Service";

    if (services[serviceName]) {
      edges.push({
        source: serviceName,
        target: table.name,
        type: "smoothstep",
      });
    }
  });

  // ============================
  // Create Database Relationships
  // ============================
  relationships.forEach((relationship) => {
    if (
      !relationship.source ||
      !relationship.target
    ) {
      return;
    }

    // Make sure both tables actually exist
    const sourceTable = tables.find(
      (table) => table.name === relationship.source
    );

    const targetTable = tables.find(
      (table) => table.name === relationship.target
    );

    if (!sourceTable || !targetTable) {
      return;
    }

    edges.push({
      id: `fk-${relationship.source}-${relationship.sourceColumn}-${relationship.target}-${relationship.targetColumn}`,
      source: relationship.source,
      target: relationship.target,
      type: "smoothstep",
      label:
        relationship.sourceColumn && relationship.targetColumn
          ? `${relationship.sourceColumn} → ${relationship.targetColumn}`
          : "FOREIGN KEY",
      animated: false,
    });
  });

  // ============================
  // Remove Duplicate Nodes
  // ============================
  const uniqueNodes = Array.from(
    new Map(nodes.map((node) => [node.id, node])).values()
  );

  // ============================
  // Remove Duplicate Edges
  // ============================
  const uniqueEdges = Array.from(
    new Map(
      edges.map((edge) => [
        `${edge.source}-${edge.target}-${edge.label || ""}`,
        edge,
      ])
    ).values()
  );

  // ============================
  // Debug Logs
  // ============================
  console.log("Generated Nodes:", uniqueNodes);
  console.log("Generated Edges:", uniqueEdges);
  console.log("Database Relationships:", relationships);

  return {
    nodes: uniqueNodes,
    edges: uniqueEdges,
  };
}

module.exports = generateGraph;