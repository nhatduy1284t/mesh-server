const express = require('express');
const port = 3000;
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const path = require('path');
const helper = require('./helpers/Functions');
const app = express();
const mongoose = require('./db/index');
const User = require('./db/Model/User');

mongoose.connects();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// if (cluster.isMaster) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//   });
// } else {

//   app.use(express.json());
//   //UserRoutes
//   app.use('/user', userRoutes);
//   app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}/`);
//   });
// }


app.use(express.json());
//UserRoutes
app.use('/user', userRoutes);
app.use('/admin',adminRoutes);

app.listen(port,"192.168.174.128", () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
