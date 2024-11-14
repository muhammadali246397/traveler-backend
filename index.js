const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.Db_useR_naMe}:${process.env.dB_PasS}@cluster0.rfaan6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db("traveler");
        const destinationCollection = database.collection('destinationCollection')


        const data =
            {
                name:"juwel",
                roll:"a"
            }


        app.get('/', (req, res) => {
            res.send('server is running fine')
        })

        app.post('/destination', async (req, res) => {
            const result = await destinationCollection.insertOne(data)
            console.log(result)
        })






        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})