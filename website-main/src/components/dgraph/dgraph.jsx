// import React, { useEffect, useRef, useState } from "react";
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";

// const DynamicSpikyGraph = () => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Emergency Calls Spike",
//         data: [],
//         borderColor: "#FF5733",
//         backgroundColor: "rgba(255, 87, 51, 0.4)",
//         fill: true,
//         tension: 0.1, // Lower tension for sharper spikes
//         pointRadius: 3, // Points to make spikes stand out
//         pointBackgroundColor: "#FF5733",
//         borderWidth: 2, // Thicker line for visibility
//       },
//     ],
//   });

//   const chartRef = useRef();

//   useEffect(() => {
//     const ws = new WebSocket("ws://192.168.54.24:8080");

//     ws.onmessage = (event) => {
//       const serverData = JSON.parse(event.data);

//       if (serverData.type === "newCall") {
//         const newTime = new Date().toLocaleTimeString();
//         // Here we increment the call volume based on each new call
//         const newValue = data.datasets[0].data.length + 1; // Incrementing volume count

//         setData((prevData) => ({
//           labels: [...prevData.labels, newTime].slice(-10), // Keep the last 10 time points
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: [...prevData.datasets[0].data, newValue].slice(-10), // Keep the last 10 data points
//             },
//           ],
//         }));
//       }
//     };

//     return () => {
//       ws.close(); // Clean up WebSocket connection
//     };
//   }, [data]);

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         grid: {
//           display: false, // Hide vertical grid lines for a cleaner look
//         },
//         ticks: {
//           autoSkip: true, // Avoid overlapping labels
//           maxTicksLimit: 10,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(200, 200, 200, 0.3)", // Light gray grid lines
//         },
//         ticks: {
//           stepSize: 1, // Define the step size for visibility of spikes
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         enabled: true,
//         backgroundColor: "#FF5733",
//         titleFont: { size: 14 },
//         bodyFont: { size: 12 },
//         padding: 10,
//         callbacks: {
//           label: (context) => `Calls: ${context.raw}`, // Custom label for clarity
//         },
//       },
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           color: "#333",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "400px" }}>
//       <Line data={data} options={options} ref={chartRef} />
//     </div>
//   );
// };

// export default DynamicSpikyGraph;


import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DynamicSpikyGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Emergency Calls Spike",
        data: [],
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.4)",
        fill: true,
        tension: 0.1, // Lower tension for sharper spikes
        pointRadius: 3, // Points to make spikes stand out
        pointBackgroundColor: "#FF5733",
        borderWidth: 2, // Thicker line for visibility
      },
    ],
  });

  const chartRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newValue = Math.floor(Math.random() * 200); // Random value to simulate spikes

      setData((prevData) => ({
        labels: [...prevData.labels, newTime].slice(-10), // Keep the last 10 time points
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newValue].slice(-10), // Keep the last 10 data points
          },
        ],
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines for a cleaner look
        },
        ticks: {
          autoSkip: true, // Avoid overlapping labels
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Light gray grid lines
        },
        ticks: {
          stepSize: 50, // Define the step size to emphasize spikes
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#FF5733",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: (context) => `Calls: ${context.raw}`, // Custom label for better clarity
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default DynamicSpikyGraph;