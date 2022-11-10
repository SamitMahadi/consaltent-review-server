const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

///consaltent01
//// T3YknIFbcc3IHbJJ


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ovpnih.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const serviceCollection = client.db('consaltentReview').collection('services');
        const reviewCollection = client.db('consaltentReview').collection('review');
        app.get('/services',async(req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id',async(req,res)=>{
            const id =req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.post('/services',async(req,res)=>{
            const service = req.body
            console.log(service);
            const result =await serviceCollection.insertOne(service)
            res.send(result)
        })

        app.get('/reviews',async(req,res)=>{
            const query = {}
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
        app.post('/reviews',async(req,res)=>{
            const review = req.body
            console.log(review);
            const result =await reviewCollection.insertOne(review)
            res.send(result)
        })


    }

    finally {

    }

}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`consaltent server is running on ${port}`);
})