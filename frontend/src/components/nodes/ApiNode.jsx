import { Handle, Position } from "reactflow";

function ApiNode({ data }) {
  const [method, ...rest] = data.label.split(" ");
  const path = rest.join(" ");

  const methodColors = {
    GET: "#16A34A",
    POST: "#2563EB",
    PUT: "#EA580C",
    DELETE: "#DC2626",
    PATCH: "#7C3AED",
  };

  return (
    <div className="w-60 rounded-xl overflow-hidden border border-slate-700 bg-[#1E293B] shadow-xl">

      {/* Incoming Edge */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#94A3B8",
          width: 10,
          height: 10,
          border: "none",
        }}
      />

      {/* HTTP Method */}
      <div
        className="px-4 py-2 text-white font-bold text-sm tracking-wide"
        style={{
          background: methodColors[method] || "#475569",
        }}
      >
        {method}
      </div>

      {/* API Path */}
      <div className="px-4 py-3 text-slate-200 text-sm break-all">
        {path}
      </div>

      {/* Outgoing Edge */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#94A3B8",
          width: 10,
          height: 10,
          border: "none",
        }}
      />

    </div>
  );
}

export default ApiNode;