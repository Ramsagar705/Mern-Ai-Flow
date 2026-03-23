import { Handle, Position } from "reactflow";

export default function InputNode({ data }) {
  return (
    <div style={{ padding: 20, borderRadius: 15, background: "rgba(255,255,255,0.08)", width: 220, color: "white" }}>
      
      <h4>🧠 Input</h4>

      <textarea
        value={data.prompt}
        onChange={(e) => data.setPrompt(e.target.value)}
        placeholder="Ask anything..."
        style={{
          width: "100%",
          height: 80,
          borderRadius: 8,
          padding: 10,
          border: "none",
          outline: "none",
        }}
      />

      {/* 🔥 SOURCE HANDLE */}
      <Handle type="source" position={Position.Right} />

    </div>
  );
}