const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//uri of database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4s98b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// run function
async function run() {
  try {
    await client.connect();
    const database = client.db("portfolio-info");
    const projectsCollection = database.collection("projects");
    const blogsCollection = database.collection("blogs");

    app.get("/projects", async (req, res) => {
      const cursor = projectsCollection.find({});
      const services = await cursor.toArray();
      res.json(services);
    });

    // for posting product
    app.post("/projects", async (req, res) => {
      const product = req.body;
      const result = await projectsCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });

    // for single project
    app.get("/project/:id", async (req, res) => {
      const query = { _id: ObjectId(req?.params?.id) };
      const cursor = await projectsCollection?.findOne(query);
      res.json(cursor);
      console.log(cursor);
    });

    // project delete api
    app.delete("/delete-project/:id", async (req, res) => {
      const query = { _id: ObjectId(req?.params?.id) };
      const result = await projectsCollection?.deleteOne(query);
      res.json(result);
    });

    
    app.get("/blogs", async (req, res) => {
      const cursor = blogsCollection.find({});
      const services = await cursor.toArray();
      res.json(services);
    });

    // for posting product
    app.post("/blogs", async (req, res) => {
      const product = req.body;
      const result = await blogsCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });

    // for single project
    app.get("/blog/:id", async (req, res) => {
      const query = { _id: ObjectId(req?.params?.id) };
      const cursor = await blogsCollection?.findOne(query);
      res.json(cursor);
      console.log(cursor);
    });

    // project delete api
    app.delete("/delete-blog/:id", async (req, res) => {
      const query = { _id: ObjectId(req?.params?.id) };
      const result = await blogsCollection?.deleteOne(query);
      res.json(result);
    });

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello to my self 🤕");
});

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
