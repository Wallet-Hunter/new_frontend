import React from "react";
import Graph from "react-graph-vis";

function UserNetwork() {
  // Generate 100 nodes
  const nodes = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    label: `User ${i + 1}`,
    title: `User ${i + 1}'s Profile`,
  }));

  // Generate random edges
  const edges = Array.from({ length: 150 }, () => {
    const from = Math.ceil(Math.random() * 100);
    let to;
    do {
      to = Math.ceil(Math.random() * 100);
    } while (to === from); // Avoid self-loops

    return { from, to };
  });

  const graph = { nodes, edges };

  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: "dot",
      size: 15,
      color: {
        background: "#00ffff",
        border: "#00ffff",
        highlight: "#D2E5FF",
      },
      font: {
        size: 14,
        color: "#343434",
      },
    },
    edges: {
      color: {
        color: "#848484",
        highlight: "#2B7CE9",
        hover: "#848484",
      },
      width: 2,
      smooth: {
        type: "continuous",
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      zoomView: true, // Enable zooming
      navigationButtons: true, // Adds built-in navigation buttons for zooming
      keyboard: {
        enabled: true, // Allows zooming using keyboard
      },
      multiselect: true, // Allows multi-selection with shift key
      dragView: true, // Enable drag
      zoomSpeed: 0.02, // Slow down zoom speed for better control
    },
    physics: {
      enabled: true,
      stabilization: { iterations: 150 },
    },
    height: "600px",
  };

  const events = {
    select: function (event) {
      const { nodes, edges } = event;
      console.log("Selected nodes:", nodes);
      console.log("Selected edges:", edges);
    },
  };

  return (
    <div>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          network.fit();
        }}
      />
    </div>
  );
}

export default UserNetwork;
