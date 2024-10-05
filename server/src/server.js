const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(require("./routes/tasks"));
  }

  execute() {
    dbConnection();

    this.middlewares();

    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
