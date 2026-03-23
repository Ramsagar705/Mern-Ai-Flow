import { Handle, Position } from "reactflow";

export default function ResultNode({ data }) {
  return (
    <div style={{
      padding: 20,
      borderRadius: 15,
      background: "#020617",
      width: 300,
      color: "#38bdf8",
      boxShadow: "0 0 20px rgba(56,189,248,0.3)"
    }}>
      
      <h4>🤖 Result</h4>

      {data.loading ? (
        <p>⏳ Thinking...</p>
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>
          {data.result || "Waiting for response..."}
        </p>
      )}

      {/* 🔥 TARGET HANDLE */}
      <Handle type="target" position={Position.Left} />

    </div>
  );
}