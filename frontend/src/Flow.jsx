import React, { useState } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import InputNode from "./nodes/InputNode";
import ResultNode from "./nodes/ResultNode";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const Flow = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 200 },
      data: { prompt, setPrompt },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 600, y: 200 },
      data: { result, loading },
    },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
  ];

  const runFlow = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://mern-ai-flow-2.onrender.com/api/ask-ai", { prompt });
      setResult(res.data.answer);
    } catch (err) {
      alert("AI error");
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await axios.post("https://mern-ai-flow-2.onrender.com/api/save", {
        prompt,
        response: result,
      });
      alert("Saved!");
    } catch {
      alert("Save failed");
    }
  };

  return (
    <ReactFlowProvider>
      <div style={styles.container}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <h2>⚡ AI Flow Builder</h2>
          <div>
            <button style={styles.runBtn} onClick={runFlow}>🚀 Run</button>
            <button style={styles.saveBtn} onClick={saveData}>💾 Save</button>
          </div>
        </div>

        {/* FLOW */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
    </ReactFlowProvider>
  );
};

export default Flow;

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  runBtn: {
    marginRight: "10px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #22c55e, #16a34a)",
    color: "white",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
    color: "white",
    cursor: "pointer",
  },
};