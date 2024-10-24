// import React, { useEffect, useRef, useState } from "react";
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";

// const DynamicGraph = () => {
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Rate of Change of Emergency Calls",
//         data: [],
//         borderColor: "#2C7985",
//         backgroundColor: "rgba(79, 179, 194, 0.6)",
//         fill: true,
//       },
//     ],
//   });

//   const chartRef = useRef();

//   useEffect(() => {
//     // Establish WebSocket connection
//     const ws = new WebSocket("ws://192.168.54.24:8080");

//     ws.onmessage = (event) => {
//       const serverData = JSON.parse(event.data);

//       // Assuming serverData contains the number of calls or required value
//       if (serverData.type === "emergencyCallsUpdate") {
//         const newValue = serverData.callVolume; // or however your backend sends this value
//         const newTime = new Date().toLocaleTimeString();

//         setData((prevData) => ({
//           labels: [...prevData.labels, newTime].slice(-10), // Keep only the last 10 labels
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: [...prevData.datasets[0].data, newValue].slice(-10), // Keep only the last 10 values
//             },
//           ],
//         }));
//       }
//     };

//     // Cleanup function to close WebSocket connection
//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "400px" }}>
//       <Line data={data} options={{ responsive: true }} ref={chartRef} />
//     </div>
//   );
// };

// export default DynamicGraph;


import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DynamicGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Rate of Change of Emergency Calls",
        data: [],
        borderColor: "#2C7985",
        backgroundColor: "rgba(79, 179, 194, 0.6)",
        fill: true,
      },
    ],
  });

  const chartRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newValue = Math.floor(Math.random() * 100);

      setData((prevData) => ({
        labels: [...prevData.labels, newTime].slice(-10),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newValue].slice(-10),
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={{ responsive: true }} ref={chartRef} />
    </div>
  );
};

export default DynamicGraph;