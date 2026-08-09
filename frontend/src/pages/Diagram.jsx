import { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { getLayoutedElements } from "../utils/layout";
import ApiNode from "../components/nodes/ApiNode";

const nodeTypes = {
  api: ApiNode,
};

function Diagram() {
  const graph = JSON.parse(localStorage.getItem("graph"));
  const [selectedNode, setSelectedNode] = useState(null);

  if (!graph) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B1120] text-white text-3xl">
        No graph found.
      </div>
    );
  }

  // -------------------------------
  // Create Nodes
  // -------------------------------

  const initialNodes = graph.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: { x: 0, y: 0 },

    data: {
      label: node.id,
    },

    style:
      node.type !== "api"
        ? {
            background:
              node.type === "service"
                ? "#10B981"
                : "#9333EA",

            color: "white",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,.12)",
            padding: "12px",
            fontWeight: "600",
            fontSize: "15px",
            minWidth: 220,
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,.35)",
          }
        : {},
  }));

  // -------------------------------
  // Create Edges
// -------------------------------

const initialEdges = graph.edges.map((edge, index) => ({
  id: `e${index}`,
  source: edge.source,
  target: edge.target,

  type: "bezier",
  animated: false,

  style: {
    stroke: "#60A5FA",
    strokeWidth: 2.5,
  },
}));

  // -------------------------------
  // Auto Layout
  // -------------------------------

  const { nodes, edges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  return (
    <div className="relative h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]">

      <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}

  defaultEdgeOptions={{
    type: "bezier",
    animated: false,
    style: {
      stroke: "#60A5FA",
      strokeWidth: 2.5,
    },
  }}

  fitView
  fitViewOptions={{ padding: 0.3 }}

  onNodeClick={(event, node) => {
    const clicked = graph.nodes.find(
      (n) => n.id === node.id
    );

    setSelectedNode(clicked);
  }}

  onPaneClick={() => setSelectedNode(null)}
>

        <MiniMap
          pannable
          zoomable
          nodeStrokeWidth={3}
          style={{
            background: "#111827",
            border: "1px solid #334155",
            borderRadius: "12px",
            width: 170,
            height: 110,
          }}
        />

        <Controls
          style={{
            background: "#111827",
            border: "1px solid #334155",
            borderRadius: "10px",
          }}
        />

        <Background
          gap={25}
          size={1.5}
          color="#334155"
        />

      </ReactFlow>

      {/* ================================= */}
      {/* DETAILS PANEL                     */}
      {/* ================================= */}

      {selectedNode && (
        <div className="absolute top-6 right-6 w-80 bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-20">

          {/* Header */}

          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700">

            <div>

              <h2 className="text-xl font-semibold text-white">
                {selectedNode.id}
              </h2>

              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">
                {selectedNode.type}
              </p>

            </div>

            <button
              onClick={() => setSelectedNode(null)}
              className="text-2xl text-slate-400 hover:text-red-400 transition"
            >
              ×
            </button>

          </div>

          {/* Body */}

          <div className="p-5">

            {selectedNode.columns ? (
              <>
                <h3 className="text-white font-semibold mb-3">
                  Table Columns
                </h3>

                <div className="space-y-2 max-h-64 overflow-y-auto">

                  {selectedNode.columns.map((column) => (
                    <div
                      key={column}
                      className="bg-[#1E293B] rounded-lg px-3 py-2 text-slate-200"
                    >
                      {column}
                    </div>
                  ))}

                </div>
              </>
            ) : (
              <>
                <div className="space-y-3 text-slate-300">

                  <div>
                    <span className="text-slate-500">
                      Node Type
                    </span>

                    <p className="mt-1 capitalize">
                      {selectedNode.type}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500">
                      Identifier
                    </span>

                    <p className="mt-1 break-all">
                      {selectedNode.id}
                    </p>
                  </div>

                </div>
              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Diagram;