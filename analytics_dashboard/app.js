const mongoose = require('mongoose');
const faker = require('faker');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:2717,localhost:2727,localhost:2737/myDatabase?replicaSet=myset';

// Call schema definition
const callSchema = new mongoose.Schema({
    callId: { type: String, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    priority: { type: Number, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Call = mongoose.model('Call', callSchema);

// WebSocket Setup
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');
});

// Connect to MongoDB and start monitoring the change stream
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Start monitoring for new call inserts using Change Streams
        const changeStream = Call.watch();

        changeStream.on('change', async (change) => {
            if (change.operationType === 'insert') {
                const newCall = change.fullDocument;
                console.log(`New call inserted: ${newCall.callId}`);

                // Check for alerts based on same latitude and longitude
                const thirtySecondsAgo = new Date(newCall.createdAt.getTime() - 30 * 1000);
                const recentCalls = await Call.find({
                    latitude: newCall.latitude,
                    longitude: newCall.longitude,
                    createdAt: { $gte: thirtySecondsAgo }
                });

                if (recentCalls.length > 4) {
                    const message = {
                        alert: 'High call volume detected!',
                        location: { latitude: newCall.latitude, longitude: newCall.longitude },
                        count: recentCalls.length,
                        highestPriority: Math.max(...recentCalls.map(call => call.priority)),
                        types: [...new Set(recentCalls.map(call => call.type))]
                    };

                    console.log('Sending alert:', message);
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(message));
                        }
                    });
                }
            }
        });

        // Generate calls every 50 milliseconds
        setInterval(generateCalls, 500);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));

// Generate fake 911 calls and insert into MongoDB continuously
const generateCalls = async () => {
    const fixedLocations = [
        { latitude: 37.7749, longitude: -122.4194 },
        { latitude: 37.7750, longitude: -122.4195 },
        { latitude: 37.7751, longitude: -122.4194 },
        { latitude: 37.7751, longitude: -122.4196 },
        { latitude: 37.7750, longitude: -122.4194 },
        { latitude: 37.7749, longitude: -122.4196 }
    ];

    const selectedLocation = fixedLocations[Math.floor(Math.random() * fixedLocations.length)];

    const call = new Call({
        callId: faker.datatype.uuid(),
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        priority: faker.datatype.number({ min: 1, max: 10 }),
        type: faker.random.arrayElement(['Fire', 'EMS', 'Police']),
        createdAt: new Date()
    });

    await call.save();
    console.log(`New call inserted: ${call.callId}`);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'newCall',
                callId: call.callId,
                location: { latitude: call.latitude, longitude: call.longitude },
                priority: call.priority,
                callType: call.type,
                createdAt: call.createdAt
            }));
        }
    });
};
