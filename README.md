Real-Time 911 Call Monitoring Dashboard

Project Overview:
The 911 Call Monitoring Dashboard is a real-time alerting system designed to help emergency responders and civilians receive timely information about nearby incidents. The system continuously monitors incoming 911 calls, identifies locations with high call volumes, and sends alerts for fire, traffic, medical emergencies, and more. The dashboard provides a dynamic view of these alerts with filters to help prioritize responses efficiently.

Features:
Real-time call monitoring: Uses MongoDB Change Streams to detect new 911 calls and analyze them for alert conditions.
Location-based alerting: Alerts are generated when the number of calls from the same location exceeds a threshold in a short period.
Dynamic dashboard: Displays total calls, and categorizes them by type (e.g., Fire, Medical, Traffic).
WebSocket integration: Supports live updates to the frontend with minimal delay.
High scalability: Uses replica sets in MongoDB to ensure fault tolerance and data consistency.

Tech Stack:
Backend: Node.js, MongoDB (with replica set configuration)
Frontend: React.js
WebSocket: For real-time updates between backend and frontend
Other Tools: Faker.js (for generating simulated call data), Mongoose (for MongoDB interactions)

Process flow:
Data Generation: Simulated 911 call data is continuously generated using Faker.js.
Call Insertion: The call data is stored in MongoDB.
Change Stream Monitoring: The system uses MongoDB Change Streams to monitor for new call inserts.
Alert Condition Check: When a new call is detected, the system checks if it exceeds the alert conditions.
Alert Triggering: If conditions are met, an alert message is sent to all connected WebSocket clients.
Frontend Update: The dashboard updates in real-time to reflect the latest data.

Primary use case: 911 call centre manager

Other use Cases:
Emergency Responders: The dashboard provides a quick overview of incidents in specific locations, enabling faster dispatch decisions.
Civilians: Residents can monitor nearby emergencies and stay informed about potential dangers in their area.
