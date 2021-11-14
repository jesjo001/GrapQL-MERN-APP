const express = require('express');
const {graphqlHTTP} = require('express-graphql')
var { buildSchema } = require('graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const  { config } = require("dotenv")
const cors = require('cors')
config()

const app = express();
//allow crossorigin request
app.use(cors())

mongoose.connect(process.env.LOCAL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.log('err', err);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('Connection establish');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, ()=> console.log(`listenning on port ${5000}`))
