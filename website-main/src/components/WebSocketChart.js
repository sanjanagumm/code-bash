import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket';
import { Line } from 'react-chartjs-2';  // or any other Chart.js component

const WebSocketChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],  // Time labels
    datasets: [
      {
        label: 'High Call Volume Alert',
        data: [],  // Alert count data
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

  const { lastMessage } = useWebSocket('ws://localhost:8080', {
    onOpen: () => console.log('WebSocket connection opened'),
    onMessage: () => console.log('WebSocket message received'),
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);

      if (messageData.alert) {
        // Update chart data
        setChartData((prevData) => ({
          ...prevData,
          labels: [...prevData.labels, new Date().toLocaleTimeString()],
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            data: [...dataset.data, messageData.count],  // Update alert count
          })),
        }));
      }
    }
  }, [lastMessage]);

  return (
    <div>
      <h2>Real-Time 911 Call Alerts</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Alert Count' }, beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default WebSocketChart;
