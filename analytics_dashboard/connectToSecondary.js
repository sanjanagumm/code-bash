const { MongoClient, ReadPreference } = require('mongodb');

async function connectToSecondary() {
    const uri = 'mongodb://localhost:2717,localhost:2727,localhost:2737/?replicaSet=myset';
    const client = new MongoClient(uri, { readPreference: ReadPreference.SECONDARY });

    try {
        await client.connect();
        console.log('Connected to the secondary node of the replica set');
        const db = client.db('test');
        const collection = db.collection('testCollection');
        const documents = await collection.find().toArray();
        console.log('Data retrieved from secondary node:', documents);
    } catch (err) {
        console.error('Error connecting to secondary node:', err);
    } finally {
        await client.close();
    }
}

connectToSecondary();
