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
        borderColor: "#d33333bd",
        backgroundColor: "rgba(237, 101, 101, 0.334)",
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
