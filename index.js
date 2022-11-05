
import './loadenv.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import router from './api/routes/index.js'
import ConnectDB from './db/db.js'



const app = express()
const database = ConnectDB()
const port = process.env.PORT || 3301;
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(router);

app.listen(port, () => {
console.log(`Server is listening at http://localhost:${port}/api`)
})



export default app;