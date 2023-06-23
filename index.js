import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import dotenv from "dotenv"
import MemoryRouter from './Routes/MemoryRoute.js';
import getMemory from './Routes/GetMemory.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to the db")
    }).catch((err) => {
        console.log(err)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
});


server.start().then(() => {
    server.applyMiddleware({ app });
});

app.get("/", (req, res) => {
    res.json("it's perfectly works")
})

app.use("/api/memorypost", MemoryRouter)
app.use("/api/getdata", getMemory)

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
