const { MongoClient } = require('mongodb');

async function connectToPrimary() {
    const uri = 'mongodb://localhost:2717,localhost:2727,localhost:2737/?replicaSet=myset';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to the primary node of the replica set');
        const db = client.db('test');
        const collection = db.collection('testCollection');
        const result = await collection.insertOne({ name: 'Primary Node Data' });
        console.log('Data inserted into primary node:', result);
    } catch (err) {
        console.error('Error connecting to primary node:', err);
    } finally {
        await client.close();
    }
}

connectToPrimary();
