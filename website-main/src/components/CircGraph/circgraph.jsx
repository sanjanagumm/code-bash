import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const CircularGraph = () => {
  const [data, setData] = useState({
    labels: ["Traffic Calls", "Fire Calls", "Medical Calls"],
    datasets: [
      {
        data: [100, 60, 20],
        backgroundColor: ["A8DD8A", "#21B7CE", "#3AE2AC"],
        borderColor: ["A8DD8A", "#21B7CE", "#3AE2AC"],
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrafficCalls = Math.floor(Math.random() * 200);
      const newFireCalls = Math.floor(Math.random() * 100);
      const newMedicalCalls = Math.floor(Math.random() * 80);

      setData({
        labels: ["Traffic Calls", "Fire Calls", "Medical Calls"],
        datasets: [
          {
            data: [newTrafficCalls, newFireCalls, newMedicalCalls],
            backgroundColor: ["#A8DD8A", "#21B7CE", "#3AE2AC"],
            borderColor: ["#A8DD8A", "#21B7CE", "#3AE2AC"],
            borderWidth: 2,
          },
        ],
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          margin: "0 auto",
        }}
      >
        <Doughnut
          data={data}
          options={{
            cutout: "70%",
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#A8DD8A",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          Traffic Calls
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#21B7CE",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          Fire Calls
        </div>
        <div style={{ display: "inline-block" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#3AE2AC",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          Medical Calls
        </div>
      </div>
    </div>
  );
};

export default CircularGraph;
